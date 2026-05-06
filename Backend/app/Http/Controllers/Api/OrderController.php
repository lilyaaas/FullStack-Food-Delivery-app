<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // Generate a dynamic status message based on order status
    private function getStatusMessage(string $status, Order $order)
    {
        $restaurantName = $order->restaurant->name ?? 'the restaurant';
        $num = $order->order_number;

        return match ($status) {
            'pending'   => "Your order #{$num} has been successfully placed.",
            'accepted'  => "Your order from {$restaurantName} has been received and is being prepared with kinetic precision.",
            'preparing' => "The chefs at {$restaurantName} are crafting your order #{$num} right now. Hang tight!",
            'on_way'    => "Your order #{$num} from {$restaurantName} is on its way to you. Get ready!",
            'delivered'  => "Your order #{$num} from {$restaurantName} has been delivered. Enjoy your meal!",
            'cancelled' => "Your order #{$num} from {$restaurantName} has been cancelled.",
            default     => "Your order #{$num} is being processed.",
        };
    }

    // Generate a unique order reference
    private function generateReference()
    {
        do {
            $ref = 'QF-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
        } while (Order::where('reference', $ref)->exists());

        return $ref;
    }

    // Get user orders (My Orders)
    public function index(Request $request)
    {
        // Get user orders with pagination
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['restaurant', 'items.product'])
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    // Search user orders by reference, restaurant name, or product name
    public function search(Request $request)
    {
        $query = $request->query('q', '');
        $status = $request->query('status');

        $orders = Order::where('user_id', $request->user()->id)
            ->with(['restaurant', 'items.product'])
            ->when($query, function ($q) use ($query) {
                $q->where(function ($sub) use ($query) {
                    $sub->where('reference', 'LIKE', "%{$query}%")
                        ->orWhereHas('restaurant', function ($r) use ($query) {
                            $r->where('name', 'LIKE', "%{$query}%");
                        })
                        ->orWhereHas('items.product', function ($p) use ($query) {
                            $p->where('name', 'LIKE', "%{$query}%");
                        });
                });
            })
            ->when($status, function ($q, $status) {
                $statuses = explode(',', $status);
                $q->whereIn('status', $statuses);
            })
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    // Show a single order with its status & message
    public function show(Request $request, $id)
    {
        $order = Order::with(['restaurant', 'items.product'])
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'order' => $order,
        ]);
    }

    // Place a new Order
    public function store(Request $request)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'address'       => 'required|string',
            'phone'         => 'required|string',
            'items'         => 'required|array', // list of items
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.price'      => 'required|numeric',
            'payment_method'     => 'required|in:cash,card,paypal',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Transactional Order Creation
        try {
            return DB::transaction(function () use ($request) {

                $totalAmount = 0;
                $orderItemsData = []; // to store order items data

                $restaurant = Restaurant::findOrFail($request->restaurant_id);

                foreach ($request->items as $item) {
                    $product = Product::findOrFail($item['product_id']);

                    if ($product->restaurant_id != $request->restaurant_id) {
                        throw new \Exception("Product {$product->name} does not belong to this restaurant");
                    }

                    $price = $item['price'];
                    $quantity = $item['quantity'];
                    $totalAmount += ($price * $quantity);

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'quantity'   => $quantity,
                        'price'      => $price,
                    ];
                }

                $totalAmount += $restaurant->delivery_fee;

                if ($totalAmount < $restaurant->min_order_price) {
                    throw new \Exception("Order total is less than the minimum order price of {$restaurant->min_order_price}");
                }

                $orderNumber = Order::where('user_id', $request->user()->id)->count() + 1;

                $order = Order::create([
                    'user_id'        => $request->user()->id,
                    'restaurant_id'  => $request->restaurant_id,
                    'order_number'   => $orderNumber,
                    'reference'      => $this->generateReference(),
                    'total_amount'   => $totalAmount,
                    'address'        => $request->address,
                    'phone'          => $request->phone,
                    'payment_method' => $request->payment_method,
                    'status'         => 'pending',
                ]);

                // Set the initial status message
                $order->update([
                    'message' => $this->getStatusMessage('pending', $order),
                ]);

                foreach ($orderItemsData as $data) {
                    OrderItem::create([
                        'order_id'   => $order->id,
                        'product_id' => $data['product_id'],
                        'quantity'   => $data['quantity'],
                        'price'      => $data['price'],
                    ]);
                }

                return response()->json([
                    'message'        => 'Order placed successfully',
                    'order_id'       => $order->id,
                    'order_number'   => $order->order_number,
                    'reference'      => $order->reference,
                    'total_amount'   => $totalAmount,
                    'status'         => $order->status,
                    'payment_method' => $order->payment_method,
                    'order_message'  => $order->message,
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    // Update Order Status (Only Restaurant Owner)
    public function updateStatus(Request $request, $id)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,accepted,preparing,on_way,delivered,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Find Order
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // 3. Authorization: Check if the user is the restaurant owner
        if ($order->restaurant->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized. Only the restaurant owner can update the status.'], 403);
        }

        // 4. Update Status & Message together
        $newMessage = $this->getStatusMessage($request->status, $order);

        $order->update([
            'status'  => $request->status,
            'message' => $newMessage,
        ]);

        return response()->json([
            'message'       => 'Order status updated successfully',
            'status'        => $order->status,
            'order_message' => $order->message,
        ]);
    }

    // Get incoming orders for Restaurant Owner
    public function getRestaurantOrders(Request $request)
    {
        // 1. Find Restaurant owned by the user
        $restaurant = Restaurant::where('owner_id', $request->user()->id)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found for this user'], 404);
        }

        // 2. Get Orders for the Restaurant
        $orders = Order::where('restaurant_id', $restaurant->id)
            ->with(['user', 'items.product'])
            // Filter by status if provided
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }
}

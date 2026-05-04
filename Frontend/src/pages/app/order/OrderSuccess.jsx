import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Map,
  ChefHat,
  Receipt,
  Bike,
  Home,
  MapPin,
  CreditCard,
  ArrowRight,
  Clock,
} from "lucide-react";

import { orderService } from "../../../services/orderService";
import { getImageUrl } from "../../../utils/ImageConfig";
import LoadingSpinner from "../../../ui/loading/LoadingSpinner";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderDetails(id);
        setOrder(response.order);
      } catch (error) {
        console.error("Erroooooor fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading)
    return <LoadingSpinner LoadingText="Fetching your order details..." />;

  const statusMap = {
    pending: 1,
    accepted: 2,
    preparing: 3,
    on_way: 4,
    delivered: 5,
    cancelled: -1,
  };
  const currentStep = statusMap[order.status] || 1;

  return (
    <main className="min-h-screen bg-background pt-20 pb-32 px-4 lg:px-8 2xl:px-24 font-body">
      {/* Success Hero Section */}
      <section className="flex flex-col items-center py-12 mb-8 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6 shadow-xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-black font-headline text-on-background text-center tracking-tight mb-4">
          Order Confirmed!
        </h1>

        <p className="text-on-surface-variant text-lg max-w-md mx-auto mb-8 text-center">
          {order.message}
        </p>

        <div className="flex items-center gap-2 text-on-surface-variant text-sm font-bold bg-surface-container-low px-4 py-2 rounded-full mb-12">
          <Clock className="w-4 h-4 text-primary" />
          Estimated Delivery: 25-35 mins
        </div>
      </section>

      {/* Tracking Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Map Card */}
        <div className="md:col-span-2 relative h-100 bg-surface-container-high rounded-3xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
            alt="Map view"
            className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface/90 via-surface/20 to-transparent"></div>

          {/* Floating Map Action */}
          <div className="absolute bottom-6 right-6">
            <button className="bg-primary text-on-primary px-6 py-3 rounded-full flex items-center gap-2 font-display font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer">
              <Map className="w-5 h-5" />
              Track on Map
            </button>
          </div>

          {/* Rider Status Overlay */}
          <div className="absolute top-6 left-6 bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-2xl flex items-center gap-4 shadow-sm border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150"
                alt="Courier"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Your Courier
              </p>
              <p className="font-display font-bold">Marco Rossini</p>
            </div>
          </div>
        </div>

        {/* Visual Progress Timeline */}
        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
          <h3 className="font-display font-bold text-xl mb-8">Live Status</h3>
          <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-3.75 top-2 bottom-2 w-0.5 bg-outline-variant/20"></div>

            {/* Step 1: Placed */}
            <div className="flex items-start gap-4 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`font-bold ${
                    currentStep >= 1 ? "text-on-background" : "text-outline"
                  }`}
                >
                  Order Placed
                </p>
              </div>
            </div>

            {/* Step 2: Accepted */}
            <div
              className={`flex items-start gap-4 relative z-10 ${
                currentStep < 2 ? "opacity-40" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 2
                    ? "bg-primary text-on-primary ring-4 ring-primary-container ring-offset-2 ring-offset-surface-container-lowest"
                    : currentStep > 2
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`font-bold ${
                    currentStep === 2 ? "text-primary" : "text-on-background"
                  }`}
                >
                  Accepted
                </p>
              </div>
            </div>

            {/* Step 3: Preparing */}
            <div
              className={`flex items-start gap-4 relative z-10 ${
                currentStep < 3 ? "opacity-40" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 3
                    ? "bg-primary text-on-primary ring-4 ring-primary-container ring-offset-2 ring-offset-surface-container-lowest"
                    : currentStep > 3
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`font-bold ${
                    currentStep === 3 ? "text-primary" : "text-on-background"
                  }`}
                >
                  Preparing
                </p>
                {currentStep === 3 && (
                  <p className="text-xs text-on-surface-variant">
                    Estimated 10 mins
                  </p>
                )}
              </div>
            </div>

            {/* Step 4: Out for Delivery */}
            <div
              className={`flex items-start gap-4 relative z-10 ${
                currentStep < 4 ? "opacity-40" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 4
                    ? "bg-primary text-on-primary ring-4 ring-primary-container ring-offset-2 ring-offset-surface-container-lowest"
                    : currentStep > 4
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`font-bold ${
                    currentStep === 4 ? "text-primary" : "text-on-background"
                  }`}
                >
                  On the Way
                </p>
              </div>
            </div>

            {/* Step 5: Delivered */}
            <div
              className={`flex items-start gap-4 relative z-10 ${
                currentStep < 5 ? "opacity-40" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 5
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`font-bold ${
                    currentStep === 5 ? "text-primary" : "text-on-background"
                  }`}
                >
                  Delivered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Item List */}
        <div className="space-y-6">
          <h3 className="font-display font-extrabold text-2xl mb-2">
            {order?.restaurant?.name || "Restaurant"} Order
          </h3>
          <div className="space-y-4 pt-5">
            {order?.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl group hover:border-primary/20 transition-all shadow-sm"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high border border-outline-variant/10 shadow-sm relative">
                    <img
                      src={getImageUrl(item?.product?.image)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-black px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                      x{item.quantity}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{item.product?.name}</p>
                  </div>
                </div>
                <p className="font-display font-bold text-on-background shrink-0 pl-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-3xl space-y-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-1">
                  Delivery Address
                </p>
                <p className="font-medium text-on-background">
                  {order.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-1">
                  Payment Method
                </p>
                <p className="font-medium text-on-background">
                  {order.payment_method}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/20 space-y-3">
            {order.payment_method === "cash" && (
              <>
                <div className="flex justify-between text-on-surface-variant font-medium">
                  <span>Subtotal</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-medium">Taxes (5%)</span>
                  <span className="font-bold text-on-background">
                    {/* ${toFixed(2)} */}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between text-on-surface-variant font-medium">
              <span>Delivery Fee</span>
              {/* <span>${deliveryFee.toFixed(2)}</span> */}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-dashed border-outline-variant/20 mt-2">
              <span className="font-display font-extrabold text-xl">
                Total Paid
              </span>
              <span className="font-display font-extrabold text-2xl text-primary">
                {order.payment_method === "cash" ? (
                  <span>${order.total_amount.toFixed(2)}</span>
                ) : (
                  <span>$5</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex pt-4">
            <button className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98] transition-all cursor-pointer">
              Get Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-6 mt-18 lg:w-2/3 mx-auto">
        <Link
          to="/orders"
          className="flex-1 w-full  py-4 px-6 rounded-2xl font-bold bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_8px_20px_-6px_rgba(161,57,0,0.5)] text-center cursor-pointer active:scale-95"
        >
          View Order History
        </Link>

        <Link
          to="/restaurants"
          className="flex-1 w-full py-4 px-6 rounded-2xl font-bold bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 text-center cursor-pointer shadow-sm active:scale-95"
        >
          Continue Browsing
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccess;

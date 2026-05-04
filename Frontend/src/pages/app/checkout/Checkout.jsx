import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Truck,
  CreditCard,
  Wallet,
  Banknote,
  Loader2,
  MapPin,
  User,
  Phone,
  Building2,
  Hash,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Receipt,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { InputField, PaymentCard } from "../../../components/index";
import { clearCart } from "../../../redux/slices/cartSlice";
import { orderService } from "../../../services/orderService";

const Checkout = () => {
  // 1. Hook into Redux & Context
  const { totalAmount, cartItems } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    zipCode: "",
  });

  // Cart Math
  const taxes = totalAmount * 0.05;
  const grandTotal = totalAmount + taxes;

  // Protect the route: If cart is empty, send them back to cart
  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const { fullName, phone, address, city, zipCode } = formData;
    if (!fullName || !phone || !address) return;

    const restaurantId = cartItems[0]?.restaurant_id;
    if (!restaurantId) return;

    setIsProcessing(true);

    try {
      const orderPayload = {
        restaurant_id: restaurantId,
        address: `${address} ${city} ${zipCode}`,
        phone: phone,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        payment_method: paymentMethod,
      };

      const response = await orderService.placeOrder(orderPayload);

      // Success — clear the cart and navigate
      navigate(`/order-success/${response.order_id}`);
      setTimeout(() => {
        dispatch(clearCart());
      }, 1000);
      toast.success(response.message);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 font-body selection:bg-primary/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-background font-headline">
              Secure Checkout
            </h1>
            <ShieldCheck className="w-8 h-8 text-primary mt-1 hidden md:block" />
          </div>
          <p className="text-on-surface-variant text-lg mt-2 font-medium">
            Almost there! Please securely provide your details below.
          </p>
        </header>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Contact & Delivery Card */}
            <div className="bg-surface-container-lowest rounded-4xl p-6 md:p-10 shadow-sm border border-outline-variant/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-8 relative">
                <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-inner">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-headline text-on-background">
                    Delivery Details
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Where should we send your feast?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 relative">
                <InputField
                  icon={User}
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  type="text"
                  required
                />
                <InputField
                  icon={Phone}
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  required
                />
                <div className="md:col-span-2">
                  <InputField
                    icon={MapPin}
                    label="Delivery Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Name, Apt Number"
                    type="text"
                    required
                  />
                </div>
                <InputField
                  icon={Building2}
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  type="text"
                />
                <InputField
                  icon={Hash}
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  type="text"
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-surface-container-lowest rounded-4xl p-6 md:p-10 shadow-sm border border-outline-variant/15">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-inner">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-headline text-on-background">
                    Payment Method
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    All transactions are secure and encrypted.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <PaymentCard
                  icon={CreditCard}
                  title="Credit Card"
                  desc="Visa, Mastercard"
                  selected={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                />
                <PaymentCard
                  icon={Wallet}
                  title="PayPal"
                  desc="Fast & Secure"
                  selected={paymentMethod === "paypal"}
                  onClick={() => setPaymentMethod("paypal")}
                />
                <PaymentCard
                  icon={Banknote}
                  title="Cash"
                  desc="Pay on delivery"
                  selected={paymentMethod === "cash"}
                  onClick={() => setPaymentMethod("cash")}
                />
              </div>

              {/* Seamless specific fields could appear here based on selected method */}
              {paymentMethod === "card" && (
                <div className="mt-8 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-center text-on-surface-variant text-sm font-medium flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Card entry form will be securely rendered here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-surface-container-lowest rounded-4xl p-6 md:p-8 shadow-xl shadow-on-background/5 border border-outline-variant/15 relative overflow-hidden">

                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black font-headline text-on-background flex items-center gap-2">
                    <Receipt className="w-6 h-6 text-primary" />
                    Your Order
                  </h3>
                  <span className="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-full">
                    {cartItems.length} items
                  </span>
                </div>

                {/* Scrolable Order List */}
                <div className="max-h-80 overflow-y-auto pr-3 -mr-3 space-y-4 mb-8 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center group"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high border border-outline-variant/10 shadow-sm relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-black px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-on-background truncate font-headline">
                          {item.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-on-background font-headline">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-4 mb-8 pt-6 border-t-2 border-dashed border-outline-variant/30">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-on-background">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="font-medium">Taxes (5%)</span>
                    <span className="font-bold text-on-background">
                      ${taxes.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-6 mt-4 border-t-2 border-outline-variant/20 flex justify-between items-end">
                    <div>
                      <span className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Total Due
                      </span>
                      <span className="text-3xl font-black font-headline text-primary leading-none">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* The Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`cursor-pointer relative w-full py-5 rounded-2xl text-on-primary font-black font-headline text-lg flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden group ${
                    isProcessing
                      ? "bg-outline-variant text-on-surface-variant cursor-not-allowed"
                      : "bg-primary shadow-[0_8px_20px_-6px_rgba(161,57,0,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(161,57,0,0.6)] active:scale-[0.98] hover:bg-primary-container hover:text-on-primary-container"
                  }`}
                >
                  {/* Button Effect */}
                  {!isProcessing && (
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  )}

                  <span className="relative flex items-center gap-2">
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm & Pay ${grandTotal.toFixed(2)}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-xs text-on-surface-variant mt-6 font-medium">
                  By placing your order, you agree to our{" "}
                  <Link
                    to="#"
                    className="text-primary underline underline-offset-2"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="text-primary underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

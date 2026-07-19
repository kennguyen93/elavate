import React, { useState } from "react";
import { X, Trash2, ShieldCheck, CreditCard, ChevronRight, CheckCircle, Package, ArrowRight, Gift } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Checkout simulation states
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "billing" | "processing" | "success">("idle");
  const [billingForm, setBillingForm] = useState({ name: "", email: "", address: "", zip: "" });
  const [procStatus, setProcStatus] = useState("Securing 256-bit connection...");

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.pkg.totalPrice * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.95;
  const grandTotal = subtotal - discountAmount + shipping;

  // Free shipping / free gift threshold calculations
  const freeShippingThreshold = 50;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "GLOW10") {
      setAppliedDiscount(0.1);
      setCouponSuccess("10% Special Discount Applied! 🎉");
      setCouponError("");
    } else if (couponCode.trim()) {
      setCouponError("Invalid coupon code. Try 'GLOW10'.");
      setCouponSuccess("");
    }
  };

  const startCheckout = () => {
    setCheckoutStep("billing");
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("processing");
    
    // Simulate API calls
    setTimeout(() => {
      setProcStatus("Creating unique tracking barcode...");
      setTimeout(() => {
        setProcStatus("Allocating premium shaker & recipe books...");
        setTimeout(() => {
          setCheckoutStep("success");
          onClearCart();
        }, 1200);
      }, 1000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Cart Slider */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛍️</span>
                <h3 className="font-display text-lg font-bold text-slate-900 uppercase tracking-tight">
                  Your Cart {items.length > 0 && `(${items.reduce((acc, i) => acc + i.quantity, 0)})`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {checkoutStep === "idle" && (
                <>
                  {/* Empty state check */}
                  {items.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center">
                      <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                        🥤
                      </div>
                      <h4 className="font-display font-bold text-slate-800 text-lg">Your Cart is Empty</h4>
                      <p className="text-slate-400 text-xs max-w-xs mt-1.5 leading-relaxed">
                        Start your wellness transformation today! Browse our premium multi-collagen flavors and find your match.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 bg-[#007bc4] hover:bg-[#006bb0] text-white text-xs font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider cursor-pointer shadow"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Free Shipping Progress bar */}
                      <div className="bg-sky-50 p-4 rounded-xl border border-sky-100/50">
                        {missingForFreeShipping > 0 ? (
                          <div>
                            <p className="text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                              <Gift className="w-4 h-4 text-sky-600 animate-pulse" />
                              Add <span className="text-sky-600 font-extrabold">${missingForFreeShipping.toFixed(2)}</span> more to unlock <span className="font-extrabold uppercase">Free Delivery!</span>
                            </p>
                            <div className="w-full bg-sky-200/50 h-2 rounded-full mt-2.5 overflow-hidden">
                              <div className="bg-[#007bc4] h-full transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                            Congratulations! Your order qualifies for FREE TRACKED SHIPPING! 📦
                          </p>
                        )}
                      </div>

                      {/* Cart Items List */}
                      <div className="space-y-4">
                        {items.map((item) => {
                          const itemTotal = item.pkg.totalPrice * item.quantity;
                          return (
                            <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                                {item.flavor.id === "chocolate" ? (
                                  <img src={item.flavor.image} alt={item.flavor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className={`w-full h-full bg-gradient-to-br ${item.flavor.color}`} />
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start justify-between gap-1">
                                    <h5 className="font-display font-bold text-slate-900 text-sm truncate uppercase leading-tight">
                                      {item.flavor.name}
                                    </h5>
                                    <button
                                      onClick={() => onRemoveItem(item.id)}
                                      className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <p className="text-slate-500 text-[11px] font-medium mt-0.5 uppercase">
                                    {item.pkg.pouches} {item.pkg.pouches === 1 ? "Pouch" : "Pouches"} ({item.pkg.supplyDays} Days)
                                  </p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                  {/* Qty changer */}
                                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                    <button
                                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                      className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 font-bold text-xs"
                                    >
                                      -
                                    </button>
                                    <span className="px-2.5 text-xs text-slate-800 font-bold">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                      className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 font-bold text-xs"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <span className="font-extrabold text-slate-900 text-sm">
                                    ${itemTotal.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Coupon Box */}
                      <div className="border-t border-slate-100 pt-5 space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                          PROMO CODE OR COUPON
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. GLOW10"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500 uppercase"
                          />
                          <button
                            onClick={applyCoupon}
                            className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 rounded-lg cursor-pointer transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && <p className="text-xs text-rose-600 font-semibold">{couponError}</p>}
                        {couponSuccess && <p className="text-xs text-emerald-600 font-semibold">{couponSuccess}</p>}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Billing Form Step */}
              {checkoutStep === "billing" && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="bg-sky-50 text-sky-600 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                      Instant Dispatch Verification
                    </span>
                    <h4 className="font-display text-xl font-bold text-slate-900 mt-2">Delivery Details</h4>
                    <p className="text-slate-400 text-xs">Specify where your premium superblend should be shipped.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Full Recipient Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Michelle Jenkins"
                        value={billingForm.name}
                        onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="michelle@example.com"
                        value={billingForm.email}
                        onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="14 Baker Street, London"
                        value={billingForm.address}
                        onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                        Postcode / ZIP
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="NW1 6XE"
                        value={billingForm.zip}
                        onChange={(e) => setBillingForm({ ...billingForm, zip: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* Payment placeholder details */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 mt-4 space-y-1.5">
                    <p className="text-slate-800 text-xs font-bold flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-[#007bc4]" /> Checkout Secured by Stripe
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Payment is processed securely. All order values include free parcel insurance coverage.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("idle")}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-lg uppercase tracking-wide cursor-pointer text-center"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#00b020] hover:bg-[#009b1c] text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wide cursor-pointer text-center shadow-md flex items-center justify-center gap-1"
                    >
                      Process Order <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Loader Step */}
              {checkoutStep === "processing" && (
                <div className="text-center py-16 flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#007bc4] border-t-transparent animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 text-lg">Authorizing Order...</h4>
                    <p className="text-slate-400 text-xs mt-1.5 font-mono max-w-xs mx-auto">
                      {procStatus}
                    </p>
                  </div>
                </div>
              )}

              {/* Success Result Step */}
              {checkoutStep === "success" && (
                <div className="text-center py-8 flex flex-col items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h4 className="font-display font-black text-[#0a2540] text-2xl uppercase tracking-tight">
                    GLOW PACK DISPATCHED!
                  </h4>
                  <p className="text-slate-500 text-xs max-w-xs mt-2 leading-relaxed">
                    Thank you, <span className="font-bold text-slate-800">{billingForm.name || "Glow Getter"}</span>! Your customized collagen formulation has been logged into our London facility.
                  </p>

                  {/* Parcel Details Card */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full mt-6 text-left text-xs text-slate-600 space-y-2">
                    <div className="flex justify-between border-b border-slate-200 pb-2 font-semibold">
                      <span className="text-slate-800 uppercase tracking-wider text-[10px]">Dispatch Reference</span>
                      <span className="font-mono text-[#007bc4]">#EL-78447-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>
                    <p>• <span className="font-bold text-slate-800">Carrier:</span> Royal Mail VIP 48HR Tracked</p>
                    <p>• <span className="font-bold text-slate-800">Estimated Arrival:</span> 2 Days from Today</p>
                    <p>• <span className="font-bold text-slate-800">Gifts Included:</span> Shaker bottle & froth whisk</p>
                    <p>• <span className="font-bold text-slate-800">Shipping Email:</span> {billingForm.email || "support@elavate.com"}</p>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutStep("idle");
                      onClose();
                    }}
                    className="mt-8 bg-slate-950 hover:bg-black text-white text-xs font-bold py-3 px-8 rounded-lg uppercase tracking-wider cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" /> Return to Website
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (Only visible when idle and cart is not empty) */}
            {checkoutStep === "idle" && items.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-emerald-600 font-extrabold uppercase" : "font-bold text-slate-900"}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={startCheckout}
                    className="w-full bg-[#007bc4] hover:bg-[#006bb0] text-white text-sm font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    SSL Secure encrypted connection
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

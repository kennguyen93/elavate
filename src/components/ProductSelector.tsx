import { useState } from "react";
import { Check, Flame, Trophy, Sparkles, Gift, Plus, ShoppingCart } from "lucide-react";
import { FLAVORS, PACKAGE_OPTIONS } from "../data";
import { Flavor, PackageOption } from "../types";
import { motion } from "motion/react";

interface ProductSelectorProps {
  onAddToCart: (flavor: Flavor, pkg: PackageOption, addOns: { frother: boolean; shaker: boolean }) => void;
}

export default function ProductSelector({ onAddToCart }: ProductSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(FLAVORS[0]);
  const [selectedPkg, setSelectedPkg] = useState<PackageOption>(PACKAGE_OPTIONS[1]); // Default to 2 pouches (Most Popular)
  const [addOns, setAddOns] = useState({ frother: false, shaker: false });

  const handleAddToCart = () => {
    onAddToCart(selectedFlavor, selectedPkg, addOns);
    // Reset add-ons after adding
    setAddOns({ frother: false, shaker: false });
  };

  // Determine freebies status
  const isFreebieIncluded = selectedPkg.pouches === 3;

  return (
    <section id="product-selector" className="py-12 px-4 sm:px-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-2">
            Order Superblend
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            CHOOSE YOUR FLAVOUR & SUPPLY
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            Select your premium, sugar-free flavor and a value bundle pack. Change flavor combinations anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Variant & Bundle Customization Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Choose Your Taste */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">1</span>
                <h3 className="font-display text-lg font-bold text-slate-800 uppercase tracking-tight">
                  CHOOSE YOUR TASTE
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavor.id === flavor.id;
                  return (
                    <motion.button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-start gap-4 p-4 rounded-xl text-left border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? "border-sky-500 bg-sky-50/40 ring-4 ring-sky-100/50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {/* Flavor Image or Color Indicator Circle */}
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                        {flavor.id === "chocolate" ? (
                          <img
                            src={flavor.image}
                            alt={flavor.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${flavor.color}`} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-display font-bold text-slate-900 text-sm sm:text-base truncate">
                          {flavor.name}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5 line-clamp-2 leading-tight">
                          {flavor.description}
                        </p>
                      </div>

                      {/* Tick or Circle */}
                      <div className="absolute top-4 right-4 flex-shrink-0">
                        {isSelected ? (
                          <span className="bg-sky-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="border border-slate-300 w-5 h-5 rounded-full block" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Your Supply Bundle */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">2</span>
                <h3 className="font-display text-lg font-bold text-slate-800 uppercase tracking-tight">
                  SELECT YOUR SUPPLY
                </h3>
              </div>

              <div className="space-y-3.5">
                {PACKAGE_OPTIONS.map((pkg) => {
                  const isSelected = selectedPkg.id === pkg.id;
                  const discountAmount = pkg.originalPrice ? Math.round(pkg.originalPrice - pkg.totalPrice) : 0;

                  return (
                    <motion.button
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? "border-[#007bc4] bg-sky-50/25 ring-4 ring-sky-50/50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {/* Bundle Badges */}
                      {pkg.badge && (
                        <span className={`absolute -top-2.5 right-4 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm text-white ${
                          pkg.pouches === 3 
                            ? "bg-[#d32f2f] animate-pulse" 
                            : pkg.pouches === 2 
                            ? "bg-[#007bc4]" 
                            : "bg-slate-700"
                        }`}>
                          {pkg.badge}
                        </span>
                      )}

                      {/* Left: Bundle details */}
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isSelected ? (
                            <span className="bg-[#007bc4] text-white w-5 h-5 flex items-center justify-center rounded-full">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="border border-slate-300 w-5 h-5 rounded-full block" />
                          )}
                        </div>
                        <div>
                          <p className="font-display font-extrabold text-slate-900 text-base sm:text-lg uppercase">
                            {pkg.pouches} {pkg.pouches === 1 ? "Pouch" : "Pouches"} ({pkg.supplyDays} Day Supply)
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {pkg.originalPrice && pkg.originalPrice > pkg.totalPrice && (
                              <span className="text-slate-400 line-through text-xs font-semibold">
                                ${pkg.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-slate-900 font-extrabold text-sm sm:text-base">
                              ${pkg.totalPrice.toFixed(2)}
                            </span>
                            {pkg.discountPercent && (
                              <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded">
                                SAVE {pkg.discountPercent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Price Breakdown Per Pouch */}
                      <div className="mt-3 sm:mt-0 sm:text-right border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Just</p>
                        <p className="text-xl font-black text-[#007bc4] leading-tight">
                          ${pkg.pricePerPouch.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">Per month supply</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 3. Special Add-ons (Free with 3 Pouches!) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">3</span>
                  <h3 className="font-display text-lg font-bold text-slate-800 uppercase tracking-tight">
                    ADD COMPLEMENTARY GEAR
                  </h3>
                </div>
                {isFreebieIncluded && (
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" /> FREE GIFTS APPLIED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Add-on 1: Frother */}
                <div className={`p-4 rounded-xl border-2 flex flex-col justify-between ${
                  isFreebieIncluded 
                    ? "border-emerald-200 bg-emerald-50/10" 
                    : addOns.frother 
                    ? "border-sky-500 bg-sky-50/10" 
                    : "border-slate-200 hover:border-slate-300"
                }`}>
                  <div>
                    <div className="flex items-start justify-between">
                      <p className="font-display font-bold text-slate-900 text-sm">
                        Velvety Milk Frother & Whisk
                      </p>
                      {isFreebieIncluded ? (
                        <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                          FREE
                        </span>
                      ) : (
                        <span className="text-slate-800 font-bold text-sm">$9.99</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-1 leading-normal">
                      Ensures completely smooth, clump-free gourmet blending in seconds.
                    </p>
                  </div>
                  {!isFreebieIncluded && (
                    <button
                      onClick={() => setAddOns(prev => ({ ...prev, frother: !prev.frother }))}
                      className={`mt-4 w-full text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border ${
                        addOns.frother 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {addOns.frother ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {addOns.frother ? "ADDED TO ORDER" : "ADD TO ORDER"}
                    </button>
                  )}
                </div>

                {/* Add-on 2: Shaker */}
                <div className={`p-4 rounded-xl border-2 flex flex-col justify-between ${
                  isFreebieIncluded 
                    ? "border-emerald-200 bg-emerald-50/10" 
                    : addOns.shaker 
                    ? "border-sky-500 bg-sky-50/10" 
                    : "border-slate-200 hover:border-slate-300"
                }`}>
                  <div>
                    <div className="flex items-start justify-between">
                      <p className="font-display font-bold text-slate-900 text-sm">
                        Double-Wall Insulation Shaker
                      </p>
                      {isFreebieIncluded ? (
                        <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                          FREE
                        </span>
                      ) : (
                        <span className="text-slate-800 font-bold text-sm">$14.99</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-1 leading-normal">
                      Maintains icy cold shakes or piping hot lattes for up to 12 hours.
                    </p>
                  </div>
                  {!isFreebieIncluded && (
                    <button
                      onClick={() => setAddOns(prev => ({ ...prev, shaker: !prev.shaker }))}
                      className={`mt-4 w-full text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border ${
                        addOns.shaker 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {addOns.shaker ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {addOns.shaker ? "ADDED TO ORDER" : "ADD TO ORDER"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Summary Box (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#0a2540] text-white p-6 rounded-2xl shadow-xl">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide border-b border-white/10 pb-3 mb-4">
                YOUR TRANSFORMATION
              </h3>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{selectedFlavor.name}</p>
                    <p className="text-xs text-sky-200 mt-0.5">
                      {selectedPkg.pouches} {selectedPkg.pouches === 1 ? "Pouch" : "Pouches"} ({selectedPkg.supplyDays} Days)
                    </p>
                  </div>
                  <span className="font-extrabold">${selectedPkg.totalPrice.toFixed(2)}</span>
                </div>

                {/* Free Gifts included with Package 3 */}
                {selectedPkg.freebies && selectedPkg.freebies.length > 0 && (
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 space-y-1.5">
                    <p className="text-xs text-emerald-400 font-extrabold flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" /> Included Gifts (100% Free):
                    </p>
                    {selectedPkg.freebies.map((gift, i) => (
                      <p key={i} className="text-slate-300 text-[11px] flex items-center gap-1">
                        • {gift}
                      </p>
                    ))}
                  </div>
                )}

                {/* Additional Add-ons */}
                {!isFreebieIncluded && (addOns.frother || addOns.shaker) && (
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    {addOns.frother && (
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Milk Frother & Whisk</span>
                        <span className="font-semibold text-white">$9.99</span>
                      </div>
                    )}
                    {addOns.shaker && (
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Insulated Shaker Bottle</span>
                        <span className="font-semibold text-white">$14.99</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping info */}
                <div className="border-t border-white/10 pt-4 flex justify-between text-xs text-slate-300">
                  <span>Tracked Dispatch</span>
                  <span className="text-emerald-400 font-bold uppercase">
                    {selectedPkg.pouches > 1 ? "FREE SHIPPING" : "$4.95"}
                  </span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-slate-300">Grand Total:</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    $
                    {(
                      selectedPkg.totalPrice +
                      (selectedPkg.pouches > 1 ? 0 : 4.95) +
                      (!isFreebieIncluded && addOns.frother ? 9.99 : 0) +
                      (!isFreebieIncluded && addOns.shaker ? 14.99 : 0)
                    ).toFixed(2)}
                  </span>
                </div>
                {selectedPkg.originalPrice && (
                  <p className="text-right text-xs text-emerald-400 font-bold">
                    You save ${ (selectedPkg.originalPrice - selectedPkg.totalPrice + (selectedPkg.pouches > 1 ? 4.95 : 0)).toFixed(2) } today!
                  </p>
                )}
              </div>

              {/* Big CTA to Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-[#00b020] hover:bg-[#009b1c] text-white text-base font-extrabold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <ShoppingCart className="w-5 h-5" />
                SECURE INSTANT ORDER
              </motion.button>

              {/* Trust/Guarantee badges */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-3">
                <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-300 font-semibold">
                  <div className="flex items-center gap-1 justify-center">
                    <span>🔒</span> 256-Bit SSL Checkout
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <span>🇬🇧</span> Made in the UK
                  </div>
                  <div className="flex items-center gap-1 justify-center col-span-2">
                    <span>🛡️</span> 60-Day Ironclad Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

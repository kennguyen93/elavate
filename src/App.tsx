import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSelector from "./components/ProductSelector";
import CartDrawer from "./components/CartDrawer";
import Ingredients from "./components/Ingredients";
import Quiz from "./components/Quiz";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import { Flavor, PackageOption, CartItem } from "./types";
import { FLAVORS } from "./data";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  // Quick notification banner state
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // 1. Add Custom order packet + add-ons to e-commerce cart
  const handleAddToCart = (
    flavor: Flavor,
    pkg: PackageOption,
    addOns: { frother: boolean; shaker: boolean }
  ) => {
    // Generate a unique ID combining flavor and package config
    const itemId = `${flavor.id}_${pkg.id}`;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);
      let updated = [...prevItems];

      if (existingItem) {
        updated = updated.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated.push({
          id: itemId,
          flavor,
          pkg,
          quantity: 1
        });
      }

      // Add-ons checking (only if not package 3, which includes them automatically for free)
      if (pkg.pouches !== 3) {
        if (addOns.frother) {
          const frotherId = "addon_frother";
          const hasFrother = updated.find((item) => item.id === frotherId);
          if (hasFrother) {
            updated = updated.map((item) =>
              item.id === frotherId ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            updated.push({
              id: frotherId,
              flavor: {
                id: "frother",
                name: "Velvety Milk Frother & Whisk",
                color: "from-slate-400 to-slate-600",
                bgHex: "#475569",
                image: "https://picsum.photos/seed/whisk/300/300",
                description: "Handheld premium blending whisk."
              },
              pkg: {
                id: "addon_frother_pkg",
                pouches: 0,
                supplyDays: 0,
                pricePerPouch: 9.99,
                totalPrice: 9.99
              },
              quantity: 1
            });
          }
        }

        if (addOns.shaker) {
          const shakerId = "addon_shaker";
          const hasShaker = updated.find((item) => item.id === shakerId);
          if (hasShaker) {
            updated = updated.map((item) =>
              item.id === shakerId ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            updated.push({
              id: shakerId,
              flavor: {
                id: "shaker",
                name: "Insulated Double-Wall Shaker Bottle",
                color: "from-slate-700 to-slate-900",
                bgHex: "#1e293b",
                image: "https://picsum.photos/seed/shaker/300/300",
                description: "Keeps collagen drinks ice cold or hot."
              },
              pkg: {
                id: "addon_shaker_pkg",
                pouches: 0,
                supplyDays: 0,
                pricePerPouch: 14.99,
                totalPrice: 14.99
              },
              quantity: 1
            });
          }
        }
      }

      return updated;
    });

    showToast(`🛒 Added ${pkg.pouches > 0 ? `${pkg.pouches}x` : ""} ${flavor.name} Pack to Cart!`);
    setIsCartOpen(true);
  };

  // 2. Adjust Cart Quantities
  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // 3. Remove item completely
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // 4. Clear cart after successful billing checkout
  const handleClearCart = () => {
    setCartItems([]);
  };

  // 5. Apply Quiz recommendations
  const handleApplyRecommendation = (recommendedFlavor: Flavor) => {
    showToast(`✨ Diagnostic Match Applied: ${recommendedFlavor.name}! Standard pricing set to coupon mode.`);
    const el = document.getElementById("product-selector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSelector = () => {
    const el = document.getElementById("product-selector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Reference the main generated product image for Chocolate flavour
  const mainHeroImage = "/src/assets/images/elavate_chocolate_collagen_1784471078378.jpg";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-800">
      
      {/* Dynamic Toast banner feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a2540] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border border-sky-400/20 max-w-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Elements Grid */}
      <Header
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <Hero
        imageUrl={mainHeroImage}
        onStartTransformation={handleScrollToSelector}
      />

      <ProductSelector onAddToCart={handleAddToCart} />

      <Ingredients />

      {/* Trust & Promotion Badge Section */}
      <section className="bg-[#0a2540] text-white py-12 px-4 sm:px-8 text-center relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-sky-400 text-xs font-black uppercase tracking-widest bg-white/5 px-3.5 py-1 rounded-full">
            Elavate Lifetime Promise
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
            NOT SURE? WE COVER ALL THE RISK WITH A 60-DAY TRIAL
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Take one scoop of Elavate Multi Collagen Superblend daily for 60 days. If you do not witness thicker hair, firmer glowing skin, and absolute joint comfort, we refund every single penny. No questions asked.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-[#007bc4] hover:bg-[#006bb0] text-white text-xs font-bold py-3 px-8 rounded-lg uppercase tracking-wider cursor-pointer shadow-md"
            >
              Take the Beauty & Wellness Quiz
            </button>
          </div>
        </div>
      </section>

      <Reviews />

      <FAQ />

      <Footer />

      {/* Slidout Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Beauty & Wellness Quiz Overlays */}
      <Quiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onApplyRecommendation={handleApplyRecommendation}
      />
    </div>
  );
}

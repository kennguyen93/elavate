import React, { useState, useEffect } from "react";
import { Menu, User, ShoppingCart, X, Lock, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onOpenQuiz: () => void;
}

export default function Header({ cartCount, onCartToggle, onOpenQuiz }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Countdown timer: 02 hours, 15 minutes, 16 seconds starting, but we can make it tick dynamically down!
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 58 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep it looking fresh
          return { hours: 2, minutes: 15, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setIsLoggedIn(true);
      setTimeout(() => setIsAccountOpen(false), 1500);
    }
  };

  return (
    <header className="w-full z-40 relative">
      {/* 1. Red Announcement Bar */}
      <div className="bg-[#d32f2f] text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <span className="animate-pulse">🔥</span>
        <span>BEST PRICE EVER + FREE GIFTS TODAY ONLY!</span>
        <span>🎁</span>
      </div>

      {/* 2. Light Blue Announcement Bar with Countdown */}
      <div className="bg-[#4eb3e5] text-white text-center py-1.5 px-4 text-xs sm:text-sm font-bold flex flex-wrap items-center justify-center gap-3 shadow-inner">
        <span className="uppercase tracking-wider">SUMMER SPECIAL SALE</span>
        <span className="bg-[#d32f2f] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-sm">
          UP TO 50% OFF
        </span>
        
        {/* Countdown */}
        <div className="flex items-center gap-1.5 ml-1">
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold leading-none border border-slate-200">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[8px] text-sky-100 font-medium leading-none mt-0.5">HRS</span>
          </div>
          <span className="text-white font-bold mb-2">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold leading-none border border-slate-200">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[8px] text-sky-100 font-medium leading-none mt-0.5">MIN</span>
          </div>
          <span className="text-white font-bold mb-2">:</span>
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold leading-none border border-slate-200">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[8px] text-sky-100 font-medium leading-none mt-0.5">SEC</span>
          </div>
        </div>
      </div>

      {/* 3. Main Navbar */}
      <div className="bg-white border-b border-slate-100 py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 shadow-sm">
        {/* Left: Menu & Account Actions */}
        <div className="flex items-center gap-5">
          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-slate-700 hover:text-black transition-colors focus:outline-none group cursor-pointer"
            id="nav-menu-btn"
          >
            <Menu className="w-5 h-5 stroke-[2] group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Menu</span>
          </button>

          {/* Account Modal Toggle */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="flex flex-col items-center gap-1 text-slate-700 hover:text-black transition-colors focus:outline-none group cursor-pointer"
            id="nav-account-btn"
          >
            <User className="w-5 h-5 stroke-[2] group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {isLoggedIn ? "Glow Profile" : "Account"}
            </span>
          </button>
        </div>

        {/* Center: Branding Logo */}
        <div className="flex items-center justify-center flex-1 md:absolute md:left-1/2 md:-translate-x-1/2">
          <a
            href="#"
            className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-baseline hover:opacity-95 transition-opacity"
          >
            elavate<span className="text-sm font-semibold text-sky-600 align-super">™</span>
          </a>
        </div>

        {/* Right: Cart Button */}
        <div>
          <button
            onClick={onCartToggle}
            className="flex flex-col items-center gap-1 text-slate-700 hover:text-black transition-colors relative group focus:outline-none cursor-pointer"
            id="nav-cart-btn"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 stroke-[2] group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#d32f2f] text-white text-[9px] font-extrabold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
          </button>
        </div>
      </div>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-full max-w-sm bg-white z-50 shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <span className="font-display text-xl font-bold text-slate-900">
                    elavate<span className="text-sky-500">™</span> Wellness
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <nav className="flex flex-col gap-5">
                  <button
                    onClick={() => handleScrollTo("product-selector")}
                    className="text-left font-display text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors py-1 cursor-pointer"
                  >
                    🛒 Shop Collagen Superblend
                  </button>
                  <button
                    onClick={() => handleScrollTo("ingredients")}
                    className="text-left font-display text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors py-1 cursor-pointer"
                  >
                    🧪 Interactive Ingredients
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenQuiz();
                    }}
                    className="text-left font-display text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors py-1 cursor-pointer"
                  >
                    ✨ Beauty & Wellness Quiz
                  </button>
                  <button
                    onClick={() => handleScrollTo("reviews")}
                    className="text-left font-display text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors py-1 cursor-pointer"
                  >
                    ⭐️ Real Results & Reviews
                  </button>
                  <button
                    onClick={() => handleScrollTo("faq")}
                    className="text-left font-display text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors py-1 cursor-pointer"
                  >
                    ❓ Help & FAQs
                  </button>
                </nav>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-400 font-medium">
                  🇬🇧 Formulated and manufactured in the United Kingdom under strict GMP standards.
                </p>
                <p className="text-[10px] text-slate-400 mt-2">
                  © 2026 Elavate Ltd. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Modal */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10"
            >
              <button
                onClick={() => setIsAccountOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              {isLoggedIn ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-slate-900">Welcome Back, Glow Getter!</h3>
                  <p className="text-slate-500 text-sm mt-2">
                    Logged in as <span className="font-semibold text-slate-700">{userEmail}</span>
                  </p>
                  <p className="text-xs text-sky-600 font-bold tracking-wide uppercase mt-4 bg-sky-50 py-1.5 px-3 rounded-full inline-block">
                    VIP Glow Member Status: Active 💎
                  </p>

                  <div className="mt-6 p-4 bg-slate-50 rounded-xl text-left text-xs text-slate-600 space-y-2">
                    <p className="font-semibold text-slate-800">Your Exclusive Member Perks:</p>
                    <p>• 10% cash back on all subscription deliveries</p>
                    <p>• Free shipping & fast priority dispatch tracking</p>
                    <p>• Unlocked digital guidebooks & recipe videos</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserEmail("");
                    }}
                    className="mt-6 text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Logout of my profile
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase inline-block mb-2">
                      Elavate Loyalty Portal
                    </span>
                    <h3 className="font-display text-2xl font-bold text-slate-900">Sign In to Your Account</h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Check your order status, active subscriptions, and loyalty gifts.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. michelle@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your VIP Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-sm text-slate-800"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <input type="checkbox" className="rounded text-sky-500" defaultChecked />
                        Keep me signed in
                      </label>
                      <a href="#" className="text-sky-600 font-semibold hover:underline">
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#007bc4] hover:bg-[#006bb0] text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <Lock className="w-4 h-4" />
                      SECURE ACCESS PROFILE
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">
                      Don't have an account? No worries! One is automatically created when you order above.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

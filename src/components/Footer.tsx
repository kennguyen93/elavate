import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10">
        {/* Brand details */}
        <div className="md:col-span-4 space-y-4">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            elavate<span className="text-sky-500 text-sm align-super">™</span>
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Providing high-dose, clinically tested premium superblends for British women. Free from artificial fillers, binders, and sugar.
          </p>
          <div className="space-y-2 text-slate-400 text-xs font-semibold">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" /> support@elavate.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" /> London, United Kingdom
            </p>
          </div>
        </div>

        {/* Navigation lists */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">Glow Collections</h4>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-sm font-semibold">
              <li><a href="#product-selector" className="hover:text-sky-400 transition-colors">Chocolate Collagen</a></li>
              <li><a href="#product-selector" className="hover:text-sky-400 transition-colors">Berry Collagen</a></li>
              <li><a href="#product-selector" className="hover:text-sky-400 transition-colors">Vanilla Collagen</a></li>
              <li><a href="#product-selector" className="hover:text-sky-400 transition-colors">Unflavoured Collagen</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">Core Science</h4>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-sm font-semibold">
              <li><a href="#ingredients" className="hover:text-sky-400 transition-colors">Key Ingredients</a></li>
              <li><a href="#reviews" className="hover:text-sky-400 transition-colors">12-Week Trials</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">Customer Help</a></li>
              <li><a href="#reviews" className="hover:text-sky-400 transition-colors">Read Reviews</a></li>
            </ul>
          </div>
        </div>

        {/* Interactive Newsletter */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">JOIN THE GLOW LIST</h4>
          <p className="text-slate-400 text-xs leading-normal">
            Subscribe for VIP scientific beauty updates, recipe books, and get <span className="font-bold text-white">10% OFF</span> your first order!
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-sky-950 border border-sky-800 p-4 rounded-xl flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sky-300 text-xs font-extrabold uppercase">Subscription Logged! 🎉</p>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                  Check your inbox for e-books. Use discount code <span className="font-mono text-white font-bold bg-white/10 px-1 rounded">GLOW10</span> on checkout for 10% OFF!
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/15 px-3.5 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="bg-[#007bc4] hover:bg-[#006bb0] text-white p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
          © 2026 Elavate Ltd (UK). Under UK GMP Certified Standards. All statements on this website have not been evaluated by medicinal authorities. Products are not intended to diagnose or treat ailments.
        </p>

        {/* Visual Payment Badge Icons */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold tracking-wider select-none flex-wrap justify-center">
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">VISA</span>
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">MASTERCARD</span>
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">AMEX</span>
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">APPLE PAY</span>
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">GOOGLE PAY</span>
        </div>
      </div>
    </footer>
  );
}

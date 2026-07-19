import { Star, Check } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onStartTransformation: () => void;
  imageUrl: string;
}

export default function Hero({ onStartTransformation, imageUrl }: HeroProps) {
  return (
    <section className="bg-[#e0f2fe] py-8 px-4 sm:px-8 md:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative overflow-hidden">
      {/* Abstract background blobs for premium feel */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-20 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100 opacity-40 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

      {/* Left: Product Collage with interactive hovering hotspots */}
      <div className="w-full lg:w-[52%] flex justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-full md:max-w-2xl lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-white/40 p-2 sm:p-4 backdrop-blur-sm"
        >
          {/* Main Studio Quality Product Photo */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
              src={imageUrl}
              alt="elavate MULTI COLLAGEN SUPERBLEND Chocolate Flavour"
              className="w-full h-full object-cover select-none pointer-events-none hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Interactive Badges Overlay inside Hero image container card */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/80 p-3 rounded-lg text-center backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Type I, II, III, V, X</span>
              <span className="text-[9px] text-sky-600 font-medium">Multi-Source</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">GMP Certified</span>
              <span className="text-[9px] text-sky-600 font-medium">UK Standards</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Zero Sugar</span>
              <span className="text-[9px] text-sky-600 font-medium">Keto Friendly</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">10,000mg</span>
              <span className="text-[9px] text-sky-600 font-medium">Per Daily Scoop</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Marketing and Copywriting section */}
      <div className="w-full lg:w-[48%] flex flex-col items-start text-left z-10">
        {/* Star Rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1.5 mb-4 bg-white/70 px-3 py-1.5 rounded-full backdrop-blur-sm"
        >
          <div className="flex items-center gap-0.5 bg-emerald-600 px-1.5 py-1 rounded">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-white text-white" />
            ))}
          </div>
          <span className="font-display text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
            Rated 4.8 By British Women
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-[1.1] mb-5 uppercase"
        >
          CLINICALLY STUDIED COLLAGEN SUPERBLEND FOR WOMEN
        </motion.h1>

        {/* Prominent High-Contrast Block Banner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#007bc4] text-white font-display font-black text-sm sm:text-base md:text-lg px-6 py-2.5 rounded-sm tracking-wider uppercase mb-6 inline-block shadow-md select-none"
        >
          WHILE OTHERS TALK, WE TESTED...
        </motion.div>

        {/* Clinical Study Report Intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg text-slate-800 leading-relaxed mb-6 font-medium"
        >
          In a 12 week study, <span className="font-extrabold text-slate-900 underline decoration-sky-400 decoration-2">women taking Elavate</span> reported:
        </motion.p>

        {/* Checklist points with light-blue circles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3.5 mb-8 w-full"
        >
          {[
            "87% saw firmer & more youthful skin",
            "82% noticed improved joint comfort",
            "93% said they would continue using Elavate",
          ].map((text, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <span className="flex-shrink-0 bg-[#4eb3e5] text-white w-6 h-6 flex items-center justify-center rounded-full mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </span>
              <p className="text-slate-800 text-sm sm:text-base font-semibold group-hover:text-black transition-colors">
                {text}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Green Glowing CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartTransformation}
          className="bg-[#00b020] hover:bg-[#009b1c] text-white font-display font-extrabold text-base sm:text-lg md:text-xl py-4 px-8 rounded-lg shadow-[0_4px_20px_rgba(0,176,32,0.35)] hover:shadow-[0_6px_24px_rgba(0,176,32,0.45)] transition-all cursor-pointer glow-effect text-center uppercase tracking-wider w-full sm:w-auto"
          id="hero-cta-btn"
        >
          START MY TRANSFORMATION
        </motion.button>
      </div>
    </section>
  );
}

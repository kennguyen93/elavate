import { useState } from "react";
import { Check, FlaskConical, HelpCircle, Sparkles } from "lucide-react";
import { INGREDIENTS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function Ingredients() {
  const [activeTab, setActiveTab] = useState(INGREDIENTS[0].id);

  const activeData = INGREDIENTS.find((ing) => ing.id === activeTab) || INGREDIENTS[0];

  // Compare standard competitor dosages with Elavate
  const dosageComparisons: Record<string, { elavate: number; competitor: number; unit: string; label: string }> = {
    collagen: { elavate: 10000, competitor: 2500, unit: "mg", label: "Multi-Source Collagen Peptides" },
    hyaluronic: { elavate: 120, competitor: 20, unit: "mg", label: "Hyaluronic Acid Purity" },
    "vitamin-c": { elavate: 150, competitor: 40, unit: "mg", label: "Liposomal Co-Factor C" },
    biotin: { elavate: 5000, competitor: 500, unit: "mcg", label: "High-Dose Biotin (Vitamin B7)" }
  };

  const comp = dosageComparisons[activeData.id];

  return (
    <section id="ingredients" className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-sky-100 text-sky-700 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-2">
            Formulation & Science
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            WHAT MAKES ELAVATE CLINICALLY SUPERIOR
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            No proprietary secrets. No low-dose fillers. Just high-dose active compounds working in molecular synergy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Tab selection */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {INGREDIENTS.map((ing) => {
              const isActive = ing.id === activeTab;
              return (
                <button
                  key={ing.id}
                  onClick={() => setActiveTab(ing.id)}
                  className={`w-full p-4.5 rounded-xl border-2 text-left transition-all cursor-pointer relative flex items-center justify-between ${
                    isActive
                      ? "border-[#007bc4] bg-sky-50/20 ring-4 ring-sky-50"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <p className="font-display font-extrabold text-slate-900 text-base">
                      {ing.name}
                    </p>
                    <p className="text-sky-600 font-mono text-xs font-bold mt-0.5">
                      Clinical Dose: {ing.amount}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[#007bc4] text-white" : "bg-slate-100 text-slate-400"}`}>
                    <FlaskConical className="w-4 h-4" />
                  </div>
                </button>
              );
            })}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs text-slate-500 leading-relaxed mt-4">
              🛡️ <span className="font-bold text-slate-700">Medical-Grade Quality:</span> Liposomal encapsulation protects active vitamins against digestive acids for max bioavailability.
            </div>
          </div>

          {/* Right Column: Comparative Infographics & Deep Dive */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-2xl font-extrabold text-slate-900">
                      {activeData.name}
                    </h3>
                    <span className="bg-[#007bc4] text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {activeData.amount} Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">
                    Source: {activeData.source}
                  </p>
                </div>

                {/* Primary Benefit Callout */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Primary Benefit</h4>
                  <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
                    "{activeData.benefit}"
                  </p>
                </div>

                {/* Dosage Comparison Visualizer */}
                {comp && (
                  <div className="bg-white p-4 rounded-xl border border-slate-250/60 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      DOSE LEVEL COMPARISON ({comp.label})
                    </h4>
                    
                    {/* Elavate level */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span className="text-sky-700">Elavate Dose</span>
                        <span>{comp.elavate.toLocaleString()} {comp.unit} (Optimum)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="bg-gradient-to-r from-[#4eb3e5] to-[#007bc4] h-full"
                        />
                      </div>
                    </div>

                    {/* Competitor Level */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Standard Competitor Dose</span>
                        <span>{comp.competitor.toLocaleString()} {comp.unit} (Low-cost filler)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(comp.competitor / comp.elavate) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-slate-400 h-full"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-wide">
                      ⚡ Elavate provides up to {Math.round(comp.elavate / comp.competitor)}x higher clinical active density!
                    </p>
                  </div>
                )}

                {/* Science notes */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">How it Works (Cellular Level)</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {activeData.details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

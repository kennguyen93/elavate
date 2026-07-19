import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-8 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-sky-100 text-sky-700 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-2">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            WE HAVE ANSWERS
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-2 text-sm sm:text-base">
            Everything you need to know about starting your Elavate beauty and wellness journey.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-150/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-slate-900 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 border-t border-slate-150/50 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/60 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

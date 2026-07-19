import { useState } from "react";
import { X, Check, Award, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Gift } from "lucide-react";
import { QUIZ_QUESTIONS, FLAVORS } from "../data";
import { Flavor } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (recommendedFlavor: Flavor) => void;
}

export default function Quiz({ isOpen, onClose, onApplyRecommendation }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setQuizFinished(true);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  // Calculate recommendation based on flavor answer (Question 3)
  const getRecommendation = (): { flavor: Flavor; explanation: string } => {
    const goal = answers[1] || "skin";
    const preferredFlavorId = answers[3] || "chocolate";

    const matchedFlavor = FLAVORS.find((f) => f.id === preferredFlavorId) || FLAVORS[0];

    let explanation = "";
    switch (goal) {
      case "skin":
        explanation = `Based on your goal for wrinkle-free, plump skin, our ${matchedFlavor.name} superblend is an ideal match. Its 120mg clinical dosage of Hyaluronic Acid acts as a natural hydration lock, plumping fine lines while 10,000mg active collagen peptides restore dermal elasticity.`;
        break;
      case "hair":
        explanation = `Since your primary concern is thicker hair follicles, ${matchedFlavor.name} is formulated with 5,000mcg pure D-Biotin which directly reinforces keratin structures, stimulating new baby hairs and reducing follicular breakage by up to 45%.`;
        break;
      case "joints":
        explanation = `For joint comfort, ${matchedFlavor.name} contains premium Bioactive Collagen Types II & X, which replenish synovial fluid, lubricating joint cartilage and lowering exercise-induced stiffness within 28 days.`;
        break;
      default:
        explanation = `For general wellness, our high-absorption Multi-Collagen blend provides Types I, II, III, V, X to support gut lining integrity, strong nails, hydrated skin, and healthy joints in one simple daily scoop.`;
    }

    return { flavor: matchedFlavor, explanation };
  };

  const rec = getRecommendation();

  const handleAcceptRecommendation = () => {
    onApplyRecommendation(rec.flavor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900 cursor-pointer"
      />

      {/* Quiz Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Absolute header close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {!quizFinished ? (
          <div>
            {/* Step Progress indicators */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex gap-1">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= currentStep ? "bg-[#007bc4] w-6" : "bg-slate-150 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide animation for questions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentStep].options.map((opt) => {
                    const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                        className={`w-full flex items-center gap-4 p-4.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-sky-500 bg-sky-50/20 text-slate-950 font-bold"
                            : "border-slate-100 bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50/40"
                        }`}
                      >
                        <span className="text-2xl bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          {opt.icon}
                        </span>
                        <span className="flex-1 text-sm sm:text-base">{opt.text}</span>
                        {isSelected && (
                          <span className="bg-sky-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Back action */}
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="mt-6 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back Previous
              </button>
            )}
          </div>
        ) : (
          /* Finished: personalized analysis result card */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4 space-y-6"
          >
            <div>
              <Sparkles className="w-12 h-12 text-sky-500 mx-auto animate-pulse" />
              <h3 className="font-display text-2xl font-extrabold text-slate-900 mt-2">Your Perfect Glow Match!</h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-1">
                Diagnostic Analysis Compiled Successfully
              </p>
            </div>

            {/* Matched Product Pouch display card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-white">
                  {rec.flavor.id === "chocolate" ? (
                    <img src={rec.flavor.image} alt={rec.flavor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${rec.flavor.color}`} />
                  )}
                </div>
                <div>
                  <span className="text-[9px] bg-sky-100 text-[#007bc4] font-black uppercase px-2 py-0.5 rounded tracking-widest">
                    Recommended Blend
                  </span>
                  <h4 className="font-display font-extrabold text-slate-900 text-base mt-1">
                    {rec.flavor.name} Superblend
                  </h4>
                  <p className="text-slate-500 text-xs">Bioactive Hydrolyzed Peptides</p>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-4 font-medium">
                {rec.explanation}
              </p>
            </div>

            {/* Exclusive Promo Reward block */}
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center justify-between text-left">
              <div className="space-y-0.5">
                <p className="text-rose-700 text-xs font-black uppercase flex items-center gap-1 tracking-wider">
                  <Gift className="w-4 h-4 animate-bounce" /> Special Reward Unlocked:
                </p>
                <p className="text-slate-700 text-[11px] font-medium">
                  Use coupon <span className="font-mono font-bold text-slate-900">GLOW10</span> for an extra <span className="font-bold">10% OFF</span>!
                </p>
              </div>
              <div className="bg-rose-600 text-white font-mono font-black text-xs px-2.5 py-1.5 rounded tracking-wide">
                GLOW10
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <button
                onClick={handleAcceptRecommendation}
                className="w-full bg-[#00b020] hover:bg-[#009b1c] text-white text-sm font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                Apply Recommendation & Shop <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetQuiz}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest flex items-center gap-1 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Diagnostic Quiz
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

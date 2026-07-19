import { useState } from "react";
import { Star, Check, ThumbsUp, Filter, MessageSquareHeart } from "lucide-react";
import { REVIEWS } from "../data";
import { Review } from "../types";
import { motion } from "motion/react";

export default function Reviews() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [reviewsState, setReviewsState] = useState<Review[]>(REVIEWS);

  // Extract all unique tags
  const allTags = ["All", "Skin Glow", "Hair Growth", "Joint Relief", "Chocolate Flavour", "Mixed Berry"];

  const filteredReviews = selectedTag === "All"
    ? reviewsState
    : reviewsState.filter((rev) => rev.tags.includes(selectedTag));

  const handleHelpfulClick = (id: string) => {
    setReviewsState((prev) =>
      prev.map((rev) => {
        if (rev.id === id) {
          if (rev.userVoted) {
            return { ...rev, helpfulCount: rev.helpfulCount - 1, userVoted: false };
          } else {
            return { ...rev, helpfulCount: rev.helpfulCount + 1, userVoted: true };
          }
        }
        return rev;
      })
    );
  };

  return (
    <section id="reviews" className="py-16 px-4 sm:px-8 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-sky-100 text-sky-700 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-block mb-2">
            Verified Results
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            REAL ELAVATE STORIES
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
            Read transparent feedback from women who successfully restored hair, skin, and joint comfort with our formulas.
          </p>
        </div>

        {/* Rating Overview panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 mb-10 shadow-sm">
          {/* Big Score */}
          <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-150 pb-6 md:pb-0 md:pr-6">
            <p className="font-display text-5xl sm:text-6xl font-black text-slate-900 leading-none">4.8</p>
            <div className="flex items-center justify-center gap-1.5 my-3 bg-amber-50 py-1 px-3.5 rounded-full w-fit mx-auto">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Based on 24,841 verified purchases
            </p>
          </div>

          {/* Benefits statistics checklist */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150/60">
              <p className="text-slate-950 font-extrabold text-sm uppercase">💅 Nail Integrity</p>
              <p className="text-slate-500 text-xs mt-1">94% noticed a reduction in nail peeling & splitting in 3 weeks.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150/60">
              <p className="text-slate-950 font-extrabold text-sm uppercase">👩 Hair Volume</p>
              <p className="text-slate-500 text-xs mt-1">89% reported thicker, fuller hair strands with reduced shedding.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150/60">
              <p className="text-slate-950 font-extrabold text-sm uppercase">✨ Skin Moisture</p>
              <p className="text-slate-500 text-xs mt-1">91% saw significant improvement in elasticity and skin flaking.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150/60">
              <p className="text-slate-950 font-extrabold text-sm uppercase">🧘 Joint Flex</p>
              <p className="text-slate-500 text-xs mt-1">85% reported increased comfortable range-of-motion in exercise.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Tag Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <motion.div
              key={rev.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-150"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-display font-bold text-slate-900 text-sm">{rev.name}</p>
                      <span className="text-emerald-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> Verified Buyer
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs font-semibold">{rev.date}</span>
                </div>

                {/* Stars and title */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-amber-500 text-amber-500" : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="font-bold text-slate-800 text-sm ml-1">{rev.title}</span>
                </div>

                {/* Content */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                  "{rev.content}"
                </p>
              </div>

              {/* Footer: Tags and Helpful count */}
              <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2 justify-between items-center mt-2">
                <div className="flex flex-wrap gap-1.5">
                  {rev.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-150/40">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  className={`text-xs font-bold py-1 px-3.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                    rev.userVoted
                      ? "bg-sky-50 text-[#007bc4] border-sky-200"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${rev.userVoted ? "fill-sky-500 text-sky-500" : ""}`} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

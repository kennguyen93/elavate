import { Flavor, PackageOption, Review, QuizQuestion } from "./types";

export const FLAVORS: Flavor[] = [
  {
    id: "chocolate",
    name: "Indulgent Chocolate",
    color: "from-amber-800 to-amber-950",
    bgHex: "#3e2723",
    image: "/src/assets/images/elavate_chocolate_collagen_1784471078378.jpg",
    description: "Rich, smooth Belgian chocolate flavor. Perfect for guilt-free sweet cravings."
  },
  {
    id: "berry",
    name: "Wild Mixed Berry",
    color: "from-rose-500 to-pink-700",
    bgHex: "#880e4f",
    image: "https://picsum.photos/seed/berrycollagen/600/600",
    description: "Bright and refreshing sweet berry fusion. Mixes perfectly in cold water or juices."
  },
  {
    id: "vanilla",
    name: "Creamy Madagascar Vanilla",
    color: "from-amber-200 to-amber-400",
    bgHex: "#f5f5f5",
    image: "https://picsum.photos/seed/vanillacollagen/600/600",
    description: "Classic smooth and creamy vanilla bean. Ideal addition to morning coffee or smoothies."
  },
  {
    id: "unflavored",
    name: "Pure Unflavoured",
    color: "from-slate-300 to-slate-400",
    bgHex: "#eceff1",
    image: "https://picsum.photos/seed/purecollagen/600/600",
    description: "Zero flavor, zero sweeteners. Seamlessly blends into absolutely any hot or cold drink."
  }
];

export const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: "pkg_1",
    pouches: 1,
    supplyDays: 30,
    pricePerPouch: 49.99,
    totalPrice: 49.99,
    originalPrice: 49.99,
    badge: "Starter Kit"
  },
  {
    id: "pkg_2",
    pouches: 2,
    supplyDays: 60,
    pricePerPouch: 42.49,
    totalPrice: 84.98,
    originalPrice: 99.98,
    discountPercent: 15,
    badge: "Most Popular",
    freebies: ["Free VIP Glow E-Book"]
  },
  {
    id: "pkg_3",
    pouches: 3,
    supplyDays: 90,
    pricePerPouch: 37.49,
    totalPrice: 112.47,
    originalPrice: 149.97,
    discountPercent: 25,
    badge: "Best Value - Save 25%",
    freebies: ["Free Premium Shaker Bottle", "Free Handheld Milk Frother", "Free VIP Glow E-Book", "Free Tracked Delivery"]
  }
];

export const INGREDIENTS = [
  {
    id: "collagen",
    name: "Multi-Collagen Superblend",
    amount: "10,000mg",
    source: "Premium Bovine, Marine & Chicken Source (Types I, II, III, V, X)",
    benefit: "Firms skin, reduces wrinkle depth, supports flexible joints, and strengthens hair follicles.",
    details: "Contains easily absorbable, bioactive peptides optimized for rapid assimilation into target tissues."
  },
  {
    id: "hyaluronic",
    name: "Hyaluronic Acid",
    amount: "120mg",
    source: "Premium Vegan Source",
    benefit: "Acts like a molecular sponge, binding up to 1,000x its weight in water to hydrate skin from within.",
    details: "Helps plump the skin, lubricating joint cushions and leaving dry skin glowing and elastic."
  },
  {
    id: "vitamin-c",
    name: "Liposomal Vitamin C",
    amount: "150mg",
    source: "Liposomal Ascorbic Acid",
    benefit: "Crucial co-factor that directly triggers natural, endogenous collagen synthesis in the body.",
    details: "Wrapped in protective lipids to guarantee up to 8x higher cellular absorption than standard Vitamin C."
  },
  {
    id: "biotin",
    name: "Biotin (Vitamin B7)",
    amount: "5,000mcg",
    source: "Pure D-Biotin",
    benefit: "Increases the thickness and rate of hair growth while eliminating brittle, peeling nails.",
    details: "Supercharges keratin infrastructure, providing structural support to epithelial and nail tissues."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev_1",
    name: "Sarah Jenkins",
    rating: 5,
    date: "July 12, 2026",
    verified: true,
    title: "Literally a miracle for my skin!",
    content: "I've been taking the Indulgent Chocolate Elavate every single morning in my coffee for 4 weeks now. Honestly, my face looks so plump and hydrated, my fine lines around my eyes have softened dramatically! Even my husband asked what skin treatment I did. Plus, it tastes exactly like hot chocolate. 10/10 recommend!",
    tags: ["Skin Glow", "Chocolate Flavour", "Fine Lines"],
    helpfulCount: 42,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: "rev_2",
    name: "Michelle Davies",
    rating: 5,
    date: "June 28, 2026",
    verified: true,
    title: "No more joint stiffness after runs!",
    content: "At 43, my knees started telling me to stop running. I bought the 3-pouch bundle of Wild Mixed Berry to try out. I cannot believe how much better my knees feel after 6 weeks! Zero stiffness when waking up, and my nails are growing like crazy. I mix the berry flavor with cold water and ice — so refreshing.",
    tags: ["Joint Relief", "Nail Growth", "Mixed Berry"],
    helpfulCount: 29,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: "rev_3",
    name: "Emma Watson",
    rating: 5,
    date: "July 02, 2026",
    verified: true,
    title: "Thicker hair and amazing taste",
    content: "My postpartum hair loss was depressing. This supplement has changed everything. I see so many baby hairs growing along my hairline! The chocolate blend satisfies my sweet tooth completely. I will never stop taking this.",
    tags: ["Hair Growth", "Chocolate Flavour", "Postpartum Recovery"],
    helpfulCount: 18,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: "rev_4",
    name: "Rachel Green",
    rating: 4,
    date: "June 15, 2026",
    verified: true,
    title: "Extremely pleased with skin hydration",
    content: "My dry skin patches have completely vanished. Highly recommend Madagascar Vanilla — it goes so smoothly in porridge or breakfast oats! Docking one star only because the delivery took 4 days instead of 2, but the customer support team was incredibly sweet and refunded my shipping.",
    tags: ["Skin Glow", "Madagascar Vanilla"],
    helpfulCount: 11,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary wellness & beauty goal?",
    options: [
      { text: "Radiant, youthful & wrinkle-free skin", value: "skin", icon: "✨" },
      { text: "Thicker, faster-growing & healthier hair", value: "hair", icon: "💇‍♀️" },
      { text: "Joint comfort, strength & active flexibility", value: "joints", icon: "🏃‍♀️" },
      { text: "All-round premium daily wellness & gut support", value: "all", icon: "🌱" }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to take your daily health supplements?",
    options: [
      { text: "Mixed in my morning warm coffee or latte", value: "coffee", icon: "☕" },
      { text: "Stirred into refreshing ice-cold water or juice", value: "juice", icon: "🥤" },
      { text: "Blended inside my healthy morning smoothies", value: "smoothie", icon: "🍹" },
      { text: "Mixed into breakfast bowls, oatmeal or yogurt", value: "bowl", icon: "🥣" }
    ]
  },
  {
    id: 3,
    question: "Which flavor profile brings you the most joy?",
    options: [
      { text: "Decadent, rich chocolate indulgence", value: "chocolate", icon: "🍫" },
      { text: "Sweet, refreshing fruity berries", value: "berry", icon: "🍓" },
      { text: "Smooth, elegant creamy vanilla sweetness", value: "vanilla", icon: "🍨" },
      { text: "Unflavored & versatile (adds into anything)", value: "unflavored", icon: "💧" }
    ]
  }
];

export const FAQS = [
  {
    question: "How quickly can I expect to see visible results?",
    answer: "Most customers report seeing initial improvements in skin hydration and soft nails within 14-21 days. Hair growth and structural joint relief typically manifest around weeks 6-8 of consecutive daily use. Our 12-week clinical trials show peak benefits at 90 days, which is why we highly recommend our 3-pouch 'Best Value' package."
  },
  {
    question: "What types of collagen are in the Elavate Superblend?",
    answer: "Elavate contains standard Hydrolyzed Multi-Collagen peptides containing Types I, II, III, V, and X. These cover all aspects of beauty and vitality: Types I & III boost skin dermal structure, elasticity and hair thickness; Type II supports cartilage and joint fluids; Types V & X nourish placenta, cell membranes, and bone matrix."
  },
  {
    question: "Is this product suitable for diets with dietary restrictions?",
    answer: "Yes! Elavate is 100% Non-GMO, Sugar-Free (sweetened naturally with calorie-free stevia), High in Protein, Keto/Paleo friendly, Gluten-Free, Soy-Free, and has absolutely zero artificial fillers, preservatives, or chemical binders."
  },
  {
    question: "How do I take it for maximum results?",
    answer: "Simply mix one level scoop (approx. 12g) into 250ml of your favorite liquid — hot coffee, milk, smoothies, or cold water. Use our free Handheld Whisk (included in 3-pouch pack) to achieve a velvety, completely lump-free texture. We recommend consuming it in the morning to fuel your body's daytime cellular repairs."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Absolutely! We are so confident in our clinically backed formula that we offer an ironclad 60-Day Money-Back Guarantee. If you don't love your results, simply email our British support team for a prompt, friendly refund — no hard feelings!"
  }
];

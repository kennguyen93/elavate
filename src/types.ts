export interface Flavor {
  id: string;
  name: string;
  color: string;
  bgHex: string;
  image: string;
  description: string;
}

export interface PackageOption {
  id: string;
  pouches: number;
  supplyDays: number;
  pricePerPouch: number;
  originalPrice?: number;
  totalPrice: number;
  discountPercent?: number;
  badge?: string;
  freebies?: string[];
}

export interface CartItem {
  id: string; // combination of flavor + package ID
  flavor: Flavor;
  pkg: PackageOption;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  avatar?: string;
  tags: string[];
  helpfulCount: number;
  userVoted?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
    icon: string;
  }[];
}

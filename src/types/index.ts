export interface UserSizes {
  bust: string;
  waist: string;
  hips: string;
  topSize?: string;
  bottomSize?: string;
  shoeSize?: string;
  height?: string;
  weight?: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  vibe?: string;
}

export interface OutfitItem {
  name: string;
  price: number;
  imageUrl?: string;
  link?: string;
  store?: string;
}

export interface Store {
  id: string;
  name: string;
  url: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: OutfitItem[];
  totalPrice: number;
  estimatedDelivery: string;
  store: Store;
}

export interface Store {
  id: string;
  name: string;
  url: string;
}

export interface SearchProgress {
  store: Store;
  progress: number;
  status: 'pending' | 'searching' | 'complete' | 'error';
}

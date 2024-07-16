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
}

export interface OutfitItem {
  name: string;
  price: number;
  imageUrl?: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: OutfitItem[];
  totalPrice: number;
  estimatedDelivery: string;
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

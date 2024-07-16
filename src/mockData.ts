import { Event, Outfit, Store } from './types';

export const mockEvents: Event[] = [
  { id: 1, name: 'Wedding', description: 'Formal attire for a wedding celebration' },
  { id: 2, name: 'Birthday Party', description: 'Casual to semi-formal wear for a birthday celebration' },
  { id: 3, name: 'Job Interview', description: 'Professional attire for a job interview' },
  { id: 4, name: 'Date Night', description: 'Stylish outfit for a romantic evening' },
  { id: 5, name: 'Beach Day', description: 'Comfortable and cool outfit for a day at the beach' },
];

export const mockStores: Store[] = [
  { id: 'store1', name: 'FashionNova', url: 'https://www.fashionnova.com' },
  { id: 'store2', name: 'Amazon Fashion', url: 'https://www.amazon.com/fashion' },
  { id: 'store3', name: 'ASOS', url: 'https://www.asos.com' },
  { id: 'store4', name: 'Zara', url: 'https://www.zara.com' },
];

export const generateMockOutfit = (eventName: string): Outfit => {
  const id = Math.random().toString(36).substr(2, 9);
  return {
    id,
    name: `${eventName} Outfit`,
    items: [
      { name: 'Top', price: Math.floor(Math.random() * 50) + 20, imageUrl: `https://example.com/top-${id}.jpg` },
      { name: 'Bottom', price: Math.floor(Math.random() * 70) + 30, imageUrl: `https://example.com/bottom-${id}.jpg` },
      { name: 'Shoes', price: Math.floor(Math.random() * 100) + 50, imageUrl: `https://example.com/shoes-${id}.jpg` },
      { name: 'Accessory', price: Math.floor(Math.random() * 30) + 10, imageUrl: `https://example.com/accessory-${id}.jpg` },
    ],
    totalPrice: 0,
    estimatedDelivery: `${Math.floor(Math.random() * 5) + 2}-${Math.floor(Math.random() * 5) + 7} business days`,
  };
};

// Calculate total price for the outfit
export const calculateTotalPrice = (outfit: Outfit): Outfit => {
  const totalPrice = outfit.items.reduce((sum, item) => sum + item.price, 0);
  return { ...outfit, totalPrice };
};

export const generateMockOutfits = (eventName: string, count: number): Outfit[] => {
  return Array(count)
    .fill(null)
    .map(() => calculateTotalPrice(generateMockOutfit(eventName)));
};
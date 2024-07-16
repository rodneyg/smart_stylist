import React from 'react';
import { Outfit } from '../types';

interface OutfitResultsProps {
  outfits: Outfit[];
}

const OutfitResults: React.FC<OutfitResultsProps> = ({ outfits }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Outfit Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{outfit.name}</h3>
            <ul className="mb-4">
              {outfit.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-lg font-bold">Total: ${outfit.totalPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-600">Estimated Delivery: {outfit.estimatedDelivery}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitResults;
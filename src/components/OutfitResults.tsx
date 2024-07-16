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
                </li>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {outfit.items.map((item, index) => (
                  <div key={index} className="relative group">
                    <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-auto rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white text-sm">
                        View Item
                      </a>
                    </div>
                  </div>
                ))}
              </div>
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

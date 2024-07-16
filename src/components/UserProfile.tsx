import React, { useState, ChangeEvent, FormEvent } from 'react';
import { UserSizes } from '../types';

interface UserProfileProps {
  onSaveSizes: (sizes: UserSizes) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onSaveSizes }) => {
  const [sizes, setSizes] = useState<UserSizes>({
    bust: '',
    waist: '',
    hips: '',
    topSize: '',
    bottomSize: '',
    shoeSize: '',
    height: '',
    weight: '',
  });

  const commonSizes = {
    topSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bottomSizes: ['28', '30', '32', '34', '36', '38'],
    shoeSizes: ['6', '7', '8', '9', '10', '11', '12'],
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSizes(prevSizes => ({ ...prevSizes, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSaveSizes(sizes);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Your Sizes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bust">
            Bust (inches)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bust"
            type="number"
            placeholder="e.g., 34"
            name="bust"
            value={sizes.bust}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waist">
            Waist (inches)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="waist"
            type="number"
            placeholder="e.g., 28"
            name="waist"
            value={sizes.waist}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hips">
            Hips (inches)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hips"
            type="number"
            placeholder="e.g., 36"
            name="hips"
            value={sizes.hips}
            onChange={handleInputChange}
          />
        </div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topSize">
            Top Size
          </label>
          <input list="topSizes"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="topSize"
            type="text"
            placeholder="e.g., M, L, XL"
            name="topSize"
            value={sizes.topSize}
            onChange={handleInputChange}
          />
          <datalist id="topSizes">
            {commonSizes.topSizes.map(size => (
              <option key={size} value={size} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bottomSize">
            Bottom Size
          </label>
          <input list="bottomSizes"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bottomSize"
            type="text"
            placeholder="e.g., 32, 34, 36"
            name="bottomSize"
            value={sizes.bottomSize}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shoeSize">
            Shoe Size
          </label>
          <input list="shoeSizes"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="shoeSize"
            type="text"
            placeholder="e.g., 8, 9, 10"
            name="shoeSize"
            value={sizes.shoeSize}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
            Height (cm)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="height"
            type="number"
            placeholder="e.g., 170"
            name="height"
            value={sizes.height}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weight"
            type="number"
            placeholder="e.g., 70"
            name="weight"
            value={sizes.weight}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Sizes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

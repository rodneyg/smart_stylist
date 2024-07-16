import React, { useState, useEffect } from 'react';
import { Event, UserSizes, Outfit, SearchProgress } from '../types';
import { mockStores, generateMockOutfits } from '../mockData';

interface OutfitQueueProps {
  event: Event;
  userSizes: UserSizes;
  onOutfitsFound: (outfits: Outfit[]) => void;
  onSearchComplete: () => void;
}

const OutfitQueue: React.FC<OutfitQueueProps> = ({ event, userSizes, onOutfitsFound }) => {
  const [queueStatus, setQueueStatus] = useState<string>('Initializing search...');
  const [storeProgress, setStoreProgress] = useState<SearchProgress[]>([]);

  useEffect(() => {
    const searchOutfits = async () => {
      setQueueStatus('Searching for outfits...');
      
      const totalStores = mockStores.length;
      const outfitsPerStore = 2;
      
      setStoreProgress(mockStores.map(store => ({
        store,
        progress: 0,
        status: 'pending'
      })));

      for (let i = 0; i < totalStores; i++) {
        const store = mockStores[i];
        setStoreProgress(prev => prev.map(sp => 
          sp.store.id === store.id ? { ...sp, status: 'searching' } : sp
        ));

        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate search time

        const newOutfits = generateMockOutfits(event.name, outfitsPerStore);
        onOutfitsFound(newOutfits);

        setStoreProgress(prev => prev.map(sp => 
          sp.store.id === store.id ? { ...sp, progress: 100, status: 'complete' } : sp
        ));
      }
      
      setQueueStatus('Search complete!');
    };

    searchOutfits();
  }, [event, userSizes, onOutfitsFound]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Outfit Search in Progress</h2>
      <div className="mb-4">
        <div className="text-gray-700 mb-2">{queueStatus}</div>
        {storeProgress.map(sp => (
          <div key={sp.store.id} className="mb-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{sp.store.name}</span>
              <span>{sp.status}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${sp.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        We're searching multiple stores to find the best outfits for your event. 
        Outfits will appear as they're discovered.
      </p>
    </div>
  );
};

export default OutfitQueue;
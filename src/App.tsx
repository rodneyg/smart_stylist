import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import EventSelector from './components/EventSelector';
import OutfitQueue from './components/OutfitQueue';
import OutfitResults from './components/OutfitResults';
import { Event, UserSizes, Outfit } from './types';
import { mockEvents } from './mockData';

const App: React.FC = () => {
  const [userSizes, setUserSizes] = useState<UserSizes | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSaveSizes = (sizes: UserSizes) => {
    setUserSizes(sizes);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsSearching(true);
    setOutfits([]);
  };

  const handleOutfitsFound = (newOutfits: Outfit[]) => {
    setOutfits(prevOutfits => [...prevOutfits, ...newOutfits]);
  };

  const handleSearchComplete = () => {
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Stylist</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!userSizes ? (
          <UserProfile onSaveSizes={handleSaveSizes} />
        ) : !selectedEvent ? (
          <EventSelector events={mockEvents} onSelectEvent={handleSelectEvent} />
        ) : isSearching ? (
          <>
            <OutfitQueue 
              event={selectedEvent} 
              userSizes={userSizes} 
              onOutfitsFound={handleOutfitsFound}
              onSearchComplete={handleSearchComplete}
            />
            {outfits.length > 0 && <OutfitResults outfits={outfits} />}
          </>
        ) : (
          <OutfitResults outfits={outfits} />
        )}
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Event } from '../types';

interface EventSelectorProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({ events, onSelectEvent }) => {
  const [customVibe, setCustomVibe] = useState('');

  const handleCustomVibeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomVibe(e.target.value);
  };

  const handleCustomVibeSubmit = () => {
    if (customVibe.trim()) {
      onSelectEvent({ id: -1, name: 'Custom Event', description: customVibe, vibe: customVibe });
      setCustomVibe('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select an Event</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <button
            key={event.id}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => onSelectEvent(event)}
          >
            <div className="text-left">
              <div className="font-bold">{event.name}</div>
              <div className="text-sm text-gray-600">{event.description}</div>
            </div>
          </button>
        ))}
        <input
          type="text"
          value={customVibe}
          onChange={handleCustomVibeChange}
          placeholder="Describe your event vibe"
          className="w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        />
        <button
          onClick={handleCustomVibeSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Custom Event
        </button>
      </div>
    </div>
  );
};

export default EventSelector;

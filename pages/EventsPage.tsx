
import React from 'react';
import { useData } from '../context/DataContext';
import { Event } from '../types';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

// FIX: Changed component definition to use React.FC to correctly handle `key` prop.
const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl">
    <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
    <div className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
      </div>
      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="self-start inline-flex items-center font-semibold text-[#007bff] hover:text-[#0056b3] group-hover:translate-x-1 transition-transform duration-300">
        Register Now <ArrowRight size={20} className="ml-2" />
      </a>
    </div>
  </div>
);

const EventsPage = () => {
  const { events } = useData();

  // Simple sorting to show newest events first
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Our Events</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          From beginner workshops to expert panels, there's something for everyone.
        </p>
      </div>
      
      {sortedEvents.length > 0 ? (
        <div className="space-y-12">
          {sortedEvents.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
         <p className="text-center text-gray-500 text-lg">No events have been scheduled yet. Please check back later!</p>
      )}
    </div>
  );
};

export default EventsPage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
    <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{event.title}</h3>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Calendar size={16} className="mr-2" />
        <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} @ {event.time}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <MapPin size={16} className="mr-2" />
        <span>{event.location}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
    </div>
  </div>
);

const HomePage = () => {
  const { events } = useData();
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <div 
            className="absolute inset-0 bg-[#0A0F1A] z-0" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%2300A9FF' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent"></div>
        </div>

        <div className="z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight animate-slideInUp">
            KALLAMINO BLOCKCHAIN COMMUNITY
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300 animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Empowering the next generation of innovators through blockchain education, collaboration, and hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <NavLink
              to="/membership"
              className="px-8 py-3 font-semibold text-white bg-[#007bff] rounded-md hover:bg-[#0056b3] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Member
            </NavLink>
            <NavLink
              to="/about"
              className="px-8 py-3 font-semibold bg-white/10 text-white rounded-md hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
                <img src="https://picsum.photos/seed/mission/500/500" alt="Our Mission" className="rounded-lg shadow-2xl object-cover"/>
            </div>
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
                 <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our mission is to foster a vibrant and inclusive community for students passionate about blockchain and emerging technologies. We aim to demystify complex concepts, provide practical skills through hands-on workshops, and connect members with industry opportunities, preparing them to be leaders in the decentralized future.
                 </p>
            </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50 dark:bg-[#030712]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Join us for insightful talks, workshops, and networking.</p>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
             <p className="text-center text-gray-500">No upcoming events scheduled. Check back soon!</p>
          )}
          <div className="text-center mt-12">
            <NavLink to="/events" className="inline-flex items-center font-semibold text-[#007bff] hover:text-[#0056b3]">
              View All Events <ArrowRight size={20} className="ml-2" />
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
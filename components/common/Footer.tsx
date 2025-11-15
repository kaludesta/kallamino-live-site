import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { NAV_LINKS } from '../../constants';
import { Mail, Send } from 'lucide-react';

const DefaultLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" className="text-gray-800 dark:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M50 10 L90 50 L50 90 L10 50 Z" />
      <path stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M50 30 L70 50 L50 70 L30 50 Z" />
      <path stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M50 10 V 30 M90 50 H 70 M50 90 V 70 M10 50 H 30" />
      <circle cx="50" cy="10" r="7" />
      <circle cx="90" cy="50" r="7" />
      <circle cx="50" cy="90" r="7" />
      <circle cx="10" cy="50" r="7" />
      <circle cx="50" cy="30" r="7" />
      <circle cx="70" cy="50" r="7" />
      <circle cx="50" cy="70" r="7" />
      <circle cx="30" cy="50" r="7" />
      <circle cx="50" cy="50" r="7" />
    </svg>
);


const Footer = () => {
  const { siteLogo } = useData();

  return (
    <footer className="bg-gray-100 dark:bg-[#030712] border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              {siteLogo ? (
                <img src={siteLogo} alt="Kallamino Logo" className="h-10 w-10 object-contain" />
              ) : (
                <DefaultLogo />
              )}
              <span className="text-xl font-bold tracking-wider text-gray-800 dark:text-white">KALLAMINO</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Exploring the decentralized future, one block at a time.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="mailto:kalebdesta38@gmail.com" className="text-gray-500 hover:text-[#00A9FF]"><Mail size={20} /></a>
              <a href="https://t.me/Kallamino_Blockchain" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00A9FF]"><Send size={20} /></a>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_LINKS.slice(0, 5).map((link) => (
                   <li key={link.name}><NavLink to={link.path} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">{link.name}</NavLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Community</h3>
              <ul className="space-y-2">
                {NAV_LINKS.slice(5).map((link) => (
                   <li key={link.name}><NavLink to={link.path} className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">{link.name}</NavLink></li>
                ))}
                 <li><NavLink to="/membership" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">Join Us</NavLink></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">Terms of Service</a></li>
                <li><NavLink to="/admin" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00A9FF]">Admin Login</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kallamino Blockchain Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
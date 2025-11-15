
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { NAV_LINKS } from '../../constants';
import { Sun, Moon, X, Menu } from 'lucide-react';

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 134 116" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-gray-800 dark:text-white">
    <path d="M110.833 46.5833C110.833 51.5833 106.583 55.5 102 55.5C97.4167 55.5 93.1667 51.5833 93.1667 46.5833C93.1667 41.5833 97.4167 37.5 102 37.5C106.583 37.5 110.833 41.5833 110.833 46.5833Z" fill="currentColor"/>
    <path d="M134 11.6667C134 18.1667 128.5 23.3333 121.667 23.3333C114.833 23.3333 109.333 18.1667 109.333 11.6667C109.333 5.16667 114.833 0 121.667 0C128.5 0 134 5.16667 134 11.6667Z" fill="currentColor"/>
    <path d="M42.8333 11.6667C42.8333 18.1667 37.3333 23.3333 30.5 23.3333C23.6667 23.3333 18.1667 18.1667 18.1667 11.6667C18.1667 5.16667 23.6667 0 30.5 0C37.3333 0 42.8333 5.16667 42.8333 11.6667Z" fill="currentColor"/>
    <path d="M31.3333 69.4167C31.3333 74.4167 27.0833 78.3333 22.1667 78.3333C17.25 78.3333 13 74.4167 13 69.4167C13 64.4167 17.25 60.5 22.1667 60.5C27.0833 60.5 31.3333 64.4167 31.3333 69.4167Z" fill="currentColor"/>
    <path d="M88.1667 78.3333C93.0833 78.3333 97.3333 74.4167 97.3333 69.4167C97.3333 64.4167 93.0833 60.5 88.1667 60.5C83.25 60.5 79 64.4167 79 69.4167C79 74.4167 83.25 78.3333 88.1667 78.3333Z" fill="currentColor"/>
    <path d="M77 55.5C81.9167 55.5 86.1667 51.5833 86.1667 46.5833C86.1667 41.5833 81.9167 37.5 77 37.5C72.0833 37.5 67.8333 41.5833 67.8333 46.5833C67.8333 51.5833 72.0833 55.5 77 55.5Z" fill="currentColor"/>
    <path d="M31.3333 104.333C31.3333 110.833 25.8333 116 19 116C12.1667 116 6.66667 110.833 6.66667 104.333C6.66667 97.8333 12.1667 92.6667 19 92.6667C25.8333 92.6667 31.3333 97.8333 31.3333 104.333Z" fill="currentColor"/>
    <path d="M127.333 104.333C127.333 110.833 121.833 116 115 116C108.167 116 102.667 110.833 102.667 104.333C102.667 97.8333 108.167 92.6667 115 92.6667C121.833 92.6667 127.333 97.8333 127.333 104.333Z" fill="currentColor"/>
    <path d="M77 46.5833L102 46.5833" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M121.667 11.6667L102 46.5833" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M88.1667 69.4167L102 46.5833" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M77 46.5833L88.1667 69.4167" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M77 46.5833L30.5 11.6667" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M22.1667 69.4167L30.5 11.6667" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M22.1667 69.4167L77 46.5833" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M22.1667 69.4167L19 104.333" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M88.1667 69.4167L115 104.333" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { siteLogo } = useData();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0A0F1A]/80 backdrop-blur-sm shadow-md transition-colors duration-300">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3">
          {siteLogo ? (
            <img src={siteLogo} alt="Kallamino Logo" className="h-10 w-10 object-contain" />
          ) : (
            <Logo />
          )}
          <span className="text-xl font-bold tracking-wider text-gray-800 dark:text-white whitespace-nowrap hidden sm:block">
            KALLAMINO
          </span>
        </NavLink>
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[#00A9FF] ${
                  isActive ? 'text-[#00A9FF]' : 'text-gray-600 dark:text-gray-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0A0F1A] shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-[120%]'}`}>
        <div className="flex flex-col px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors hover:text-[#00A9FF] ${
                  isActive ? 'text-[#00A9FF]' : 'text-gray-700 dark:text-gray-200'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

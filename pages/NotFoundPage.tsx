
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#007bff]">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        className="mt-8 px-6 py-3 font-semibold text-white bg-[#007bff] rounded-md hover:bg-[#0056b3] transition-colors"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;

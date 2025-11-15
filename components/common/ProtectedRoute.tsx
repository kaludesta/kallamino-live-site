import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// FIX: Changed type of children from React.ReactElement to React.ReactNode to resolve type error.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // FIX: Wrap children in a fragment to ensure a valid ReactElement is returned.
  return <>{children}</>;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

// ProtectedRoute is a higher-order component that wraps around other components/routes.
// It checks if the user is authenticated and either renders the child components or redirects to the login page.
const ProtectedRoute = ({ children }) => {

  // useAuth is a custom hook that provides access to the authentication context.
  const { isAuthenticated } = useAuth();

  // Check if the user is not authenticated.
  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child components.
  return children;
};

export default ProtectedRoute;
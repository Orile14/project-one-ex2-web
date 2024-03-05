import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import verifyToken from './tokenVerification';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log("ASDSAD")
    const checkAuth = async () => {
      const isValid = await verifyToken();
      setIsAuthenticated(isValid);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    console.log("asdasdsad")
   return <div>Loading...</div>; 
  }


  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

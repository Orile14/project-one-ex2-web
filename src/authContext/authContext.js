import React, { useState, useEffect, useContext, createContext } from 'react';

// Create a context for the auth state
export const AuthContext = createContext();

// useAuth is a custom hook that simplifies the process of accessing the AuthContext in any component.
export const useAuth = () => useContext(AuthContext);

// AuthProvider is a component that wraps its children with AuthContext.Provider.
// This allows any child component to access the auth state and functions.
export const AuthProvider = ({ children }) => {

  // isAuthenticated is a state that keeps track of the user's authentication status.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect hook is used here for any side effects. 
  // Currently, it's set up to run whenever isAuthenticated changes, but no specific actions are defined inside.
  useEffect(() => {
  }, [isAuthenticated]); 

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // The provider component makes the isAuthenticated state, 
  // and login and logout functions available to any children components.
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

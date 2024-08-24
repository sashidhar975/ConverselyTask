// // src/context/AuthContext.jsx
// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (token) => {
//     localStorage.setItem('authToken', token);
//     // You might also want to decode the token and set the user
//     setUser({ token });
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('authToken');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an api service setup

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You might want to fetch user data here if needed
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    // Optionally fetch user details and set user data
    setUser({ token });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // Optionally clear posts or notify other parts of the app
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

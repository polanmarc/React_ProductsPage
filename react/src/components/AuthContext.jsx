import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(storedUser);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

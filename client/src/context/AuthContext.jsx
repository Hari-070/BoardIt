import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token')? localStorage.getItem('token'):null,
    userId: null,
  });
  const [name,setName]=useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')? localStorage.getItem('token'):null;
    const userId = localStorage.getItem('userId')? localStorage.getItem('userId'):null; 
    setAuth({ token, userId });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth,name, setName }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth=()=>{
    return useContext(AuthContext)
}
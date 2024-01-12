// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserById } from '../utils/util';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-react-blog")));
  // console.log(user,"....user")
  const userLogin = () => {
    setUser(JSON.parse(localStorage.getItem("user-react-blog")));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear()
  };
  useEffect(()=>{
    const id = localStorage.getItem("id-user-react-blog")
    getUserById(id).then((res)=>{
        // console.log(res)
        localStorage.setItem("user-react-blog",JSON.stringify(res))
        setUser(JSON.parse(localStorage.getItem("user-react-blog")));
    }).catch((err)=>{
    })
  },[])

  return (
    <AuthContext.Provider value={{ user, userLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

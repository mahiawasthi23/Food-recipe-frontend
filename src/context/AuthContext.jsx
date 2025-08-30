import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("https://recipe-app-backend-2-23l5.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false)); 
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/signup", { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};


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
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://recipe-app-backend-2-23l5.onrender.com/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        "https://recipe-app-backend-2-23l5.onrender.com/api/auth/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(userResponse.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

 const signup = async (username, email, password) => {
  try {
    const response = await axios.post(
      "https://recipe-app-backend-2-23l5.onrender.com/api/auth/signup",
      { username, email, password } // username add karo
    );
    const token = response.data.token;
    localStorage.setItem("token", token);

    const userResponse = await axios.get(
      "https://recipe-app-backend-2-23l5.onrender.com/api/auth/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(userResponse.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



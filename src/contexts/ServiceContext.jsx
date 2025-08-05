import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ServiceContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("bearerToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          const response = await api.get("/user");
          setUser(response.data.data);
        } catch (error) {
          console.error("Session expired or token is invalid.", error);
          localStorage.removeItem("bearerToken");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    const newToken = response.data.token;
    setToken(newToken);
    localStorage.setItem("bearerToken", newToken);

    const userResponse = await api.get("/user");
    setUser(userResponse.data.data);
  };

  const register = async (name, email, password, confirmPassword) => {
    await api.post("/register", { name, email, password, confirmPassword });
  };

  const logout = async () => {
    await api.post("/logout");
    setToken(null);
    setUser(null);
    localStorage.removeItem("bearerToken");
  };

  const predictNews = async (text) => {
    const response = await api.post("/predict", { text });
    return response.data.data;
  };

  const getHistory = async () => {
    const response = await api.get("/history");
    return response.data.data;
  };

  const serviceValue = {
    token,
    user,
    loading,
    login,
    register,
    logout,
    predictNews,
    getHistory,
  };

  return (
    <ServiceContext.Provider value={serviceValue}>
      {!loading && children}
    </ServiceContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(ServiceContext);
};

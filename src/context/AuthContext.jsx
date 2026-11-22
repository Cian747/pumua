
import {createContext,useContext,useState} from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    const response = await api.post(
      "/auth/login/",
      credentials
    );

    const { access, refresh } = response.data;

    sessionStorage.setItem("access_token", access);
    sessionStorage.setItem("refresh_token", refresh);

    const profile = await api.get("/auth/me/");

    setUser(profile.data);

    return profile.data;
  };

  const register = async (userData) => {
    await api.post("/auth/register/", userData);

    return login({
      email: userData.email,
      password: userData.password,
    });
  };

  const logout = async () => {
    const refresh = sessionStorage.getItem("refresh_token");

    try {
      if (refresh) {
        await api.post("/auth/logout/", { refresh });
      }
    } finally {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  const fetchUser = async () => {
    const token = sessionStorage.getItem("access_token");

    if (!token) return null;

    try {
      const response = await api.get("/auth/me/");
      setUser(response.data);
      return response.data;
    } catch {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

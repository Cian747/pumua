
import {createContext,useContext,useEffect,useState} from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveTokens = (data) => {
    sessionStorage.setItem("access_token", data.access);
    sessionStorage.setItem("refresh_token", data.refresh);
  };

  const fetchUser = async () => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      return null;
    }

    try {
      const response = await api.get("/auth/me/");
      setUser(response.data);
      return response.data;

    } catch {
      setUser(null);
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      return null;
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const register = async (formData) => {
    await api.post("/auth/register/", formData);
    return login(formData);
  };

  const login = async (credentials) => {
    const response = await api.post(
      "/auth/login/",
      credentials
    );

    saveTokens(response.data);

    const profile = await api.get("/auth/me/");

    setUser(profile.data);

    return profile.data;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
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

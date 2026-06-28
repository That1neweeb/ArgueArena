import { useContext,createContext,useEffect,useState } from "react";
import authClient from "../serviceClient/auth.Client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await authClient.get("/api/auth/me");
      setUser(res.data.user);
      console.log(res.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
    }
  };
  checkAuth();
}, []);

  const login = (token,user) => {
    localStorage.setItem("access_token", token);
    setUser(user)
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../services/appwrite/appwrite.config";

const AuthContext = createContext();

/**
 *
 * @property {React.ReactNode} children
 */
export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  async function getUser() {
    setLoading(true);
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  /**
   *
   * @property {string} email
   * @property {string} password
   */
  async function login(email, password) {
    await account.createEmailPasswordSession({ email, password });
    await getUser();
  }

  async function logout() {
    await account.deleteSessions();
    setUser(null);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * @property {boolean} loading
 * @property {string} user
 * @property {Function} login
 * @property {Function} logout
 * @property {Function} getUser
 */
export const useAuth = () => useContext(AuthContext);

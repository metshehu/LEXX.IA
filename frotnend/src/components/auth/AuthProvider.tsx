import React, { createContext, useEffect, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("name", email);
        setIsAuthenticated(true);
        return { success: true, message: "Successfully signed in!" };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong during login." };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        // optional: directly log them in after signup
        return await login(email, password);
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Something went wrong during signup." };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


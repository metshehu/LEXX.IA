import React, { createContext, useEffect,useContext, useState, ReactNode } from "react";


interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users: User[] = [
  {
    email: "getuartpacarizi@gmail.com",
    password: "Getuart",
  },
  {
    email: "metshehu@gmail.com",
    password: "Meti",
  },
  {
    email: "nadidida@gmail.com",
    password: "Nadi",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
  const token = localStorage.getItem("access_token");
    if (token) {
  setIsAuthenticated(true);
  }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("https://cv-anallyzzer.onrender.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }), // Use `username` if you're using Django default auth
      });

      if (response.ok) {
        const data = await response.json();
        // Store the JWT token locally (in localStorage or memory)
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("name",email);
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

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

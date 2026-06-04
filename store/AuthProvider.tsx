"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  full_address: string;
  notification_preference: string;
  is_email_verified: boolean;
  profile_completion: number;
  last_activity: string | null;
  date_joined: string;
  is_superuser: boolean;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (data: AuthResponse) => void;
  logout: () => Promise<void>;
  updateUser: (updatedFields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: async () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoggedIn = !!user;
  const router = useRouter();

  const logout = useCallback(async () => {  
    setUser(null);
    localStorage.removeItem("user_profile");
    localStorage.removeItem("login_timestamp");
    Cookies.remove("access_token");
    router.push("/login");
  }, [router]);


  const login = (data: AuthResponse) => {
    Cookies.set("access_token", data.access, { secure: true, sameSite: "strict" });
    
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    
    localStorage.setItem("login_timestamp", Date.now().toString());
    setUser(data.user);
    localStorage.setItem("user_profile", JSON.stringify(data.user));  
    getUserProfile(); 
  };

  const getUserProfile = async () => {
    try {
      const accessToken = Cookies.get("access_token")  || localStorage.getItem("access_token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}` 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user_profile", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };  

  const updateUser = (updatedFields: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedFields };
      setUser(newUser);
      localStorage.setItem("user_profile", JSON.stringify(newUser));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
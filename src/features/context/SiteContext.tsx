import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export type SiteMode = "hybrid" | "hotel" | "restaurant";

interface SiteContextType {
  activeSite: SiteMode;
  setActiveSite: (site: SiteMode) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [activeSite, setActiveSite] = useState<SiteMode>("hybrid");

  useEffect(() => {
    if (profile?.role) {
      if (profile.role === "hotel_admin") {
        setActiveSite("hotel");
      } else if (profile.role === "restaurant_admin") {
        setActiveSite("restaurant");
      } else {
        setActiveSite("hybrid");
      }
    }
  }, [profile?.role]);

  return (
    <SiteContext.Provider value={{ activeSite, setActiveSite }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GuestContextType {
  isGuest: boolean;
  setGuestMode: (guest: boolean) => void;
  clearGuestData: () => void;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestMode = localStorage.getItem('terrapulse_guest_mode') === 'true';
    setIsGuest(guestMode);
  }, []);

  const setGuestMode = (guest: boolean) => {
    setIsGuest(guest);
    if (guest) {
      localStorage.setItem('terrapulse_guest_mode', 'true');
    } else {
      localStorage.removeItem('terrapulse_guest_mode');
    }
  };

  const clearGuestData = () => {
    localStorage.removeItem('terrapulse_guest_mode');
    setIsGuest(false);
  };

  return (
    <GuestContext.Provider value={{ isGuest, setGuestMode, clearGuestData }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
}

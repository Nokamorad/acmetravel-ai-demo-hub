
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  initials: string;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    // Try to load user from localStorage
    const savedUser = localStorage.getItem('acmetravel_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    
    // Generate default user
    const defaultUser = {
      id: uuidv4(),
      name: "Alex Johnson",
      email: "alex@example.com",
      company: "Acme Corporation",
      phone: "+1 (555) 123-4567",
      initials: "AJ"
    };
    
    // Save to localStorage
    localStorage.setItem('acmetravel_user', JSON.stringify(defaultUser));
    return defaultUser;
  });

  const updateUser = (updates: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...updates };
    
    // If name is updated, update initials
    if (updates.name) {
      const nameParts = updates.name.split(' ');
      const initials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0].substring(0, 2);
      
      updatedUser.initials = initials.toUpperCase();
    }
    
    setUser(updatedUser);
    localStorage.setItem('acmetravel_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

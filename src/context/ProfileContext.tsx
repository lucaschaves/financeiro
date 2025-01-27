import React, { createContext, useContext, useState } from 'react';
import { ProfileType, Profile } from '../types';

const profiles: Profile[] = [
  {
    id: 'personal',
    name: 'Pessoal',
    description: 'Finanças pessoais',
  },
  {
    id: 'yoma',
    name: 'Yoma',
    description: 'Finanças da empresa Yoma',
  },
  {
    id: 'mou',
    name: 'MOU',
    description: 'Finanças da empresa MOU',
  },
];

interface ProfileContextType {
  currentProfile: ProfileType;
  setCurrentProfile: (profile: ProfileType) => void;
  profiles: Profile[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<ProfileType>('personal');

  return (
    <ProfileContext.Provider
      value={{
        currentProfile,
        setCurrentProfile,
        profiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
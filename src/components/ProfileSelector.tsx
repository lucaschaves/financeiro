import React from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, User, Building2 } from 'lucide-react';

export function ProfileSelector() {
  const { currentProfile, setCurrentProfile, profiles } = useProfile();

  const getIcon = (profileId: string) => {
    switch (profileId) {
      case 'personal':
        return <User size={20} />;
      case 'yoma':
        return <Briefcase size={20} />;
      case 'mou':
        return <Building2 size={20} />;
      default:
        return null;
    }
  };

  return (
    <ButtonGroup variant="flat" className="mr-4">
      {profiles.map((profile) => (
        <Button
          key={profile.id}
          size="lg"
          startContent={getIcon(profile.id)}
          variant={currentProfile === profile.id ? 'solid' : 'flat'}
          color={currentProfile === profile.id ? 'primary' : 'default'}
          onPress={() => setCurrentProfile(profile.id as any)}
          className="px-6"
        >
          {profile.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
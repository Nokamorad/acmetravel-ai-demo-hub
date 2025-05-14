
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plane, Hotel, Car, Calendar, Users, Search, Map, Bell, Settings, Menu, Home } from 'lucide-react';
import IconUploader from './IconUploader';
import { getAllCustomIcons, saveCustomIcon, clearAllCustomIcons } from '@/utils/iconManager';
import { toast } from '@/hooks/use-toast';

interface IconDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const IconManager = () => {
  const [customIcons, setCustomIcons] = useState<Record<string, string>>({});
  
  // Common icons used in the application
  const commonIcons: IconDefinition[] = [
    { id: 'plane', name: 'Flight', icon: <Plane /> },
    { id: 'hotel', name: 'Hotel', icon: <Hotel /> },
    { id: 'car', name: 'Car', icon: <Car /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar /> },
    { id: 'users', name: 'Users', icon: <Users /> },
    { id: 'search', name: 'Search', icon: <Search /> },
    { id: 'map', name: 'Map', icon: <Map /> },
    { id: 'bell', name: 'Notifications', icon: <Bell /> },
    { id: 'settings', name: 'Settings', icon: <Settings /> },
    { id: 'menu', name: 'Menu', icon: <Menu /> },
    { id: 'home', name: 'Home', icon: <Home /> },
  ];
  
  // Navigation icons
  const navIcons: IconDefinition[] = [
    { id: 'nav-home', name: 'Home Nav', icon: <Home /> },
    { id: 'nav-trips', name: 'Trips Nav', icon: <Plane /> },
    { id: 'nav-bookings', name: 'Bookings Nav', icon: <Calendar /> },
    { id: 'nav-team', name: 'Team Nav', icon: <Users /> },
    { id: 'nav-settings', name: 'Settings Nav', icon: <Settings /> },
  ];
  
  // Load custom icons from localStorage on component mount
  useEffect(() => {
    setCustomIcons(getAllCustomIcons());
  }, []);
  
  const handleIconUpload = (iconId: string, iconUrl: string) => {
    if (iconUrl) {
      setCustomIcons(prev => ({ ...prev, [iconId]: iconUrl }));
    } else {
      // Remove icon
      setCustomIcons(prev => {
        const updated = { ...prev };
        delete updated[iconId];
        return updated;
      });
    }
  };
  
  const handleResetAllIcons = () => {
    if (confirm('Are you sure you want to reset all custom icons? This cannot be undone.')) {
      clearAllCustomIcons();
      setCustomIcons({});
      toast({
        title: "Icons reset",
        description: "All custom icons have been reset to defaults",
      });
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Icon Manager</CardTitle>
        <CardDescription>
          Upload custom icons to replace the default icons used throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="common">
          <TabsList className="mb-6">
            <TabsTrigger value="common">Common Icons</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Icons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="common">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {commonIcons.map((iconDef) => (
                <div key={iconDef.id} className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">{iconDef.name}</p>
                  <IconUploader 
                    iconId={iconDef.id}
                    currentIcon={customIcons[iconDef.id]}
                    onUpload={handleIconUpload}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="navigation">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {navIcons.map((iconDef) => (
                <div key={iconDef.id} className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">{iconDef.name}</p>
                  <IconUploader 
                    iconId={iconDef.id}
                    currentIcon={customIcons[iconDef.id]}
                    onUpload={handleIconUpload}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t flex justify-end">
          <Button 
            variant="destructive" 
            onClick={handleResetAllIcons}
            className="text-sm"
          >
            Reset All Icons
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IconManager;

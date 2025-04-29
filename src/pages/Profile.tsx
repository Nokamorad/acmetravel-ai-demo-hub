
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { UserIcon, BellIcon, KeyIcon, GlobeIcon } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const Profile = () => {
  const { toast } = useToast();
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567"
  });
  
  // Preferences state
  const [preferences, setPreferences] = useState({
    travelFrequency: "frequent",
    notifications: true,
    marketingEmails: false,
    travelAlerts: true,
    locationServices: true
  });
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle preference changes
  const handlePreferenceChange = (name: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    });
    
    // In a real app, this would save to a backend
    console.log("Profile saved with settings:", { profileForm, preferences });
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-acme-gray-dark">Profile & Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Profile Information - Pendo Target */}
          <Card data-pendo-id="profile-info-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-acme-purple" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileForm.name} 
                      onChange={handleProfileChange} 
                      data-pendo-id="profile-input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileForm.email} 
                      onChange={handleProfileChange} 
                      data-pendo-id="profile-input-email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={profileForm.company} 
                      onChange={handleProfileChange} 
                      data-pendo-id="profile-input-company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileForm.phone} 
                      onChange={handleProfileChange} 
                      data-pendo-id="profile-input-phone"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Travel Preferences - Pendo Orchestrate Target */}
          <Card data-pendo-id="travel-preferences-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GlobeIcon className="h-5 w-5 mr-2 text-acme-purple" />
                Travel Preferences
              </CardTitle>
              <CardDescription>Set your travel style and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Travel Frequency</Label>
                  <RadioGroup 
                    value={preferences.travelFrequency} 
                    onValueChange={(value) => handlePreferenceChange('travelFrequency', value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="frequent" 
                        id="frequent"
                        data-pendo-id="travel-frequency-frequent"
                      />
                      <Label htmlFor="frequent" className="cursor-pointer">
                        Frequent (Weekly or biweekly travel)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="regular" 
                        id="regular"
                        data-pendo-id="travel-frequency-regular"
                      />
                      <Label htmlFor="regular" className="cursor-pointer">
                        Regular (1-2 times per month)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="occasional" 
                        id="occasional"
                        data-pendo-id="travel-frequency-occasional"
                      />
                      <Label htmlFor="occasional" className="cursor-pointer">
                        Occasional (Quarterly or less)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label>Travel Agent Preferences</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="location-services" className="cursor-pointer">
                        Enable location services for better recommendations
                      </Label>
                      <Switch 
                        id="location-services" 
                        checked={preferences.locationServices} 
                        onCheckedChange={(checked) => handlePreferenceChange('locationServices', checked)}
                        data-pendo-id="preference-location-services"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Notification Settings - Pendo Target */}
          <Card data-pendo-id="notification-settings-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="h-5 w-5 mr-2 text-acme-purple" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how and when we contact you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Push notifications for itinerary updates
                  </Label>
                  <Switch 
                    id="notifications" 
                    checked={preferences.notifications} 
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                    data-pendo-id="preference-push-notifications"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="cursor-pointer">
                    Marketing emails and special offers
                  </Label>
                  <Switch 
                    id="marketing" 
                    checked={preferences.marketingEmails} 
                    onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
                    data-pendo-id="preference-marketing-emails"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="travel-alerts" className="cursor-pointer">
                    Travel alerts and safety notifications
                  </Label>
                  <Switch 
                    id="travel-alerts" 
                    checked={preferences.travelAlerts} 
                    onCheckedChange={(checked) => handlePreferenceChange('travelAlerts', checked)}
                    data-pendo-id="preference-travel-alerts"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Security Settings - Pendo Target */}
          <Card data-pendo-id="security-settings-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="h-5 w-5 mr-2 text-acme-purple" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  For security purposes, password changes require email verification.
                </p>
                <Button 
                  variant="outline"
                  data-pendo-id="change-password-button"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline"
            data-pendo-id="cancel-profile-changes"
          >
            Cancel
          </Button>
          <Button 
            className="bg-acme-purple hover:bg-acme-purple-dark text-white"
            onClick={handleSave}
            data-pendo-id="save-profile-changes"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

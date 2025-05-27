
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  History, 
  User, 
  Settings, 
  HelpCircle, 
  Compass, 
  MapPin,
  Plane
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/components/ui/badge";

const AppSidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  
  const trips = [
    {
      id: 1,
      destination: "San Francisco",
      country: "🇺🇸",
      date: "May 15-19",
      status: "upcoming"
    },
    {
      id: 2,
      destination: "Austin",
      country: "🇺🇸", 
      date: "Jun 3-7",
      status: "pending"
    },
    {
      id: 3,
      destination: "Denver",
      country: "🇺🇸",
      date: "Jun 22-25", 
      status: "booked"
    }
  ];

  const tripsNavigation = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Book Trip", url: "/book", icon: Plane },
    { title: "Hotels", url: "/hotels", icon: MapPin },
  ];

  const generalNavigation = [
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Help", url: "/help", icon: HelpCircle },
  ];

  const discoverNavigation = [
    { title: "Explore", url: "/explore", icon: Compass },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-gray-100">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-sky-blue text-white text-sm font-medium">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {user.preferences?.planLevel || "Free"} Plan
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {/* Current Trips */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Current Trips
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {trips.map((trip) => (
                <div key={trip.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-lg">{trip.country}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{trip.destination}</p>
                    <p className="text-xs text-gray-500">{trip.date}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    trip.status === 'upcoming' ? 'bg-sky-blue' : 
                    trip.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Sections */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Trips
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tripsNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Discover
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discoverNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

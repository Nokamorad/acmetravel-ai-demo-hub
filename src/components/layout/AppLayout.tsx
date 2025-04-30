
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home as HomeIcon, 
  PlusCircle as PlusCircleIcon, 
  Calendar as CalendarIcon, 
  User as UserIcon, 
  HelpCircle as HelpCircleIcon, 
  MessageSquare as MessageSquareIcon
} from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const { user } = useUser();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/book', label: 'Book Trip', icon: PlusCircleIcon },
    { path: '/trip', label: 'Trip Summary', icon: CalendarIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
    { path: '/support', label: 'Help', icon: HelpCircleIcon },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-acme-gray-dark">
                <span className="text-acme-purple">Acme</span>Travel
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex mx-4 space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`py-1 px-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-acme-purple border-b-2 border-acme-purple'
                    : 'text-gray-600 hover:text-acme-purple'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex text-gray-600"
            >
              Need help?
            </Button>
            
            <div className="flex items-center gap-2 border rounded-full px-2 py-1 bg-gray-50">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-acme-purple text-white text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden md:inline">{user.name}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex flex-col items-center py-2 px-3 ${
                  location.pathname === item.path
                    ? 'text-acme-purple'
                    : 'text-gray-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Chat Button (Mobile) */}
      <div className="md:hidden fixed right-4 bottom-20 z-50">
        <Button 
          size="icon"
          className="rounded-full w-12 h-12 bg-acme-pink hover:bg-opacity-90 text-white shadow-lg"
        >
          <MessageSquareIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AppLayout;

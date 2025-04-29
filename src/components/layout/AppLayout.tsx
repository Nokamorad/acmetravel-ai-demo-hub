
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  HomeIcon, 
  PlusCircleIcon, 
  CalendarIcon, 
  UserIcon, 
  HelpCircleIcon, 
  MessageSquareIcon,
  SearchIcon
} from "lucide-react";
import PendoIntegration from "@/components/pendo/PendoIntegration";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
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
                data-pendo-id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
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
              data-pendo-id="need-help"
            >
              Need help?
            </Button>
            
            <div className="flex items-center gap-2 border rounded-full px-2 py-1 bg-gray-50">
              <span className="text-sm font-medium">TR</span>
              <span className="text-sm hidden md:inline">Tamara Richards</span>
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
          data-pendo-id="chat-with-travel-agent-mobile"
        >
          <MessageSquareIcon className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Pendo Integration */}
      <PendoIntegration />
    </div>
  );
};

export default AppLayout;

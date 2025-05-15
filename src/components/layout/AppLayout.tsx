
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  PlusCircle, 
  Calendar, 
  User, 
  HelpCircle,
  MessageSquare,
  Briefcase,
  Building,
} from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: Home
    }, 
    {
      path: '/book',
      label: 'Book Trip',
      icon: PlusCircle
    },
    {
      path: '/hotels',
      label: 'Hotels',
      icon: Building
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: User
    }, 
    {
      path: '/help',
      label: 'Help',
      icon: HelpCircle
    }
  ];

  const handleLogoClick = () => {
    // Reset the session by navigating to the Boogle search page
    navigate('/', { replace: true });
    
    // Track this action in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Session Reset');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-pendo-id="app-layout-container">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 py-2 px-4" data-pendo-id="app-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              onClick={handleLogoClick} 
              className="flex items-center cursor-pointer" 
              data-pendo-id="header-logo-reset"
            >
              <img src="/lovable-uploads/94fc1222-b3c9-466e-9661-f121af7fdcec.png" alt="Voyagr Logo" className="h-8 w-auto mr-2" />
              <span className="hidden sm:flex items-center">
                <span className="text-lg font-header font-medium text-midnight-navy">Voyagr</span>
                <span className="text-sm font-header text-gray-500 ml-1">by AcmeCorp</span>
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex mx-4 space-x-6" data-pendo-id="header-navigation">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`py-1 px-2 text-sm font-medium ${
                  location.pathname === item.path 
                    ? 'text-sky-blue border-b-2 border-sky-blue' 
                    : 'text-gray-600 hover:text-sky-blue'
                }`} 
                data-pendo-id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <Briefcase className="h-4 w-4 text-sky-blue" />
              <span className="text-sm font-medium">Business Travel</span>
            </div>
            
            <Button variant="outline" size="sm" className="hidden md:flex text-gray-600" data-pendo-id="header-help-button">
              Menu
            </Button>
            
            <div className="flex items-center gap-2 border rounded-full px-2 py-1 bg-gray-50" data-pendo-id="user-profile-avatar">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-sky-blue text-white text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden md:inline">{user.name}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" data-pendo-id="mobile-navigation">
          <div className="flex items-center justify-around">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex flex-col items-center py-2 px-3 ${
                  location.pathname === item.path ? 'text-sky-blue' : 'text-gray-600'
                }`} 
                data-pendo-id={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0" data-pendo-id="main-content">
          {children}
        </main>
      </div>
      
      {/* Chat Button (Mobile) */}
      <div className="md:hidden fixed right-4 bottom-20 z-50">
        <Button size="icon" className="rounded-full w-12 h-12 bg-sunset-coral hover:bg-opacity-90 text-white shadow-lg" data-pendo-id="mobile-chat-button">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AppLayout;

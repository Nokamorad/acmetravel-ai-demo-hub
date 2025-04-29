
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  HomeIcon, 
  PlusCircleIcon, 
  ListIcon, 
  UserIcon, 
  HelpCircleIcon, 
  MessageSquareIcon 
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
    { path: '/trip', label: 'Trip Summary', icon: ListIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
    { path: '/support', label: 'Support', icon: HelpCircleIcon },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-acme-gray-dark">
              <span className="text-acme-purple">Acme</span>Travel
            </span>
          </Link>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-acme-purple text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  data-pendo-id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-4 border-t border-gray-200">
          <Button 
            className="w-full flex items-center bg-acme-pink hover:bg-opacity-90 text-white"
            data-pendo-id="chat-with-travel-agent"
          >
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Chat with Travel Agent
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-grow p-6">
        {children}
      </main>
      
      {/* Pendo Integration */}
      <PendoIntegration />
    </div>
  );
};

export default AppLayout;

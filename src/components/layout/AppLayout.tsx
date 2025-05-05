import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home as HomeIcon, PlusCircle as PlusCircleIcon, Calendar as CalendarIcon, User as UserIcon, HelpCircle as HelpCircleIcon, MessageSquare as MessageSquareIcon } from "lucide-react";
interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({
  children
}: AppLayoutProps) => {
  const location = useLocation();
  const {
    user
  } = useUser();
  const navItems = [{
    path: '/',
    label: 'Dashboard',
    icon: HomeIcon
  }, {
    path: '/book',
    label: 'Book Trip',
    icon: PlusCircleIcon
  }, {
    path: '/trip',
    label: 'Trip Summary',
    icon: CalendarIcon
  }, {
    path: '/profile',
    label: 'Profile',
    icon: UserIcon
  }, {
    path: '/support',
    label: 'Help',
    icon: HelpCircleIcon
  }];
  return <div className="min-h-screen flex flex-col bg-gray-50" data-pendo-id="app-layout-container">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 py-2 px-4" data-pendo-id="app-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" data-pendo-id="header-logo">
              <img alt="Voyagr Logo" src="/lovable-uploads/9b2112ab-cd15-4128-b9ee-bed226acc140.png" className="h-12 object-fill" />
            </Link>
          </div>
          
          <nav className="hidden md:flex mx-4 space-x-6" data-pendo-id="header-navigation">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`py-1 px-2 text-sm font-medium ${location.pathname === item.path ? 'text-sky-blue border-b-2 border-sky-blue' : 'text-gray-600 hover:text-sky-blue'}`} data-pendo-id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {item.label}
              </Link>)}
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex text-gray-600" data-pendo-id="header-help-button">Menu</Button>
            
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
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" data-pendo-id="mobile-navigation">
          <div className="flex items-center justify-around">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`flex flex-col items-center py-2 px-3 ${location.pathname === item.path ? 'text-sky-blue' : 'text-gray-600'}`} data-pendo-id={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>)}
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto" data-pendo-id="main-content">
          {children}
        </main>
      </div>
      
      {/* Chat Button (Mobile) */}
      <div className="md:hidden fixed right-4 bottom-20 z-50">
        <Button size="icon" className="rounded-full w-12 h-12 bg-sunset-coral hover:bg-opacity-90 text-white shadow-lg" data-pendo-id="mobile-chat-button">
          <MessageSquareIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>;
};
export default AppLayout;
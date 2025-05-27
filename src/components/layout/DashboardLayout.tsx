
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/94fc1222-b3c9-466e-9661-f121af7fdcec.png" alt="Voyagr Logo" className="h-6 w-auto" />
              <span className="text-lg font-medium text-gray-900">Voyagr</span>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

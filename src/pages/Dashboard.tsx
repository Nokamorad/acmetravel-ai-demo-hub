
import DashboardLayout from "@/components/layout/DashboardLayout";
import MainDashboard from "@/components/features/dashboard/MainDashboard";
import ItineraryPanel from "@/components/features/dashboard/ItineraryPanel";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">
        {/* Main Content */}
        <div className="flex-1">
          <MainDashboard />
        </div>
        
        {/* Right Panel */}
        <div className="hidden xl:block">
          <ItineraryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;


import AppLayout from "@/components/layout/AppLayout";
import DashboardContent from "@/components/features/DashboardContent";
import UpcomingTrips from "@/components/features/dashboard/UpcomingTrips";
import BookingTabs from "@/components/features/dashboard/BookingTabs";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Main Dashboard Content and Book Travel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardContent />
          </div>
          <div>
            <Card className="border-sky-blue/10">
              <BookingTabs />
            </Card>
          </div>
        </div>
        
        {/* Upcoming Trips - Full Width */}
        <UpcomingTrips />
      </div>
    </AppLayout>
  );
};

export default Dashboard;

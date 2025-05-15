
import AppLayout from "@/components/layout/AppLayout";
import DashboardContent from "@/components/features/DashboardContent";
import UpcomingTrips from "@/components/features/dashboard/UpcomingTrips";
import BookingTabs from "@/components/features/dashboard/BookingTabs";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2">
          <DashboardContent />
        </div>
        <div className="space-y-6">
          <UpcomingTrips />
          <Card className="border-sky-blue/10">
            <BookingTabs />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

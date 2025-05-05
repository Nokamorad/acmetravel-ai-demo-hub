
import WelcomeHeader from "./dashboard/WelcomeHeader";
import StatCards from "./dashboard/StatCards";
import UpcomingTrips from "./dashboard/UpcomingTrips";
import FeaturedDestinations from "./dashboard/FeaturedDestinations";

const DashboardContent = () => {
  return (
    <div className="p-4 md:p-6 space-y-6" data-pendo-id="dashboard-content">
      {/* Welcome Section */}
      <WelcomeHeader />
      
      {/* Stats Overview */}
      <StatCards />
      
      {/* Recent and Upcoming Trips */}
      <div className="grid grid-cols-1 gap-6">
        {/* Upcoming Trips */}
        <UpcomingTrips />
      </div>

      {/* Featured Destinations */}
      <FeaturedDestinations />
    </div>
  );
};

export default DashboardContent;

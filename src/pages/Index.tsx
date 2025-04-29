
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import FeatureSection from "@/components/features/FeatureSection";
import UseCaseDetails from "@/components/features/UseCaseDetails";
import FeatureShowcase from "@/components/demo/FeatureShowcase";
import Footer from "@/components/layout/Footer";
import PendoIntegration from "@/components/pendo/PendoIntegration";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeatureSection 
          title="Discover the Power of Travel Agent"
          description="Explore how our AI assistant enhances the travel experience across three key journeys: onboarding, support, and personalized recommendations."
        />
        
        <UseCaseDetails />
        
        <FeatureShowcase />
        
        {/* Pendo Integration Component */}
        <PendoIntegration />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

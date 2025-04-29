
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import FeatureSection from "@/components/features/FeatureSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeatureSection 
          title="Discover the Power of Travel Agent"
          description="Explore three powerful ways our AI assistant enhances the travel experience, from onboarding to support and personalized recommendations."
        />
        
        {/* Pendo snippet placeholder - This comment is for the Pendo snippet that will be added later */}
        
        {/* You can add additional sections here as needed */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-acme-gray-dark leading-tight mb-4">
              Meet <span className="text-acme-purple">Travel Agent</span>,<br />
              your AI business travel assistant
            </h1>
            <p className="text-lg md:text-xl text-acme-gray mb-8 max-w-lg">
              Enhance onboarding, support, and the entire travel experience with our 
              AI-powered assistant that makes business travel simpler and more efficient.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                onClick={() => document.getElementById('features')?.scrollIntoView()}
              >
                Explore Demo Cases
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-acme-purple text-acme-purple hover:bg-acme-purple/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute -left-8 -top-8 w-40 h-40 bg-acme-purple-light/30 rounded-full filter blur-2xl animate-pulse-soft"></div>
              <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-acme-pink-light/30 rounded-full filter blur-xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
              <div className="glass-card rounded-xl p-6 relative z-10 shadow-lg animate-float">
                <div className="bg-acme-purple/10 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-acme-purple mb-2">Travel Agent Assistant</h3>
                  <p className="text-sm text-gray-700">
                    "I can help you book flights, find hotels, manage expenses, and answer any travel policy questions you might have."
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm text-gray-600">Online and ready to assist</p>
                </div>
                <Button className="w-full bg-acme-pink hover:bg-opacity-90 text-white">
                  Ask Travel Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

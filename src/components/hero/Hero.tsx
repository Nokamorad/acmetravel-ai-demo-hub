
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-block px-4 py-1.5 bg-sky-blue/10 rounded-full text-sky-blue font-medium text-sm mb-4">
              Demo Experience
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-navy leading-tight mb-4 font-header">
              Meet <span className="text-sky-blue">Travel Agent</span>,<br />
              your AI business travel assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Discover how Voyagr uses Pendo to power intelligent experiences across onboarding, support, and revenue growth — all through the lens of an AI travel assistant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-sky-blue hover:bg-sky-blue/90 text-white"
                data-pendo-id="hero-primary-cta"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Use Cases
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-sky-blue text-sky-blue hover:bg-sky-blue/10"
                data-pendo-id="hero-demo-walkthrough"
                onClick={() => {
                  if ((window as any).simulatePendoGuide) {
                    (window as any).simulatePendoGuide('product-walkthrough');
                  }
                }}
              >
                Watch Demo Walkthrough
              </Button>
            </div>
            
            <div className="flex items-center mt-8">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              </div>
              <span className="ml-2 text-sm text-gray-600">Join 2,500+ travel managers using Travel Agent</span>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute -left-8 -top-8 w-40 h-40 bg-sky-blue/30 rounded-full filter blur-2xl animate-pulse-soft"></div>
              <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-sunset-coral/30 rounded-full filter blur-xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
              
              <div className="glass-card rounded-xl p-6 relative z-10 shadow-lg animate-float" data-pendo-id="chat-preview-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-sky-blue rounded-full"></div>
                    <div className="w-3 h-3 bg-sunset-coral rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Voyagr Platform</div>
                </div>
                
                <div className="bg-sky-blue/10 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-sky-blue mb-2">Travel Agent Assistant</h3>
                  <p className="text-sm text-gray-700">
                    "I can help you book flights, find hotels, manage expenses, and answer any travel policy questions you might have."
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="text-sm font-medium">You</div>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    I need to book a flight to San Francisco next week
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600">Travel Agent is thinking...</p>
                </div>
                
                <Button 
                  className="w-full bg-sunset-coral hover:bg-sunset-coral/90 text-white"
                  data-pendo-id="chat-demo-button"
                  onClick={() => {
                    if ((window as any).simulatePendoGuide) {
                      (window as any).simulatePendoGuide('chat-experience');
                    }
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat with Travel Agent
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

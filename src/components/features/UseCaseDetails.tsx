
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UseCaseDetails = () => {
  const useCases = [
    {
      id: "onboarding",
      title: "User Onboarding — Setting Up Success",
      description: "Focus on how the first experience sets the tone for user retention. In the travel industry, trust and ease at first use is everything.",
      keyFeatures: [
        "Web Analytics — Understanding the entire journey, not just the in-app view",
        "Orchestrate Branching — Personalized onboarding paths based on user data",
        "Marketo Integration — Omnichannel engagement beyond the app",
        "Embedded Guides — In-product help where and when it's needed"
      ],
      demoFlow: [
        "Track visitors coming from ads or marketing pages with UTM parameters",
        "Create dynamic onboarding journeys based on travel frequency",
        "Trigger an onboarding email when the user creates their first itinerary",
        "Provide embedded tips guiding users to book their first trip"
      ],
      keyTakeaway: "Pendo provides data-driven, cross-channel onboarding experiences that adapt to each traveler's needs, builds instant trust, and sets the foundation for long-term retention.",
      ctaLink: "#onboarding-demo",
      color: "purple"
    },
    {
      id: "support",
      title: "Reduce Support Costs — Proactively Solve Problems",
      description: "Travel is stressful — small moments of friction can spiral into major dissatisfaction. AcmeTravel uses Pendo to detect and solve issues before users even need to reach out.",
      keyFeatures: [
        "Listen Explore + Zendesk Integration — Find common pain points",
        "Frustration Metrics in Data Explorer — Quantify friction early",
        "Session Replay Collaboration — Visualize issues quickly",
        "CSAT Surveys — Close the loop with users after fixes"
      ],
      demoFlow: [
        "Automatically surface top support themes like flight rescheduling issues",
        "Detect rage clicks in the rescheduling journey",
        "Watch session replays of frustrated users and create AI-summarized bug tickets",
        "Deploy lightweight CSAT surveys to measure improvement impact"
      ],
      keyTakeaway: "You don't have to wait for support calls or angry reviews to learn what's broken — proactive detection and AI triage makes support scalable and less reactive.",
      ctaLink: "#support-demo",
      color: "pink"
    },
    {
      id: "upsell",
      title: "Drive Cross-sell — Growing Wallet Share",
      description: "A successful travel app doesn't just book flights — it becomes the one place users turn to for all travel needs. AcmeTravel uses Pendo to build an intelligent cross-sell engine.",
      keyFeatures: [
        "PMF Surveys — Identify your champions for targeted offers",
        "Embedded Guides for Upsell — Present relevant offers naturally",
        "Experiments — A/B test different upsell strategies",
        "Web Analytics — Track and optimize conversion paths"
      ],
      demoFlow: [
        "Use PMF survey results to find highly satisfied users",
        "Display smart upsell prompts like hotel suggestions post-flight booking",
        "A/B test different cross-sell messages between hotels vs rental cars",
        "Analyze post-flight conversion rates into hotel or car bookings"
      ],
      keyTakeaway: "Intelligent cross-sell isn't a shot in the dark — it's targeted, tested, and measured end-to-end.",
      ctaLink: "#upsell-demo",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-acme-gray-dark mb-4">Explore Each Demo Use Case</h2>
          <p className="text-acme-gray text-lg max-w-3xl mx-auto">
            Discover how Travel Agent and Pendo work together to power three key journeys at AcmeTravel.
          </p>
        </div>
        
        <div className="space-y-16">
          {useCases.map((useCase, index) => (
            <div 
              id={useCase.id} 
              key={useCase.id}
              className={`scroll-mt-20 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/2">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                    useCase.color === 'purple' ? 'text-acme-purple' : 'text-acme-pink'
                  }`}>
                    {useCase.title}
                  </h3>
                  
                  <p className="text-lg text-acme-gray-dark mb-6">
                    {useCase.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-semibold text-xl mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {useCase.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`mr-2 mt-1 ${
                            useCase.color === 'purple' ? 'text-acme-purple' : 'text-acme-pink'
                          }`}>
                            <Check className="w-5 h-5" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Card className="mb-6 border-t-4 border-t-acme-purple">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-2">Demo Flow:</h4>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        {useCase.demoFlow.map((step, i) => (
                          <li key={i} className="text-sm text-acme-gray-dark">{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                  
                  <div className="p-4 rounded-lg bg-gray-100 mb-6">
                    <h4 className="font-semibold mb-1">Key Takeaway:</h4>
                    <p className="italic text-acme-gray-dark">{useCase.keyTakeaway}</p>
                  </div>
                  
                  <Button 
                    className={`${
                      useCase.color === 'purple' 
                        ? 'bg-acme-purple hover:bg-acme-purple-dark' 
                        : 'bg-acme-pink hover:bg-opacity-90'
                    } text-white`}
                    size="lg"
                    data-pendo-id={`start-${useCase.id}-demo`}
                    onClick={() => window.open(useCase.ctaLink, '_blank')}
                  >
                    Start {useCase.id.charAt(0).toUpperCase() + useCase.id.slice(1)} Demo
                  </Button>
                </div>
                
                <div className="lg:w-1/2">
                  <div className={`rounded-lg overflow-hidden shadow-lg h-72 md:h-96 p-8 ${
                    useCase.color === 'purple' 
                      ? 'bg-acme-purple/10 border border-acme-purple/30' 
                      : 'bg-acme-pink/10 border border-acme-pink/30'
                  }`}>
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <h4 className={`text-xl font-semibold mb-4 ${
                          useCase.color === 'purple' ? 'text-acme-purple' : 'text-acme-pink'
                        }`}>
                          {useCase.id === 'onboarding' && 'Personalized Onboarding Journey'}
                          {useCase.id === 'support' && 'Proactive Support Experience'}
                          {useCase.id === 'upsell' && 'Intelligent Cross-sell Engine'}
                        </h4>
                        <p className="text-acme-gray-dark">
                          {useCase.id === 'onboarding' && 'Interactive demo showing how Travel Agent adapts to user profiles'}
                          {useCase.id === 'support' && 'See how Travel Agent detects and resolves issues before they escalate'}
                          {useCase.id === 'upsell' && 'Experience contextual recommendations that drive conversion'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {index < useCases.length - 1 && (
                <div className="py-10">
                  <hr className="border-gray-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseDetails;

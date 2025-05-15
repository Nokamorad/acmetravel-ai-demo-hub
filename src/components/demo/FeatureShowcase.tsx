
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  // Simulate a guide launch (functionality kept for future implementation)
  const launchGuide = (guideId: string) => {
    console.log(`Launch guide: ${guideId}`);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-acme-gray-dark mb-4">
            Experience Travel Agent in Action
          </h2>
          <p className="text-acme-gray text-lg max-w-3xl mx-auto">
            Explore a simulated version of the AcmeTravel platform with Travel Agent integrated. 
            Click around to experience different features.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b">
              <div className="container px-6">
                <TabsList className="h-14 bg-transparent">
                  <TabsTrigger 
                    value="dashboard" 
                    className="data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple"
                  >
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="onboarding" 
                    className="data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple"
                  >
                    Onboarding
                  </TabsTrigger>
                  <TabsTrigger 
                    value="support" 
                    className="data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple"
                  >
                    Support
                  </TabsTrigger>
                  <TabsTrigger 
                    value="upsell" 
                    className="data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple"
                  >
                    Cross-sell
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="container p-6">
              <TabsContent value="dashboard" className="mt-0 pt-4">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="bg-acme-purple/5 p-5 rounded-lg mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Your Upcoming Trips</h3>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => launchGuide('new-trip-guide')}
                        >
                          + New Trip
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="relative">
                          <div className="absolute -right-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Upcoming
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">San Francisco Business Trip</h4>
                                <p className="text-sm text-gray-500">May 15-18, 2025</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">Flight + Hotel</div>
                                <div className="text-xs text-gray-500">2 travelers</div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                              >
                                Modify Trip
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="glass-card p-5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-acme-purple rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">TA</span>
                          </div>
                          <h3 className="font-semibold">Travel Agent</h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => launchGuide('travel-agent-intro')}
                        >
                          Need Help?
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm">
                          Welcome back! Looking to book your next trip? I can help you find flights,
                          hotels, and transportation options based on your preferences.
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-acme-purple hover:bg-acme-purple-dark"
                        >
                          Book a Flight
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          Book a Hotel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-white border rounded-lg p-5 mb-6">
                      <h3 className="font-semibold mb-3">Travel Insights</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Q2 Travel Budget</span>
                          <span className="text-sm font-medium">85% Used</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-acme-purple rounded-full" style={{width: '85%'}}></div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm">Bookings This Month</span>
                          <span className="text-sm font-medium">4</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Savings This Year</span>
                          <span className="text-sm font-medium">$2,450</span>
                        </div>
                      </div>
                    </div>
                    
                    <Card className="border-t-4 border-acme-pink mb-4">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-acme-purple mb-2">Travel Agent Tips</h4>
                        <p className="text-xs text-gray-600 mb-3">
                          Did you know you can ask Travel Agent to find you the best flight deals? 
                          Just mention your budget constraints.
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                        >
                          Got it
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Button 
                      className="w-full bg-acme-purple hover:bg-acme-purple-dark"
                      onClick={() => launchGuide('feature-tour')}
                    >
                      Explore All Features
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="onboarding" className="mt-0 pt-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-acme-purple">
                      Personalized Onboarding Journey
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Experience how Travel Agent adapts to different user profiles. 
                      Select a traveler type to see a tailored onboarding flow.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <Card className="border-l-4 border-acme-purple cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Frequent Business Traveler</h4>
                          <p className="text-sm text-gray-500">
                            Power user focused on efficiency and policy compliance
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-acme-pink cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Occasional Traveler</h4>
                          <p className="text-sm text-gray-500">
                            Needs extra guidance and reminders about process
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-gray-300 cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-medium">Travel Administrator</h4>
                          <p className="text-sm text-gray-500">
                            Books on behalf of others, manages team travel
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Button 
                      className="w-full bg-acme-purple hover:bg-acme-purple-dark"
                      onClick={() => launchGuide('onboarding-journey')}
                    >
                      Launch Onboarding Demo
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Orchestrate Branching Demo</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This showcases how different user journeys are created based on 
                      behavior and attributes.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 mb-4 border">
                      <h4 className="text-sm font-medium mb-2">Marketing Email Integration</h4>
                      <p className="text-xs text-gray-500 mb-3">
                        Select your preferred profile to see a sample onboarding email:
                      </p>
                      <div className="space-y-2">
                        <button 
                          className="text-left w-full bg-gray-50 hover:bg-gray-100 p-2 rounded text-sm"
                        >
                          View Frequent Traveler Email
                        </button>
                        <button 
                          className="text-left w-full bg-gray-50 hover:bg-gray-100 p-2 rounded text-sm"
                        >
                          View Occasional Traveler Email
                        </button>
                        <button 
                          className="text-left w-full bg-gray-50 hover:bg-gray-100 p-2 rounded text-sm"
                        >
                          View Administrator Email
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-acme-purple/10 p-4 rounded-lg">
                      <h4 className="font-medium text-acme-purple mb-2">Key Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Onboarding Completion</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full h-2 bg-white rounded-full">
                          <div className="h-2 bg-acme-purple rounded-full" style={{width: '78%'}}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">First Booking Rate</span>
                          <span className="text-sm font-medium">64%</span>
                        </div>
                        <div className="w-full h-2 bg-white rounded-full">
                          <div className="h-2 bg-acme-purple rounded-full" style={{width: '64%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="mt-0 pt-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-acme-pink">
                      Proactive Support Experience
                    </h3>
                    <p className="text-gray-600 mb-6">
                      See how Travel Agent detects and resolves issues before they escalate.
                    </p>
                    
                    <div className="bg-white border rounded-lg p-5 mb-6">
                      <h4 className="font-medium mb-4">Frustration Detection Demo</h4>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded p-3 relative">
                          <div className="absolute -right-2 -top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Issue Detected
                          </div>
                          
                          <h5 className="text-sm font-medium">Flight Rebooking Flow</h5>
                          <p className="text-xs text-gray-500 mb-2">
                            Rage clicks detected during change fee calculation
                          </p>
                          
                          <div className="flex justify-between text-xs">
                            <span>Impact: High</span>
                            <span>Affected Users: 38</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded p-3">
                          <h5 className="text-sm font-medium">Hotel Search</h5>
                          <p className="text-xs text-gray-500 mb-2">
                            Form errors when filtering by amenities
                          </p>
                          
                          <div className="flex justify-between text-xs">
                            <span>Impact: Medium</span>
                            <span>Affected Users: 12</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          className="w-full bg-acme-pink hover:bg-opacity-90 text-white"
                          onClick={() => launchGuide('session-replay-demo')}
                        >
                          View Session Replay
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Support Experience Feedback</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Please rate your recent experience with our support team.
                      </p>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button 
                            key={rating}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-acme-purple hover:text-white transition-colors flex items-center justify-center"
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">AI Bug Creation Demo</h3>
                    <div className="bg-white rounded-lg p-4 border mb-6">
                      <h4 className="text-sm font-medium">Session Replay Highlights</h4>
                      <div className="bg-gray-100 h-48 my-3 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">
                          [Session replay video would appear here]
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          Previous
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-acme-pink hover:bg-opacity-90"
                        >
                          Next Issue
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-acme-pink/10 p-4 rounded-lg">
                      <h4 className="font-medium text-acme-pink mb-2">AI Bug Summary</h4>
                      <div className="bg-white p-3 rounded border mb-3">
                        <h5 className="text-sm font-medium">Issue: Flight Rebooking Error</h5>
                        <p className="text-xs text-gray-600 my-2">
                          Users attempting to change flights are encountering errors when the system 
                          calculates change fees. UI shows NaN instead of actual fee amount.
                        </p>
                        <div className="text-xs text-gray-500">
                          <div>Steps to reproduce:</div>
                          <ol className="list-decimal ml-4 mt-1 space-y-1">
                            <li>Select existing flight reservation</li>
                            <li>Click "Change Flight"</li>
                            <li>Select new date and flight</li>
                            <li>Error occurs on fee calculation screen</li>
                          </ol>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        className="w-full bg-acme-pink hover:bg-opacity-90 text-white"
                      >
                        Create JIRA Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="upsell" className="mt-0 pt-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-acme-purple">
                      Intelligent Cross-sell Engine
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Experience how Travel Agent drives revenue through personalized 
                      recommendations and smart upsell opportunities.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">A/B Testing Demo</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        These hotel offers are being A/B tested to optimize conversion rates.
                        The system will show you one variant based on your user profile.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <Card className="overflow-hidden">
                          <div className="h-48 bg-gray-200">
                            <img 
                              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" 
                              alt="Hotel room" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Save 15% on Your Stay</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Book your hotel through AcmeTravel and save up to 15% compared to booking directly.
                            </p>
                            <Button className="w-full">
                              View Hotel Deals
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Product Market Fit Survey</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Help us understand how valuable AcmeTravel is to you.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="radio" id="very" name="pmf" className="mr-2" />
                          <label htmlFor="very" className="text-sm">Very disappointed</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="somewhat" name="pmf" className="mr-2" />
                          <label htmlFor="somewhat" className="text-sm">Somewhat disappointed</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="not" name="pmf" className="mr-2" />
                          <label htmlFor="not" className="text-sm">Not disappointed</label>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3 w-full">
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Cross-sell Performance</h3>
                    
                    <div className="bg-white rounded-lg p-4 border mb-6">
                      <h4 className="text-sm font-medium mb-3">Conversion Analytics</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Flight → Hotel Conversion</span>
                            <span className="text-xs font-medium">32%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-acme-purple rounded-full" style={{width: '32%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Flight → Car Rental Conversion</span>
                            <span className="text-xs font-medium">18%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-acme-pink rounded-full" style={{width: '18%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">Premium Tier Upgrades</span>
                            <span className="text-xs font-medium">14%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-acme-purple rounded-full" style={{width: '14%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <h4 className="text-sm font-medium mb-3">User Segmentation</h4>
                      <p className="text-xs text-gray-500 mb-3">
                        PMF survey results are used to target cross-sell opportunities:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-acme-purple/10 rounded">
                          <span className="text-xs">Very Disappointed</span>
                          <span className="text-xs font-medium text-acme-purple">42%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                          <span className="text-xs">Somewhat Disappointed</span>
                          <span className="text-xs font-medium">38%</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                          <span className="text-xs">Not Disappointed</span>
                          <span className="text-xs font-medium">20%</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-acme-purple hover:bg-acme-purple-dark text-white"
                        size="sm"
                      >
                        View Detailed PMF Results
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

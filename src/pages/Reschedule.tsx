import React, { useState, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar, AlertCircle, Bug } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Reschedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [newDepartDate, setNewDepartDate] = useState("");
  const [newReturnDate, setNewReturnDate] = useState("");
  
  // Current flight details
  const currentFlight = {
    origin: "San Francisco (SFO)",
    destination: "New York (NYC)",
    departDate: "2025-05-20",
    returnDate: "2025-05-27",
    flightNumber: "VY1234",
    confirmation: "ABC123"
  };
  
  // Set initial dates
  useEffect(() => {
    // Set new dates 1 day after current dates
    const departDate = new Date(currentFlight.departDate);
    departDate.setDate(departDate.getDate() + 1);
    
    const returnDate = new Date(currentFlight.returnDate);
    returnDate.setDate(returnDate.getDate() + 1);
    
    setNewDepartDate(departDate.toISOString().split('T')[0]);
    setNewReturnDate(returnDate.toISOString().split('T')[0]);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    setAttempts(prev => prev + 1);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Generate errors based on attempt number to cause frustration
      if (attempts === 0) {
        setError("Unable to connect to scheduling service. Please try again.");
      } else if (attempts === 1) {
        setError("These dates are not available. Please try different dates.");
      } else if (attempts === 2) {
        setError("Error code 5023: Session timeout. Please refresh and try again.");
      } else {
        // Success on 4th attempt
        toast({
          title: "Flight successfully rescheduled!",
          description: `Your flight has been changed to ${newDepartDate} - ${newReturnDate}`,
        });
        
        // Navigate to upsell page
        navigate('/upsell');
      }
    }, 2000);
  };
  
  const handleBugReport = () => {
    setShowDialog(true);
  };
  
  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-midnight-navy mb-6">Change Your Flight</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Current Itinerary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Flight</p>
              <p className="font-medium">{currentFlight.origin} → {currentFlight.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Confirmation</p>
              <p className="font-medium">{currentFlight.confirmation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Departure</p>
              <p className="font-medium">{currentFlight.departDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Return</p>
              <p className="font-medium">{currentFlight.returnDate}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Change Dates</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start" data-pendo-id="reschedule-error">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-sm text-red-600 mt-1">
                  Having trouble? <button 
                    className="text-blue-600 underline" 
                    onClick={handleBugReport}
                    data-pendo-id="submit-bug-button"
                  >
                    Submit a bug report
                  </button>
                </p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="newDepartDate" className="block text-sm font-medium mb-1">New Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="newDepartDate"
                    type="date" 
                    value={newDepartDate}
                    onChange={(e) => setNewDepartDate(e.target.value)}
                    className="pl-10"
                    data-pendo-id="new-depart-date"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="newReturnDate" className="block text-sm font-medium mb-1">New Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="newReturnDate"
                    type="date" 
                    value={newReturnDate}
                    onChange={(e) => setNewReturnDate(e.target.value)}
                    className="pl-10"
                    data-pendo-id="new-return-date"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-2"
                  onClick={() => navigate('/dashboard')}
                  data-pendo-id="cancel-reschedule"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-sky-blue hover:bg-sky-blue/90"
                  data-pendo-id="submit-reschedule"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : "Reschedule Flight"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
      
      {/* Bug Report Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Bug Report</DialogTitle>
            <DialogDescription>
              Our AI will analyze this issue and suggest a solution. Please provide details about what went wrong.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Issue Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md" data-pendo-id="bug-issue-type">
                <option>Unable to reschedule flight</option>
                <option>System error</option>
                <option>Date selection issue</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-20" 
                placeholder="Please describe what happened..."
                defaultValue={`I tried to reschedule my flight but got this error: ${error}`}
                data-pendo-id="bug-description"
              ></textarea>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> In a real app, this would collect debugging information automatically. For this demo, just click Submit.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
              data-pendo-id="cancel-bug-report"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowDialog(false);
                toast({
                  title: "Bug report submitted",
                  description: "Our team will look into this issue. Thank you!",
                });
                
                // Track bug submission with Pendo
                if ((window as any).pendo && (window as any).pendo.track) {
                  (window as any).pendo.track('Bug Report Submitted');
                }
              }}
              className="bg-sky-blue hover:bg-sky-blue/90"
              data-pendo-id="submit-bug-report"
            >
              <Bug className="mr-2 h-4 w-4" />
              Submit Bug Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Reschedule;

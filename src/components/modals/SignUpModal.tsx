
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("demo.engineering+alexjohnson@pendo.io");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Track signup started
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Signup Started');
    }
    
    // Update the user in context
    updateUser({
      name,
      email
    });
    
    // Reinitialize Pendo visitor with real user data
    const cleanName = name.toLowerCase().replace(/\s+/g, '');
    if ((window as any).pendo) {
      console.log('Reinitializing Pendo with user data:', { id: `demo-${cleanName}`, email, name });
      (window as any).pendo.initialize({
        visitor: {
          id: `demo-${cleanName}`,
          email: email,
          full_name: name
        },
        account: {
          id: "demo-account"
        }
      });
    }
    
    // Track signup completed
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Signup Completed');
    }
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to Voyagr. You're now signed in.",
      });
      
      setLoading(false);
      onClose();
      
      // If onSuccess callback is provided, use it, otherwise navigate to book page
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => !loading && onClose()}>
      <DialogContent className="sm:max-w-md" data-pendo-id="signup-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Create your Voyagr account</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Join Voyagr to book your business trip to New York
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              data-pendo-id="signup-name-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              data-pendo-id="signup-email-input"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-sky-blue hover:bg-sky-blue/90"
              disabled={loading}
              data-pendo-id="signup-submit-button"
            >
              {loading ? "Creating Account..." : "Create Account & Continue"}
            </Button>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;

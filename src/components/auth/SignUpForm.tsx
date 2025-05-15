
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const DEFAULT_EMAIL = "demo.engineering+voyagr@pendo.io";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  frequency: z.string().min(1, { message: "Please select travel frequency." }),
});

type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const { toast } = useToast();
  const { updateUser } = useUser();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: DEFAULT_EMAIL,
      company: "Acme Corporation",
      frequency: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form submitted with:", data);
      
      // Update the user in context
      updateUser({
        name: data.name,
        email: data.email,
        company: data.company
      });
      
      // Reinitialize Pendo visitor with real user data
      const cleanName = data.name.toLowerCase().replace(/\s+/g, '');
      if ((window as any).pendo) {
        console.log('Reinitializing Pendo with user data:', { 
          id: `demo-${cleanName}`, 
          email: data.email, 
          name: data.name,
          company: data.company,
          travel_frequency: data.frequency
        });
        
        (window as any).pendo.initialize({
          visitor: {
            id: `demo-${cleanName}`,
            email: data.email,
            full_name: data.name,
            travel_frequency: data.frequency
          },
          account: {
            id: data.company.toLowerCase().replace(/\s+/g, '-'),
            name: data.company
          }
        });
      }
      
      // Track signup completed
      if ((window as any).pendo && (window as any).pendo.track) {
        (window as any).pendo.track('Signup Completed');
      }
      
      // Store user data for Pendo tracking
      localStorage.setItem("signupEmail", data.email);
      localStorage.setItem("signupName", data.name);
      localStorage.setItem("signupCompany", data.company);
      localStorage.setItem("signupFrequency", data.frequency);
      
      // Show notification toast for email
      toast({
        title: "New Email Received",
        description: "You have a welcome email from Voyagr",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/inbox")}
            data-pendo-id="email-notification-button"
          >
            View Email
          </Button>
        ),
      });
      
      // Call the success callback
      setTimeout(() => {
        onSignUpSuccess();
      }, 1000);
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const frequencyOptions = [
    "Daily", 
    "Weekly", 
    "Monthly",
    "Quarterly",
    "Yearly"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-pendo-id="signup-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} data-pendo-id="signup-name-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.name@company.com" {...field} data-pendo-id="signup-email-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company name" {...field} data-pendo-id="signup-company-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} data-pendo-id="signup-frequency-select">
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="How often do you travel?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {frequencyOptions.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white py-6 rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg font-medium"
            disabled={form.formState.isSubmitting}
            data-pendo-id="signup-submit-button"
          >
            {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
            {!form.formState.isSubmitting && <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;

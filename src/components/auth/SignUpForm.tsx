
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_EMAIL = "demo.engineering+voyagr@pendo.io";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select your role." }),
  frequency: z.string().min(1, { message: "Please select travel frequency." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  teamSize: z.string().min(1, { message: "Please enter team size." }),
  personalized: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: DEFAULT_EMAIL,
      role: "",
      frequency: "",
      company: "",
      teamSize: "",
      personalized: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Here we would normally send the data to a backend service
      console.log("Form submitted with:", data);
      
      // Show success toast
      toast({
        title: "Sign up successful!",
        description: "Check your email for onboarding instructions.",
      });
      
      // Simulate API call with a short delay
      setTimeout(() => {
        // Store user data for Pendo tracking
        localStorage.setItem("signupEmail", data.email);
        localStorage.setItem("signupRole", data.role);
        localStorage.setItem("signupFrequency", data.frequency);
        localStorage.setItem("signupCompany", data.company);
        
        // Update Pendo visitor properties if available
        if (window && (window as any).updatePendoVisitor) {
          (window as any).updatePendoVisitor({
            visitor_type: data.role === "Travel Manager" ? "manager" : 
                          data.frequency === "Weekly" ? "commuter" : "occasional",
            travel_frequency: data.frequency === "Weekly" ? "frequent" : 
                              data.frequency === "Monthly" ? "regular" : "occasional",
          });
        }
        
        // Call the success callback
        onSignUpSuccess();
      }, 1500);
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const roleOptions = [
    "Admin", 
    "Employee", 
    "Travel Manager", 
    "Finance",
    "Other"
  ];

  const frequencyOptions = [
    "Rarely", 
    "Monthly", 
    "Weekly"
  ];

  const teamSizeOptions = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} data-pendo-id="signup-name-input" />
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
                  <Input 
                    type="email" 
                    placeholder="your@company.com" 
                    {...field} 
                    data-pendo-id="signup-email-input" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  data-pendo-id="signup-role-select"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  data-pendo-id="signup-frequency-select"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} data-pendo-id="signup-company-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  data-pendo-id="signup-teamsize-select"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teamSizeOptions.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="personalized"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-pendo-id="signup-personalized-checkbox"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Personalized Onboarding</FormLabel>
                <p className="text-sm text-gray-500">
                  I would like a personalized onboarding experience tailored to my role
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-sunset-coral hover:bg-sunset-coral/90 text-white py-6"
            disabled={form.formState.isSubmitting}
            data-pendo-id="signup-submit-button"
          >
            {form.formState.isSubmitting ? "Creating Account..." : "Create Your Free Account"}
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy. 
          Your data will be processed according to our privacy practices for a personalized experience.
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;

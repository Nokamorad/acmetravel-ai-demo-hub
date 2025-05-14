
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
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const DEFAULT_EMAIL = "demo.engineering+voyagr@pendo.io";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  frequency: z.string().min(1, { message: "Please select travel frequency." }),
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
      frequency: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form submitted with:", data);
      
      // Show success toast
      toast({
        title: "Sign up successful!",
        description: "Redirecting to your dashboard...",
      });
      
      // Simulate API call with a short delay
      setTimeout(() => {
        // Store user data for Pendo tracking
        localStorage.setItem("signupEmail", data.email);
        localStorage.setItem("signupName", data.name);
        localStorage.setItem("signupFrequency", data.frequency);
        
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

  const frequencyOptions = [
    "Daily", 
    "Weekly", 
    "Monthly"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
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
                <Input type="email" placeholder="your.name@company.com" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

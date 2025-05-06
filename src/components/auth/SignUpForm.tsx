
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_EMAIL = "demo.engineering+voyagr@pendo.io";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
});

type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: DEFAULT_EMAIL,
      company: "",
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
        // In a real app, we would log the user in here
        localStorage.setItem("signupEmail", data.email);
        
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  {...field} 
                  data-pendo-id="signup-email-input" 
                />
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
                <Input placeholder="Company name" {...field} data-pendo-id="signup-company-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white"
            disabled={form.formState.isSubmitting}
            data-pendo-id="signup-submit-button"
          >
            {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy. 
          You'll receive an onboarding email to help you get started.
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;

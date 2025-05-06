
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
import { CheckCircle } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    // Redirect to dashboard after successful signup
    navigate("/");
  };

  // Onboarding steps for the process visualization
  const onboardingSteps = [
    {
      title: "Account Created",
      description: "Welcome to Voyagr!",
      icon: "🎉"
    },
    {
      title: "Email Sent",
      description: "Your tailored tips are on the way",
      icon: "📧"
    },
    {
      title: "Embedded Guide",
      description: "Personalized help based on your role",
      icon: "📝"
    },
    {
      title: "Experiment",
      description: "You're helping us text improvements",
      icon: "🧪"
    },
    {
      title: "CSAT Survey",
      description: "Rate your support experience",
      icon: "⭐"
    }
  ];

  // Trust logos
  const trustLogos = [
    { name: "Google", abbreviation: "g" },
    { name: "Microsoft", abbreviation: "m" },
    { name: "Amazon", abbreviation: "a" },
    { name: "Salesforce", abbreviation: "s" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="max-w-xl mb-10 md:mb-0">
                <h1 className="font-header font-bold text-4xl md:text-5xl text-midnight-navy mb-4">
                  Smarter Business Travel Starts Here
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Book, manage, and optimize company travel—tailored to how you work.
                </p>
                <button 
                  onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-sky-blue text-white py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all font-medium"
                  data-pendo-id="hero-cta-button"
                >
                  Create Your Free Account
                </button>
              </div>
              <div className="w-full md:w-2/5">
                <img 
                  src="/public/lovable-uploads/f2812308-776f-41b1-8b83-d0ead1af1f3a.png" 
                  alt="Business traveler using Voyagr" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white" id="signup-form">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-md rounded-lg p-8 border border-gray-100">
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
              </div>

              {/* Onboarding Process Visualization */}
              <div className="mt-16">
                <div className="grid grid-cols-5 gap-4">
                  {onboardingSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-sky-blue/10 flex items-center justify-center mb-4 text-2xl">
                        {step.icon}
                      </div>
                      <h4 className="font-medium text-midnight-navy mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-header font-semibold text-midnight-navy mb-6">
                Trusted by
              </h3>
              
              <div className="flex justify-center gap-12 items-center mb-12">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="text-4xl text-gray-400 font-bold">
                    {logo.abbreviation}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-8">
                This site is protected by reCAPTCHA and the Google <a href="#" className="text-sky-blue hover:underline">Privacy Policy</a> and <a href="#" className="text-sky-blue hover:underline">Terms of Service</a> apply.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;

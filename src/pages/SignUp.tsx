
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
      title: "Personalized Walkthrough",
      description: "Get a guided tour of features relevant to your role"
    },
    {
      title: "Welcome Email",
      description: "Receive tailored resources based on your preferences"
    },
    {
      title: "Embedded Guides",
      description: "In-app assistance customized to your workflow"
    },
    {
      title: "Product Feedback",
      description: "Share insights to help shape Voyagr's roadmap"
    }
  ];

  // Trust logos
  const trustLogos = [
    "American Express",
    "Deloitte",
    "Slack",
    "Zoom",
    "Adobe"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-sky-blue/5 to-sunset-coral/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-header font-bold text-4xl md:text-5xl text-midnight-navy mb-4">
                Smarter Business Travel Starts Here
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Book, manage, and optimize company travel—tailored to how you work.
              </p>
              <button 
                onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-sky-blue text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
                data-pendo-id="hero-cta-button"
              >
                Create Your Free Account
              </button>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white" id="signup-form">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-header font-semibold text-midnight-navy mb-2">
                    Join thousands of business travelers
                  </h2>
                  <p className="text-gray-600">
                    Create your account and start optimizing your company's travel
                  </p>
                </div>
                
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
              </div>

              {/* Onboarding Process Visualization */}
              <div className="mt-16">
                <h3 className="text-xl font-header font-semibold text-center mb-8 text-midnight-navy">
                  Your Personalized Onboarding Journey
                </h3>
                
                <div className="relative">
                  {/* Progress bar */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                  
                  {/* Steps */}
                  <div className="grid md:grid-cols-4 gap-8 relative z-10">
                    {onboardingSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-sky-blue/10 flex items-center justify-center mb-4">
                          <span className="w-8 h-8 rounded-full bg-sky-blue text-white flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <h4 className="font-medium text-midnight-navy mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
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
                Trusted by Industry Leaders
              </h3>
              
              <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="text-gray-500 font-medium">
                    {logo}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sky-blue" />
                  <span className="text-gray-600">SOC 2 Type II Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sky-blue" />
                  <span className="text-gray-600">GDPR & CCPA Compliant</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  By signing up, you agree to our <a href="#" className="text-sky-blue hover:underline">Terms of Service</a> and <a href="#" className="text-sky-blue hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;

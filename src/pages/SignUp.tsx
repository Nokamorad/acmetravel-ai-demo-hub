
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    // Redirect to dashboard after successful signup
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 hero-gradient">
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
                >
                  Create Your Free Account
                </button>
              </div>
              <div className="w-full md:w-2/5">
                <img 
                  src="/public/lovable-uploads/f2812308-776f-41b1-8b83-d0ead1af1f3a.png" 
                  alt="Business traveler using Voyagr" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white" id="signup-form">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow-md rounded-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-header font-bold text-center mb-8">Create Your Account</h2>
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
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

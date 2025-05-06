
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 signup-gradient">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-midnight-navy">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join thousands of travel managers using Travel Agent
            </p>
          </div>
          <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignUpSuccess = () => {
    // Redirect to inbox after successful signup
    navigate('/inbox');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Plane className="h-6 w-6 text-sky-blue mr-2" />
            <span className="text-xl font-bold logo-voyagr text-midnight-navy">Voyagr</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-midnight-navy">Create Your Account</h1>
              <p className="text-gray-600 mt-2">Join Voyagr to simplify your business travel</p>
            </div>
            
            <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account? 
              <Link to="/" className="text-sky-blue hover:underline ml-1">Sign in</Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 Voyagr Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;

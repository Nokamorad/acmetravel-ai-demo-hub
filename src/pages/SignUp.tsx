import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
import { Star } from "lucide-react";
const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUpSuccess = () => {
    // Redirect to dashboard after successful signup
    navigate("/dashboard");
  };
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Promo Banner */}
      <div className="bg-midnight-navy text-white py-3 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
          <span className="inline-flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12V22H4V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 7H2V12H22V7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C14 2 12 4 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C10 2 12 4 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Get $200 credit when your company joins Voyagr
          </span>
          <a href="#signup-form" className="underline font-medium ml-1 hover:text-cloud-gray transition-colors">
            Learn more
          </a>
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-[#f5f7ff]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="max-w-xl">
                <div className="flex items-center mb-4 gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-700 ml-2">4.7 out of 5 | 2K+ reviews</span>
                </div>
                
                <h1 className="font-header font-bold text-4xl md:text-5xl lg:text-6xl text-midnight-navy mb-6">
                  Smarter Business Travel Starts Here
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Book, manage, and optimize company travel—tailored to how you work.
                </p>
                
                <button onClick={() => document.getElementById('signup-form')?.scrollIntoView({
                behavior: 'smooth'
              })} className="bg-sky-blue text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-lg">
                  Create Your Free Account
                </button>
              </div>
              
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <div className="rounded-lg overflow-hidden shadow-md bg-purple-100 p-4 transform translate-y-4">
                    <img alt="Business traveler" className="w-full h-auto rounded-lg" src="/lovable-uploads/69a3f64c-82fb-45e8-8f36-d41f563e9c9b.png" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md bg-sky-100 p-4">
                    <img src="/public/lovable-uploads/f2812308-776f-41b1-8b83-d0ead1af1f3a.png" alt="Travel management" className="w-full h-auto rounded-lg" />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-lg overflow-hidden shadow-md bg-green-100 p-4">
                    <img alt="Dashboard" className="w-full h-auto rounded-lg" src="/lovable-uploads/9f5098a3-c876-45be-a035-b556bfc2b4d1.png" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md bg-orange-100 p-4 transform translate-y-4">
                    <img src="/public/lovable-uploads/9b2112ab-cd15-4128-b9ee-bed226acc140.png" alt="Mobile app" className="w-full h-auto rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16 bg-white" id="signup-form">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-header font-bold text-center mb-2">Create Your Account</h2>
                <p className="text-gray-600 text-center mb-8">Join thousands of companies optimizing their travel</p>
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-gray-600 font-medium mb-8">Trusted by thousands of companies</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 1</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 2</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 3</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 4</div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 5</div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default SignUp;
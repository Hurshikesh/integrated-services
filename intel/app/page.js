'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'tailwindcss/tailwind.css';
import About from './about/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Login from './login/page';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

const services = [
  {
    title: "Health Services",
    description: "Consult doctors, find labs, hospitals, and pharmacies.",
    image: "https://i.postimg.cc/zvrh872b/healthcare.jpg",
    link: "/services/Health"
  },
  {
    title: "Education Services",
    description: "Access learning materials, find mentors, and tutoring centers.",
    image: "https://i.postimg.cc/fLd0nYTh/education.jpg",
    link: "/services/education"
  },
  {
    title: "Transportation Services",
    description: "Get details on auto, car, bus, and air services.",
    image: "https://i.postimg.cc/2yFb3mZc/transportation.jpg",
    link: "/services/Transportation"
  },
  {
    title: "Finance Services",
    description: "Find information on banking, tax, and insurance services.",
    image: "https://i.postimg.cc/3rgDtjcX/finance.jpg",
    link: "/services/FinancePage"
  },
  {
    title: "Government Services",
    description: "Access details on Aadhar, ration card, passport, and more.",
    image: "https://i.postimg.cc/x8QpbRK9/goverenment.jpg",
    link: "/services/Government"
  },
  {
    title: "Housing Services",
    description: "Find electricians, plumbers, carpenters, and other services.",
    image: "https://i.postimg.cc/MHqyHxCY/housing.jpg",
    link: "/services/Housing"
  }
];

const steps = [
  {
    title: "Register",
    description: "Sign up and create your account.",
    image: "https://i.postimg.cc/qq0qPY58/login.jpg"
  },
  {
    title: "Search",
    description: "Find the services you need from our comprehensive directory.",
    image: "https://i.postimg.cc/zXz3psWN/service.jpg"
  },
  {
    title: "Connect",
    description: "Get in touch with service providers directly.",
    image: "https://i.postimg.cc/XJK7kLYX/choose.jpg"
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [showLoginModal, setShowLoginModal] = useState(false); // State to manage login modal visibility
  const [showChoiceModal, setShowChoiceModal] = useState(true); // State to manage choice modal visibility
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State to manage feedback message
  const [feedbackEmail, setFeedbackEmail] = useState(''); // State to manage feedback Email
  const [feedbackResponse, setFeedbackResponse] = useState(null); // State to manage feedback response
  const [username, setUsername] = useState(''); // State to store username
  const [email, setEmail] = useState(''); // State to store email
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const { data: session, status } = useSession();

  const aboutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    if (status === "authenticated") {
      setIsLoggedIn(true);
      // Fetch profile data
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`/api/profileData?email=${encodeURIComponent(session.user.email)}`);
          setUsername(response.data.username);
          setEmail(response.data.email);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }

    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000); // Change service every 3 seconds

    return () => clearInterval(interval);
  }, [status, session]);

  const handleServiceClick = (link) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Navigate to the service link
      window.location.href = link;
    }
  };

  const handleChoice = (choice) => {
    setShowChoiceModal(false);
    if (choice === 'customer') {
      // Stay on the current page
    } else if (choice === 'serviceProvider') {
      // Redirect to the service provider page (Replace with actual URL)
      window.location.href = '/ServiceProvider';
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Feedback', { 
        message: feedbackMessage,
        username: username,
        email: feedbackEmail
      });
      setFeedbackResponse(response.data);
      setFeedbackMessage(''); // Clear the feedback message input
      setFeedbackEmail(''); // Clear the feedback email input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackResponse({ status: 500, data: { error: 'Error submitting feedback', details: error.message } });
    }
  };

  const handlePrevClick = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const handleNextClick = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className={`relative h-[500px] mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-gradient-to-b from-purple-700 to-transparent`}>
        <div className="relative w-full h-full flex">
          <div className="w-1/2 flex items-center justify-center relative">
            <div className="relative w-[75%] h-[75%] z-10 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/herovideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center relative z-10 bg-gradient-to-r from-transparent to-purple-700">
            <div className="text-center text-white mb-40">
              <h1 className="text-6xl font-bold mb-4">Integrated Services</h1>
              <div className="space-y-4">
                <p className="text-xl font-serif font-extrabold">Navigating life's challenges. Together.</p>
                <div className="space-y-6">
                  <p className="text-xl font-thin font-serif">
                    Facing challenges in healthcare, finances, education, or housing?
                    We're here to help. Our website connects you with expert guidance, streamlined resources, and actionable steps across healthcare, finance, education, transportation, government services, and housing. We empower you to navigate life's complexities and build a brighter future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-serif mb-4 text-gray-900">Explore Our Services</h2>
          <div className="relative flex items-center justify-center">
            <button
              className="absolute left-0 p-2 bg-purple-600 text-white rounded-full z-10"
              onClick={handlePrevClick}
            >
              &lt;
            </button>
            <div className="relative w-full flex items-center justify-center overflow-hidden">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`absolute transition-opacity duration-500 ease-in-out transform ${index === currentServiceIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md text-center w-[400px] mx-2">
                    <a className="block" onClick={() => handleServiceClick(service.link)}>
                      <Image 
                        src={service.image} 
                        width={400}
                        height={300}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-2xl font-bold text-purple-600 mb-2 font-serif">{service.title}</h3>
                      <p className="text-gray-700">{service.description}</p>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 p-2 bg-purple-600 text-white rounded-full z-10"
              onClick={handleNextClick}
            >
              &gt;
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {services.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentServiceIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
              ></span>
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <Image 
                  src={step.image} 
                  width={400}
                  height={300}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-purple-600 mb-2 font-serif">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12" ref={aboutRef}>
          <About />
        </section>

        {/* Feedback Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">We Value Your Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="feedbackMessage" className="block text-gray-700">Your Feedback</label>
              <textarea
                id="feedbackMessage"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="feedbackEmail" className="block text-gray-700">Your Email (Optional)</label>
              <input
                type="email"
                id="feedbackEmail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              Submit Feedback
            </button>
          </form>
          {feedbackResponse && (
            <div className="mt-4">
              {feedbackResponse.status === 200 ? (
                <p className="text-green-500">Thank you for your feedback!</p>
              ) : (
                <p className="text-red-500">Error: {feedbackResponse.data.error}</p>
              )}
            </div>
          )}
        </section>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>
              <Login />
              <button
                onClick={() => setShowLoginModal(false)}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

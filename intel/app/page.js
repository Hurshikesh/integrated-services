'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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
    image: "https://i.postimg.cc/htGz4kPs/goverenment.jpg",
    link: "/services/Government"
  },
  {
    title: "Housing Services",
    description: "Find electricians, plumbers, carpenters, and other services.",
    image: "https://i.postimg.cc/VkHSJKJ8/housing.jpg",
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
  const [feedbackResponse, setFeedbackResponse] = useState(null); // State to manage feedback response
  const [username, setUsername] = useState(''); // State to store username
  const [email, setEmail] = useState(''); // State to store email

  const { data: session, status } = useSession();

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
        email: email
      });
      setFeedbackResponse(response.data);
      setFeedbackMessage(''); // Clear the feedback message input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackResponse({ status: 500, data: { error: 'Error submitting feedback', details: error.message } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Are you a Customer or a Service Provider?</h2>
            <div className="flex justify-around">
              <button
                onClick={() => handleChoice('customer')}
                className="bg-blue-500 text-white p-3 rounded-lg w-1/3"
              >
                Customer
              </button>
              <button
                onClick={() => handleChoice('serviceProvider')}
                className="bg-green-500 text-white p-3 rounded-lg w-1/3"
              >
                Service Provider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className={`relative h-96 rounded-lg mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex w-full h-full relative">
          <div className="relative w-1/2 h-full">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/herovideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
          <div className="relative w-1/2 flex items-center justify-center z-10 bg-gradient-to-r from-transparent to-white">
            <div className="text-center text-gray-900">
              <h1 className="text-6xl font-bold mb-2">Integrated Services</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <a className="block" onClick={() => handleServiceClick(service.link)}>
                  <Image 
                    src={service.image} 
                    width={400}
                    height={300}
                    alt={service.title}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Image 
                  src={step.image}
                  width={100}
                  height={100}
                  alt={step.title}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-blue-600 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Give Us Your Feedback</h2>
          <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleFeedbackSubmit}>
            <textarea 
              placeholder="Message" 
              className="border border-gray-300 p-3 rounded-lg w-full mt-4 h-32 bg-gray-200 text-gray-900"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg mt-4">Send Message</button>
          </form>
          {feedbackResponse && (
            <div className={`mt-4 p-4 rounded-lg ${feedbackResponse.status === 200 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {feedbackResponse.status === 200 ? 'Feedback submitted successfully!' : 'Error submitting feedback. Please try again.'}
            </div>
          )}
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            {/* Add your login component here */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

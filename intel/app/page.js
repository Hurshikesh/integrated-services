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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      <main className="container mx-auto px-4 py-8 text-black font-bold font-serif">
        {/* Explore Our Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 font-serif">Explore Our Services</h2>
          <div className='container'>
            <Swiper
              navigation
              pagination={{ type: 'fraction' }}
              modules={[Navigation, Pagination]}
              onSwiper={swiper => console.log(swiper)}
              className='h-96 w-full rounded-lg'
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className='flex h-full w-full items-center justify-center'>
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={500}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                        className='block h-full w-full object-cover rounded-l-lg shadow-lg cursor-pointer'
                        onClick={() => handleServiceClick(service.link)}
                      />
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-center bg-purple-300 rounded-r-lg p-4">
                      <h3 className="text-2xl font-extrabold text-white text-pretty  font-serif">{service.title}</h3>
                      <p className="text-lg text-gray-600 font-serif">{service.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={300}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-lg text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            <textarea
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Your feedback..."
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              placeholder="Your email (optional)..."
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="p-2 bg-purple-600 text-white rounded-md"
            >
              Submit Feedback
            </button>
          </form>
          {feedbackResponse && (
            <div className={`mt-4 p-2 ${feedbackResponse.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
              {feedbackResponse.data.message || feedbackResponse.data.error}
            </div>
          )}
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">About Us</h2>
          <About />
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowLoginModal(false)}
            >
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}

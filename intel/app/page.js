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
import Link from 'next/link';
import {motion} from 'framer-motion';

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

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [showLoginModal, setShowLoginModal] = useState(false); // State to manage login modal visibility
  const [showChoiceModal, setShowChoiceModal] = useState(true); // State to manage choice modal visibility
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State to manage feedback message
  const [feedbackEmail, setFeedbackEmail] = useState(''); // State to manage feedback email
  const [feedbackResponse, setFeedbackResponse] = useState(null); // State to manage feedback response
  const [username, setUsername] = useState(''); // State to store username
  const [email, setEmail] = useState(''); // State to store email
  const [errors, setErrors] = useState({}); // State to store form errors
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

  const handleChoice = (choice) => {
    setShowChoiceModal(false);
    if (choice === 'customer') {
      // Stay on the current page
    } else if (choice === 'serviceProvider') {
      // Redirect to the service provider page (Replace with actual URL)
      window.location.href = '/ServiceProvider';
    }
  };

  const validateFeedbackForm = () => {
    const newErrors = {};
    const emailRegex = /.+\@.+\..+/;
    if (!feedbackEmail || !emailRegex.test(feedbackEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!feedbackMessage || feedbackMessage.length < 10 || feedbackMessage.length > 1000) {
      newErrors.message = 'Message must be between 10 and 1000 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!validateFeedbackForm()) {
      return;
    }

    try {
      const response = await axios.post('/api/Feedback', {
        message: feedbackMessage,
        username: username,
        email: feedbackEmail
      });
      setFeedbackResponse(response.data);
      setFeedbackMessage(''); // Clear the feedback message input
      setFeedbackEmail(''); // Clear the feedback email input
      setErrors({}); // Clear errors
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackResponse({ status: 500, data: { error: 'Error submitting feedback', details: error.message } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-lato">
      {/* Hero Section */}
      <header className={`relative h-[500px] mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-gradient-to-b from-purple-500 to-transparent`}>
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
          <script async data-id="1452517225" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>
          <div className="w-1/2 flex flex-col items-center justify-center relative z-10 bg-gradient-to-f from-purple-500 to-purple-100">
            <div className="text-center text-white mb-40">
              <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible:{
                  scale: 1,
                  opacity: 1,
                  transition:{
                    delay: 0.4
                  }
                }
                }
              } >
              <h1 className="text-6xl font-bold mb-4 font-helvetica">CAREcONNECT</h1>
              </motion.div>
              <div className="space-y-4">
                <p className="text-xl font-lato font-extrabold">Caring for you, every step of the way.</p>
                <div className="space-y-6">
                  <p className="text-xl font-lato text-balance">
                    Facing challenges in healthcare, finances, education, or housing? We're here to help. Our website connects you with expert guidance, streamlined resources, and actionable steps across healthcare, finance, education, transportation,government services, and housing. We empower you to navigate life's complexities and build a brighter future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

     {/* Main Content */}
<main className="container mx-auto px-4 py-8">
  {/* Explore Our Services Section */}
  <section className="mb-12">
    <h2 className="text-3xl font-bold mb-4 text-purple-600 font-helvetica">Explore Our Services</h2>
    <div className="mx-auto max-w-screen-lg p-8 bg-purple-300 rounded-lg">
      <Swiper
        navigation
        pagination={{ type: 'fraction' }}
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-96 w-full text-white"
        style={{ padding: '20px' }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative w-full h-full">
                <Link href={'/services/'}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                  />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 p-4 rounded-b-lg text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white font-helvetica">{service.title}</h3>
                  <p className="text-lg text-white font-lato">Know More</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
      


        {/* About Section */}
        <section className="mb-12" ref={aboutRef}>
        
          <div className="border p-4">
            <About />
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 font-helvetica text-black">Your Feedback Matters</h2>
          <div className="border p-4">
            {isLoggedIn ? (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-medium text-gray-700 font-helvetica">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block font-medium text-gray-700 font-helvetica">Message</label>
                  <textarea
                    id="message"
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                  />
                  {errors.message && <p className="text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 font-helvetica" 
                >
                  Submit Feedback
                </button>
                {feedbackResponse && feedbackResponse.status === 200 && (
                  <p className="text-green-500">Feedback submitted successfully!</p>
                )}
                {feedbackResponse && feedbackResponse.status !== 200 && (
                  <p className="text-red-500">Error submitting feedback: {feedbackResponse.data.error}</p>
                )}
              </form>
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium">Please sign in to provide feedback.</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                  onClick={() => setShowLoginModal(true)}
                >
                  Sign In
                </button>
                {showLoginModal && <Login />}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
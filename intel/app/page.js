'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'tailwindcss/tailwind.css';
import About from './about/page';

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

  const aboutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    // Here you can check if the user is logged in, for example, by checking a token in local storage
    // setIsLoggedIn(localStorage.getItem('token') ? true : false);
  }, []);

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

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
     

{/* Hero Section */}
<header className={`relative h-[500px] mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-gradient-to-b from-purple-700 to-transparent`}>
  <div className="relative w-full h-full flex">
    <div className="w-1/2 flex items-center justify-center relative">
      <div className="relative w-[75%] h-[75%] z-10 border-8 border-white rounded-lg overflow-hidden">
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
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-purple-700 to-transparent pointer-events-none"></div>
    </div>
    <div className="w-1/2 flex flex-col items-center justify-center relative z-10 bg-gradient-to-r from-transparent to-purple-700">
      <div className="text-center text-white mb-40">
        <h1 className="text-6xl font-bold mb-4">Integrated Services</h1>
        <div className="space-y-4">
  <p className="text-xl font-serif font-extrabold">Navigating life's challenges. Together.</p>
  <p className="text-xl font-thin font-serif">
    Facing challenges in healthcare, finances, education, or housing?
     We're here to help. Our website connects you with expert guidance, streamlined resources, and actionable steps across healthcare, finance, education, transportation, government services, and housing. We empower you to navigate life's complexities and build a brighter future.
  </p>
</div>
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
                  <div className="w-full h-64 mb-4">
                    <Image 
                      src={service.image} 
                      width={400}
                      height={300}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
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

        {/* About Section */}
        <section ref={aboutRef}>
          <About />
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h2>
          <form className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="border border-gray-300 p-3 rounded-lg w-full bg-gray-200 text-gray-900" />
              <input type="email" placeholder="Email" className="border border-gray-300 p-3 rounded-lg w-full bg-gray-200 text-gray-900" />
            </div>
            <textarea placeholder="Message" className="border border-gray-300 p-3 rounded-lg w-full mt-4 h-32 bg-gray-200 text-gray-900"></textarea>
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg mt-4">Send Message</button>
          </form>
        </section>

        {/* Premium Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Access Premium Services</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Elements stripe={stripePromise}>
              {/* Add your Stripe component here */}
            </Elements>
          </div>
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

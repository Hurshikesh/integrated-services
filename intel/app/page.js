'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'tailwindcss/tailwind.css';

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
    image: "https://i.postimg.cc/cHJjT7B3/pharmacy.jpg",
    link: "/services/education"
  },
  {
    title: "Transportation Services",
    description: "Get details on auto, car, bus, and air services.",
    image: "https://i.postimg.cc/bvqNyMqj/Fitness-Services.jpg",
    link: "/services/Transportation"
  },
  {
    title: "Finance Services",
    description: "Find information on banking, tax, and insurance services.",
    image: "https://i.postimg.cc/0jM41832/diagnostic.jpg",
    link: "/services/FinancePage"
  },
  {
    title: "Government Services",
    description: "Access details on Aadhar, ration card, passport, and more.",
    image: "https://i.postimg.cc/XJGM4cBb/eldercare.jpg",
    link: "/services/Government"
  },
  {
    title: "Housing Services",
    description: "Find electricians, plumbers, carpenters, and other services.",
    image: "https://i.postimg.cc/BZ7sWb8s/hospitals.jpg",
    link: "/services/housing"
  }
];

const steps = [
  {
    title: "Register",
    description: "Sign up and create your account.",
    image: "https://i.postimg.cc/zvrh872b/healthcare.jpg"
  },
  {
    title: "Search",
    description: "Find the services you need from our comprehensive directory.",
    image: "https://i.postimg.cc/cHJjT7B3/pharmacy.jpg"
  },
  {
    title: "Connect",
    description: "Get in touch with service providers directly.",
    image: "https://i.postimg.cc/bvqNyMqj/Fitness-Services.jpg"
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className={`relative h-64 rounded-lg mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Image 
          src='https://i.postimg.cc/zvrh872b/healthcare.jpg' // Update with the correct path to your image
          layout="fill"
          objectFit="cover"
          alt="Header Background"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-2">Integrated Services</h1>
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
                <Link href={service.link} legacyBehavior>
                  <a className="block">
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
                </Link>
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
    </div>
  );
}

"use client"; // Add this line to ensure this file is treated as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

const healthServices = [
  {
    title: "Find Hospitals",
    description: "Search for the best hospitals with highly rated doctors near you.",
    image: "https://i.postimg.cc/BZ7sWb8s/hospitals.jpg",
    link: "/services/Health/FindHospital"
  },
  {
    title: "Consult Doctors",
    description: "Book appointments with top-rated doctors in various specialties.",
    image: "https://i.postimg.cc/ZYQk7Qg5/doctos.jpg",
    link: "/services/Health/doctors"
  },
  {
    title: "Find Pharmacies",
    description: "Locate pharmacies that are open 24/7 near your location.",
    image: "https://i.postimg.cc/cHJjT7B3/pharmacy.jpg",
    link: "/services/Health/pharmacies"
  },
  {
    title: "Fitness Services",
    description: "Access information on nearest gyms,yoga and physiotherapy centres near you",
    image: "https://i.postimg.cc/bvqNyMqj/Fitness-Services.jpg",
    link: "/services/Health/FitnessServices"
  },
  {
    title: "Elder Care",
    description: "Find contact details for elder care and nurse services nearby.",
    image: "https://i.postimg.cc/XJGM4cBb/eldercare.jpg",
    link: "/services/Health/ElderCare"
  },
  {
    title: "Diagnostic Centers",
    description: "Locate diagnostic centers for lab tests and imaging services.",
    image: "https://i.postimg.cc/0jM41832/diagnostic.jpg",
    link: "/services/Health/DiagnosticCentre"
  }
];

const testimonies = [
  {
    name: "John Doe",
    testimony: "Great platform! Easy to use, fantastic support. Found the perfect professional, stress-free experience."
  },
  {
    name: "Jane Smith",
    testimony: "Advanced search for doctors! Found a specialist, knowledgeable and attentive. Highly recommend!"
  },
  {
    name: "Michael Brown",
    testimony: "Emergency? Don't panic! Fast response, professional paramedics. Lifesaver service!"
  },
  {
    name: "Emily Johnson",
    testimony: "Elder care worries? Wide options, helpful reviews. Compassionate caregivers, peace of mind."
  },
  {
    name: "Sarah Lee",
    testimony: "Language learning struggles? Interactive lessons, patient tutors. Speak your new language confidently!"
  },
  {
    name: "David Williams",
    testimony: "Grocery delivery doubts? Fresh produce, easy app. Saves time, perfect for busy schedules."
  },
  {
    name: "Amanda Garcia",
    testimony: "Get fit at home! Varied workouts, motivating instructors. Improved fitness, overall well-being boost."
  },
  {
    name: "Noah Miller",
    testimony: "Freelancer struggles? Find perfect projects. User-friendly platform, landed successful gigs."
  },
  {
    name: "Chloe Hernandez",
    testimony: "Math tutoring woes? Patient tutors, clear explanations. Son's confidence & grades soared. Great investment!"
  },
];

  
export default function HealthPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentTestimonyIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
    }, 3000); // Change testimony every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className={`relative h-64 rounded-lg mb-12 overflow-hidden transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Image 
            src='https://i.postimg.cc/zvrh872b/healthcare.jpg' // Update with the correct path to your image
            layout="fill"
            objectFit="cover"
            alt="Health Hero"
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-blue-900 bg-opacity-50">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Making health accessible and affordable</h1>
              <p className="text-lg mb-4">The most trusted name in health supplements</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthServices.map((service, index) => (
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
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">{service.title}</h2>
                    <p className="text-gray-700">{service.description}</p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonies Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">What Our Clients Say</h2>
          <div className="relative h-24 flex items-center justify-center">
            {testimonies.map((testimony, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-5000 ease-in-out transform ${index === currentTestimonyIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-xl text-gray-700 text-center italic mb-2">"{testimony.testimony}"</p>
                <p className="text-lg text-blue-600 text-center">- {testimony.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

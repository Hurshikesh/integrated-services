"use client"; // Add this line to ensure this file is treated as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

const transportationServices = [
  {
    title: "Taxi Fare Calculator",
    description: "Calculates the approximate fare between two locations.",
    image: "https://i.postimg.cc/XvPD61PY/cab.jpg",
    link: "/services/Transportation/FindCabs"
  },
  {
    title: "Car Rentals",
    description: "Rent cars from top-rated rental services in your area.",
    image: "https://i.postimg.cc/FzVZzTTc/rentals.jpg",
    link: "/services/Transportation/CarRentals"
  },
  {
    title: "Nearby Bus Stops",
    description: "Locate bus stops that are near your location and check schedules.",
    image: "https://i.postimg.cc/htjr4bTz/busStop.jpg",
    link: "/services/Transportation/BusStops"
  },
  {
    title: "Buy & Sell Old Cars",
    description: "Access the best deals to buy or sell used cars near you.",
    image: "https://i.postimg.cc/brpx7Qqv/oldcars.jpg",
    link: "/services/Transportation/BuySellCars"
  },
  {
    title: "Mechanic Near Me",
    description: "Find contact details for mechanics and auto repair services nearby.",
    image: "https://i.postimg.cc/1RrcpYKV/mechanic.jpg",
    link: "/services/Transportation/Mechanic"
  }
];

const testimonies = [
  {
    name: "John Doe",
    testimony: "Great platform! Easy to use, fantastic support. Found the perfect cab service, stress-free experience."
  },
  {
    name: "Jane Smith",
    testimony: "Advanced search for rentals! Found a great car, knowledgeable and helpful staff. Highly recommend!"
  },
  {
    name: "Michael Brown",
    testimony: "Emergency on the road? Don't panic! Fast response, professional mechanics. Lifesaver service!"
  },
  {
    name: "Emily Johnson",
    testimony: "Selling my old car was a breeze! Wide options, helpful reviews. Great buyers, peace of mind."
  },
  {
    name: "Sarah Lee",
    testimony: "Public transport worries? Easy to locate bus stops, helpful schedules. Efficient commute!"
  }
];

export default function TransportationPage() {
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
            src='https://i.postimg.cc/x1KZHPqs/transportation.jpg' // Update with the correct path to your image
            layout="fill"
            objectFit="cover"
            alt="Transportation Hero"
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-blue-900 bg-opacity-50">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Making transportation easy and accessible</h1>
              <p className="text-lg mb-4">The most trusted name in transportation services</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transportationServices.map((service, index) => (
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

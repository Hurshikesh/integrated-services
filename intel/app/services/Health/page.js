"use client"; // Add this line to ensure this file is treated as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';

const healthServices = [
  {
    title: "Find Hospitals",
    description: "Search for the best hospitals with highly rated doctors near you.",
    image: "https://i.postimg.cc/DwjcrPGG/hospitals.jpg",
    link: "/services/Health/FindHospital"
  },
  {
    title: "Consult Doctors",
    description: "Book appointments with top-rated doctors in various specialties.",
    image: "https://i.postimg.cc/br9xsx8s/doctos.jpg",
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
    description: "Access information on nearest gyms, yoga, and physiotherapy centers near you.",
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
    name: "Riya Patel",
    testimony: "Amazing platform! So easy to use, and the customer service is fantastic. Found the perfect professional for my needs, stress-free experience."
  },
  {
    name: "Aakash Kapoor",
    testimony: "The doctor search is incredible! Found a specialist who was both knowledgeable and attentive. Highly recommend this service!"
  },
  {
    name: "Priya Singh",
    testimony: "Medical emergency? Don't worry! This service provided a fast response with professional paramedics. Lifesaver indeed!"
  },
  {
    name: "Rahul Sharma",
    testimony: "Worried about elder care? Wide variety of options with helpful reviews. Found compassionate caregivers, giving me peace of mind."
  },
  {
    name: "Saiba Bhattacharya",
    testimony: "Struggling with learning a new language? Interactive lessons and patient tutors made all the difference. Now I speak confidently!"
  },
  {
    name: "Vikram Desai",
    testimony: "Had doubts about grocery delivery? Fresh produce, easy-to-use app. Saves so much time, perfect for my busy schedule."
  },
  {
    name: "Anjali Menon",
    testimony: "Getting fit at home is amazing! Varied workouts with motivating instructors. Improved my fitness and overall well-being significantly."
  },
  {
    name: "Dev Mehta",
    testimony: "Freelancing can be tough, but this platform helped me find perfect projects. User-friendly platform, landed successful gigs!"
  },
  {
    name: "Sonia Chopra",
    testimony: "Needed help with math tutoring. Patient tutors with clear explanations made a huge difference. My son's confidence and grades soared. Great decision!"
  },
  {
    name: "Arjun Bajaj",
    testimony: "This platform is a game-changer for learning music! Interactive lessons and talented instructors helped me improve so much."
  },
  {
    name: "Kiara Dutta",
    testimony: "Finding a reliable cleaning service used to be a hassle. This platform made it easy! Now I have more free time, highly recommend!"
  },
  {
    name: "Rohan Das",
    testimony: "Needed help with car repairs. Found a trustworthy mechanic with great service. Fair prices and quality work, very satisfied!"
  },
  {
    name: "Priyanka Bose",
    testimony: "Love the selection of travel options on this platform! Great deals and easy booking process. Helped me plan my dream vacation!"
  },
  {
    name: "Aman Khan",
    testimony: "This platform made online learning so much easier! Wide variety of courses, flexible schedule. Learned new skills at my own pace!"
  },
  {
    name: "Nikita Joshi",
    testimony: "Needed help with pet care. Found a reliable pet sitter who loves animals. My furry friend was well-cared for, very happy!"
  }
];

const heroImages = [
  'https://i.postimg.cc/zvrh872b/healthcare.jpg',
  'https://i.postimg.cc/c4XJb5R2/healthcare-1jpg.png',
  'https://i.postimg.cc/4xjXCCmL/healthcare3.jpg',
  'https://i.postimg.cc/3RT7Rgj2/healthcare4.jpg'
];

export default function HealthPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const testimonyInterval = setInterval(() => {
      setCurrentTestimonyIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
    }, 3000); // Change testimony every 3 seconds

    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change hero image every 5 seconds

    return () => {
      clearInterval(testimonyInterval);
      clearInterval(heroInterval);
    };
  }, []);

  const handleNextService = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % healthServices.length);
  };

  const handlePrevService = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + healthServices.length) % healthServices.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className={`relative h-[500px] rounded-lg mb-12 overflow-hidden bg-purple-500 transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 flex">
            <div className="w-1/2 relative">
              {heroImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  alt={`Hero Image ${index + 1}`}
                  className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
            <div className="w-1/2 flex items-center justify-center bg-purple-400">
              <div className="text-center text-white p-8">
                <h1 className="text-4xl font-bold mb-2">Making health accessible and affordable</h1>
                <p className="text-lg mb-4">The most trusted name in health supplements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Slider Section */}
        <section className="mb-12 relative">
          <div className="flex items-center justify-between">
            <button onClick={handlePrevService} className="text-white bg-purple-800 p-2 rounded-full hover:bg-blue-600">
              &#8592;
            </button>
            <div className="flex-1 mx-4 bg-white p-6 rounded-lg shadow-md overflow-hidden relative group">
              <Link href={healthServices[currentServiceIndex].link} legacyBehavior>
                <a className="block">
                  <Image 
                    src={healthServices[currentServiceIndex].image} 
                    width={400}
                    height={300}
                    alt={healthServices[currentServiceIndex].title}
                    className="rounded-lg mb-4 object-cover w-full h-64"
                  />
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">{healthServices[currentServiceIndex].title}</h2>
                  <p className="text-gray-700">{healthServices[currentServiceIndex].description}</p>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg">{healthServices[currentServiceIndex].description}</p>
                  </div>
                </a>
              </Link>
            </div>
            <button onClick={handleNextService} className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600">
              &#8594;
            </button>
          </div>
        </section>

        {/* New Section */}
        <section className="mb-12">
          <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
           
            <p className="text-lg text-gray-700 text-center bg-purple-300">In India, prioritizing your health is more important than ever.  According to a recent study [source needed], over 60% of deaths in the country are attributed to preventable and treatable chronic diseases.  This statistic underscores the importance of taking a proactive approach to your well-being.  Our comprehensive healthcare services can empower you to do just that.

Imagine this: you're feeling under the weather and need to see a doctor.  With our "Find Hospitals" feature, you can search for the best hospitals with highly-rated doctors near you, all conveniently located on a user-friendly map.  Our service goes beyond hospitals; you can also book appointments with top-rated doctors in various specialties through "Consult Doctors," ensuring you get the right care from a qualified professional.

But healthcare isn't just about doctors' appointments.  Maybe you need to refill a prescription late at night.  Our "Find Pharmacies" feature locates pharmacies that are open 24/7 near you, providing peace of mind no matter the time.  Perhaps you're looking to get active and improve your overall health.  "Fitness Services" provides information on the nearest gyms, yoga studios, and physiotherapy centers, so you can find the perfect workout routine to suit your needs.

Thinking about your loved ones? We haven't forgotten about them.  "Elder Care" offers contact details for elder care services and nurse services in your area, so you can ensure your senior family members receive the best possible care.  Finally, "Diagnostic Centers" helps you locate facilities for lab tests and imaging services, allowing you to get the necessary tests done quickly and efficiently.

Our comprehensive suite of healthcare services puts the power of managing your well-being right at your fingertips.  Don't wait until a health concern arises.  Take charge of your health journey today and explore the many features we offer.</p>
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

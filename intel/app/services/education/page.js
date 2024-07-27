'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const educationServices = [
  {
    category: 'School Details',
    description: 'School details and admission window with fee structures.',
    link: '/services/education/school-details',
    image: 'https://i.postimg.cc/sfwsqZd6/school-details.jpg',
  },
  
  {
    category: 'Tuition Centers',
    description: 'Nearest tuition center for a particular subject, with teacher details.',
    link: '/services/education/tuition-centers',
    image: 'https://i.postimg.cc/yds6JK1B/tuition-centers.jpg',
  },
  {
    category: 'Arts and Sports',
    description: 'Details on arts, music, sports, and cultural activity centers.',
    link: '/services/education/arts-and-sports',
    image: 'https://i.postimg.cc/MGFWyDSD/arts-and-sports.jpg',
  },
  {
    category: 'Colleges and University',
    description: 'List of top colleges and universities near you.',
    link: '/services/education/colleges',
    image: 'https://i.postimg.cc/PxDWSMWQ/colleges.jpg',
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
  'https://i.postimg.cc/nL5DWQnF/education1.jpg',
  'https://i.postimg.cc/mZQ2YhbD/education2.jpg',
  'https://i.postimg.cc/6pL4jmgC/education3.jpg',
  'https://i.postimg.cc/x8RS15Yg/education4.jpg'
];

const quotes = [
  "Education is the most powerful weapon which you can use to change the world. - Dr. A. P. J. Abdul Kalam", 
"The highest education is that which does not merely give us information but makes our life in harmony with all existence. - Rabindranath Tagore ",

"Education is the best friend. An educated person is respected everywhere. Education beats the beauty and the youth. - Chanakya ",

"The power of concentration is the only key to the treasure-house of knowledge. - Swami Vivekananda ",
"There is no end to education. It is not that you read a book, pass an examination, and finish with education. The whole of life, from the moment you are born to the moment you die, is a process of learning. - Jiddu" ,

"By education, I mean a training which is moral and spiritual as well as intellectual. The training by which character is formed, strength is given to the will and intellect is developed, so that the whole being becomes harmonious. - Swami Vivekananda",

"All over India, there is a vague feeling of discontent in the air about our prevalent system of education. The mind of our educated community has been brought up within the enclosure of the modern Indian educational system... We are unable to see it and judge it from outside. - Rabindranath Tagore",

"Scholarship that is indifferent to human suffering is immoral. - Arundhati Roy" ,
"Awake, arise and educate, smash traditions - liberate! - Savitribai Phule" 
];

export default function EducationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const testimonyInterval = setInterval(() => {
      setCurrentTestimonyIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
    }, 3000); // Change testimony every 3 seconds

    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change hero image every 5 seconds

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => {
      clearInterval(testimonyInterval);
      clearInterval(heroInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleNextService = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % educationServices.length);
  };

  const handlePrevService = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + educationServices.length) % educationServices.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className={`relative h-[500px] rounded-lg mb-12 overflow-hidden bg-purple-500 transition-opacity duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 flex">
            <div className="w-1/2 relative bg-purple-400">
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
                <h1 className="text-4xl font-bold mb-2">Empowering Education for All</h1>
                <p className="text-lg mb-4">Discover top educational resources and services near you</p>
                <div className="mt-8">
                  <p className="text-xl italic">{quotes[currentQuoteIndex]}</p>
                </div>
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
              <Link href={educationServices[currentServiceIndex].link} legacyBehavior>
                <a className="block">
                  <Image 
                    src={educationServices[currentServiceIndex].image} 
                    width={400}
                    height={300}
                    alt={educationServices[currentServiceIndex].title}
                    className="rounded-lg mb-4 object-cover w-full h-64"
                  />
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">{educationServices[currentServiceIndex].title}</h2>
                  <p className="text-gray-700">{educationServices[currentServiceIndex].description}</p>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg">{educationServices[currentServiceIndex].description}</p>
                  </div>
                </a>
              </Link>
            </div>
            <button onClick={handleNextService} className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600">
              &#8594;
            </button>
          </div>
        </section>

        {/* Testimonies Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">What Our Users Say</h2>
          <div className="flex items-center justify-center">
            <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md text-center">
              <p className="text-gray-700 italic">"{testimonies[currentTestimonyIndex].testimony}"</p>
              <p className="mt-4 text-blue-600 font-bold">{testimonies[currentTestimonyIndex].name}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

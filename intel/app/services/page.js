'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';

const services = [
  {
    category: 'HEALTH SERVICES',
    description: 'We offer a comprehensive suite of healthcare services designed to empower you and simplify your journey towards a healthier you. Whether you need to find a top-rated doctor near you, locate a 24/7 pharmacy, or access nearby fitness centers, we are here to help. We connect you with trusted hospitals, diagnostic centers offering lab tests and imaging, elder care services, and physiotherapy options. Let us be your partner in navigating the healthcare landscape, from routine checkups to complex medical needs. We will equip you with the information and resources you need to make informed decisions about your health.  Experience a more proactive approach to your well-being, and ultimately achieve a healthier, happier you. With our services, you can take control of your health and live life to the fullest.',
    link: '/services/Health',
    image: "https://i.postimg.cc/RhYVLbz9/healthcare-1jpg.png"
  },
  {
    category: 'EDUCATION SERVICES',
    description: 'In one place, explore all your educational needs! Find detailed information on schools, including admission periods and fee structures. Our platform also connects you with affordable, reusable learning materials like laptops and textbooks. Need extra help? Locate nearby tuition centers with qualified teachers for specific subjects. Foster your childs passions! Discover arts, music, sports, and cultural activity centers near you. Plus, explore top colleges and universities in your area to plan your higher education journey. We are your one-stop shop for navigating the exciting world of education.',
    link: '/services/education',
    image: "https://i.postimg.cc/q78rHb7Y/education-1.jpg"
  },
  {
    category: 'TRANSPORTATION SERVICES',
    description: 'We have got your transportation needs covered, from getting from point A to B to keeping your wheels running smoothly.  Use our Taxi Fare Calculator to estimate the cost of your ride before you hail a cab.  Need a car for a weekend getaway or longer trip?  Rent from top-rated car rental services in your area.  Planning to take public transportation?  Locate bus stops near you and check their schedules for a stress-free commute.  Thinking of upgrading or downsizing your car?  Find the best deals on buying and selling used cars near you.  And dont forget to keep your vehicle in top shape!  Our platform helps you find trusted mechanics and auto repair services nearby.  Let us be your one-stop shop for all things transportation.',
    link: '/services/Transportation',
    image: "https://i.postimg.cc/MHg3TwPY/cars1.jpg"
  },
  {
    category: 'FINANCE SERVICES',
    description: 'We are here to simplify your financial well-being.  Our platform connects you with a variety of loan options, including details and interest rates from different banks.  Need help with taxes? Find highly-rated Chartered Accountants (CAs) in your area.  Explore different insurance plans and providers to ensure you have the right coverage.  Running low on cash? Locate ATMs near you with ease.  We can also help you find reputable insurance companies and agents to personalize your insurance needs.  Let us be your financial partner, empowering you to make informed decisions for a secure future.',
    link: '/services/FinancePage',
    image: "https://i.postimg.cc/FsfnWnQq/finance2.jpg"
  },
  {
    category: 'GOVERNMENT SERVICES',
    description: 'Navigating government services can be overwhelming. We are here to help!  Our platform streamlines the process by providing easy access to relevant government offices.  Find the nearest locations for Aadhar card and land registration.  Need a passport?  We will connect you with details on passport centers and qualified consultants.  Obtaining housing plan approval, borewell clearance, or water supply permits is a breeze with our directory of relevant authorities.  We can also help you locate offices for obtaining ration cards and voter IDs.  Stay informed about government schemes for farmers, women, students, and more.  Finally, our platform connects you with pension, PF, and gratuity consultants to ensure your financial security in retirement.  Let us be your one-stop shop for navigating government services with ease.',
    link: '/services/Government',
    image: "https://i.postimg.cc/5jcpJ3y7/government1.jpg"
  },
  {
    category: 'HOUSING SERVICES',
    description: 'We understand that maintaining a comfortable home requires a variety of services.  Our platform simplifies your day-to-day living with convenient access to reliable solutions.  Need repairs done around the house?  Find qualified home repair services for any maintenance issue.  Running low on groceries?  Locate nearby shops with ease to keep your pantry stocked.  Looking for help with housekeeping or childcare?  We connect you with trusted maid and aaya centers to ensure your peace of mind.  Planning a move?  Our platform provides details on reputable packers and movers to make your relocation smooth and stress-free.  Let us be your one-stop shop for all your housing needs, helping you create a comfortable and well-managed living space.',
    link: '/services/Housing',
    image: "https://i.postimg.cc/bvv53mtk/hosuing1.jpg"
  }
];

const ServicesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  if (!session) {
    return null; // Return null to prevent flash of content before redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">Our Services</h1>
      <div className="flex flex-col gap-8">
        {services.map((service, index) => (
          <section key={index} className="h-[500px] flex items-center bg-white p-6 rounded-lg shadow-md border border-purple-200">
            {index % 2 === 0 ? (
              <>
                <div className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
                  <img src={service.image} alt={service.category} className="h-3/4 object-cover rounded-lg" />
                </div>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <Link href={service.link}>
                    <div className="block">
                      <h2 className="text-2xl font-extrabold text-purple-600 mb-4 hover:text-purple-950 transition duration-300 ease-in-out">{service.category}</h2>
                      <p className="text-gray-600 font-serif font-semibold hover:text-black transition duration-300 ease-in-out">{service.description}</p>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <Link href={service.link}>
                    <div className="block">
                      <h2 className="text-2xl font-extrabold text-purple-600 mb-4 hover:text-purple-950 transition duration-300 ease-in-out">{service.category}</h2>
                      <p className="text-gray-600 font-serif font-semibold hover:text-black transition duration-300 ease-in-out">{service.description}</p>
                    </div>
                  </Link>
                </div>
                <div className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
                  <img src={service.image} alt={service.category} className="h-3/4 object-cover rounded-lg" />
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

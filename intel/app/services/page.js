'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    category: 'HEALTH SERVICES',
    description: 'We offer a comprehensive suite of healthcare services designed to empower you and simplify your journey towards a healthier you.',
    image: "https://i.postimg.cc/RhYVLbz9/healthcare-1jpg.png",
    subservices: [
      { name: 'HOSPITALS NEARBY', path: '/services/Health/FindHospital' },
      { name: 'FIND PHARMACY', path: '/services/Health/pharmacies' },
      { name: 'DOCTORS NEARBY', path: '/services/Health/doctors' },
      { name: 'ELDER CARE', path: '/services/Health/ElderCare' },
      { name: 'DIAGNOSTIC CENTRE', path: '/services/Health/DiagnosticCentre' },
      { name: 'FITNESS CENTRES', path: '/services/Health/FitnessServices' }
    ]
  },
  {
    category: 'TRANSPORTATION SERVICES',
    description: 'We have got your transportation needs covered, from getting from point A to B to keeping your wheels running smoothly.',
    image: "https://i.postimg.cc/MHg3TwPY/cars1.jpg",
    subservices: [
      { name: 'CAR RENTALS', path: '/services/Transportation/CarRentals' },
      { name: 'BUS STOPS NEARBY', path: '/services/Transportation/BusStops' },
      { name: 'TAXI FARE CALCULATOR', path: '/services/Transportation/FindCabs' },
      { name: 'USED CAR DEALER', path: '/services/Transportation/BuySellCars' },
      { name: 'NEARBY MECHANICS', path: '/services/Transportation/Mechanic' }
    ]
  },
  {
    category: 'GOVERNMENT SERVICES',
    description: 'Navigating government services can be overwhelming. We are here to help! Our platform streamlines the process by providing easy access to relevant government offices.',
    image: "https://i.postimg.cc/5jcpJ3y7/government1.jpg",
    subservices: [
      { name: 'AADHAR CARD', path: '/services/Government/AadharCard' },
      { name: 'GOVERNMENT SCHEMES', path: '/services/Government/GovernmentSchemes' },
      { name: 'PASSPORT OFFICE', path: '/services/Government/Passport' },
      { name: 'PENSION', path: '/services/Government/Pension' }
    ]
  },
  {
    category: 'EDUCATION SERVICES',
    description: 'In one place, explore all your educational needs! Find detailed information on schools, including admission periods and fee structures.',
    image: "https://i.postimg.cc/q78rHb7Y/education-1.jpg",
    subservices: [
      { name: 'SCHOOLS NEARBY', path: '/services/education/school-details' },
      { name: 'COLLEGES NEARBY', path: '/services/education/colleges' },
      { name: 'TUITION CENTRES', path: '/services/education/tuition-centers' },
      { name: 'ART & SPORTS', path: '/services/education/arts-and-sports' }
    ]
  },
  {
    category: 'HOUSING SERVICES',
    description: 'We understand that maintaining a comfortable home requires a variety of services. Our platform simplifies your day-to-day living with convenient access to reliable solutions.',
    image: "https://i.postimg.cc/bvv53mtk/hosuing1.jpg",
    subservices: [
      { name: 'GROCERY SHOPS', path: '/services/Housing/Grocery' },
      { name: 'HOME REPAIR', path: '/services/Housing/HomeRepair' },
      { name: 'DOMESTIC HELP', path: '/services/Housing/Maid' },
      { name: 'PACKERS & MOVERS', path: '/services/Housing/PackersMovers' }
    ]
  },
  {
    category: 'FINANCE SERVICES',
    description: 'We are here to simplify your financial well-being. Our platform connects you with a variety of loan options, including details and interest rates from different banks.',
    image: "https://i.postimg.cc/FsfnWnQq/finance2.jpg",
    subservices: [
      { name: 'ATM NEARBY', path: '/services/FinancePage/AtmLocator' },
      { name: 'INSURANCE SERVICES', path: '/services/FinancePage/Insurance' },
      { name: 'LOAN SERVICES', path: '/services/FinancePage/Loan' },
      { name: 'TAXATION', path: '/services/FinancePage/Tax' },
      { name: 'INSURANCE PROVIDER', path: '/services/FinancePage/InsuranceProvider' }
    ]
  }
];

const ServicesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });

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
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600 font-helvetica">Our Services</h1>
      <div className="flex flex-col gap-8">
        {services.map((service, index) => (
          <section
            key={index}
            className="h-[500px] flex items-center bg-white p-6 rounded-lg shadow-md border border-purple-200"
            
          >
            {index % 2 === 0 ? (
              <>
                <div data-aos="zoom-in" className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
                  <img src={service.image} alt={service.category} className="h-3/4 object-cover rounded-lg" />
                </div>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-extrabold text-purple-600 mb-4 font-helvetica">{service.category}</h2>
                  <p className="text-black font-leto font-semibold">{service.description}</p>
                  <ul className="text-purple-400 font-leto font-semibold list-disc">
                    {service.subservices.map((subservice, subIndex) => (
                      <li key={subIndex}>
                        <button onClick={() => router.push(subservice.path)} className="text-black hover:text-white hover:bg-purple-400 transition duration-300 ease-in-out px-3 py-2 rounded font-leto">
                          {subservice.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-extrabold text-purple-600 mb-4 font-helvetica">{service.category}</h2>
                  <p className="text-black font-leto font-semibold">{service.description}</p>
                  <ul className="text-purple-400 font-leto font-semibold list-disc">
                    {service.subservices.map((subservice, subIndex) => (
                      <li key={subIndex}>
                        <button onClick={() => router.push(subservice.path)} className="text-black hover:text-white hover:bg-purple-400 transition duration-300 ease-in-out px-3 py-2 rounded font-leto">
                          {subservice.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-aos="zoom-in" className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
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

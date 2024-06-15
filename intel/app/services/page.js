'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faGraduationCap, faCar, faMoneyBillWave, faLandmark, faHome } from '@fortawesome/free-solid-svg-icons';

const services = [
  {
    category: 'Health',
    description: 'Find hospitals, doctors, pharmacies, and emergency services.',
    link: '/services/Health',
    icon: faHospital,
  },
  {
    category: 'Education',
    description: 'Learning materials, mentors, tuition centers, and more.',
    link: '/services/education',
    icon: faGraduationCap,
  },
  {
    category: 'Transportation',
    description: 'Transport services, vehicle centers, bus stations, and more.',
    link: '/services/transportation',
    icon: faCar,
  },
  {
    category: 'Finance',
    description: 'Banking, tax, insurance details, and financial services.',
    link: '/services/FinancePage',
    icon: faMoneyBillWave,
  },
  {
    category: 'Government Services',
    description: 'Aadhar, passport, ration card, and other government services.',
    link: '/services/Government',
    icon: faLandmark,
  },
  {
    category: 'Housing Services',
    description: 'Find electricians, plumbers, painters, and other housing services.',
    link: '/services/housing-services',
    icon: faHome,
  }
];

const ServicesPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/');
  //   } 
  // }, [session, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <section key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Link href={service.link}>
              <div className="block">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={service.icon} className="h-8 w-8 mr-4 text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-600">{service.category}</h2>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
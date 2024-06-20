'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faSchool, faBicycle, faWalking, faPhone, faClock, faStar, faMapMarkerAlt, faCar } from '@fortawesome/free-solid-svg-icons';

const educationServices = [
  {
    category: 'School Details',
    description: 'School details and admission window with fee structures.',
    link: '/services/education/school-details',
    icon: faGraduationCap,
  },
  {
    category: 'Learning Materials',
    description: 'Second-hand / reusable learning materials for lesser cost including laptops, etc.',
    link: '/services/education/learning-materials',
    icon: faGraduationCap,
  },
  {
    category: 'Tuition Centers',
    description: 'Nearest tuition center for a particular subject, with teacher details.',
    link: '/services/education/tuition-centers',
    icon: faGraduationCap,
  },
  {
    category: 'Arts and Sports',
    description: 'Details on arts, music, sports, and cultural activity centers.',
    link: '/services/education/arts-and-sports',
    icon: faGraduationCap,
  },
  {
    category: 'Colleges and University',
    description: 'List of top colleges and universities near you.',
    link: '/services/education/colleges',
    icon: faGraduationCap,
  }
];

const EducationPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/');
  //   } 
  // }, [session, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Education Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationServices.map((service, index) => (
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

export default EducationPage;

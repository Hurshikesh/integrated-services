'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPassport, faGavel, faIdCard, faLeaf, faUsers, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

const governmentServices = [
  {
    category: 'Aadhar & Land Registration',
    description: 'Nearest Govt offices for Aadhar and land registration.',
    link: '/services/Government/AadharCard',
    icon: faIdCard,
  },
  {
    category: 'Passport',
    description: 'Passport center details and passport consultant details.',
    link: '/services/Government/Passport',
    icon: faPassport,
  },
  {
    category: 'Housing Plan Approval',
    description: 'Housing plan approval, borewell, and water supply approver details.',
    link: '/services/Government/housing-plan-approval',
    icon: faBuilding,
  },
  {
    category: 'Ration Card & Voter ID',
    description: 'Ration card and voter ID centers to address customer queries.',
    link: '/services/Government/ration-card-voter-id',
    icon: faIdCard,
  },
  {
    category: 'Government Schemes',
    description: 'Details of government schemes for farmers, women, students, etc.',
    link: '/services/Government/GovernmentSchemes',
    icon: faLeaf,
  },
  {
    category: 'Pension & PF Consultants',
    description: 'Pension, PF, and gratuity consultant details.',
    link: '/services/Government/pension-pf-consultants',
    icon: faHandHoldingUsd,
  }
];

const GovernmentServicesPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    } 
  }, [session, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Government Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {governmentServices.map((service, index) => (
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

export default GovernmentServicesPage;

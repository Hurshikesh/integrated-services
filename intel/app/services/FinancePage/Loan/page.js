'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faGraduationCap, faHome, faBriefcase, faCar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const loantype = [
  {
    name: 'Personal Loan',
    details: 'A personal loan is an unsecured loan for various purposes with a higher interest rate but no collateral required.',
    link: '/services/FinancePage/Loan/PersonalLoan',
    icon: faMoneyBill,
  },
  {
    name: 'Education Loan',
    details: 'Education loans finance higher education by covering tuition, fees, and living expenses.',
    slug: 'education-loan',
    icon: faGraduationCap,
  },
  {
    name: 'Home Loan',
    details: 'A home loan is a secured loan from a bank to help finance the purchase or construction of a property.',
    slug: 'home-loan',
    icon: faHome,
  },
  {
    name: 'Gold Loan',
    details: 'Gold loans are a secured way to borrow money by pledging your gold jewelry as collateral.',
    slug: 'gold-loan',
    icon: faBriefcase,
  },
  {
    name: 'Loan Against Property',
    details: 'Loan against property (LAP) lets you borrow money using your existing property as security.',
    slug: 'loan-against-property',
    icon: faMapMarkerAlt,
  },
  {
    name: 'Auto Loan',
    details: 'An auto loan finances the purchase of a car, new or used, with the car itself typically serving as collateral.',
    slug: 'auto-loan',
    icon: faCar,
  },
];

const LoanServices = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/');
  //   } 
  // }, [session, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Loan Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loantype.map((loan, index) => (
          <section key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Link href={`/loans/${loan.slug}`}>
              <div className="block">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={loan.icon} className="h-8 w-8 mr-4 text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-600">{loan.name}</h2>
                </div>
                <p className="text-gray-700">{loan.details}</p>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LoanServices;
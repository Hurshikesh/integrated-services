'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Corrected import from 'next/navigation'
import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faGraduationCap, faHome, faBriefcase, faCar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const loantype = [
  {
    name: 'Personal Loan',
    details: 'A personal loan is an unsecured loan for various purposes with a higher interest rate but no collateral required.',
    link: '/services/FinancePage/Loan/Personal-Loan',
    image: "https://i.postimg.cc/g0P2GSCv/personal-loan.jpg"
  },
  {
    name: 'Education Loan',
    details: 'Education loans finance higher education by covering tuition, fees, and living expenses.',
    link: '/services/FinancePage/Loan/Education-Loan',
    image: "https://i.postimg.cc/nzmP12Rh/Education-Loan.jpg"
  },
  {
    name: 'Home Loan',
    details: 'A home loan is a secured loan from a bank to help finance the purchase or construction of a property.',
    link: '/services/FinancePage/Loan/Home-Loan',
    image: "https://i.postimg.cc/1znRcxph/home-loan.jpg"
  },
  {
    name: 'Gold Loan',
    details: 'Gold loans are a secured way to borrow money by pledging your gold jewelry as collateral.',
    link: '/services/FinancePage/Loan/Gold-Loan',
    image: "https://i.postimg.cc/QtPjFfBN/gold-loan.jpg"
  },
  {
    name: 'Loan Against Property',
    details: 'Loan against property (LAP) lets you borrow money using your existing property as security.',
    link: '/services/FinancePage/Loan/Loan-Against-Property',
    image: "https://i.postimg.cc/cLVjtPhb/Loan-Against-Property.jpg"
  },
  {
    name: 'Auto Loan',
    details: 'An auto loan finances the purchase of a car, new or used, with the car itself typically serving as collateral.',
    link: '/services/FinancePage/Loan/Auto-Loan',
   image: "https://i.postimg.cc/sxhGxQg8/auto-loan.png"
  },
];

const LoanServices = () => {
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
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">Loan Services</h1>
      <div className="flex flex-col gap-8">
        {loantype.map((loan, index) => (
          <section
            key={index}
            className="h-[500px] flex items-center bg-white p-6 rounded-lg shadow-md border border-purple-200"
          >
            {index % 2 === 0 ? (
              <>
                <div data-aos="zoom-in" className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
                <img src={loan.image} alt={loan.category} className="h-3/4 object-cover rounded-lg text-purple-600" />
                </div>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-extrabold text-purple-600 mb-4">{loan.name}</h2>
                  <p className="text-black">{loan.details}</p>
                  <Link href={loan.link}>
                    <button className="mt-4 text-black hover:text-white hover:bg-purple-400 transition duration-300 ease-in-out px-3 py-2 rounded font-extrabold ">
                      Learn More
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-extrabold text-purple-600 mb-4">{loan.name}</h2>
                  <p className="text-black">{loan.details}</p>
                  <Link href={loan.link}>
                    <button className="mt-4 text-black hover:text-white hover:bg-purple-400 transition duration-300 ease-in-out px-3 py-2 rounded font-extrabold">
                      Learn More
                    </button>
                  </Link>
                </div>
                <div data-aos="zoom-in" className="w-1/2 h-full flex justify-center items-center bg-purple-100 border border-purple-200 rounded-lg p-4">
                <img src={loan.image} alt={loan.category} className="h-3/4 object-cover rounded-lg text-purple-600" />
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LoanServices;

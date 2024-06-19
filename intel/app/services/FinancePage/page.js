import React from 'react';
import Link from 'next/link';

const FinancePage = () => {
  const services = [
    {
      category: 'Loan Services',
      description: 'Different banks offering various types of loans with their interest rates and details.',
      link: '/services/FinancePage/Loan',
    },
    {
      category: 'Tax Services',
      description: 'List of different CAs around you with ratings.',
      link: '/services/FinancePage/Tax',
    },
    {
      category: 'Insurance Services',
      description: 'Details on different insurance plans and providers.',
      link: '/services/FinancePage/Insurance',
    },
    {
      category: 'Atm Locator',
      description: 'Finds the atm near your location.',
      link: '/services/FinancePage/AtmLocator',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Finance Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Link href={service.link} legacyBehavior>
              <a className="block">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{service.category}</h2>
                <p className="text-gray-700">{service.description}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancePage;

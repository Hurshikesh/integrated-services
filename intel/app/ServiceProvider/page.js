import React from 'react';
import Link from 'next/link';

const ServiceProvider = () => {
  const options = [
    {
      category: 'Add New Service',
      description: 'Add a new service to our list of offerings.',
      link: '/ServiceProvider/AddNewService',
    },
    {
      category: 'Update Service',
      description: 'Update the details of an existing service.',
      link: '/ServiceProvider/UpdateService',
    },
    {
      category: 'Contact Us',
      description: 'Get in touch with our team for any inquiries.',
      link: '/ServiceProvider/ContactUs',
    },
    {
      category: 'Pricing',
      description: 'Learn about the pricing for our services.',
      link: '/ServiceProvider/Pricing',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Service Provider Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {options.map((option, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-slide-up">
            <Link href={option.link} legacyBehavior>
              <a className="block">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{option.category}</h2>
                <p className="text-gray-700">{option.description}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProvider;

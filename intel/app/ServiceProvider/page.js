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
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        Service Provider Options
      </h1>
      <div className="w-full flex flex-col md:flex-row">
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="bg-purple-400 p-8 rounded-lg shadow-md hover:bg-purple-800 transition-colors duration-300 text-white" style={{ fontFamily: 'Leto, Arial, sans-serif', minHeight: '200px', maxWidth: '90%', margin: 'auto' }}>
            <Link href={options[0].link} legacyBehavior>
              <a className="block">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{options[0].category}</h2>
                <p>{options[0].description}</p>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="bg-purple-400 p-8 rounded-lg shadow-md hover:bg-purple-800 transition-colors duration-300 text-white" style={{ fontFamily: 'Leto, Arial, sans-serif', minHeight: '200px', maxWidth: '90%', margin: 'auto' }}>
            <Link href={options[1].link} legacyBehavior>
              <a className="block">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>{options[1].category}</h2>
                <p>{options[1].description}</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;

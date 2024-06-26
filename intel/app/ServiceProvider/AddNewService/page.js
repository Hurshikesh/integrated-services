'use client';

import React, { useState } from 'react';

const AddNewService = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const domains = ['Healthcare', 'Finance', 'Transportation', 'Government', 'Housing', 'Education'];
  const healthcareServices = ['Hospital', 'Clinic', 'Pharmacy', 'Elder Care', 'Diagnostic Centre', 'Fitness Centre'];
  const financeServices = ['ATM', 'CA', 'Insurance Provider'];
  const transportation=['Car Rentals','Buy And Sell Cars','Auto Mechanic'];
  const education=['School','University/College','Coaching Centre','Arts And Sprots'];
  const housing=['Home Repair','Grocery','Domestic Help','Packers And Movers'];
  const serviceOptions = {
    Healthcare: healthcareServices,
    Finance: financeServices,
    Transportation:transportation,
    Housing:housing,
    Education:education,

    // Add other domain services here if needed
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setSelectedService(''); // Reset the service when domain changes
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Add New Service</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
          Select Domain
        </label>
        <select
          id="domain"
          value={selectedDomain}
          onChange={handleDomainChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Domain</option>
          {domains.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {selectedDomain && serviceOptions[selectedDomain] && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
            Select Service Type
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={handleServiceChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Service Type</option>
            {serviceOptions[selectedDomain].map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDomain && selectedService && (
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Add {selectedService} in {selectedDomain}
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceName">
                Company Name
              </label>
              <input
                id="serviceName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicegst">
                GST Number
              </label>
              <input
                id="servicegst"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicelocation">
                Your Location
              </label>
              <textarea
                id="servicelocation"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicedescription">
                Provide a detailed description about your service
              </label>
              <textarea
                id="servicedescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Service
            </button>
          </form>
          <button
            onClick={() => {
              setSelectedService('');
              setSelectedDomain('');
            }}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Domain Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewService;

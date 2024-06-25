'use client';

import React, { useState } from 'react';

const AddNewService = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedHealthcareService, setSelectedHealthcareService] = useState('');
  const [selectedFinanceService, setSelectedFinanceService] = useState('');

  const domains = ['Healthcare', 'Finance', 'Transportation', 'Government', 'Housing'];
  const healthcareServices = ['Hospital', 'Clinic', 'Pharmacy', 'Elder Care', 'Diagnostic Centre', 'Fitness Centre'];
  const financeServices = ['ATM', 'CA', 'Insurance Provider'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Add New Service</h1>

      {!selectedDomain ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedDomain(domain)}
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{domain}</h2>
            </div>
          ))}
        </div>
      ) : selectedDomain === 'Healthcare' && !selectedHealthcareService ? (
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Select Healthcare Service Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthcareServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedHealthcareService(service)}
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{service}</h2>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedDomain('')}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Domain Selection
          </button>
        </div>
      ) : selectedDomain === 'Finance' && !selectedFinanceService ? (
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Select Finance Service Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financeServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedFinanceService(service)}
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{service}</h2>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedDomain('')}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Domain Selection
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Add {selectedHealthcareService || selectedFinanceService || 'Service'} in {selectedDomain}
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
              if (selectedHealthcareService) {
                setSelectedHealthcareService('');
              } else if (selectedFinanceService) {
                setSelectedFinanceService('');
              } else {
                setSelectedDomain('');
              }
            }}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {selectedHealthcareService || selectedFinanceService ? 'Back to Service Types' : 'Back to Domain Selection'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewService;

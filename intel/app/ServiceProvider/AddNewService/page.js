'use client';

import React, { useState } from 'react';

const AddNewService = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [GST, setGST] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');

  const domains = ['Healthcare', 'Finance', 'Transportation', 'Government', 'Housing', 'Education'];
  const healthcareServices = ['Hospital', 'Clinic', 'Pharmacy', 'Elder Care', 'Diagnostic Centre', 'Fitness Centre'];
  const financeServices = ['ATM', 'CA', 'Insurance Provider'];
  const transportation = ['Car Rentals', 'Buy And Sell Cars', 'Auto Mechanic'];
  const education = ['School', 'University/College', 'Coaching Centre', 'Arts And Sports'];
  const housing = ['Home Repair', 'Grocery', 'Domestic Help', 'Packers And Movers'];
  const serviceOptions = {
    Healthcare: healthcareServices,
    Finance: financeServices,
    Transportation: transportation,
    Housing: housing,
    Education: education,
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setSelectedService(''); // Reset the service when domain changes
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      domain: selectedDomain,
      serviceType: selectedService,
      phone,
      address,
      companyName,
      bio,
      GST,
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await fetch('/api/serviceProvider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log('Response from server:', result);

      if (result.success) {
        alert('Service added successfully!');
        setSelectedDomain('');
        setSelectedService('');
        setCompanyName('');
        setGST('');
        setAddress('');
        setBio('');
        setPhone('');
      } else {
        alert(result.message || 'Failed to add service.');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service.');
    }
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="GST">
                GST Number
              </label>
              <input
                id="GST"
                type="text"
                value={GST}
                onChange={(e) => setGST(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Your Location
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Provide a detailed description about your service
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              setCompanyName('');
              setGST('');
              setAddress('');
              setBio('');
              setPhone('');
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

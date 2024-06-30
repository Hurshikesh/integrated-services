'use client';

import React, { useState } from 'react';

const UpdateService = () => {
  const [GST, setGST] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    try {
      const response = await fetch(`/api/serviceProviderData?gst=${GST}`);
      const result = await response.json();

      if (response.ok) {
        setServiceData(result.data);
      } else {
        setError(result.error || 'Service not found');
        setServiceData(null);
      }
    } catch (error) {
      setError('Error fetching service data.');
      setServiceData(null);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setServiceData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/serviceProvider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Service updated successfully!');
      } else {
        alert(result.error || 'Failed to update service.');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Update Your Service</h1>
      <div className="mb-4">
        <input
          type="text"
          value={GST}
          onChange={(e) => setGST(e.target.value)}
          placeholder="Enter GST Number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search Service
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {serviceData && (
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Update Service Details</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
              Domain
            </label>
            <input
              id="domain"
              type="text"
              value={serviceData.domain || ''}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
              Service Type
            </label>
            <input
              id="serviceType"
              type="text"
              value={serviceData.serviceType || ''}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={serviceData.companyName || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={serviceData.address || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={serviceData.bio || ''}
              onChange={handleInputChange}
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
              value={serviceData.phone || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Service
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateService;

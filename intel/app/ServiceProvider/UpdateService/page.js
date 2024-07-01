// UpdateService.js

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
      <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Find And Update Your <span className="underline text-blue-500">Service</span>
            </h1>
          </div>
        
        {/* Find Your Service Section */}
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
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Find Your Profile</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {serviceData && (
          <div className="mt-8 p-4 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Update Service Details</h2>
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
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Update Your profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateService;

'use client';

import React, { useState } from 'react';
import { FaUserMd, FaUsers, FaClipboardList, FaHospitalAlt, FaHandsHelping } from 'react-icons/fa';

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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("path/to/your/background-image.jpg")' }}>
      <div className="flex flex-col items-center justify-center bg-opacity-75 py-12 px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg w-full max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Claim Your <span className="underline text-blue-500">Profile</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of professionals who have successfully claimed their profiles.
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 space-y-8">
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="domain" className="sr-only">Domain</label>
                    <select
                      id="domain"
                      value={selectedDomain}
                      onChange={handleDomainChange}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                    <div>
                      <label htmlFor="service" className="sr-only">Service Type</label>
                      <select
                        id="service"
                        value={selectedService}
                        onChange={handleServiceChange}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  <div>
                    <label htmlFor="companyName" className="sr-only">Company Name</label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="GST" className="sr-only">GST Number</label>
                    <input
                      id="GST"
                      name="GST"
                      type="text"
                      value={GST}
                      onChange={(e) => setGST(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="GST Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="sr-only">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Your Location"
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="sr-only">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Provide a detailed description about your service"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/3 mt-12 lg:mt-0 lg:pl-12">
              <div className="bg-white p-8 shadow rounded-lg space-y-6">
                <div className="flex items-center">
                  <FaUserMd className="text-indigo-500 text-4xl" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Increase Visibility</h3>
                    <p className="text-gray-600">Personalize your profile and make it visible to more users</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClipboardList className="text-indigo-500 text-4xl" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Connect with Patients</h3>
                    <p className="text-gray-600">Engage with users patients directly through your profile</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHospitalAlt className="text-indigo-500 text-4xl" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Manage Appointments</h3>
                    <p className="text-gray-600">Easily manage and schedule appointments with users</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHandsHelping className="text-indigo-500 text-4xl" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Improve Your Practice</h3>
                    <p className="text-gray-600">Gain insights and improve your service</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vmmIiLnjDnnHqLW7WTMopgi_NTAZywxwDA&s" alt="Logo 1" className="h-40 mx-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewService;
'use client';

import React, { useState } from 'react';
import { FaUserMd, FaClipboardList, FaHospitalAlt, FaHandsHelping } from 'react-icons/fa';

const AddNewService = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedService, setSelectedService] = useState('');
<<<<<<< Updated upstream
  const [companyName, setCompanyName] = useState('');
  const [GST, setGST] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});

  const domains = ['Healthcare', 'Finance', 'Transportation', 'Government', 'Housing', 'Education'];
  const healthcareServices = ['Hospital', 'Clinic', 'Pharmacy', 'Elder Care', 'Diagnostic Centre', 'Fitness Centre'];
  const financeServices = ['ATM', 'CA', 'Insurance Provider'];
=======
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const domains = ['Healthcare', 'Finance', 'Transportation', 'Government', 'Housing', 'Education'];
  const healthcareServices = ['Hospital', 'Clinic', 'Pharmacy', 'Elder Care', 'Diagnostic Centre', 'Fitness Centre'];
  const financeServices = ['ATM', 'Chartered Accountant', 'Insurance Provider'];
>>>>>>> Stashed changes
  const transportation = ['Car Rentals', 'Buy And Sell Cars', 'Auto Mechanic'];
  const education = ['School', 'University/College', 'Coaching Centre', 'Arts And Sports'];
  const housing = ['Home Repair', 'Grocery', 'Domestic Help', 'Packers And Movers'];
  const serviceOptions = {
    Healthcare: healthcareServices,
    Finance: financeServices,
    Transportation: transportation,
    Housing: housing,
    Education: education,
<<<<<<< Updated upstream
=======

    // Add other domain services here if needed
>>>>>>> Stashed changes
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
    setSelectedService(''); // Reset the service when domain changes
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

<<<<<<< Updated upstream
  const validateGST = (gst) => {
    return gst.length === 15;
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateAddress = (address) => {
    return address.length >= 10;
  };

  const validateBio = (bio) => {
    return bio.length <= 500;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!validateGST(GST)) {
      validationErrors.GST = 'GST must be exactly 15 characters.';
    }

    if (!validatePhone(phone)) {
      validationErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!validateAddress(address)) {
      validationErrors.address = 'Address must be at least 10 characters long.';
    }

    if (!validateBio(bio)) {
      validationErrors.bio = 'Bio cannot be more than 500 characters.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({});
      } else {
        alert(result.message || 'Failed to add service.');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service.');
=======
  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      if (value.length === 10) {
        setMobileNumberError('');
      } else {
        setMobileNumberError('Mobile number must be 10 digits.');
      }
>>>>>>> Stashed changes
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
                      required
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
                        required
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
                    {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
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
                    {errors.GST && <p className="text-red-500 text-xs mt-1">{errors.GST}</p>}
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
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                      maxLength="500"
                    />
                    {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
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
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
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
<<<<<<< Updated upstream
=======

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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="text"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {mobileNumberError && <p className="text-red-500 text-xs italic">{mobileNumberError}</p>}
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
>>>>>>> Stashed changes
    </div>
  );
};

export default AddNewService;

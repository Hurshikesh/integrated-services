'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FindHospitalPage = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital+near+${encodeURIComponent(location)}`
      );
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHospitals();
  };

  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Search for Hospitals Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Enter your location (city, state, country):</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 text-black p-3 rounded-lg w-full"
                placeholder="e.g., San Francisco, CA, USA"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </form>
        </section>

        {/* Hospital List */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Hospitals Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hospitals.map((hospital) => (
                <div key={hospital.place_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(hospital.display_name)}`}
                    alt={hospital.display_name}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                  <div className="p-4 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{hospital.display_name}</h3>
                    <p className="text-gray-700">{hospital.name ? hospital.name : 'No address available'}</p>
                    <p className="text-gray-700">{hospital.display_name ? hospital.display_name  : 'No country information'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default FindHospitalPage;

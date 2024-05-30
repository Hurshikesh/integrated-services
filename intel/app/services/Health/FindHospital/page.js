'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking } from '@fortawesome/free-solid-svg-icons';

const FindHospitalPage = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchUserCoords = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setErrorMessage(''); // Clear previous error message
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      } else {
        setErrorMessage('Address not found please try again with some other address');
      }
    } catch (error) {
      console.error('Error fetching user coordinates:', error);
      setErrorMessage('Error fetching user coordinates.');
    }
    return null;
  };

  const fetchHospitals = async (userCoordinates) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital+near+${userCoordinates.lat},${userCoordinates.lon}`
      );
      const data = await response.json();
      const hospitalsWithDistances = data.map(hospital => ({
        ...hospital,
        distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, parseFloat(hospital.lat), parseFloat(hospital.lon)),
        travelTime: calculateTravelTime(userCoordinates, { lat: parseFloat(hospital.lat), lon: parseFloat(hospital.lon) })
      }));
      
      hospitalsWithDistances.sort((a, b) => a.distance - b.distance);
      
      setHospitals(hospitalsWithDistances);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setErrorMessage('Error fetching hospitals.');
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchHospitals(userCoordinates);
    } else {
      setHospitals([]); // Clear previous hospital data
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const calculateTravelTime = (origin, destination) => {
    const carSpeed = 60; // km/h
    const bikeSpeed = 20; // km/h
    const walkSpeed = 5; // km/h

    const distance = calculateDistance(origin.lat, origin.lon, destination.lat, destination.lon);

    const carTime = distance / carSpeed;
    const bikeTime = distance / bikeSpeed;
    const walkTime = distance / walkSpeed;

    return { car: carTime * 60, bike: bikeTime * 60, walk: walkTime * 60 }; // Convert hours to minutes
  };

  const toRad = (value) => (value * Math.PI) / 180;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Hospitals Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Enter your location (detailed address):</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 text-black p-3 rounded-lg w-full"
                placeholder="e.g., 123 Main St, San Francisco, CA, USA"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </form>
        </section>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center text-red-600">{errorMessage}</div>
        ) : (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Hospitals Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hospitals.map((hospital) => (
                <div key={hospital.place_id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name ? hospital.name : 'Name not available'}</h3>
                    <p className="text-gray-600 mb-4">{hospital.display_name ? hospital.display_name : 'Address not available'}</p>
                    {hospital.distance && (
                      <p className="text-gray-800 mb-2 text-xl">{`Distance: ${hospital.distance.toFixed(2)} km`}</p>
                    )}
                    {hospital.travelTime && (
                      <div className="flex justify-around text-gray-600 mb-2">
                        <span><FontAwesomeIcon icon={faCar} /> {` ${hospital.travelTime.car.toFixed(0)} min`}</span>
                        <span><FontAwesomeIcon icon={faBicycle} /> {` ${hospital.travelTime.bike.toFixed(0)} min`}</span>
                        <span><FontAwesomeIcon icon={faWalking} /> {` ${hospital.travelTime.walk.toFixed(0)} min`}</span>
                      </div>
                    )}
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

'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const FindDoctorPage = () => {
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
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
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setErrorMessage(''); // Clear previous error message
        return { lat: data.items[0].position.lat, lon: data.items[0].position.lng };
      } else {
        setErrorMessage('Address not found. Please try again with another address.');
      }
    } catch (error) {
      console.error('Error fetching user coordinates:', error);
      setErrorMessage('Error fetching user coordinates.');
    }
    return null;
  };

  const fetchDoctors = async (userCoordinates) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=doctor&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const data = await response.json();
      const doctorsWithDistances = data.items.map(doctor => ({
        ...doctor,
        distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, doctor.position.lat, doctor.position.lng),
        travelTime: calculateTravelTime(userCoordinates, { lat: doctor.position.lat, lon: doctor.position.lng }),
        isOpenNow: checkIfOpenNow(doctor.openingHours)
      }));
      
      doctorsWithDistances.sort((a, b) => a.distance - b.distance);
      
      setDoctors(doctorsWithDistances);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setErrorMessage('Error fetching doctors.');
    }
    setLoading(false);
  };

  const checkIfOpenNow = (openingHours) => {
    if (!openingHours || !openingHours[0] || !openingHours[0].structured) {
      return false;
    }
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 2);
    const currentTime = now.toTimeString().slice(0, 5).replace(':', '');

    for (const time of openingHours[0].structured) {
      if (time.recurrence.includes(currentDay)) {
        const [startHour, startMinute] = time.start.slice(1).split('H');
        const endHour = parseInt(startHour) + parseInt(time.duration.slice(2, 4));
        const endMinute = parseInt(startMinute) + parseInt(time.duration.slice(6, 8));
        const startTime = `${startHour}${startMinute}`;
        const endTime = `${endHour.toString().padStart(2, '0')}${endMinute.toString().padStart(2, '0')}`;
        
        if (currentTime >= startTime && currentTime <= endTime) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchDoctors(userCoordinates);
    } else {
      setDoctors([]); // Clear previous doctor data
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
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Doctors Near You</h2>
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
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Doctors Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.title}</h3>
                    <p className="text-gray-600 mb-4">{doctor.address.label}</p>
                    {doctor.contacts && doctor.contacts[0].mobile && (
                      <p className="text-gray-800 mb-2 text-xl">
                        <FontAwesomeIcon icon={faPhone} /> <strong>{doctor.contacts[0].mobile[0].value}</strong>
                      </p>
                    )}
                    {doctor.distance && (
                      <p className="text-gray-800 mb-2 text-xl">{`Distance: ${doctor.distance.toFixed(2)} km`}</p>
                    )}
                    {doctor.travelTime && (
                      <div className="flex justify-around text-gray-600 mb-2">
                        <span><FontAwesomeIcon icon={faCar} /> {` ${doctor.travelTime.car.toFixed(0)} min`}</span>
                        <span><FontAwesomeIcon icon={faBicycle} /> {` ${doctor.travelTime.bike.toFixed(0)} min`}</span>
                        <span><FontAwesomeIcon icon={faWalking} /> {` ${doctor.travelTime.walk.toFixed(0)} min`}</span>
                      </div>
                    )}
                    {doctor.openingHours && (
                      <div className="text-gray-600 mb-2">
                        <FontAwesomeIcon icon={faClock} /> {` ${doctor.openingHours[0].text.join(', ')}`}
                      </div>
                    )}
                    <p className={`text-lg font-bold ${doctor.isOpenNow ? 'text-green-600' : 'text-red-600'}`}>
                      {doctor.isOpenNow ? 'OPEN NOW' : 'CLOSED'}
                    </p>
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

export default FindDoctorPage;
'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBicycle,faCar,faWalking, faPhone, faClock, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const FindSchoolPage = () => {
  const [location, setLocation] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [sortOption, setSortOption] = useState('distance'); // Default sort option
  const [showResults, setShowResults] = useState(false);

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

  const fetchSchools = async (userCoordinates) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=school&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const data = await response.json();
      const schoolsWithDistances = data.items.map(school => ({
        ...school,
        distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, school.position.lat, school.position.lng),
        travelTime: calculateTravelTime(userCoordinates, { lat: school.position.lat, lon: school.position.lng }),
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        reviews: Math.floor(Math.random() * 1000) + 1,
        isOpenNow: checkIfOpenNow(),
        formattedOpeningHours: '08:00 - 15:00', // Fixed opening hours
        // Selecting 3 random features for each school
        features: Array.from(new Set(Array.from({ length: 3 }, () => `Feature ${Math.floor(Math.random() * 10) + 1}`)))
      }));

      setSchools(sortSchools(schoolsWithDistances, sortOption));
      setShowResults(true); // Display results after fetching
    } catch (error) {
      console.error('Error fetching schools:', error);
      setErrorMessage('Error fetching schools.');
    }
    setLoading(false);
  };

  const sortSchools = (schools, option) => {
    switch (option) {
      case 'distance':
        return schools.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return schools.sort((a, b) => b.rating - a.rating);
      case 'open':
        return schools.sort((a, b) => b.isOpenNow - a.isOpenNow);
      default:
        return schools;
    }
  };

  const checkIfOpenNow = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5).replace(':', '');
    const openingTime = '0800';
    const closingTime = '1500';

    return currentTime >= openingTime && currentTime <= closingTime;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchSchools(userCoordinates);
    } else {
      setSchools([]); // Clear previous school data
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setSchools(sortSchools([...schools], newSortOption));
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
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Schools Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="location" className="text-gray-700 font-bold mb-2 flex items-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                </span>
                Enter your location (detailed address):
              </label>

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

        {showResults && (
          <div>
            <section className="mb-12">
              <div className="max-w-lg mx-auto flex justify-between items-center">
                <label htmlFor="sortOption" className="block text-gray-700 font-bold">Sort by:</label>
                <div className="relative">
                  <select id="sortOption" value={sortOption} onChange={handleSortChange} className="border border-gray-300 text-black p-3 rounded-lg pl-8 pr-4 appearance-none">
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="open">Open Now</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : errorMessage ? (
              <div className="text-center text-red-600">{errorMessage}</div>
            ) : (
              <section className="mb-12">
                <div className="space-y-8">
                  {schools.map((school) => (
                    <div key={school.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
                      <img src="https://example.com/school-image.jpg" alt="School" className="w-48 h-auto object-cover" />
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                          {school.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{school.address.label}</p>
                        {school.contacts && school.contacts[0].mobile && (
                          <p className="text-gray-800 mb-2 text-xl">
                            <FontAwesomeIcon icon={faPhone} /> <strong>{school.contacts[0].mobile[0].value}</strong>
                          </p>
                        )}
                        {school.distance && (
                          <p className="text-gray-800 mb-2 text-xl">{`Distance: ${school.distance.toFixed(2)} km`}</p>
                        )}
                        {school.travelTime && (
                          <div className="flex justify-around text-gray-600 mb-2">
                            <span><FontAwesomeIcon icon={faCar} /> {` ${school.travelTime.car.toFixed(0)} min`}</span>
                            <span><FontAwesomeIcon icon={faBicycle} /> {` ${school.travelTime.bike.toFixed(0)} min`}</span>
                            <span><FontAwesomeIcon icon={faWalking} /> {` ${school.travelTime.walk.toFixed(0)} min`}</span>
                          </div>
                        )}
                        <div className="flex items-center text-yellow-500 mb-2">
                          {[...Array(school.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                          ))}
                          {[...Array(5 - school.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300 mr-1" />
                          ))}
                          <span className="ml-2 text-gray-700">({school.reviews} reviews)</span>
                        </div>
                        <div className="text-gray-600 mb-2">
                          <FontAwesomeIcon icon={faClock} /> {school.formattedOpeningHours}
                        </div>
                        <p className={`text-lg font-bold ${school.isOpenNow ? 'text-green-600' : 'text-red-600'}`}>
                          {school.isOpenNow ? 'OPEN NOW' : 'CLOSED'}
                        </p>
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Features:</h4>
                          <ul className="list-disc list-inside">
                            {school.features.map((feature, index) => (
                              <li key={index} className="text-gray-600">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindSchoolPage;

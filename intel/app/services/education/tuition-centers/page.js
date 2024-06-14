'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking, faPhone, faClock, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const FindServicesPage = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [sortOption, setSortOption] = useState('distance');
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
        setErrorMessage('');
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

  const fetchServices = async (userCoordinates) => {
    setLoading(true);
    try {
      const [tuitionResponse, classesResponse] = await Promise.all([
        fetch(`https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=tuition&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`),
        fetch(`https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=classes&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`)
      ]);

      const [tuitionData, classesData] = await Promise.all([
        tuitionResponse.json(),
        classesResponse.json()
      ]);

      const combinedResults = [...tuitionData.items, ...classesData.items].map(service => ({
        ...service,
        distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, service.position.lat, service.position.lng),
        travelTime: calculateTravelTime(userCoordinates, { lat: service.position.lat, lon: service.position.lng }),
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 1000) + 1,
        isOpenNow: checkIfOpenNow(),
        formattedOpeningHours: '10:00 - 22:00',
        isFavorite: Math.random() < 0.5,
        patientsTellUs: getRandomPatientTellUsStatements(),
        address: service.vicinity // Assuming 'vicinity' contains the address details
      }));

      setResults(sortResults(combinedResults, sortOption));
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrorMessage('Error fetching services.');
    }
    setLoading(false);
  };

  const getRandomPatientTellUsStatements = () => {
    const options = [
      "Offers Telehealth",
      "Easy scheduling",
      "Employs friendly staff",
      "Accepts walk-ins",
      "Provides online prescription refill",
      "Friendly bedside manner"
    ];
    return Array.from(new Set(Array.from({ length: 3 }, () => options[Math.floor(Math.random() * options.length)])));
  };

  const sortResults = (results, option) => {
    switch (option) {
      case 'distance':
        return results.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return results.sort((a, b) => b.rating - a.rating);
      case 'open':
        return results.sort((a, b) => b.isOpenNow - a.isOpenNow);
      case 'patientFavorite':
        return results.sort((a, b) => b.isFavorite - a.isFavorite);
      default:
        return results;
    }
  };

  const checkIfOpenNow = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5).replace(':', '');
    const openingTime = '1000';
    const closingTime = '2200';
    return currentTime >= openingTime && currentTime <= closingTime;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchServices(userCoordinates);
    } else {
      setResults([]);
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setResults(sortResults([...results], newSortOption));
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
    const distance = R * c;
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
    return { car: carTime * 60, bike: bikeTime * 60, walk: walkTime * 60 };
  };

  const toRad = (value) => (value * Math.PI) / 180;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Services Near You</h2>
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
            <section className="mb-12 absolute top-80">
              <div className="max-w-lg mx-auto flex justify-between items-center">
                <label htmlFor="sortOption" className="block text-gray-700 font-bold">Sort by:</label>
                <div className="relative">
                  <select id="sortOption" value={sortOption} onChange={handleSortChange} className="border border-gray-300 text-black p-3 rounded-lg pl
                  -lg pr-8 appearance-none">
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    {/* <option value="open">Open Now</option> */}
                    <option value="patientFavorite">Student Favorite</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </section>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : results.length > 0 ?
            (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((result, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="px-6 py-4">
                        <h3 className="text-lg font-bold text-blue-600 mb-2">{result.title}</h3>
                        <p className="text-gray-700 mb-2">{result.vicinity}</p>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{`${result.distance.toFixed(2)} km`}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                          <p className="text-gray-600">{`${result.rating.toFixed(1)} (${result.reviews} reviews)`}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{result.phone || 'N/A'}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{result.isOpenNow ? 'Open Now' : 'Closed Now'}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faWalking} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{`Travel time by walking: ${result.travelTime.walk.toFixed(1)} min`}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faBicycle} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{`Travel time by bike: ${result.travelTime.bike.toFixed(1)} min`}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <FontAwesomeIcon icon={faCar} className="text-gray-500 mr-1" />
                          <p className="text-gray-600">{`Travel time by car: ${result.travelTime.car.toFixed(1)} min`}</p>
                        </div>
                        <div className="flex flex-wrap">
                          {result.patientsTellUs.map((statement, index) => (
                            <span key={index} className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                              {statement}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-600 text-sm">Address: {result.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No results found.</p>
              )}
            </div>
          )}
  
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </main>
      </div>
    );
  };
  
  export default FindServicesPage;
  
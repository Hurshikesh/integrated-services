'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faPhone, faClock, faStar, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons';

const FindBusStopPage = () => {
  const [location, setLocation] = useState('');
  const [busStops, setBusStops] = useState([]);
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

  const fetchBusStops = async (userCoordinates) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=bus%20stop&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const data = await response.json();
      const busStopsWithDistances = data.items.map(busStop => ({
        ...busStop,
        distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, busStop.position.lat, busStop.position.lng),
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        reviews: Math.floor(Math.random() * 1000) + 1,
        isOpenNow: checkIfOpenNow(),
        formattedOpeningHours: '24/7', // Fixed opening hours for simplicity
        isFavorite: Math.random() < 0.5, // Randomly decide if a bus stop is a "User Favorite"
      }));

      setBusStops(sortBusStops(busStopsWithDistances, sortOption));
      setShowResults(true); // Display results after fetching
    } catch (error) {
      console.error('Error fetching bus stops:', error);
      setErrorMessage('Error fetching bus stops.');
    }
    setLoading(false);
  };

  const sortBusStops = (busStops, option) => {
    switch (option) {
      case 'distance':
        return busStops.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return busStops.sort((a, b) => b.rating - a.rating);
      case 'open':
        return busStops.sort((a, b) => b.isOpenNow - a.isOpenNow);
      case 'userFavorite':
        return busStops.sort((a, b) => b.isFavorite - a.isFavorite);
      default:
        return busStops;
    }
  };

  const checkIfOpenNow = () => {
    // Assuming bus stops are open 24/7
    return true;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchBusStops(userCoordinates);
    } else {
      setBusStops([]); // Clear previous bus stop data
    }
  };
  
 const handleGPS = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = { lat: position.coords.latitude, lon: position.coords.longitude };
      setUserCoords(userCoordinates);
      fetchBusStops(userCoordinates);
    });
  } else {
setBusStops([]);
    setErrorMessage('Geolocation is not supported by this browser.');
  }
};


  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setBusStops(sortBusStops([...busStops], newSortOption));
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

  const toRad = (value) => (value * Math.PI) / 180;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">Search for Bus Stops Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="location" className="text-gray-700 font-bold mb-2 flex items-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                </span>
                Enter your location:
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 text-black p-3 rounded-lg w-full"
                  placeholder="e.g., 123 Main St, Delhi, India"
                  required
                />
                <button
                  type="button"
                  onClick={handleGPS}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg w-full sm:w-auto"
                >
                  Use GPS
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </section>
  
        {showResults && (
          <div>
            <section className="mb-12 mt-8 md:mt-0 md:absolute md:top-80">
              <div className="max-w-lg mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <label htmlFor="sortOption" className="block text-gray-700 font-bold mb-2 sm:mb-0">Sort by:</label>
                <div className="relative w-full sm:w-auto">
                  <select id="sortOption" value={sortOption} onChange={handleSortChange} className="border border-gray-300 text-black p-3 rounded-lg pl-8 pr-4 appearance-none w-full">
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="open">Open Now</option>
                    <option value="userFavorite">User Favorite</option>
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
                  {busStops.map((busStop) => (
                    <div key={busStop.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
                      <img src="https://i.postimg.cc/kXrmKLYS/busStop.jpg" alt="Bus Stop" className="w-full sm:w-48 h-48 sm:h-auto object-cover" />
                      <div className="p-4 sm:p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center flex-wrap">
                          {busStop.title}
                          {busStop.isFavorite && (
                            <span className="ml-2 px-2 py-1 bg-yellow-300 text-yellow-800 text-xs font-bold rounded mt-1 sm:mt-0">Favorite</span>
                          )}
                        </h3>
                        <p className="text-gray-600 mb-4">{busStop.address.label}</p>
                        {busStop.contacts && busStop.contacts[0].mobile && (
                          <p className="text-gray-800 mb-2 text-lg sm:text-xl">
                            <FontAwesomeIcon icon={faPhone} /> <strong>{busStop.contacts[0].mobile[0].value}</strong>
                          </p>
                        )}
                        {busStop.distance && (
                          <p className="text-gray-800 mb-2 text-lg sm:text-xl">{`Distance: ${busStop.distance.toFixed(2)} km`}</p>
                        )}
                        <div className="flex items-center text-yellow-500 mb-2">
                          {[...Array(busStop.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                          ))}
                          {[...Array(5 - busStop.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300 mr-1" />
                          ))}
                          <span className="ml-2 text-gray-700">({busStop.reviews} reviews)</span>
                        </div>
                        <div className="text-gray-600 mb-2">
                          <FontAwesomeIcon icon={faClock} /> {busStop.formattedOpeningHours}
                        </div>
                        <p className={`text-lg font-bold ${busStop.isOpenNow ? 'text-green-600' : 'text-red-600'}`}>
                          {busStop.isOpenNow ? 'OPEN NOW' : 'CLOSED'}
                        </p>
                        <button
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${busStop.position.lat},${busStop.position.lng}`, '_blank')}
                          className="mt-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 w-full sm:w-auto"
                        >
                          <FontAwesomeIcon icon={faMap} className="mr-2" />
                          View in Map
                        </button>
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
export default FindBusStopPage;
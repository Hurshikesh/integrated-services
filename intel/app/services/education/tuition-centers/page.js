'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking, faPhone, faStar, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CoachingDetailsPage = () => {
  const [location, setLocation] = useState('');
  const [coachingCenters, setCoachingCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [sortOption, setSortOption] = useState('distance');

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

  const fetchCoachingCenters = async (userCoordinates) => {
    setLoading(true);
    try {
      const hereResponse = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=class&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const hereData = await hereResponse.json();
      console.log('HERE API Response:', hereData);

      const backendResponse = await axios.get(`/api/Education/Coaching?lon=${userCoordinates.lon}&lat=${userCoordinates.lat}&domain=Education&serviceType=Coaching Centre`);
      console.log('Backend Response:', backendResponse.data);

      if (backendResponse.data.success) {
        const backendCoachingCenters = backendResponse.data.data.map(center => ({
          id: center._id,
          title: center.companyName,
          address: center.address,
          position: { lat: center.location.coordinates[1], lon: center.location.coordinates[0] },
          phone: center.phone,
          distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, center.location.coordinates[1], center.location.coordinates[0]),
          travelTime: calculateTravelTime(userCoordinates, { lat: center.location.coordinates[1], lon: center.location.coordinates[0] }),
          rating: Math.floor(Math.random() * 5) + 1,
          website: center.website
        }));

        const hereCoachingCenters = hereData.items.map(center => ({
          id: center.id,
          title: center.title,
          address: center.address.label,
          position: center.position,
          phone: center.contacts?.[0]?.phone?.[0]?.value || 'N/A',
          distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, center.position.lat, center.position.lng),
          travelTime: calculateTravelTime(userCoordinates, { lat: center.position.lat, lon: center.position.lng }),
          rating: Math.floor(Math.random() * 5) + 1,
          website: center.contacts?.[0]?.www?.[0]?.value
        }));

        const allCoachingCenters = [...hereCoachingCenters, ...backendCoachingCenters];
        setCoachingCenters(sortCoachingCenters(allCoachingCenters, sortOption));
        setShowResults(true);
      } else {
        console.error('Backend response indicates failure:', backendResponse.data.error);
        setErrorMessage('Error fetching coaching centers from backend.');
      }
    } catch (error) {
      console.error('Error fetching coaching centers:', error);
      setErrorMessage('Error fetching coaching centers.');
    }
    setLoading(false);
  };

  const sortCoachingCenters = (coachingCenters, option) => {
    switch (option) {
      case 'distance':
        return coachingCenters.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return coachingCenters.sort((a, b) => b.rating - a.rating);
      default:
        return coachingCenters;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchCoachingCenters(userCoordinates);
    } else {
      setCoachingCenters([]);
    }
  };
  

 const handleGPS = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = { lat: position.coords.latitude, lon: position.coords.longitude };
      setUserCoords(userCoordinates);
      fetchCoachingCenters(userCoordinates);
    });
  } else {
setCoachingCenters([]);
    setErrorMessage('Geolocation is not supported by this browser.');
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

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setCoachingCenters(sortCoachingCenters([...coachingCenters], newSortOption));
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-serif mb-6 text-center text-blue-600">Search for Coaching Centers Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
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
            {loading ? (
              <div className="text-center text-black">Loading...</div>
            ) : errorMessage ? (
              <div className="text-center text-red-600">{errorMessage}</div>
            ) : (
              <section className="mb-12">
                <div className="mb-4 flex justify-end">
                  <label htmlFor="sort" className="text-black mr-2">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 text-black p-2 rounded-lg"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <div className="space-y-8">
                  {coachingCenters.map((center) => (
                    <div key={center.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
                      <img src="https://i.postimg.cc/HkwzPq2D/pixlr-image-generator-36d1c94d-b97a-4d6c-ae6e-d96a2b164b3a.png" alt="Coaching Center" className="w-full sm:w-48 h-48 sm:h-auto object-cover" />
                      <div className="p-4 sm:p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                          {center.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{center.address}</p>
                        <p className="text-gray-600 mb-2">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> {`${center.rating} Stars`}
                        </p>
                        <p className="text-gray-800 mb-2 text-xl">
                          <FontAwesomeIcon icon={faPhone} /> <strong>{center.phone}</strong>
                        </p>
                        <p className="text-gray-800 mb-2 text-xl">{`Distance: ${center.distance.toFixed(2)} km`}</p>
                        <div className="flex flex-wrap justify-between text-gray-600 mb-2">
                          <span className="mr-2 mb-2"><FontAwesomeIcon icon={faCar} /> {`Car: ${center.travelTime.car.toFixed(0)} min`}</span>
                          <span className="mr-2 mb-2"><FontAwesomeIcon icon={faBicycle} /> {`Bike: ${center.travelTime.bike.toFixed(0)} min`}</span>
                          <span className="mb-2"><FontAwesomeIcon icon={faWalking} /> {`Walk: ${center.travelTime.walk.toFixed(0)} min`}</span>
                        </div>
                        <button
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${center.position.lat},${center.position.lon}`, '_blank')}
                          className="bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 flex items-center justify-center w-full"
                        >
                          <FontAwesomeIcon icon={faMap} className="mr-2" />
                          View on Google Maps
                        </button>
                        {center.website && (
                          <p className="text-gray-800 mt-4 text-center">
                            <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              Learn More About the Coaching Center
                            </a>
                          </p>
                        )}
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

export default CoachingDetailsPage;


'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHeart, faPhone, faStar, faCar, faBicycle, faWalking, faClock, faMap } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const PackersAndMovers = () => {
  const [location, setLocation] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [serviceType, setServiceType] = useState('packers');
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

  const fetchServices = async (userCoordinates) => {
    setLoading(true);
    try {
      const hereResponse = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=Packers+and+movers&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const hereData = await hereResponse.json();
      console.log('HERE API Response:', hereData);

      const backendResponse = await axios.get(`/api/housing/packer?lon=${userCoordinates.lon}&lat=${userCoordinates.lat}&domain=Housing&serviceType=Packers And Movers`);
      console.log('Backend Response:', backendResponse.data);

      if (backendResponse.data.success) {
        const backendProviders = backendResponse.data.data.map(provider => ({
          id: provider._id,
          title: provider.companyName,
          address: provider.address,
          position: { lat: provider.location.coordinates[1], lon: provider.location.coordinates[0] },
          phone: provider.phone,
          distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, provider.location.coordinates[1], provider.location.coordinates[0]),
          travelTime: calculateTravelTime(userCoordinates, { lat: provider.location.coordinates[1], lon: provider.location.coordinates[0] }),
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000) + 1,
          formattedOpeningHours: '10:00 - 22:00',
        }));

        const hereProviders = hereData.items.map(item => ({
          id: item.id,
          title: item.title,
          address: item.address.label,
          position: item.position,
          phone: item.contacts?.[0]?.phone?.[0]?.value || 'N/A',
          distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, item.position.lat, item.position.lng),
          travelTime: calculateTravelTime(userCoordinates, { lat: item.position.lat, lon: item.position.lng }),
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000) + 1,
          formattedOpeningHours: '10:00 - 22:00',
        }));

        const allProviders = [...hereProviders, ...backendProviders];
        setServices(allProviders);
        setShowResults(true);
      } else {
        console.error('Backend response indicates failure:', backendResponse.data.error);
        setErrorMessage('Error fetching providers from backend.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrorMessage('Error fetching services.');
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const userCoordinates = await fetchUserCoords(location);
    if (userCoordinates) {
      setUserCoords(userCoordinates);
      fetchServices(userCoordinates);
    } else {
      setServices([]);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortServices(services, e.target.value);
  };

  const sortServices = (services, sortOption) => {
    const sortedServices = [...services].sort((a, b) => {
      if (sortOption === 'distance') {
        return a.distance - b.distance;
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else if (sortOption === 'favorite') {
        return b.favorite - a.favorite;
      }
      return 0;
    });
    return sortedServices;
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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-serif mb-6 text-center text-white">Search for Packers and Movers Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="serviceType" className="text-gray-700 font-bold mb-2 flex items-center">
                <span className="mr-2">Service Type:</span>
                <select
                  id="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="border border-gray-300 text-black p-3 rounded-lg w-full"
                >
                  <option value="packers">Packers and Movers</option>
                </select>
              </label>
            </div>
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
            <div className="mb-4">
              <label htmlFor="sortOption" className="text-gray-700 font-bold mb-2 flex items-center">
                <span className="mr-2">Sort By:</span>
                <select
                  id="sortOption"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border border-gray-300 text-black p-3 rounded-lg w-full"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="favorite">Favorite</option>
                </select>
              </label>
            </div>
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </form>
        </section>

        {showResults && (
          <div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : errorMessage ? (
              <div className="text-center text-red-600">{errorMessage}</div>
            ) : (
              <section className="mb-12">
                <div className="space-y-8">
                  {sortServices(services, sortOption).map((service) => (
                    <div key={service.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
                      <img
                        src="https://i.postimg.cc/kGvx5ptP/packers.jpg"
                        alt="Packers and Movers"
                        className="w-48 h-auto object-cover"
                      />
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                          {service.title}
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={`ml-2 cursor-pointer ${service.favorite ? 'text-red-500' : 'text-gray-300'}`}
                            onClick={() => handleFavoriteToggle(service.id)}
                          />
                        </h3>
                        <p className="text-gray-600 mb-4">{service.address}</p>
                        {service.phone && (
                          <p className="text-gray-800 mb-2 text-xl">
                            <FontAwesomeIcon icon={faPhone} /> <strong>{service.phone}</strong>
                          </p>
                        )}
                        {service.distance && (
                          <p className="text-gray-800 mb-2 text-xl">{`Distance: ${service.distance.toFixed(2)} km`}</p>
                        )}
                        {service.rating && (
                          <p className="text-gray-800 mb-2 text-xl">
                            <FontAwesomeIcon icon={faStar} /> {service.rating.toFixed(1)}
                          </p>
                        )}
                        {service.travelTime && (
                          <div className="flex justify-around text-gray-600 mb-2">
                            <span><FontAwesomeIcon icon={faCar} /> {` ${service.travelTime.car.toFixed(0)} min`}</span>
                            <span><FontAwesomeIcon icon={faBicycle} /> {` ${service.travelTime.bike.toFixed(0)} min`}</span>
                            <span><FontAwesomeIcon icon={faWalking} /> {` ${service.travelTime.walk.toFixed(0)} min`}</span>
                          </div>
                        )}
                        {service.formattedOpeningHours && (
                          <div className="text-gray-600 mb-2">
                            <FontAwesomeIcon icon={faClock} /> {service.formattedOpeningHours}
                          </div>
                        )}
                        <button
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${service.position.lat},${service.position.lon}`, '_blank')}
                          className="bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 flex items-center"
                        >
                          <FontAwesomeIcon icon={faMap} className="mr-2" />
                          View on Google Maps
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

export default PackersAndMovers;

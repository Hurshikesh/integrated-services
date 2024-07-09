'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking, faPhone, faClock, faStar, faMapMarkerAlt,faMap } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FindDoctorPage = () => {
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
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
  
 const handleGPS = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = { lat: position.coords.latitude, lon: position.coords.longitude };
      setUserCoords(userCoordinates);
      fetchDoctors(userCoordinates);
    });
  } else {
setDoctors([]);
    setErrorMessage('Geolocation is not supported by this browser.');
  }
};


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
      const hereResponse = await fetch(
        `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=doctor&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
      );
      const hereData = await hereResponse.json();
      console.log('HERE API Response:', hereData);
      
      const backendResponse = await axios.get(`/api/health/clinics?lon=${userCoordinates.lon}&lat=${userCoordinates.lat}&domain=Healthcare&serviceType=Clinic`);
     
      console.log('Backend Response:', backendResponse.data);
  
      if (backendResponse.data.success) {
        const patientsTellUsOptions = [
          "Offers Telehealth",
          "Easy scheduling",
          "Employs friendly staff",
          "Accepts walk-ins",
          "Provides online prescription refill",
          "Friendly bedside manner"
        ];
  
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
          isOpenNow: checkIfOpenNow(),
          formattedOpeningHours: '10:00 - 22:00',
          isFavorite: Math.random() < 0.5,
          patientsTellUs: Array.from(new Set(Array.from({ length: 3 }, () => patientsTellUsOptions[Math.floor(Math.random() * patientsTellUsOptions.length)])))
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
          isOpenNow: checkIfOpenNow(),
          formattedOpeningHours: '10:00 - 22:00',
          isFavorite: Math.random() < 0.5,
          patientsTellUs: Array.from(new Set(Array.from({ length: 3 }, () => patientsTellUsOptions[Math.floor(Math.random() * patientsTellUsOptions.length)])))
        }));
  
        const allProviders = [...hereProviders, ...backendProviders];
  
        setDoctors(sortDoctors(allProviders, sortOption));
        setShowResults(true); // Display results after fetching
      } else {
        console.error('Backend response indicates failure:', backendResponse.data.error);
        setErrorMessage('Error fetching providers from backend.');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setErrorMessage('Error fetching doctors.');
    }
    setLoading(false);
  };

  const sortDoctors = (doctors, option) => {
    switch (option) {
      case 'distance':
        return doctors.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return doctors.sort((a, b) => b.rating - a.rating);
      case 'open':
        return doctors.sort((a, b) => b.isOpenNow - a.isOpenNow);
      case 'patientFavorite':
        return doctors.sort((a, b) => b.isFavorite - a.isFavorite);
      default:
        return doctors;
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
      fetchDoctors(userCoordinates);
    } else {
      setDoctors([]); // Clear previous doctor data
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    setDoctors(sortDoctors([...doctors], newSortOption));
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
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Doctors Near You</h2>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
  <div className="mb-4">
    <label htmlFor="location" className="text-gray-700 font-bold mb-2 flex items-center">
      <span className="mr-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
      </span>
      Enter your location (detailed address):
    </label>
    <div className="flex space-x-4">
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 text-black p-3 rounded-lg flex-grow"
        placeholder="e.g., 123 Main St, Delhi, India"
        required
      />
      <button
        type="button"
        onClick={handleGPS}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex-grow"
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
            <section className="mb-12 absolute top-80">
              <div className="max-w-lg mx-auto flex justify-between items-center">
                <label htmlFor="sortOption" className="block text-gray-700 font-bold">Sort by:</label>
                <div className="relative">
                  <select id="sortOption" value={sortOption} onChange={handleSortChange} className="border border-gray-300 text-black p-3 rounded-lg pl-8 pr-4 appearance-none">
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="open">Open Now</option>
                    <option value="patientFavorite">Patient Favorite</option>
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
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
                      <img src="https://i.postimg.cc/63dXknxV/fotor-ai-20240709111535.jpg" alt="Doctor" className="w-48 h-auto object-cover" />
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                          {doctor.title}
                          {doctor.isFavorite && (
                            <span className="ml-2 px-2 py-1 bg-yellow-300 text-yellow-800 text-xs font-bold rounded">Patient Favorite</span>
                          )}
                        </h3>
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
                        <div className="flex items-center text-yellow-500 mb-2">
                          {[...Array(doctor.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                          ))}
                          {[...Array(5 - doctor.rating)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300 mr-1" />
                          ))}
                          <span className="ml-2 text-gray-700">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="text-gray-600 mb-2">
                          <FontAwesomeIcon icon={faClock} /> {doctor.formattedOpeningHours}
                        </div>
                        <p className={`text-lg font-bold ${doctor.isOpenNow ? 'text-green-600' : 'text-red-600'}`}>
                          {doctor.isOpenNow ? 'OPEN NOW' : 'CLOSED'}
                        </p>
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Patients Tell Us:</h4>
                          <ul className="list-disc list-inside">
                            {doctor.patientsTellUs.map((statement, index) => (
                              <li key={index} className="text-gray-600">{statement}</li>
                            ))}
                          </ul>
                        </div>
                        <button
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${doctor.position.lat},${doctor.position.lng}`, '_blank')}
                            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"> {/* Enhanced button style */}
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

export default FindDoctorPage;

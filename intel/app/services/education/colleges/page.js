'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBicycle, faWalking, faPhone, faClock, faStar, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FindCollegePage = () => {
    const [location, setLocation] = useState('');
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
    const [errorMessage, setErrorMessage] = useState('');
    const [sortOption, setSortOption] = useState('distance');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (userCoords.lat && userCoords.lon) {
            fetchColleges(userCoords);
        }
    }, [userCoords]);

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

    const fetchColleges = async (userCoordinates) => {
        setLoading(true);
        try {
            // Fetch colleges from HERE API
            const hereResponse = await fetch(
                `https://discover.search.hereapi.com/v1/discover?at=${userCoordinates.lat},${userCoordinates.lon}&q=college&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
            );
            const hereData = await hereResponse.json();

            // Fetch colleges from backend API
            const backendResponse = await axios.get(`/api/Education/College?lon=${userCoordinates.lon}&lat=${userCoordinates.lat}&domain=Education&serviceType=University/College`);
            const backendData = backendResponse.data;

            // Check if backend response is successful
            if (backendData.success) {
                const backendColleges = backendData.data.map(college => ({
                    id: college._id,
                    title: college.companyName,
                    address: college.address,
                    position: { lat: college.location.coordinates[1], lon: college.location.coordinates[0] },
                    phone: college.phone,
                    distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, college.location.coordinates[1], college.location.coordinates[0]),
                    travelTime: calculateTravelTime(userCoordinates, { lat: college.location.coordinates[1], lon: college.location.coordinates[0] }),
                    rating: Math.floor(Math.random() * 5) + 1,
                    reviews: Math.floor(Math.random() * 1000) + 1,
                    isOpenNow: checkIfOpenNow(),
                    formattedOpeningHours: '08:00 - 20:00'
                }));

                const hereColleges = hereData.items.map(college => ({
                    id: college.id,
                    title: college.title,
                    address: college.address.label,
                    position: college.position,
                    phone: college.contacts?.[0]?.mobile?.[0]?.value || 'N/A',
                    distance: calculateDistance(userCoordinates.lat, userCoordinates.lon, college.position.lat, college.position.lng),
                    travelTime: calculateTravelTime(userCoordinates, { lat: college.position.lat, lon: college.position.lng }),
                    rating: Math.floor(Math.random() * 5) + 1,
                    reviews: Math.floor(Math.random() * 1000) + 1,
                    isOpenNow: checkIfOpenNow(),
                    formattedOpeningHours: '08:00 - 20:00'
                }));

                const allColleges = [...hereColleges, ...backendColleges];
                setColleges(sortColleges(allColleges, sortOption));
                setShowResults(true);
            } else {
                console.error('Backend response indicates failure:', backendData.error);
                setErrorMessage('Error fetching colleges from backend.');
            }
        } catch (error) {
            console.error('Error fetching colleges:', error);
            setErrorMessage('Error fetching colleges.');
        }
        setLoading(false);
    };

    const sortColleges = (colleges, option) => {
        switch (option) {
            case 'distance':
                return colleges.sort((a, b) => a.distance - b.distance);
            case 'rating':
                return colleges.sort((a, b) => b.rating - a.rating);
            case 'open':
                return colleges.sort((a, b) => b.isOpenNow - a.isOpenNow);
            default:
                return colleges;
        }
    };

    const checkIfOpenNow = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5).replace(':', '');
        const openingTime = '0800';
        const closingTime = '2000';

        return currentTime >= openingTime && currentTime <= closingTime;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const userCoordinates = await fetchUserCoords(location);
        if (userCoordinates) {
            setUserCoords(userCoordinates);
            fetchColleges(userCoordinates);
        } else {
            setColleges([]);
        }
    };

    const handleSortChange = (e) => {
        const newSortOption = e.target.value;
        setSortOption(newSortOption);
        setColleges(sortColleges([...colleges], newSortOption));
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
                    <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Search for Colleges Near You</h2>
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
                        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full">
                            Search
                        </button>
                    </form>
                </section>

                {showResults && (
                    <div>
                        <section className="mb-4 flex justify-start items-center space-x-4">
                            <div className="relative">
                                <label htmlFor="sortOption" className="block text-gray-700 font-bold">Sort by:</label>
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
                        </section>

                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : errorMessage ? (
                            <div className="text-center text-red-600">{errorMessage}</div>
                        ) : (
                            <section className="mb-12">
                                <div className="space-y-8">
                                    {colleges.map((college) => (
                                        <div key={college.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
                                            <img src="https://media.istockphoto.com/id/1165677324/photo/group-of-students-walking-in-college-campus-after-classes.jpg?s=612x612&w=0&k=20&c=NKRysk7OgI3sgD6lY8Y3uQMbqXGAX_PbBIfQbGxaJoY=" alt="College" className="w-48 h-auto object-cover" />
                                            <div className="p-6 flex-grow">
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                                    {college.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4">{college.address.label}</p>
                                                {college.phone && (
                                                    <p className="text-gray-800 mb-2 text-xl">
                                                        <FontAwesomeIcon icon={faPhone} /> <strong>{college.phone}</strong>
                                                    </p>
                                                )}
                                                {college.distance && (
                                                    <p className="text-gray-800 mb-2 text-xl">{`Distance: ${college.distance.toFixed(2)} km`}</p>
                                                )}
                                                {college.travelTime && (
                                                    <div className="flex justify-around text-gray-600 mb-2">
                                                        <span><FontAwesomeIcon icon={faCar} /> {` ${college.travelTime.car.toFixed(0)} min`}</span>
                                                        <span><FontAwesomeIcon icon={faBicycle} /> {` ${college.travelTime.bike.toFixed(0)} min`}</span>
                                                        <span><FontAwesomeIcon icon={faWalking} /> {` ${college.travelTime.walk.toFixed(0)} min`}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center text-yellow-500 mb-2">
                                                    {[...Array(college.rating)].map((_, i) => (
                                                        <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                                                    ))}
                                                    {[...Array(5 - college.rating)].map((_, i) => (
                                                        <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300 mr-1" />
                                                    ))}
                                                    <span className="ml-2 text-gray-700">({college.reviews} reviews)</span>
                                                </div>
                                                <div className="text-gray-600 mb-2">
                                                    <FontAwesomeIcon icon={faClock} /> {college.formattedOpeningHours}
                                                </div>
                                                <p className={`text-lg font-bold ${college.isOpenNow ? 'text-green-600' : 'text-red-600'}`}>
                                                    {college.isOpenNow ? 'OPEN NOW' : 'CLOSED'}
                                                </p>
                                                <button
                                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${college.position.lat},${college.position.lon}`, '_blank')}
                                                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
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

export default FindCollegePage;

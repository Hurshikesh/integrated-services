"use client";

import { useState } from 'react';
import axios from 'axios';

const FindCabs = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [fare, setFare] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const geocode = async (location) => {
    const apiKey = 'smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY';
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(location)}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].position;
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      throw new Error(`Geocoding error: ${error.message}`);
    }
  };

  const calculateFare = async () => {
    if (!start || !end) {
      setError('Both start and end locations are required.');
      return;
    }

    setLoading(true);
    setError(null);
    setFare(null);
    setDistance(null);

    try {
      console.log('Geocoding start location...');
      const startPosition = await geocode(start);
      console.log('Start position:', startPosition);

      console.log('Geocoding end location...');
      const endPosition = await geocode(end);
      console.log('End position:', endPosition);

      const apiKey = 'smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY';
      const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startPosition.lat},${startPosition.lng}&destination=${endPosition.lat},${endPosition.lng}&return=summary&apiKey=${apiKey}`;

      console.log('Fetching data from HERE API...');
      const response = await axios.get(url);
      console.log('Response:', response.data);

      if (response.data.routes && response.data.routes.length > 0) {
        const distanceInMeters = response.data.routes[0].sections[0].summary.length;
        const distanceInKm = distanceInMeters / 1000;
        let estimatedFare = 75; // Base fare
    
        if (distanceInKm <= 2) {
            estimatedFare += distanceInKm * 30;
        } else if (distanceInKm <= 5) {
            estimatedFare += 2 * 30 + (distanceInKm - 2) * 25;
        } else if (distanceInKm <= 12) {
            estimatedFare += 2 * 30 + 3 * 25 + (distanceInKm - 5) * 20;
        } else {
            estimatedFare += 2 * 30 + 3 * 25 + 7 * 20 + (distanceInKm - 12) * 22;
        }
    
        setDistance(distanceInKm.toFixed(2));
        setFare(estimatedFare.toFixed(2));
        console.log('Distance:', distanceInKm.toFixed(2));
        console.log('Estimated Fare:', estimatedFare.toFixed(2));
    } else {
        setError('No route found between the specified locations.');
    }
    
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to fetch fare. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }} className="flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 bg-purple-400 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Taxi Fare Calculator</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
            Start Point
          </label>
          <input
            type="text"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end">
            End Point
          </label>
          <input
            type="text"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={calculateFare}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate Fare'}
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        {distance !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Distance: {distance} km</h2>
          </div>
        )}
        {fare !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Estimated Fare: ₹{fare}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCabs;

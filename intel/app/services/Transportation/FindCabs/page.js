"use client";

import { useState } from 'react';
import axios from 'axios';

const FindCabs = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [fare, setFare] = useState(null);

  const calculateFare = async () => {
    const apiKey = 'smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY';
    const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${start}&destination=${end}&return=summary&apiKey=${apiKey}`;
  
    console.log('Start Point:', start);
    console.log('End Point:', end);
  
    try {
      console.log('Fetching data from HERE API...');
      const response = await axios.get(url);
      console.log('Response:', response);
      const distance = response.data.routes[0].sections[0].summary.length;
      const estimatedFare = distance * 0.001; // Example fare calculation
      setFare(estimatedFare.toFixed(2));
      console.log('Estimated Fare:', estimatedFare.toFixed(2));
    } catch (error) {
      console.error('Error fetching the distance:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Taxi Fare Calculator</h1>
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
      >
        Calculate Fare
      </button>
      {fare !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Estimated Fare: ${fare}</h2>
        </div>
      )}
    </div>
  );
};

export default FindCabs;

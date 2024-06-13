import React from 'react';

const TaxServices = () => {
  const cas = [
    { name: 'CA John Doe', rating: '4.5', details: 'Experienced in personal and corporate taxes' },
    { name: 'CA Jane Smith', rating: '4.7', details: 'Specializes in small business taxes' },
    { name: 'CA Robert Brown', rating: '4.9', details: 'Expert in international taxation' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Tax Services</h1>
      <ul className="space-y-4">
        {cas.map((ca, index) => (
          <li key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600">{ca.name}</h2>
            <p className="text-gray-700">Rating: {ca.rating}</p>
            <p className="text-gray-700">{ca.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaxServices;

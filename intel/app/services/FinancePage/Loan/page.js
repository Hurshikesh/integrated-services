import React from 'react';

const LoanServices = () => {
  const banks = [
    { name: 'Bank A', rate: '5%', details: 'Details about Bank A loans' },
    { name: 'Bank B', rate: '6%', details: 'Details about Bank B loans' },
    { name: 'Bank C', rate: '4.5%', details: 'Details about Bank C loans' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Loan Services</h1>
      <ul className="space-y-4">
        {banks.map((bank, index) => (
          <li key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600">{bank.name}</h2>
            <p className="text-gray-700">Interest Rate: {bank.rate}</p>
            <p className="text-gray-700">{bank.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanServices;

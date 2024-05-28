// page.js

import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-wrap">
      <section className="w-full">
        <button className="text-2xl hover:text-gray-300 font-bold mb-4">Health</button>
        <ul className="text-gray-200">
          <li>To consult doctor</li>
          <li>To find lab services</li>
          <li>Hospitals</li>
          <li>Pharmacy</li>
          {/* Add more health-related services */}
        </ul>
      </section>
      <section className="w-full">
        <button className="text-2xl hover:text-gray-300 font-bold mb-4">Education</button>
        <ul className="text-gray-200">
          <li>Learning materials</li>
          <li>Online mentors</li>
          <li>School details and admission</li>
          <li>Second hand learning materials</li>
          {/* Add more education-related services */}
        </ul>
      </section>
      <section className="w-full">
        <button className="text-2xl hover:text-gray-300 font-bold mb-4">Transportation</button>
        <ul className="text-gray-200">
          <li>Ola/Uber services</li>
          <li>Nearest vehicle service centers</li>
          <li>Nearest bus station and timings</li>
          <li>Buy/sell vehicles</li>
          {/* Add more transportation-related services */}
        </ul>
      </section>
      {/* Add sections for Finance, Government Services, Housing Services */}
    </div>
  );
};

export default Page;

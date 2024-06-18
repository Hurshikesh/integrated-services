'use client'
import React from 'react';


const studyMaterials = [
  {
    name: "Physics Wallah",
    url: "https://www.physicswallah.live",
    description: "A great resource for Physics and other subjects."
  },
  {
    name: "Unacademy",
    url: "https://unacademy.com",
    description: "Offers a wide range of courses and live classes."
  },
  {
    name: "Byju's",
    url: "https://byjus.com",
    description: "Interactive study materials and video lessons."
  },
];

const Page = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Study Materials</h1>
      <ul>
        {studyMaterials.map((material, index) => (
          <li key={index} style={{ margin: '20px 0' }}>
            <a href={material.url} target="_blank" rel="noopener noreferrer">
              <h2>{material.name}</h2>
            </a>
            <p>{material.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

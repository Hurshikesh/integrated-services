import React from 'react';

const developers = [
  {
    name: 'Kumar Ankit',
    photo: '/ankit.jpeg',
    email: 'ankitkumar.12a.13@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kumar-ankit-61a419293/',
    phone: '+91 62022 45004'
  },
  {
    name: 'Jayesh Nahar',
    photo: '/Jayesh.jpeg',
    email: 'jayeshnahar09@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jayesh-nahar-058aa4260/',
    phone: '+91 70031 00812'
  },
  {
    name: 'Hurshikesh Sahu',
    photo: '/hurshikesh.jpeg',
    email: 'sonuhurshikesh@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hurshikesh-sahu-894bb0247/',
    phone: '+91 70083 31311'
  }
];

const About = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-purple-500">
      <h1 className="text-3xl font-bold mb-6 text-white">About Us</h1>
      <p className="text-center mb-8 text-white">
        We are a group of three developers who developed this page to provide integrated services to common people in the fields of education, health, finance, and government services.
      </p>
      <div className="flex justify-center space-x-8"> {/* Increased spacing here */}
        {developers.map((developer, index) => (
          <div key={index} className="max-w-sm w-64 p-6 border border-gray-200 rounded-lg shadow bg-purple-300 hover:bg-purple-400">
            <div className="flex flex-col items-center">
              <img src={developer.photo} alt={`${developer.name}'s photo`} className="rounded-full w-36 h-36 object-cover mb-4" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{developer.name}</h5>
              <div className="flex justify-around w-full px-4 mt-4">
                <a href={`mailto:${developer.email}`} className="flex items-center text-blue-500 hover:underline">
                  <img src="/icons/email.jpg" alt="Email" className="w-6 h-6" />
                </a>
                <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
                  <img src="/icons/linkedin.jpg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href={`tel:${developer.phone}`} className="flex items-center text-blue-500 hover:underline">
                  <img src="/icons/phone.jpg" alt="Phone" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

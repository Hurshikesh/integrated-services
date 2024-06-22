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
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-center mb-8">
        We are a group of three developers who developed this page to provide integrated services to common people in the fields of education, health, finance, and government services.
      </p>
      <div className="flex justify-center space-x-6">
        {developers.map((developer, index) => (
          <div key={index} href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex flex-col items-center">
              <img src={developer.photo} alt={`${developer.name}'s photo`} className="rounded-full w-36 h-36 object-cover mb-4" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{developer.name}</h5>
              <div className="text-left w-full px-4">
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                  Email: <a href={`mailto:${developer.email}`} className="text-blue-500 hover:underline">{developer.email}</a>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                  LinkedIn: <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{developer.linkedin}</a>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Phone: <a href={`tel:${developer.phone}`} className="text-blue-500 hover:underline">{developer.phone}</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

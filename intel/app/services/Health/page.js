import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const healthServices = [
  {
    title: "Find Hospitals",
    description: "Search for the best hospitals with highly rated doctors near you.",
    image: "https://via.placeholder.com/400x300?text=Find+Hospitals",
    link: "/services/Health/FindHospital"
  },
  {
    title: "Consult Doctors",
    description: "Book appointments with top-rated doctors in various specialties.",
    image: "https://via.placeholder.com/400x300?text=Consult+Doctors",
    link: "/services/Health/doctors"
  },
  {
    title: "Find Pharmacies",
    description: "Locate pharmacies that are open 24/7 near your location.",
    image: "https://via.placeholder.com/400x300?text=Find+Pharmacies",
    link: "/services/Health/pharmacies"
  },
  {
    title: "Emergency Services",
    description: "Access information on nearest emergency services including oxygen supply.",
    image: "https://via.placeholder.com/400x300?text=Emergency+Services",
    link: "/services/Health/emergency"
  },
  {
    title: "Elder Care",
    description: "Find contact details for elder care and nurse services nearby.",
    image: "https://via.placeholder.com/400x300?text=Elder+Care",
    link: "/services/Health/ElderCare"
  },
  {
    title: "Diagnostic Centers",
    description: "Locate diagnostic centers for lab tests and imaging services.",
    image: "https://via.placeholder.com/400x300?text=Diagnostic+Centers",
    link: "/services/Health/diagnostic"
  }
];

export default function HealthPage() {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-0">
        {/* Hero Section */}
        <section className="bg-cover bg-center h-64 rounded-lg mb-12 relative" style={{ backgroundImage: "url('/images/health-hero.jpg')" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white">Health Services</h1>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthServices.map((service, index) => (
              <section key={index} className="bg-white p-6 rounded-lg shadow-md">
                <Link href={service.link}>
                  <div className="block">
                    <div className="flex items-center mb-4">
                      <h2 className="text-2xl font-bold text-blue-600">{service.title}</h2>
                    </div>
                    
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </Link>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HealthPage() {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-cover bg-center h-64 rounded-lg mb-12 relative" style={{ backgroundImage: "url('/images/health-hero.jpg')" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-blue-600 text-center">Your Comprehensive Health Services</h1>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Health Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthServices.map((service) => (
              <div key={service.title} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image src={service.image} alt={service.title} width={400} height={300} className="object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                  <Link href={service.link}>
                    <div className="text-indigo-600 hover:underline mt-4 inline-block">Learn more</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

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
    title: "Health Insurance",
    description: "Get cost details and health insurance coverage options.",
    image: "https://via.placeholder.com/400x300?text=Health+Insurance",
    link: "/services/Health/insurance"
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

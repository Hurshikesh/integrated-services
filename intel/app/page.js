import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[87vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
      <header className="bg-cover bg-center h-64" style={{ backgroundImage: "url('/header-bg.jpg')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-70">
          <h1 className="text-4xl font-bold text-white">Welcome to Integrated Services</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-2">{service.description}</p>
                  <Link href={service.link} className="text-indigo-400 hover:underline mt-4 inline-block">
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="bg-gray-800 shadow-md rounded-lg p-6 text-center">
                <Image src={step.image} alt={step.title} width={100} height={100} className="mx-auto" />
                <h3 className="text-xl font-bold mt-4">{step.title}</h3>
                <p className="mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <form className="bg-gray-800 shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="border border-gray-300 p-3 rounded-lg w-full bg-gray-700 text-white" />
              <input type="email" placeholder="Email" className="border border-gray-300 p-3 rounded-lg w-full bg-gray-700 text-white" />
            </div>
            <textarea placeholder="Message" className="border border-gray-300 p-3 rounded-lg w-full mt-4 h-32 bg-gray-700 text-white"></textarea>
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg mt-4">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
}

const services = [
  {
    title: "Health Services",
    description: "Consult doctors, find labs, hospitals, and pharmacies.",
    image: "/health.jpg",
    link: "/services/health"
  },
  {
    title: "Education Services",
    description: "Access learning materials, find mentors, and tutoring centers.",
    image: "/education.jpg",
    link: "/services/education"
  },
  {
    title: "Transportation Services",
    description: "Get details on auto, car, bus, and air services.",
    image: "/transport.jpg",
    link: "/services/transport"
  },
  {
    title: "Finance Services",
    description: "Find information on banking, tax, and insurance services.",
    image: "/finance.jpg",
    link: "/services/finance"
  },
  {
    title: "Government Services",
    description: "Access details on Aadhar, ration card, passport, and more.",
    image: "/government.jpg",
    link: "/services/government"
  },
  {
    title: "Housing Services",
    description: "Find electricians, plumbers, carpenters, and other services.",
    image: "/housing.jpg",
    link: "/services/housing"
  }
];

const steps = [
  {
    title: "Register",
    description: "Sign up and create your account.",
    image: "/step-register.png"
  },
  {
    title: "Search",
    description: "Find the services you need from our comprehensive directory.",
    image: "/step-search.png"
  },
  {
    title: "Connect",
    description: "Get in touch with service providers directly.",
    image: "/step-connect.png"
  }
];

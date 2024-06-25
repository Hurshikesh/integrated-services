'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (session) {
      const hasRedirected = localStorage.getItem('hasRedirected');

      if (!hasRedirected) {
        localStorage.setItem('hasRedirected', 'true');
        router.push('/services');
      }
    }
  }, [session, router]);

  if (!mounted) return null; // Render nothing initially

  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-sm w-full mx-auto">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Integrated Services</div>
        <div className="flex space-x-8">
          <a href="/" className="text-white text-l hover:text-gray-400">Home</a>
          <div className="relative group">
            <button
              className="text-white text-l hover:text-gray-400 flex items-center"
              onClick={() => router.push('/services')}
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-blue-600 text-white shadow-md mt-2 rounded-lg">
              <a 
                href="/services/Education" 
                className="block w-full text-left px-4 py-2 hover:bg-blue-700 focus:outline-none"
              >
                Education
              </a>
              <a 
                href="/services/FinancePage" 
                className="block w-full text-left px-4 py-2 hover:bg-blue-700 focus:outline-none"
              >
                Finance
              </a>
              <a 
                href="/services/Health" 
                className="block w-full text-left px-4 py-2 hover:bg-blue-700 focus:outline-none"
              >
                Health
              </a>
              <a 
                href="/services/Government" 
                className="block w-full text-left px-4 py-2 hover:bg-blue-700 focus:outline-none"
              >
                Government
              </a>
            </div>
          </div>
          <a href="/about" className="text-white text-l hover:text-gray-400">About Us</a>
          {session ? (
            <>
              <span className="text-white text-l">Welcome, {session.user.name}</span>
              <button
                onClick={() => router.push('/Profile')}
                className="text-white text-l hover:text-gray-400"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('hasRedirected');
                  signOut();
                }}
                className="text-white text-l hover:text-gray-400"
              >
                Sign out
              </button>
            </>
          ) : (
            <a href="/login" className="text-white text-l hover:text-gray-400">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

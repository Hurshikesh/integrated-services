'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="bg-purple-600 shadow-2xl w-full font-helvetica">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-white">CAREcONNECT</div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Home</a>
          <button
            className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
            onClick={() => router.push('/services')}
          >
            Services
          </button>
          <a href="/ServiceProvider" className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Add Service</a>
          <a href="/about" className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">About Us</a>
          {session ? (
            <>
              <button
                onClick={() => router.push('/Profile')}
                className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
              >
                Welcome {session.user.name}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('hasRedirected');
                  signOut();
                }}
                className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <a href="/login" className="text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Login</a>
          )}
        </div>
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-purple-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Home</a>
            <button
              className="block w-full text-left text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/services');
              }}
            >
              Services
            </button>
            <a href="/ServiceProvider" className="block text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Add Service</a>
            <a href="/about" className="block text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">About Us</a>
            {session ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/Profile');
                  }}
                  className="block w-full text-left text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
                >
                  Welcome {session.user.name}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('hasRedirected');
                    signOut();
                  }}
                  className="block w-full text-left text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
                >
                  Sign out
                </button>
              </>
            ) : (
              <a href="/login" className="block text-black font-bold hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Login</a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

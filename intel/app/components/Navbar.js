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
    <nav className="bg-white border-b border-white-700 shadow-2xl w-full mx-auto">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-black">Integrated Services</div>
        <div className="flex space-x-8">
          <a href="/" className="text-black text-l hover:text-gray-600">Home</a>
          <div className="relative group">
            <button
              className="text-black text-l hover:text-gray-600 flex items-center"
              onClick={() => router.push('/services')}
            >
              Services
              
            </button>
            </div>
            <a href="/ServiceProvider" className="text-black text-l hover:text-gray-600">Add Service</a>
          <a href="/about" className="text-black text-l hover:text-gray-600">About Us</a>
          {session ? (
            <>
              <span className="text-black text-l">Welcome, {session.user.name}</span>
              <button
                onClick={() => router.push('/Profile')}
                className="text-black text-l hover:text-gray-600"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('hasRedirected');
                  signOut();
                }}
                className="text-black text-l hover:text-gray-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <a href="/login" className="text-black text-l hover:text-gray-600">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
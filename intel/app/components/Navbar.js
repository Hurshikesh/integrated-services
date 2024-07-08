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
    <nav className="bg-purple-500 shadow-2xl w-full mx-auto font-helvetica">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold font text-white font-helvetica">CAREcONNECT</div>
        <div className="flex space-x-8">
          <a href="/" className="text-black font-bold font-helvetica hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded font-helvetica">Home</a>
          <div className="relative group">
            <button
              className="text-black font-bold hover:text-black font-helvetica hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded flex items-center "
              onClick={() => router.push('/services')}
            >
              Services
            </button>
          </div>
          <a href="/ServiceProvider" className="text-black font-bold font-helvetica hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Add Service</a>
          <a href="/about" className="text-black font-bold font-serif hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">About Us</a>
          {session ? (
            <>
              
              <button
                onClick={() => router.push('/Profile')}
                className="text-black font-bold font-helvetica hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
              >
               Welcome {session.user.name}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('hasRedirected');
                  signOut();
                }}
                className="text-black font-bold font-helvetica hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <a href="/login" className="text-black font-bold font-helvetica hover:text-black hover:bg-white transition duration-300 ease-in-out px-3 py-2 rounded">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

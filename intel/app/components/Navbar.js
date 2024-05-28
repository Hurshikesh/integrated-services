'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (session) {
      router.push('/services');
    } 
  }, [session, router]);

  if (!mounted) return null; // Render nothing initially

  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Integrated Services</div>
        <div className="flex space-x-8">
          <a href="/" className="text-white text-l hover:text-gray-400">Home</a>
          <a href="/services" className="text-white text-l hover:text-gray-400">Services</a>
          <a href="/about" className="text-white text-l hover:text-gray-400">About Us</a>
          {session ? (
            <>
              <span className="text-white text-l">Welcome, {session.user.name}</span>
              <button onClick={() => signOut()} className="text-white text-l hover:text-gray-400">Sign out</button>
            </>
          ) : (
            <a href="/login" className="text-white text-l hover:text-gray-400">
                  Login
                </a>
          )}
        </div>
      </div>
    </nav>
  );
};



export default Navbar
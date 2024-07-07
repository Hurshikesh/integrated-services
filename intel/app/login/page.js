'use client'
import React from 'react';
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="w-full p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign In to Explore Our <span className='underline text-blue-600'>Services</span></h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-8.87v2.89h5.31c-.23 1.19-1.33 3.5-3.95 3.5-2.37 0-4.31-1.97-4.31-4.31 0-2.33 1.94-4.3 4.31-4.3 1.36 0 2.28.6 2.81 1.12l2-2c-1.28-1.2-2.93-1.94-4.81-1.94-4.01 0-7.27 3.25-7.27 7.26 0 4 3.25 7.26 7.27 7.26 4.18 0 6.95-3 6.95-7.22 0-.49-.05-1.07-.11-1.5z"/>
              </svg>
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-950 transition duration-300"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.28 3.42 9.75 8.17 11.32.6.11.82-.26.82-.58l-.01-2.03c-3.33.72-4.03-1.61-4.03-1.61-.54-1.37-1.31-1.74-1.31-1.74-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.74.41-1.25.75-1.54-2.64-.3-5.42-1.32-5.42-5.88 0-1.3.47-2.37 1.23-3.21-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.43 11.43 0 013 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.21 0 4.58-2.79 5.58-5.44 5.88.43.37.81 1.1.81 2.22l-.01 3.3c0 .32.22.69.83.57C20.58 21.75 24 17.28 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

'use client'
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email/password login
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="flex justify-center items-center min-h-[84vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl w-full flex">
        <div className="w-1/2 pr-4 border-r border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Or</h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => signIn("google")}
              className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Login with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Login with GitHub
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

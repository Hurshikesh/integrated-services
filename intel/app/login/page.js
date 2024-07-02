'use client'
import React, { useState } from 'react';
import { useSession, signIn } from "next-auth/react";

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup
    console.log('Name:', name, 'Email:', email, 'Password:', password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Started Now</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-4 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="mr-2"
              />
              <label className="text-gray-900 text-sm">
                I agree to the <a href="#" className="text-green-500">terms & policy</a>
              </label>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Signup
            </button>
          </form>
          
          <div className="mt-4 flex flex-col space-y-4">
            <button
              onClick={() => signIn("google")}
              className="py-2 px-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            >
              <img src="/path/to/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="py-2 px-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            >
              <img src="/path/to/github-logo.png" alt="GitHub" className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </button>
           
          </div>
        </div>
        <div className="w-1/2">
          <img src="/path/to/your/image.png" alt="Leaf" className="w-full h-full object-cover rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;

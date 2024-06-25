'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated') {
        // Set initial data from session
        const initialData = {
          name: session.user.name || '',
          email: session.user.email || '',
          phone: '',
          address: '',
          bio: ''
        };
        setUserData(initialData);

        // Fetch additional profile data from API
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData({
            ...initialData,
            phone: data.phone,
            address: data.address,
            bio: data.bio
          });
        }
      } else if (status === 'unauthenticated') {
        router.push('/login'); // Redirect to login if not authenticated
      }
    };

    fetchUserData();
  }, [status, session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          bio: userData.bio,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        alert('Profile updated successfully!');
      } else {
        console.log('Failed to update profile');
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('An error occurred while updating the profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  if (status === 'loading') return <div>Loading...</div>; // Render loading state

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Profile</h1>
        {session?.user?.image && (
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt="User Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

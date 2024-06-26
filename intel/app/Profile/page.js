'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios'

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  const fetchUserData = async () => {
    if (status === 'authenticated' && session.user.email) {
      try {
        const response = await axios.get(`/api/profileData?email=${encodeURIComponent(session.user.email)}`);
        if (response.status === 200) {
          const data = response.data.data;
          setUserData({
            username: data.username || session.user.name || '',
            email: data.email || session.user.email || '',
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || ''
          });
        } else {
          // If profile doesn't exist, set initial data from session
          setUserData({
            username: session.user.name || '',
            email: session.user.email || '',
            phone: '',
            address: '',
            bio: ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Set initial data from session if there's an error
        setUserData({
          username: session.user.name || '',
          email: session.user.email || '',
          phone: '',
          address: '',
          bio: ''
        });
      }
    } else if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if not authenticated
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/profile", userData)
      console.log("Profile updated successfully", response.data)
      // Fetch the updated data immediately after saving
      fetchUserData();
    } catch (error) {
      console.error("Profile failed to update", error);
    } 
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    
    <div className="min-h-screen bg-gray-100  flex justify-center items-center">
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
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
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
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
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
                onChange={(e) => setUserData({...userData, address: e.target.value})}
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
                onChange={(e) => setUserData({...userData, bio: e.target.value})}
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
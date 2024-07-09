'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

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
  const [errors, setErrors] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);

  const validate = () => {
    const errors = {};
    if (!userData.username || userData.username.length < 3 || userData.username.length > 30) {
      errors.username = 'Username must be between 3 and 30 characters.';
    }
    if (!userData.phone || !/^\d{10}$/.test(userData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!userData.address || userData.address.length < 10) {
      errors.address = 'Address must be at least 10 characters long.';
    }
    if (userData.bio && userData.bio.length > 500) {
      errors.bio = 'Bio cannot be more than 500 characters.';
    }
    return errors;
  };

  const calculateProfileCompletion = () => {
    let fieldsFilled = 0;
    if (userData.username) fieldsFilled++;
    if (userData.email) fieldsFilled++;
    if (userData.phone) fieldsFilled++;
    if (userData.address) fieldsFilled++;
    if (userData.bio) fieldsFilled++;
    const completion = (fieldsFilled / 5) * 100;
    setProfileCompletion(completion);
  };

  useEffect(() => {
    calculateProfileCompletion();
  }, [userData]);

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
          setUserData({
            username: session.user.name || '',
            email: session.user.email || '',
            phone: '',
            address: '',
            bio: ''
          });
        }
        calculateProfileCompletion();
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setUserData({
          username: session.user.name || '',
          email: session.user.email || '',
          phone: '',
          address: '',
          bio: ''
        });
        calculateProfileCompletion();
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post("/api/profile", userData);
      toast.success("Profile updated successfully");
      fetchUserData();
    } catch (error) {
      toast.error("Profile failed to update");
      console.error("Profile failed to update", error);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-md animate-slide-up w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Your Profile</h1>
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="User Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-purple-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${profileCompletion}%` }}
            >
              {profileCompletion}%
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
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
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bio</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition duration-200 font-semibold"
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

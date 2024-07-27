import { connect } from '@/app/mongodb/mongodb';
import Profile from '@/app/mongodb/profileSchema';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connect();
    const req = await request.json()
    const { username, email, phone, address, bio } = req;

    console.log('Received data:', { username, email, phone, address, bio });

    let profile = await Profile.findOne({ email });

    if (profile) {
      console.log('Updating existing profile');
      // If profile exists, update it
      profile.username = username;
      profile.phone = phone;
      profile.address = address;
      profile.bio = bio;
    } else {
      console.log('Creating new profile');
      // If profile doesn't exist, create a new one
      profile = new Profile({
        username,
        email,
        phone,
        address,
        bio,
      });
    }

    const savedProfile = await profile.save();
    console.log('Saved profile:', savedProfile);

    return NextResponse.json({ status: profile ? 200 : 201, data: savedProfile });
  } catch (error) {
    console.error('Error creating or updating profile:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error creating or updating profile', details: error.message } });
  }
}
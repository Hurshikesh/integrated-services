import { connect } from '@/app/mongodb/mongodb';
import Profile from '@/app/mongodb/profileSchema';
import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    await connect();
    const req = await request.json()
    const { username, phone, address, bio } = req;


    let profile = await Profile.findOne({ phone });

    if (profile) {
      // If profile exists, update it
      profile.username = username;
      profile.address = address;
      profile.bio = bio;
    } else {
      // If profile doesn't exist, create a new one
      profile = new Profile({
        username,
        phone,
        address,
        bio,
      });
    }

    await profile.save(); // Save/update the profile

    return NextResponse.json({ status: profile ? 200 : 201, data: profile });
  } catch (error) {
    console.error('Error creating or updating profile:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error creating or updating profile' } });
  }
}

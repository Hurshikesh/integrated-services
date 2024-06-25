import { connect } from '@/app/mongodb/mongodb';
import Profile from '@/app/mongodb/profileSchema';
import { nextResponse } from 'next/server';

export async function GET(req, nextResponse) {
  try {
    await connect();

    const { phone } = req.query; // Assuming phone number is passed in query parameters
    const profile = await Profile.findOne({ phone });

    if (!profile) {
      return nextResponse.json({ status: 404, data: { error: 'Profile not found' } });
    }

    return nextResponse.json({ status: 200, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return nextResponse.json({ status: 500, data: { error: 'Error fetching profile' } });
  }
}

export async function POST(req, nextResponse) {
  try {
    await connect();

    const { name, phone, address, bio } = req.body;

    let profile = await Profile.findOne({ phone });

    if (profile) {
      // If profile exists, update it
      profile.username = name;
      profile.address = address;
      profile.bio = bio;
    } else {
      // If profile doesn't exist, create a new one
      profile = new Profile({
        username: name,
        phone,
        address,
        bio,
      });
    }

    await profile.save(); // Save/update the profile

    return nextResponse.json({ status: profile ? 200 : 201, data: profile });
  } catch (error) {
    console.error('Error creating or updating profile:', error);
    return nextResponse.json({ status: 500, data: { error: 'Error creating or updating profile' } });
  }
}

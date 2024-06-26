import { connect } from '@/app/mongodb/mongodb';
import Profile from '@/app/mongodb/profileSchema';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connect();
    const req = await request.json()
    const { phone } = req; // Assuming phone number is passed in query parameters
    const profile = await Profile.findOne({ phone });
    if (!profile) {
      return NextResponse.json({ status: 404, data: { error: 'Profile not found' } });
    }

    return NextResponse.json({ status: 200, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ status: 500, data: { error: 'error fetching profile' } });
  }
}
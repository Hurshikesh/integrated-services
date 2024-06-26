import { connect } from '@/app/mongodb/mongodb';
import Profile from '@/app/mongodb/profileSchema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ status: 400, data: { error: 'Email is required' } });
    }

    const profile = await Profile.findOne({ email });

    if (profile) {
      return NextResponse.json({ status: 200, data: profile });
    } else {
      return NextResponse.json({ status: 404, data: { error: 'Profile not found' } });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error fetching profile' } });
  }
}
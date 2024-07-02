import { connect } from '@/app/mongodb/mongodb';
import Feedback from '@/app/mongodb/feedbackSchema';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connect();
    const req = await request.json()
    const { message,username,email } = req;

      console.log('Creating new feedback');
      // If profile doesn't exist, create a new one
      const feedback = new Feedback({
        message: message,
        username: username,
        email: email
      });

    const savedFeedback = await feedback.save();

    return NextResponse.json({ status: feedback ? 200 : 201, data: savedFeedback });
  } catch (error) {
    console.error('Error creating or updating profile:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error creating or updating profile', details: error.message } });
  }
}
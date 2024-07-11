// api/serviceProviderData.js
import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect(); // Ensure MongoDB connection is established

    const { searchParams } = new URL(request.url);
    const gst = searchParams.get('gst');

    if (!gst) {
      return NextResponse.json({ status: 400, error: 'GST number is required' }, { status: 400 });
    }

    const serviceProvider = await Provider.findOne({ GST: gst });

    if (serviceProvider) {
      return NextResponse.json({ status: 200, data: serviceProvider });
    } else {
      // If no service provider found with the specified GST number
      return NextResponse.json({ status: 404, error: 'No service provider found with the specified GST number' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching service provider:', error);
    return NextResponse.json({ status: 500, error: 'Error fetching service provider' }, { status: 500 });
  }
}
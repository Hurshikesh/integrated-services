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
      return NextResponse.json({ status: 400, data: { error: 'GST number is required' } });
    }

    const serviceProvider = await Provider.findOne({ GST: gst });

    if (serviceProvider) {
      return NextResponse.json({ status: 200, data: serviceProvider });
    } else {
      return NextResponse.json({ status: 404, data: { error: 'No service provider found with the specified GST number' } });
    }
  } catch (error) {
    console.error('Error fetching service provider:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error fetching service provider', details: error.message } });
  }
}
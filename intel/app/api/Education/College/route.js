import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const lon = parseFloat(searchParams.get('lon'));
    const lat = parseFloat(searchParams.get('lat'));
    const domain = searchParams.get('domain') || 'Education';
    const serviceType = searchParams.get('serviceType') || 'University/College';

    if (isNaN(lon) || isNaN(lat)) {
      return NextResponse.json({ success: false, error: 'Invalid or missing coordinates' }, { status: 400 });
    }

    const maxDistance = 10000; // 10 kilometers radius
    const colleges = await Provider.find({
      domain,
      serviceType,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $maxDistance: maxDistance
        }
      }
    });

    return NextResponse.json({ success: true, data: colleges });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ success: false, error: 'Error fetching colleges', details: error.message }, { status: 500 });
  }
}

import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function getCoachingCenters(request) {
  try {
    await connect();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const lon = searchParams.get('lon');
    const lat = searchParams.get('lat');
    const domain = searchParams.get('domain') || 'Education';
    const serviceType = searchParams.get('serviceType') || 'Coaching Centre';

    if (isNaN(lon) || isNaN(lat)) {
      return NextResponse.json({ success: false, error: 'Invalid or missing coordinates' }, { status: 400 });
    }

    const maxDistance = 10000; // 10 kilometers radius
    const coachingCenters = await Provider.find({
      domain,
      serviceType,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $maxDistance: maxDistance
        }
      }
    });

    return NextResponse.json({ success: true, data: coachingCenters });
  } catch (error) {
    console.error('Error fetching coaching centers:', error);
    return NextResponse.json({ success: false, error: 'Error fetching coaching centers', details: error.message }, { status: 500 });
  }
}

// Exporting the HTTP method
export { getCoachingCenters as GET };

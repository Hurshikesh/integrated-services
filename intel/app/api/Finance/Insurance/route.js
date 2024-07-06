import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const lon = parseFloat(searchParams.get('lon'));
    const lat = parseFloat(searchParams.get('lat'));
    const domain = searchParams.get('domain') || 'Finance';
    const serviceType = searchParams.get('serviceType') || 'Insurance Provider';

    if (isNaN(lon) || isNaN(lat)) {
      return NextResponse.json({ success: false, error: 'Invalid or missing coordinates' }, { status: 400 });
    }

    const maxDistance = 10000;

    const providers = await Provider.find({
      domain,
      serviceType,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $maxDistance: maxDistance
        }
      }
    }).limit(20);  // Limit the number of results

    if (providers.length === 0) {
      return NextResponse.json({ success: true, data: [], message: 'No providers found in the specified area' });
    }

    return NextResponse.json({ success: true, data: providers });
  } catch (error) {
    console.error('Error fetching service providers:', error);
    return NextResponse.json({ success: false, error: 'Error fetching service providers', details: error.message }, { status: 500 });
  }
}
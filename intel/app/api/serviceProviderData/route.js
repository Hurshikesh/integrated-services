import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const lon = parseFloat(searchParams.get('lon'));
    const lat = parseFloat(searchParams.get('lat'));
    const maxDistance = parseInt(searchParams.get('maxDistance')) || 100000; // default to 5km
    const domain = searchParams.get('domain');
    const serviceType = searchParams.get('serviceType');

    const query = {
      location: {
        $geoNear: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $maxDistance: maxDistance // distance in meters
        }
      }
    };

    if (domain) {
      query.domain = domain;
    }
    if (serviceType) {
      query.serviceType = serviceType;
    }

    const providers = await Provider.find(query);

    if (providers.length > 0) {
      return NextResponse.json({ status: 200, data: providers });
    } else {
      return NextResponse.json({ status: 404, data: { error: 'No companies found at the specified location' } });
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ status: 500, data: { error: 'Error fetching companies', details: error.message } });
  }
}

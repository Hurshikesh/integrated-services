import { connect } from '@/app/mongodb/mongodb';
import Provider from '@/app/mongodb/serviceProviderSchema';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const { domain, serviceType, phone, address, companyName, bio, GST } = req;
    let lon, lat;

    console.log('Received data:', { domain, serviceType, phone, address, companyName, bio, GST });

    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=smQYaHs6kqHnMongUhEHKnBIXpmilQacnaE9xDCSFYY`
    );
    const data = await response.json();
    if (data.items.length > 0) {
      lat = data.items[0].position.lat;
      lon = data.items[0].position.lng;
    } else {
      return NextResponse.json({
        message: 'Address not found. Please try again with another address.',
        success: false
      });
    }

    let serviceProvider = await Provider.findOne({ GST });

    if (serviceProvider) {
      console.log('Updating existing service provider');
      // If profile exists, update it
      serviceProvider.domain = domain;
      serviceProvider.serviceType = serviceType;
      serviceProvider.phone = phone;
      serviceProvider.address = address;
      serviceProvider.companyName = companyName;
      serviceProvider.bio = bio;
      serviceProvider.location = {
        type: 'Point',
        coordinates: [lon, lat]
      };
    } else {
      console.log('Creating new profile');
      // If profile doesn't exist, create a new one
      serviceProvider = new Provider({
        domain,
        serviceType,
        phone,
        address,
        companyName,
        bio,
        GST,
        location: {
          type: 'Point',
          coordinates: [lon, lat]
        }
      });
    }

    const savedServiceProvider = await serviceProvider.save();
    console.log('Saved profile:', savedServiceProvider);

    return NextResponse.json({ success: true, data: savedServiceProvider });
  } catch (error) {
    console.error('Error creating or updating service provider:', error);
    return NextResponse.json({ success: false, error: 'Error creating or updating service provider', details: error.message });
  }
}

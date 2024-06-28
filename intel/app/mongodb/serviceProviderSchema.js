import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  domain:{ type: String, required: true},
  serviceType: { type: String, required: true},
  phone:{ type: Number, unique: true, required: true},
  address: { type: String, required: true},
  companyName: { type: String, required: true},
  bio: { type: String, required: true},
  GST: { type: String,  unique: true, required: true},
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }

});
serviceProviderSchema.index({ location: '2dsphere' });
const Provider = mongoose.models.Provider || mongoose.model('Provider', serviceProviderSchema);

export default Provider;
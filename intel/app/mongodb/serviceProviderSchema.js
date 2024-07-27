import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  domain:{ type: String, required: true},
  serviceType: { type: String, required: true},
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be exactly 10 digits'
    }
  },
  address: { type: String, required: true},
  companyName: { type: String, required: true},
  bio: {
    type: String,
    required: true,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
   GST: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 15;
      },
      message: 'GST must be exactly 15 characters'
    }
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }

});
serviceProviderSchema.index({ location: '2dsphere' });
const Provider = mongoose.models.Provider || mongoose.model('Provider', serviceProviderSchema);

export default Provider;
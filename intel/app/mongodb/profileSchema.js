import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  phone:{ type: Number, unique: true },
  address: String,
  bio: String,
  isAdmin: { type: Boolean, default: false },
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
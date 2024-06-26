import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({ 
  username:{
     type: String,
     required:[true,"please provide a username"],
     unique:true
  },
  phone:{
    type: String,
    required:[true,"please provide your phone number"],
    unique:true
 },
 address:{
  type: String,
  required:[true,"please provide your address"],
},
bio:{
  type: String,
  required:[true,"please provide bio"],
},
isAdmin:{
     type: Boolean,
     default: false
  },
});

const profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default profile

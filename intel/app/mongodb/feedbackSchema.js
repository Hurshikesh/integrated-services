import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  username: String,
  email: { type: String },
  message: { type: String, required: true }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;
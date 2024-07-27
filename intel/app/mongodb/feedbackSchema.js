import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    maxlength: [100, 'Email must be less than 100 characters long']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message must be less than 1000 characters long']
  }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;
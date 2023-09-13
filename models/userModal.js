import mongoose from 'mongoose';

const userModal = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
    default: null,
  },
  verifyToken: {
    type: String,
    default: null,
  },
});

const UserModal =
  mongoose.models.usermodal || mongoose.model('usermodal', userModal);

export default UserModal;

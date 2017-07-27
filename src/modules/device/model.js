import mongoose, { Schema } from 'mongoose';

const DeviceSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    //minLength: [25, '25 characters long at least'],
  },
}, { timestamps: true });

export default mongoose.model('Device', DeviceSchema);
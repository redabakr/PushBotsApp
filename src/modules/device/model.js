import mongoose, { Schema } from 'mongoose';

const DeviceSchema = new Schema({
  registrationID: {
    type: String,
    required: true,
    unique: true,
    //minLength: [25, '25 characters long at least'],
  },
}, { timestamps: true });

export default mongoose.model('Device', DeviceSchema);
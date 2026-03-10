import mongoose, { Document, Schema } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
}

const otpSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      length: 6,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Auto-delete after expiration
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.models.OTP || mongoose.model<IOTP>('OTP', otpSchema);

export default OTP;

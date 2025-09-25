import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  phone: string;
  bluetoothId: string;
  otp?: number;
  otpExpiry?: Date;
  isVerified: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    bluetoothId: { type: String, required: true },
    otp: { type: Number },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);

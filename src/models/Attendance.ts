import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
  userId: mongoose.Types.ObjectId;
  sessionId: string;
  status: "present" | "absent";
  timestamp: Date;
}

const AttendanceSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionId: { type: String, required: true },
    status: { type: String, enum: ["present", "absent"], default: "present" },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);

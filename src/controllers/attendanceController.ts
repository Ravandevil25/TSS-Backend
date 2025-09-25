import { Request, Response } from "express";
import Attendance from "../models/Attendance";
import User from "../models/User";

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { rollNumber, sessionId, status } = req.body; // 👈 added status

    // Validate status
    if (!["present", "absent"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Use 'present' or 'absent'." });
    }

    // Find student
    const student = await User.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Save attendance
    const attendance = new Attendance({
      userId: student._id,
      sessionId,
      status // 👈 now dynamic
    });

    await attendance.save();

    res.json({ message: `Attendance marked as ${status} ✅`, attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

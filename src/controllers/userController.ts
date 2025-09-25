import { Request, Response } from "express";
import Student from "../models/User"; // assuming User model is for students
import nodemailer from "nodemailer";

// Register student
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { email, phone, bluetoothId } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Save student with OTP (temporary, unverified)
    const student = new Student({
      email,
      phone,
      bluetoothId,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000 // 5 min expiry
    });
    await student.save();

    // Setup Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"Attendance System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email - Attendance System",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(201).json({
      message: "Student registered, OTP sent to email",
      studentId: student._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

// Verify OTP
export const verifyStudentOtp = async (req: Request, res: Response) => {
  try {
    const { studentId, otp } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (
     student.otp !== otp ||
     !student.otpExpiry ||               // ensure it's not undefined
     student.otpExpiry.getTime() < Date.now()  // compare using timestamps
  )  {
     return res.status(400).json({ message: "Invalid or expired OTP" });
}


    student.isVerified = true;
    student.otp = undefined;
    student.otpExpiry = undefined;
    await student.save();

    res.status(200).json({ message: "Email verified successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

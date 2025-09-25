import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../models/Admin";


//Register Teacher
export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password, id, avatar, phone, bluetooth_address } = req.body;

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already registered" });
    }

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword, // ✅ store hashed password
      id,
      avatar,
      phone,
      bluetooth_address,
    });

    await teacher.save();

    res.status(201).json({
      message: "Teacher registered successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error });
  }
};

//Login Teacher
export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("📥 Login attempt:", { email, password }); // Debug input

    // 1. Find teacher
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      console.log("❌ Teacher not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("✅ Teacher found:", teacher.email);

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);
    console.log("🔑 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    console.log("🎫 Token created:", token);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

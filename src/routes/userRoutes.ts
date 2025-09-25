import express from "express";
import { registerStudent, verifyStudentOtp } from "../controllers/userController";

const router = express.Router();

router.post("/registerstudent", registerStudent);
router.post("/verify-otp", verifyStudentOtp);

export default router;

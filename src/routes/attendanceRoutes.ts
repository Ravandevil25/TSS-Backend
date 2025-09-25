import { Router } from "express";
import { markAttendance } from "../controllers/attendanceController";
import { protect } from "../middleware/utils/authMiddleware"; // 👈 import middleware

const router = Router();

// POST /api/attendance → Protected
router.post("/attendance", protect, markAttendance);

export default router;

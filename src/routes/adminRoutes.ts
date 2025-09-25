import express from "express";
import { registerTeacher, loginTeacher } from "../controllers/adminControllers";

const router = express.Router();

//Teacher registration
router.post("/register", registerTeacher);

// Teacher login
router.post("/login", loginTeacher);

export default router;



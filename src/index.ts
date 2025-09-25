import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";


//Routes
import attendanceRoutes from "./routes/attendanceRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";






dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", attendanceRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Attendance Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
app.use("/api", userRoutes);






// ... inside app setup
app.use("/api/admin", adminRoutes);








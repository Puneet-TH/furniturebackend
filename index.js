import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";   // ✅ import cors
import userRoute from "./Routes/user.routes.js";
import enquiryRoute from "./Routes/enquiry.routes.js";

dotenv.config();
dbConnect();
const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "https://furniture-six-hazel.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// When setting cookies (e.g., in login route), use options like:
// res.cookie('token', token, {
//   httpOnly: true,
//   secure: true, // required for cross-site cookies
//   sameSite: 'None', // required for cross-site cookies
//   // ...other options
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: true
  });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/enquiry", enquiryRoute);

app.listen(3000, () => {
  console.log("server running on 3000");
});
import express from "express";
const app = express();
import databaseConnection from "../config/database.js";
import userRoute from "../routes/userRoute.js";
import activityRoutes from "../routes/activityRoute.js";
import bookingRoutes from "../routes/bookingRoute.js";
import cors from "cors";
databaseConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use("/api/user", userRoute);
app.use("/api/activities", activityRoutes);
app.use("/api/bookings", bookingRoutes);

import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import {
  bookActivity,
  getMyBookings,
} from "../controllers/bookingController.js";
router.post("/book/:activityId", auth, bookActivity);
router.get("/my-bookings", auth, getMyBookings);
export default router;

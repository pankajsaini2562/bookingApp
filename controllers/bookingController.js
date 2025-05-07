import Booking from "../models/bookingModel.js";
import Activity from "../models/activityModel.js";
export const bookActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    console.log(activity);
    console.log("Logged in user ID:", req.user);

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    const alreadyBooked = await Booking.findOne({
      user: req.user,
      activity: activityId,
    });
    if (alreadyBooked)
      return res
        .status(400)
        .json({ message: "You have already booked this activity" });

    const booking = new Booking({
      user: req.user,
      activity: activityId,
    });

    await booking.save();
    res.status(201).json({ message: "Activity booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
};
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user })
      .populate("activity")
      .sort({ bookedAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

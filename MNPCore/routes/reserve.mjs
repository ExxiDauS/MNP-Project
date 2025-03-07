// reserve than wait for Live house manager to accept or cancel
// accept reserve
// reject reserve
// edit reserve
import { Router } from "express";
import {
  create_booking,
  get_booking_by_manager_id,
  get_booking_by_user_id,
  get_facilities_by_livehouse,
  get_livehouse_by_id,
  verify_reserve,
} from "../database.mjs";
import multer from "multer";

const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

const router = Router();

const upload = multer();

router.post("/create-booking", upload.none(), async (req, res) => {
  try {
    const {
      user_id,
      livehouse_id,
      start_time,
      end_time,
      total_price,
      guitar,
      keyboard,
      bass,
      drum,
      mic,
      pa_monitor,
    } = req.body;

    const result = await create_booking(
      user_id,
      livehouse_id,
      start_time,
      end_time,
      total_price,
      "Pending",
      guitar || 0,
      keyboard || 0,
      bass || 0,
      drum || 0,
      mic || 0,
      pa_monitor || 0
    );
    console.log(result);
    res.status(200).json({
      result: result.insertId,
      user_id,
      livehouse_id,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
});

router.get("/get_booking/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const [bookings] = await get_booking_by_user_id(user_id);

    const bookingDetails = [];
    for (let i = 0; i < bookings.length; i++) {
      // get data
      const livehouse_id = bookings[i].livehouse_id;
      const livehouseData = await get_livehouse_by_id(livehouse_id);
      const facilitiesData = await get_facilities_by_livehouse(livehouse_id);
      

      // calculate time
      const start_time = new Date(bookings[i].start_time);
      const end_time = new Date(bookings[i].end_time);
      const total_time = end_time.getHours() - start_time.getHours();
      
      // calculate price
      const guitar_price =
        bookings[i].guitar * facilitiesData.guitar_price * total_time;
      const keyboard_price =
        bookings[i].keyboard * facilitiesData.keyboard_price * total_time;
      const bass_price =
        bookings[i].bass * facilitiesData.bass_price * total_time;
      const drum_price =
        bookings[i].drum * facilitiesData.drum_price * total_time;
      const mic_price = bookings[i].mic * facilitiesData.mic_price * total_time;
      const pa_monitor_price =
        bookings[i].pa_monitor * facilitiesData.pa_monitor_price * total_time;

      const livehouse_price = livehouseData.price_per_hour * total_time;
      bookingDetails.push({
        bookingInfo: bookings[i],
        livehouse_price: livehouse_price,
        facilities_price: guitar_price + keyboard_price + bass_price + drum_price + mic_price + pa_monitor_price,
        facilities: {
          guitar: bookings[i].guitar,
          keyboard: bookings[i].keyboard,
          bass: bookings[i].bass,
          drum: bookings[i].drum,
          mic: bookings[i].mic,
          pa_monitor: bookings[i].pa_monitor,
        },
      });
    }
    res.status(200).json(bookingDetails);
  } catch (err) {
    return handleServerError(res, err);
  }
});

router.get("/get_booking_by_livehouse/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const [bookings] = await get_booking_by_manager_id(user_id);

    const bookingDetails = [];
    for (let i = 0; i < bookings.length; i++) {
      // get data
      const livehouse_id = bookings[i].livehouse_id;
      const livehouseData = await get_livehouse_by_id(livehouse_id);
      const facilitiesData = await get_facilities_by_livehouse(livehouse_id);
      

      // calculate time
      const start_time = new Date(bookings[i].start_time);
      const end_time = new Date(bookings[i].end_time);
      const total_time = end_time.getHours() - start_time.getHours();
      
      // calculate price
      const guitar_price =
        bookings[i].guitar * facilitiesData.guitar_price * total_time;
      const keyboard_price =
        bookings[i].keyboard * facilitiesData.keyboard_price * total_time;
      const bass_price =
        bookings[i].bass * facilitiesData.bass_price * total_time;
      const drum_price =
        bookings[i].drum * facilitiesData.drum_price * total_time;
      const mic_price = bookings[i].mic * facilitiesData.mic_price * total_time;
      const pa_monitor_price =
        bookings[i].pa_monitor * facilitiesData.pa_monitor_price * total_time;

      const livehouse_price = livehouseData.price_per_hour * total_time;
      bookingDetails.push({
        bookingInfo: bookings[i],
        livehouse_price: livehouse_price,
        facilities_price: guitar_price + keyboard_price + bass_price + drum_price + mic_price + pa_monitor_price,
        facilities: {
          guitar: bookings[i].guitar,
          keyboard: bookings[i].keyboard,
          bass: bookings[i].bass,
          drum: bookings[i].drum,
          mic: bookings[i].mic,
          pa_monitor: bookings[i].pa_monitor,
        },
      });
    }
    res.status(200).json(bookingDetails);
  } catch (err) {
    return handleServerError(res, err);
  }
});

router.patch("/change-status/:booking_id", async (req, res) => {
  try {
    const booking_id = req.params.booking_id;
    const status = req.body.status;
    const result = await verify_reserve(booking_id, status);
    res.status(200).json({ result });
  } catch (error) {
    return handleServerError(res, error);
  }
});

export default router;

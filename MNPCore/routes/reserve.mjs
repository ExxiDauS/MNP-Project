// reserve than wait for Live house manager to accept or cancel
// accept reserve
// reject reserve
// edit reserve
import { Router } from "express";
import {
  create_booking,
  get_booking_by_user_id,
  get_facilities_by_livehouse,
  get_livehouse_by_id,
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
        (bookings.guitar || 0) * facilitiesData.guitar_price * total_time;
      const keyboard_price =
        (bookings.keyboard || 0) * facilitiesData.keyboard_price * total_time;
      const bass_price =
        (bookings.bass || 0) * facilitiesData.bass_price * total_time;
      const drum_price =
        (bookings.drum || 0) * facilitiesData.drum_price * total_time;
      const mic_price = (bookings.mic || 0) * facilitiesData.mic_price * total_time;
      const pa_monitor_price =
        (bookings.pa_monitor || 0) * facilitiesData.pa_monitor_price * total_time;

      const livehouse_price = livehouseData.price_per_hour * total_time;
      bookingDetails.push({
        bookingInfo: bookings[i],
        livehouse_price: livehouse_price,
        facilities_price: {
          guitar: guitar_price,
          keyboard: keyboard_price,
          bass: bass_price,
          drum: drum_price,
          mic: mic_price,
          pa_monitor: pa_monitor_price,
        },
      });
    }
    res.status(200).json(bookingDetails);
  } catch (err) {
    return handleServerError(res, err);
  }
});
export default router;

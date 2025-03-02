// reserve than wait for Live house manager to accept or cancel
// accept reserve
// reject reserve
// edit reserve
import { Router } from "express";
import {
  create_booking,
  get_booking_by_user_id,
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
    const [result] = await get_booking_by_user_id(user_id);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    return handleServerError(res, err);
  }
});

export default router;

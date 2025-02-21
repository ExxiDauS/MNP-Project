// reserve than wait for Live house manager to accept or cancel
// accept reserve
// reject reserve
// edit reserve
import { Router } from "express";
import { create_reserve } from "../database.mjs";

const router = Router();

router.post("/create_reserve", async (req, res) => {
  try {
    const { artist_id, livehouse_id, start_time, end_time } = req.body;
    const new_reserve = await create_reserve(
      artist_id,
      livehouse_id,
      start_time,
      end_time,
      "pending"
    );
    res.status(201).json({
      message: "Reserve created",
      new_reserve: {
        artist_id: new_reserve.artist_id,
        livehouse_id: new_reserve.livehouse_id,
        start_time: new_reserve.start_time,
        end_time: new_reserve.end_time,
        status: "pending",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
  
});

export default router;

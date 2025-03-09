import { Router } from "express";
import { create_facilities, get_facilities_by_livehouse, patch_facilities } from "../database.mjs";

const router = Router();

const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

router.post("/create-facility", async (req, res) => {
  try {
    const {
      livehouse_id,
      mic,
      guitar,
      bass,
      drum,
      keyboard,
      pa_monitor,
      mic_price,
      guitar_price,
      bass_price,
      drum_price,
      keyboard_price,
      pa_monitor_price,
    } = req.body;
    const facility = await create_facilities(
      livehouse_id,
      mic,
      guitar,
      bass,
      drum,
      keyboard,
      pa_monitor,
      mic_price,
      guitar_price,
      bass_price,
      drum_price,
      keyboard_price,
      pa_monitor_price
    );
    res.status(200).json({
      facility,
    });
  } catch (error) {
    return handleServerError(res, error, "Error creating facility");
  }
});

router.patch("/update-facility/:facility_id", async (req, res) => {
    try {
        const {
            mic,
            guitar,
            bass,
            drum,
            keyboard,
            pa_monitor,
            mic_price,
            guitar_price,
            bass_price,
            drum_price,
            keyboard_price,
            pa_monitor_price,
        } = req.body;
        const { facility_id } = req.params;
        const [facility] = await patch_facilities(
          facility_id,
          mic,
          guitar,
          bass,
          drum,
          keyboard,
          pa_monitor,
          mic_price,
          guitar_price,
          bass_price,
          drum_price,
          keyboard_price,
          pa_monitor_price
        );
        res.status(200).json({
          facility,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating facility",
            error: error.message,
    });
  }
});

router.get("/get-facilities/:livehouse_id", async (req, res) => {
  try {
    const livehouse_id = req.params.livehouse_id;
    const facilities = await get_facilities_by_livehouse(livehouse_id);
    res.status(200).json(facilities);
  } catch (err) {
    res.status(500).json({
      message: "Error getting facilities",
      error: err.message,
    });
  }
});

export default router;

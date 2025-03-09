import { Router } from "express";
import {
  create_livehouse,
  get_all_livehouses,
  get_livehouse_by_id,
  patch_livehouse,
} from "../database.mjs";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

const router = Router();

router.get("/get-livehouse", async (req, res) => {
  try {
    const livehouses = await get_all_livehouses();
    res.status(200).json({
      livehouses,
    });
  } catch (error) {
    return handleServerError(res, error, "Error fetching livehouses");
  }
});

router.get("/get-livehouse/:livehouse_id", async (req, res) => {
  try {
    const { livehouse_id } = req.params;
    const livehouse = await get_livehouse_by_id(livehouse_id);

    // Create a modified response object matching your desired pattern
    // where the image data remains as Buffer type in the response
    const responseData = {
      description: livehouse.description,
      livehouse_id: livehouse.livehouse_id,
      location: livehouse.location,
      name: livehouse.name,
      price_per_hour: livehouse.price_per_hour,
      province: livehouse.province,
      sample_image01: livehouse.sample_image01
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image01), // Convert Buffer to array of numbers
          }
        : null,
      sample_image02: livehouse.sample_image02
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image02),
          }
        : null,
      sample_image03: livehouse.sample_image03
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image03),
          }
        : null,
      sample_image04: livehouse.sample_image04
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image04),
          }
        : null,
      sample_image05: livehouse.sample_image05
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image05),
          }
        : null,
      user_id: livehouse.user_id,
    };

    res.status(200).json(responseData);
  } catch (error) {
    return handleServerError(res, error, "Error fetching livehouse");
  }
});

router.get("/get-livehouse/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const livehouse = await get_livehouse_by_userid(user_id);

    // Create a modified response object matching your desired pattern
    // where the image data remains as Buffer type in the response
    const responseData = {
      description: livehouse.description,
      livehouse_id: livehouse.livehouse_id,
      user_id: livehouse.user_id,
      location: livehouse.location,
      name: livehouse.name,
      price_per_hour: livehouse.price_per_hour,
      province: livehouse.province,
      sample_image01: livehouse.sample_image01
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image01), // Convert Buffer to array of numbers
          }
        : null,
      sample_image02: livehouse.sample_image02
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image02),
          }
        : null,
      sample_image03: livehouse.sample_image03
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image03),
          }
        : null,
      sample_image04: livehouse.sample_image04
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image04),
          }
        : null,
      sample_image05: livehouse.sample_image05
        ? {
            type: "Buffer",
            data: Array.from(livehouse.sample_image05),
          }
        : null,
      user_id: livehouse.user_id,
    };

    res.status(200).json(responseData);
  } catch (error) {
    return handleServerError(res, error, "Error fetching livehouse");
  }
});

router.post(
  "/create-livehouse",
  upload.fields([
    { name: "sample_image01", maxCount: 1 },
    { name: "sample_image02", maxCount: 1 },
    { name: "sample_image03", maxCount: 1 },
    { name: "sample_image04", maxCount: 1 },
    { name: "sample_image05", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { user_id, name, location, province, description, price_per_hour } =
        req.body;

      const sampleimg01Buffer = req.files?.sample_image01?.[0]?.buffer || null;
      const sampleimg02Buffer = req.files?.sample_image02?.[0]?.buffer || null;
      const sampleimg03Buffer = req.files?.sample_image03?.[0]?.buffer || null;
      const sampleimg04Buffer = req.files?.sample_image04?.[0]?.buffer || null;
      const sampleimg05Buffer = req.files?.sample_image05?.[0]?.buffer || null;

      const newLivehouse = await create_livehouse(
        user_id,
        name,
        location,
        province,
        description,
        price_per_hour,
        sampleimg01Buffer,
        sampleimg02Buffer,
        sampleimg03Buffer,
        sampleimg04Buffer,
        sampleimg05Buffer
      );
      res.status(201).json({
        message: "Livehouse created successfully",
        livehouse: newLivehouse,
      });
    } catch (error) {
      return handleServerError(res, error, "Error creating livehouse");
    }
  }
);

router.patch(
  "update-livehouse/:livehouse_id",
  upload.fields([
    { name: "sample_image01", maxCount: 1 },
    { name: "sample_image02", maxCount: 1 },
    { name: "sample_image03", maxCount: 1 },
    { name: "sample_image04", maxCount: 1 },
    { name: "sample_image05", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { livehouse_id } = req.params;
      const { name, location, province, description, price_per_hour } =
        req.body;

      const sampleimg01Buffer = req.files?.sample_image01?.[0]?.buffer || null;
      const sampleimg02Buffer = req.files?.sample_image02?.[0]?.buffer || null;
      const sampleimg03Buffer = req.files?.sample_image03?.[0]?.buffer || null;
      const sampleimg04Buffer = req.files?.sample_image04?.[0]?.buffer || null;
      const sampleimg05Buffer = req.files?.sample_image05?.[0]?.buffer || null;

      const updatedLivehouse = await patch_livehouse(
        livehouse_id,
        name,
        location,
        province,
        description,
        price_per_hour,
        sampleimg01Buffer,
        sampleimg02Buffer,
        sampleimg03Buffer,
        sampleimg04Buffer,
        sampleimg05Buffer
      );

      res.status(200).json({
        message: "Livehouse updated successfully",
        livehouse: updatedLivehouse,
      });
    } catch (error) {
      return handleServerError(res, error, "Error updating livehouse");
    }
  }
);
export default router;

// redirect to payment

import { Router } from "express";
import QRCode from "qrcode";
import generatePayload from "promptpay-qr";
import bodyParser from "body-parser";
import _ from "lodash";
import cors from "cors";
import {
  get_booking_by_id,
  get_livehouse_by_id,
  get_proof,
  get_user_by_id,
  upload_payment_proof,
  verify_reserve,
} from "../database.mjs";
import multer from "multer";
import { createEvent } from "../utils/calendar.mjs";
import { sendMail } from "../utils/notification.mjs";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Wrong file type");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
    }
    cb(null, true);
  },
});

const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error("Server Error:", error);
  return res.status(500).json({
    error: message,
    details: error.message,
  });
};

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/generateQR/:booking_id", async (req, res) => {
  try {
    const booking_id = req.params.booking_id;
    const booking = await get_booking_by_id(booking_id);
    const amount = parseFloat(booking.total_price);
    const livehouse = await get_livehouse_by_id(booking.livehouse_id);
    const manager = await get_user_by_id(livehouse.user_id);
    const mobileNumber = manager.phone;
    const payload = generatePayload(mobileNumber, { amount });
    const buffer = await QRCode.toBuffer(payload, {
      type: "png",
      quality: 0.92,
      margin: 1,
      color: {
        dark: "#000",
        light: "#FFF",
      },
    });

    res.set("Content-Type", "image/png");
    res.send(buffer);
    // QRCode.toDataURL(payload, options, (err, url) => {
    //     if (err) {
    //         res.status(500).send("Internal server error");
    //         return;
    //     }
    //     res.status(200).json({ url });
    // });
  } catch (err) {
    return handleServerError(res, err);
  }
});

router.patch("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await upload_payment_proof(
      req.body.booking_id,
      req.file.buffer,
      req.file.mimetype
    );

    const booking = await get_booking_by_id(req.body.booking_id);
    const livehouse = await get_livehouse_by_id(booking.livehouse_id);
    const artist = await get_user_by_id(booking.user_id);
    const manager = await get_user_by_id(livehouse.user_id);

    const artist_email = await sendMail(artist.email, "Payment Proof Uploaded");
    const manager_email = await sendMail(manager.email, "Need Verification");

    res.json({
      message: "Image uploaded successfully",
      imageId: result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

router.get("/get_proof/:booking_id", async (req, res) => {
  try {
    const result = await get_proof(req.params.booking_id);

    if (!result) {
      return res.status(404).json({ error: "No proof uploaded" });
    }

    // Convert Buffer if payment_proof is stored as BLOB/BINARY
    const imageBuffer = Buffer.from(result.payment_proof);

    res.setHeader("Content-Type", result.mimetype);
    res.setHeader("Cache-Control", "public, max-age=31557600");
    res.setHeader("Content-Disposition", "inline");

    res.send(imageBuffer);
  } catch (error) {
    console.error("Error getting proof:", error);
    res.status(500).json({ error: "Error getting proof" });
  }
});

router.patch("/verify/:booking_id", async (req, res) => {
  try {
    const result = await verify_reserve(req.params.booking_id);
    const booking = await get_booking_by_id(req.params.booking_id);
    const livehouse = await get_livehouse_by_id(booking.livehouse_id);
    const user = await get_user_by_id(booking.user_id);
    const event = await createEvent(
      `${user.name} perfrom in ${livehouse.name}`,
      `Come join us when ${booking.start_time} to ${booking.end_time}`,
      "Livehouse location",
      booking.start_time,
      booking.end_time
    );
    const artist_email = await sendMail(user.email, "Booking has been accepted."); // * Accept Case
    res.status(200).json({ message: "Reserve verified", event: event });
  } catch (error) {
    console.error("Error verifying reserve:", error);
    res.status(500).json({ error: "Error verifying reserve" });
  }
});

export default router;

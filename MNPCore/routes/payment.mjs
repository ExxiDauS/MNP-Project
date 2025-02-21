// redirect to payment

import { Router } from "express";
import QRCode from "qrcode";
import generatePayload from "promptpay-qr";
import bodyParser from "body-parser";
import _ from "lodash";
import cors from "cors";
import {
  get_proof,
  get_reserve_from_id,
  upload_payment_proof,
  verify_reserve,
} from "../database.mjs";
import multer from "multer";

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

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/generateQR", async (req, res) => {
  try {
    const amount = parseFloat(
      (await get_reserve_from_id(req.body.booking_id)).booking.total_price
    );
    const mobileNumber = (await get_reserve_from_id(req.body.booking_id))
      .manager.phone;
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
    res.status(500).send("Error generating QR code");
  }
});

router.patch("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await upload_payment_proof(
      req.body.booking_id,
      req.file.mimetype,
      req.file.buffer
    );

    res.json({
      message: "Image uploaded successfully",
      imageId: result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

router.get("/get_proof", async (req, res) => {
  try {
    const [result] = await get_proof(req.body.booking_id);

    if (!result) {
      return res.status(404).json({ error: "No proof uploaded" });
    }
    const image = result;
    res.setHeader("Content-Type", image.mimetype);
    // Set cache control headers
    res.setHeader("Cache-Control", "public, max-age=31557600");
    // Set content disposition to display in browser
    res.setHeader("Content-Disposition", "inline");

    res.send(image.payment_proof);
  } catch (error) {
    console.error("Error getting proof:", error);
    res.status(500).json({ error: "Error getting proof" });
  }
});

router.put("/verify", async (req, res) => {
  try {
    const [result] = await verify_reserve(req.body.booking_id);
    res.status(200).json({ message: "Reserve verified" });
  } catch (error) {
    console.error("Error verifying reserve:", error);
    res.status(500).json({ error: "Error verifying reserve" });
  }
});

export default router;

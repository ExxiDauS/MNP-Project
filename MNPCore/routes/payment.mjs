// calculate total price
// get price
// redirect to payment
// payment gen qr code
// verify payment by img
// live house manager approve payment

import { Router } from "express";
import QRCode from "qrcode";
import generatePayload from "promptpay-qr";
import bodyParser from "body-parser";
import _ from "lodash";
import cors from "cors";
import { get_reserve_from_id } from "../database.mjs";

const router = Router();

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/generateQR", async (req, res) => {
  try {
    const amount = parseFloat((await get_reserve_from_id(req.body.booking_id)).booking.total_price);
    const mobileNumber = (await get_reserve_from_id(req.body.booking_id)).manager.phone;
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

export default router;

// get data from reserve & link to calendar
// get data from calendar that have date & time, location
import { google } from "googleapis";
import dotenv from "dotenv";
import { Router } from "express";
import { version } from "os";

dotenv.config();

const router = Router();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarID = process.env.CALENDAR_ID;

const SCOPE = "https://www.googleapis.com/auth/calendar";

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPE
);

const TINEOFFSET = "+07:00";

router.post("/create-event", async (req, res) => {
  try {
    const { summary, description, location, startDateTime, endDateTime } =
      req.query;
    const calendar = google.calendar("v3");
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarID,
      requestBody: {
        summary,
        description,
        location,
        start: {
          dateTime: new Date(startDateTime),
          timeZone: TINEOFFSET,
        },
        end: {
          dateTime: new Date(endDateTime),
          timeZone: TINEOFFSET,
        },
      },
    });
    console.log(response);
    res.status(200).send("Event created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

export default router;
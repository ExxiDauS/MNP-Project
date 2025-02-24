// get data from reserve & link to calendar
// get data from calendar that have date & time, location
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

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

export async function createEvent(
  summary,
  description,
  location,
  startDateTime,
  endDateTime
) {
  try {
    const calendar = google.calendar("v3");
    await calendar.events.insert({
      auth: auth,
      calendarId: calendarID,
      requestBody: {
        summary,
        description, // time
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
    return "Event created";
  } catch (err) {
    console.error(err);
  }
}

// router.post("/create-event", async (req, res) => {
//   try {
//     const { summary, description, location, startDateTime, endDateTime } =
//       req.body;

//     console.log(response);
//     res.status(200).send("Event created");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });
// export default router;

import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: SCOPES
});

export const calendar = google.calendar({ version: "v3", auth });
export const calendarId = process.env.GOOGLE_CALENDAR_ID;

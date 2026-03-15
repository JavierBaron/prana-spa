import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Limpiar llaves pegadas con comillas, saltos de linea reales o literales en Vercel
const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
let formattedKey = rawKey;
if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    formattedKey = formattedKey.slice(1, -1);
}
formattedKey = formattedKey.replace(/\\n/g, "\n").trim();

const auth = new google.auth.JWT({
    email: (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim(),
    key: formattedKey,
    scopes: SCOPES
});

export const calendar = google.calendar({ version: "v3", auth });
export const calendarId = (process.env.GOOGLE_CALENDAR_ID || "").trim();

import { NextResponse } from "next/server";
import { calendar, calendarId } from "@/lib/googleCalendar";
import { format, startOfToday, addMinutes, isBefore, setHours, setMinutes, parse } from "date-fns";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    const duration = parseInt(searchParams.get("duration") || "60");

    if (!dateStr) {
        return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Horario de servicio: 8am-12pm y 1pm-5pm
    const SHIFTS = [
        { start: 8, end: 12 },
        { start: 13, end: 17 }
    ];

    try {
        // Añadir explicitamente offset -05:00 (Bogota/Colombia GMT-5) para evitar el drift horario del server (UTC)
        const day = new Date(`${dateStr}T00:00:00-05:00`);
        const timeMin = setHours(day, 8).toISOString();
        const timeMax = setHours(day, 17).toISOString();

        let busy: any[] = [];

        // Si hay credenciales, consultamos Google Calendar
        if (calendarId && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            const response = await calendar.freebusy.query({
                requestBody: {
                    timeMin,
                    timeMax,
                    items: [{ id: calendarId }],
                },
            });
            busy = response.data.calendars?.[calendarId]?.busy || [];
        } else {
            console.warn("Mock Mode Availability");
        }

        const availableSlots = [];

        for (const shift of SHIFTS) {
            let currentTime = setMinutes(setHours(day, shift.start), 0);
            const shiftEnd = setMinutes(setHours(day, shift.end), 0);

            while (isBefore(currentTime, shiftEnd)) {
                const slotStart = currentTime;
                const slotEnd = addMinutes(currentTime, duration);

                // Verificar si el slot entra en el turno
                if (isBefore(shiftEnd, slotEnd)) break;

                // Verificar si el slot es en el pasado (para el día de hoy)
                const now = new Date();
                if (isBefore(slotStart, now)) {
                    currentTime = addMinutes(currentTime, 30);
                    continue;
                }

                // Verificar si el slot traslapa con algún busy
                const isOverlap = busy.some((b) => {
                    const bStart = new Date(b.start!);
                    const bEnd = new Date(b.end!);
                    // Traslapo: slot inicia antes que bEnd Y slot termina después de bStart
                    return isBefore(slotStart, bEnd) && isBefore(bStart, slotEnd);
                });

                if (!isOverlap) {
                    availableSlots.push(format(slotStart, "HH:mm"));
                }

                // Avanzar en incrementos de 30 minutos para dar más flexibilidad
                currentTime = addMinutes(currentTime, 30);
            }
        }

        return NextResponse.json({ slots: availableSlots });
    } catch (error) {
        console.error("Availability Error:", error);
        return NextResponse.json({ error: "Error calculating availability" }, { status: 500 });
    }
}

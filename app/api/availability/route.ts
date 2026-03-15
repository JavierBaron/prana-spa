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
        // Trabajar con strings ISO directos conservando el offset -05:00 para evitar desajustes horarios
        const timeMin = `${dateStr}T08:00:00-05:00`;
        const timeMax = `${dateStr}T17:00:00-05:00`;
        const day = new Date(); // Usado solo para validación contra 'ahora'

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
            let currentMin = shift.start * 60; // en minutos fijos
            const endMin = shift.end * 60;

            while (currentMin < endMin) {
                const hours = Math.floor(currentMin / 60).toString().padStart(2, '0');
                const mins = (currentMin % 60).toString().padStart(2, '0');

                // Construir los Date() fijos con el offset explicito para comparación estricta de traslapos
                const slotStart = new Date(`${dateStr}T${hours}:${mins}:00-05:00`);
                const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

                // Verificar si el slot entra en el turno y no excede las 5 PM (17h -> 1020 min)
                if ((currentMin + duration) > endMin) {
                    break;
                }

                // Verificar si el slot es en el pasado calculando 'now' con zona horaria de Bogotá (-05:00)
                const utcNow = new Date();
                const bogotaDateStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                }).format(utcNow);
                const [datePart, timePart] = bogotaDateStr.split(', ');
                const [month, day, year] = datePart.split('/');
                const nowBogota = new Date(`${year}-${month}-${day}T${timePart}-05:00`);

                if (isBefore(slotStart, nowBogota)) {
                    currentMin += 30;
                    continue;
                }

                // Verificar si el slot traslapa con algún busy de Google Calendar
                const isOverlap = busy.some((b) => {
                    const bStart = new Date(b.start!);
                    const bEnd = new Date(b.end!);
                    return isBefore(slotStart, bEnd) && isBefore(bStart, slotEnd);
                });

                if (!isOverlap) {
                    availableSlots.push(`${hours}:${mins}`);
                }

                currentMin += 30;
            }
        }

        return NextResponse.json({ slots: availableSlots });
    } catch (error: any) {
        console.error("Availability Error:", error);
        return NextResponse.json({
            error: "Error calculating availability",
            details: error?.message || String(error),
            stack: error?.stack
        }, { status: 500 });
    }
}

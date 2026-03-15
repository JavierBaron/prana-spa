import { NextResponse } from "next/server";
import { calendar, calendarId } from "@/lib/googleCalendar";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, time, duration, serviceName, customer } = body;

        if (!calendarId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log("Mock Booking Mode:", { date, time, serviceName, customer });
            return NextResponse.json({
                success: true,
                message: "Reserva simulada correctamente (Faltan credenciales)",
                mode: "mock"
            });
        }

        // Fix Date generation with explicit Bogota timezone mapping to avoid server UTC drift
        const startDateStr = `${date}T${time}:00-05:00`;
        const start = new Date(startDateStr);
        const durationMins = Number(duration) || 60;
        const end = new Date(start.getTime() + durationMins * 60 * 1000);

        const event = {
            summary: `${serviceName || 'Cita'}: ${customer.name} - PRANA`,
            location: "Calle 2 #12-01 barrio Bellavista, Villanueva (Casanare)",
            description: `
        Servicio: ${serviceName}
        Duración: ${duration} min
        Cliente: ${customer.name}
        Email: ${customer.email}
        Teléfono: ${customer.phone}
        Notas: ${customer.notes || "Sin notas"}
      `,
            start: {
                dateTime: start.toISOString(),
                timeZone: "America/Bogota",
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: "America/Bogota",
            },
        };

        await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event,
        });

        return NextResponse.json({ success: true, mode: "real" });
    } catch (error: any) {
        console.error("Booking Error:", error);
        return NextResponse.json({
            success: false,
            message: "Error al crear la cita en Google Calendar",
            details: error?.message || String(error),
            stack: error?.stack
        }, { status: 500 });
    }
}

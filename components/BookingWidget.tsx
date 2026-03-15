"use client";

import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval, isBefore, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

const SERVICES = [
    { id: "faciales", name: "Tratamientos Faciales", duration: 120, icon: "✨", desc: "Limpieza, Peeling o Microneedling (2h)" },
    { id: "cejas", name: "Diseño y Laminado de Cejas", duration: 60, icon: "✒️", desc: "Diseño, laminado o sombreado (1h)" },
    { id: "lifting", name: "Lifting de Pestañas", duration: 90, icon: "👁️", desc: "Curvatura y realce natural (1.5h)" }
];

export default function BookingWidget() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
    const [step, setStep] = useState(0); // 0: Service, 1: Date, 2: Time, 3: Form, 4: Success
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const onDateClick = async (day: Date) => {
        if (isBefore(day, startOfToday()) || !selectedService) return;
        setSelectedDate(day);
        setIsLoading(true);
        setStep(2);

        try {
            const formattedDate = format(day, "yyyy-MM-dd");
            const response = await fetch(`/api/availability?date=${formattedDate}&duration=${selectedService.duration}`);
            const data = await response.json();
            setTimeSlots(data.slots || []);
        } catch (error) {
            console.error("Error fetching availability:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !selectedService) return;
        setIsLoading(true);

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: format(selectedDate, "yyyy-MM-dd"),
                    time: selectedTime,
                    duration: selectedService.duration,
                    serviceName: selectedService.name,
                    customer: formData
                })
            });

            const data = await response.json();
            if (data.success) {
                setStep(4);
            } else {
                alert("Error al agendar cita: " + (data.details || data.message || "Desconocido"));
            }
        } catch (error: any) {
            console.error("Error creating booking:", error);
            alert("Excepción al agendar: " + (error?.message || "Error desconocido"));
        } finally {
            setIsLoading(false);
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between px-4 py-6">
                <button onClick={prevMonth} className="p-2 hover:bg-prana-brown/5 rounded-full transition-colors text-prana-brown">
                    <ChevronLeft size={20} />
                </button>
                <span className="text-lg font-serif text-prana-brown capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: es })}
                </span>
                <button onClick={nextMonth} className="p-2 hover:bg-prana-brown/5 rounded-full transition-colors text-prana-brown">
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day) => (
                    <div key={day} className="text-center text-[10px] uppercase tracking-widest text-prana-brown/40 font-bold">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                    const isDisabled = !isSameMonth(day, monthStart) || isBefore(day, startOfToday());
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                        <div
                            key={i}
                            onClick={() => !isDisabled && onDateClick(day)}
                            className={`
                aspect-square flex items-center justify-center text-sm rounded-xl cursor-pointer transition-all duration-300
                ${isDisabled ? "text-prana-brown/10 cursor-not-allowed" : "text-prana-brown hover:bg-acid-green/20 hover:scale-110"}
                ${isSelected ? "bg-prana-brown text-prana-cream scale-110 shadow-lg shadow-prana-brown/20" : ""}
              `}
                        >
                            <span className="font-sans font-medium">{format(day, "d")}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl overflow-hidden transition-all duration-500 min-h-[500px] flex flex-col">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-prana-brown/5 flex">
                <div
                    className="h-full bg-prana-gold transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-6 flex flex-col">
                {step === 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-8 text-prana-brown">
                            <span className="p-2 bg-prana-gold/10 rounded-full text-prana-gold">✨</span>
                            <h3 className="font-serif text-2xl">¿Qué servicio deseas?</h3>
                        </div>
                        <div className="space-y-4 flex-1">
                            {SERVICES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => {
                                        setSelectedService(service);
                                        setStep(1);
                                    }}
                                    className="w-full text-left p-6 rounded-3xl border border-prana-brown/10 hover:border-acid-green hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-acid-green/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{service.icon}</span>
                                        <div>
                                            <h4 className="font-serif text-lg text-prana-brown leading-tight mb-1">{service.name}</h4>
                                            <p className="text-xs text-prana-brown/40 font-sans">{service.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(0)} className="text-xs text-prana-brown/60 hover:text-prana-brown flex items-center gap-2 mb-6 group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Cambiar servicio
                        </button>
                        <div className="flex items-center gap-3 mb-6 text-prana-brown">
                            <CalendarIcon size={18} className="text-prana-gold" />
                            <h3 className="font-serif text-xl">Elige una fecha</h3>
                        </div>
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}
                    </div>
                )}

                {step === 2 && selectedDate && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(1)} className="text-xs text-prana-brown/60 hover:text-prana-brown flex items-center gap-2 mb-6 group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Volver al calendario
                        </button>
                        <div className="flex items-center gap-3 mb-6 text-prana-brown">
                            <Clock size={18} className="text-prana-gold" />
                            <h3 className="font-serif text-xl">¿A qué hora te esperamos?</h3>
                        </div>
                        <p className="text-xs text-prana-brown/40 uppercase tracking-widest mb-6 font-bold">
                            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {isLoading ? (
                                <div className="col-span-2 py-20 flex flex-col items-center justify-center gap-4">
                                    <div className="w-8 h-8 border-2 border-prana-gold border-t-transparent rounded-full animate-spin" />
                                    <p className="text-xs text-prana-brown/40 uppercase tracking-widest">Buscando slots libres...</p>
                                </div>
                            ) : (
                                timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setSelectedTime(time);
                                            setStep(3);
                                        }}
                                        className="py-4 px-6 rounded-2xl border border-prana-brown/10 text-prana-brown font-sans font-bold hover:bg-acid-green hover:border-acid-green transition-all duration-300"
                                    >
                                        {time}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && selectedDate && selectedTime && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(2)} className="text-xs text-prana-brown/60 hover:text-prana-brown flex items-center gap-2 mb-6 group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Cambiar horario
                        </button>
                        <div className="flex items-center gap-3 mb-8 text-prana-brown">
                            <h3 className="font-serif text-xl">Tus datos de contacto</h3>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-4 rounded-2xl bg-prana-brown/5 border border-transparent focus:border-prana-gold/30 focus:bg-white outline-none transition-all font-sans"
                            />
                            <input
                                type="email"
                                placeholder="Email corporativo / personal"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-4 rounded-2xl bg-prana-brown/5 border border-transparent focus:border-prana-gold/30 focus:bg-white outline-none transition-all font-sans"
                            />
                            <input
                                type="tel"
                                placeholder="WhatsApp / Teléfono"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-4 rounded-2xl bg-prana-brown/5 border border-transparent focus:border-prana-gold/30 focus:bg-white outline-none transition-all font-sans"
                            />
                            <textarea
                                placeholder="¿Alguna nota especial o servicio específico?"
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-4 rounded-2xl bg-prana-brown/5 border border-transparent focus:border-prana-gold/30 focus:bg-white outline-none transition-all font-sans resize-none"
                            />
                            <button
                                onClick={handleBooking}
                                disabled={isLoading || !formData.name || !formData.phone}
                                className="w-full bg-prana-brown text-prana-cream py-5 rounded-2xl font-sans font-bold uppercase tracking-widest hover:bg-prana-gold transition-all duration-300 mt-4 shadow-xl shadow-prana-brown/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                {isLoading ? "Procesando..." : "Confirmar Reserva"}
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center justify-center text-center h-full animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-acid-green/20 rounded-full flex items-center justify-center mb-8">
                            <CheckCircle2 size={40} className="text-prana-brown" />
                        </div>
                        <h3 className="font-serif text-3xl text-prana-brown mb-4">¡Cita Solicitada!</h3>
                        <p className="text-prana-brown/60 font-sans mb-8 leading-relaxed">
                            Hemos recibido tu solicitud para: <br />
                            <span className="font-bold text-prana-brown block mb-2">{selectedService?.name}</span>
                            el <span className="font-bold text-prana-brown">
                                {format(selectedDate!, "d 'de' MMMM", { locale: es })} a las {selectedTime}
                            </span>. <br />
                            Te contactaremos vía WhatsApp para confirmar los detalles finales.
                        </p>
                        <button
                            onClick={() => {
                                setStep(1);
                                setSelectedDate(null);
                                setSelectedTime(null);
                            }}
                            className="text-prana-brown font-sans font-bold underline underline-offset-8 hover:text-prana-gold transition-colors"
                        >
                            Volver al inicio
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

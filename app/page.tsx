"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-prana-cream overflow-hidden">
      {/* Background with fluid shapes and brand logo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Serene background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Logo in background top-left - Official Brand Image */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 md:top-12 md:left-12 md:translate-x-0 w-48 h-48 md:w-72 md:h-72 opacity-60 md:opacity-40 pointer-events-none select-none mix-blend-multiply">
          <Image
            src="/logo-official.jpg"
            alt="PRANA Brand Logo"
            fill
            className="object-contain contrast-125 brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-prana-cream/20 to-prana-cream" />
      </div>

      {/* Decorative Acid Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-acid-green/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-pastel-lavender/40 blur-[100px] rounded-full" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif tracking-widest uppercase text-prana-brown hover:text-prana-gold transition-colors cursor-pointer">Prana</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.3em] text-prana-brown/80 font-bold">
          <a href="#servicios" className="hover:text-prana-brown transition-colors">Servicios</a>
          <a href="#nosotros" className="hover:text-prana-brown transition-colors">Nosotros</a>
          <a href="#contacto" className="hover:text-prana-brown transition-colors">Contacto</a>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-prana-brown text-prana-cream px-8 py-3 rounded-full hover:bg-prana-gold transition-all duration-500 shadow-xl shadow-prana-brown/10"
          >
            AGENDAR CITA
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-36 md:pt-20 pb-32 max-w-5xl mx-auto mt-12 md:mt-0">
        <span className="inline-block py-1 px-3 mb-6 rounded-full bg-acid-green/10 text-prana-brown text-xs font-sans uppercase tracking-[0.2em] border border-acid-green/20 animate-fade-in">
          BIENVENIDA AL EQUILIBRIO PERFECTO
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-prana-brown leading-[1.1] mb-8">
          Tu esencia, <br />
          <span className="italic relative">
            potenciada por la ciencia y el arte
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-acid-green/60 -skew-x-12" />
          </span>
        </h1>
        <p className="text-lg md:text-xl text-prana-brown/70 max-w-2xl mb-12 font-sans leading-relaxed">
          Resultados visibles con tecnología estética avanzada en un santuario de lujo diseñado para tu renovación total.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="group relative bg-acid-green text-prana-brown px-10 py-5 rounded-full font-sans font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 hover:pr-14 hover:shadow-[0_0_30px_rgba(217,255,0,0.4)]"
          >
            <span className="relative z-10">Agendar mi experiencia</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              →
            </span>
          </button>
          <a href="#servicios" className="bg-transparent border border-prana-brown/20 text-prana-brown px-10 py-5 rounded-full font-sans font-bold uppercase tracking-widest hover:bg-prana-brown hover:text-prana-cream transition-all duration-300 flex items-center justify-center">
            Explorar tratamientos
          </a>
        </div>
      </div>

      {/* Services Section */}
      <section id="servicios" className="relative z-10 py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif text-prana-brown mb-6">Nuestros Servicios</h2>
            <p className="text-prana-brown/60 font-sans text-lg italic">
              "En PRANA, no creemos en soluciones genéricas. Fusionamos aparatología de vanguardia con un enfoque holístico para crear protocolos que respetan la identidad de tu piel y cuerpo."
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="h-[1px] w-full md:w-32 bg-prana-brown/20 mb-4" />
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-prana-brown/40">Exclusive Care</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { img: "/service-2.jpg", alt: "Servicios PRANA 1" },
            { img: "/service-3.jpg", alt: "Servicios PRANA 2" },
            { img: "/service-4.jpg", alt: "Servicios PRANA 3" },
          ].map((service, i) => (
            <div key={i} className="flex flex-col items-center gap-6 group">
              <div 
                className="relative w-full overflow-hidden rounded-[3rem] border border-prana-brown/10 hover:border-acid-green/50 transition-all duration-700 shadow-xl hover:shadow-2xl cursor-pointer bg-white/50"
                onClick={() => setIsBookingOpen(true)}
              >
                <Image
                  src={service.img}
                  alt={service.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-prana-brown text-prana-cream px-10 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:bg-prana-gold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Agendar ahora
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-serif text-prana-brown mb-6">El Compromiso PRANA</h2>
            <p className="text-prana-brown/60 max-w-2xl mx-auto font-sans">
              Donde la tecnología avanzada se encuentra con un entorno de desconexión absoluta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {[
              { title: "Tecnología con Propósito", desc: "Equipos de última generación certificados para tu seguridad." },
              { title: "Diagnóstico Único", desc: "Protocolos 100% personalizados tras un análisis exhaustivo." },
              { title: "Alta Gama", desc: "Cosmética premium y grado médico en cada tratamiento." },
              { title: "Especialistas en Armonía", desc: "Profesionales certificados con maestría técnica." },
              { title: "Entorno de Lujo", desc: "Espacio minimalista diseñado para tu paz mental." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-prana-gold/30 flex items-center justify-center mb-6 text-prana-gold font-serif italic text-xl">
                  {i + 1}
                </div>
                <h4 className="text-lg font-serif text-prana-brown mb-4 leading-tight">{item.title}</h4>
                <p className="text-sm text-prana-brown/60 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story (Nosotros) Section */}
      <section id="nosotros" className="relative z-10 py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl w-full">
            <Image
              src="/about-us.jpg"
              alt="PRANA Sanctuary"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-prana-brown/10 mix-blend-overlay" />
          </div>
          <div className="flex-1 space-y-6 md:space-y-8 w-full">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-prana-gold font-bold">Nuestra Esencia</span>
            <h2 className="text-3xl md:text-6xl font-serif text-prana-brown leading-[1.1]">
              Creemos que la belleza es un <span className="italic">estado de ser</span>.
            </h2>
            <p className="text-lg text-prana-brown/70 font-sans leading-relaxed">
              PRANA nació de la visión de crear un espacio donde la ciencia estética de vanguardia coexiste con la serenidad más profunda. No solo transformamos tu piel; nutrimos tu equilibrio interior.
            </p>
            <p className="text-prana-brown/60 font-sans">
              Cada rincón de nuestro centro ha sido diseñado para invitar al silencio y la renovación. Nuestros expertos no solo aplican tratamientos, crean experiencias sensoriales que dejan una huella de bienestar duradera.
            </p>
            <div className="pt-8">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="text-prana-brown font-sans font-bold border-b-2 border-acid-green pb-2 hover:text-prana-gold transition-colors"
              >
                Conoce a nuestro equipo de especialistas →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-prana-brown mb-6">Lo que nuestras clientas sienten</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            { text: "Entrar en PRANA es dejar el mundo afuera. Mi piel nunca lució tan sana y radiante. Es mi cita obligatoria de autocuidado.", author: "Valeria S." },
            { text: "Buscaba resultados reales sin procesos invasivos y en PRANA encontré la tecnología y la confianza que necesitaba. El microneedling fue un antes y un después.", author: "Marta G." }
          ].map((testimonial, i) => (
            <div key={i} className="relative p-12 rounded-[3rem] bg-pastel-lavender/20 border border-white backdrop-blur-md italic">
              <span className="absolute top-8 left-8 text-6xl text-prana-gold/20 font-serif">"</span>
              <p className="relative z-10 text-prana-brown/80 font-sans text-lg mb-8 leading-relaxed">
                {testimonial.text}
              </p>
              <footer className="text-prana-brown font-serif font-bold text-sm tracking-widest uppercase">— {testimonial.author}</footer>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-8 bg-prana-cream">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-6xl font-serif text-prana-brown mb-8">¿Lista para regalarte el tiempo que mereces?</h2>
          <p className="text-lg md:text-xl text-prana-brown/60 mb-12 font-sans leading-relaxed">
            Tu transformación comienza con un primer paso hacia el bienestar. Asegura tu slot en nuestro calendario y permítenos cuidar de cada detalle.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-acid-green text-prana-brown px-12 py-6 rounded-full font-sans font-bold uppercase tracking-widest hover:shadow-[0_0_40px_rgba(217,255,0,0.3)] transition-all duration-500 hover:scale-105"
          >
            Quiero reservar mi cita
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative z-10 py-20 md:py-32 px-6 md:px-8 bg-white/50 backdrop-blur-md border-t border-prana-brown/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-10 md:space-y-12 w-full">
              <div>
                <span className="text-xs font-sans uppercase tracking-[0.3em] text-prana-gold font-bold mb-4 block">Ubicación</span>
                <h2 className="text-3xl md:text-5xl font-serif text-prana-brown mb-6">Encuentra tu centro PRANA</h2>
                <p className="text-prana-brown/60 font-sans text-lg">
                  Visítanos en un entorno diseñado para tu tranquilidad. Estamos en el corazón de la ciudad, listos para recibirte.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="group">
                  <h4 className="text-prana-brown font-serif font-bold text-lg mb-2">Visítanos</h4>
                  <p className="text-prana-brown/60 font-sans leading-relaxed">
                    Calle 2 #12-01 barrio Bellavista <br />
                    Villanueva (Casanare) <br />
                    Colombia
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-prana-brown font-serif font-bold text-lg mb-2">Habla con nosotros</h4>
                  <p className="text-prana-brown/60 font-sans leading-relaxed">
                    WhatsApp: +57 314 477 8339 <br />
                    Email: pranaesteticayspa@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calle+2+%2312-01+barrio+Bellavista+Villanueva+Casanare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-prana-brown text-prana-cream px-8 py-4 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:bg-prana-gold transition-all duration-300 inline-block text-center"
                >
                  Cómo llegar →
                </a>
                <a
                  href="https://wa.me/573144778339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-prana-brown/10 text-prana-brown px-8 py-4 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:border-prana-gold transition-all duration-300 inline-block text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square bg-prana-brown/5 rounded-[3rem] overflow-hidden border border-prana-brown/10 shadow-inner group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15893.42163456382!2d-72.9358988!3d4.6068661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15483f9828d11b%3A0xe5a3c2670e9a031e!2sVillanueva%2C%20Casanare!5e0!3m2!1ses!2sco!4v1710156000000!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.8)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-xl pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-prana-gold font-bold mb-1 block">Sanctuary Location</span>
                <p className="text-xs text-prana-brown font-sans font-bold">Calle 2 #12-01, Villanueva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-prana-brown text-prana-cream py-24 px-8 border-t border-prana-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-prana-gold">
                <Image
                  src="/logo-official.jpg"
                  alt="PRANA Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-serif tracking-widest uppercase">Prana</span>
            </div>
            <p className="text-prana-cream/50 text-sm leading-relaxed max-w-xs font-sans">
              Donde el bienestar se encuentra con la excelencia estética. Evolucionando tu belleza, cuidando tu paz.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-prana-gold uppercase tracking-[0.2em] text-xs font-bold">Contacto</h4>
            <ul className="flex flex-col gap-4 text-sm text-prana-cream/70 font-sans">
              <li className="flex items-center gap-3">
                <span className="w-5 h-[1px] bg-prana-gold/40"></span>
                📍 Calle 2 #12-01, Villanueva (C)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-[1px] bg-prana-gold/40"></span>
                📞 +57 314 477 8339
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-[1px] bg-prana-gold/40"></span>
                ✉️ pranaesteticayspa@gmail.com
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-prana-gold uppercase tracking-[0.2em] text-xs font-bold">Horarios de Armonía</h4>
            <ul className="flex flex-col gap-4 text-sm text-prana-cream/70 font-sans">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Lunes - Sábado</span>
                <div className="text-right">
                  <span className="text-prana-gold block">8:00 - 12:00</span>
                  <span className="text-prana-gold block">13:00 - 17:00</span>
                </div>
              </li>
              <li className="flex justify-between pb-2">
                <span>Domingos</span>
                <span className="text-prana-cream/30 italic">Descanso total</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-prana-cream/20">
          <span>© 2024 PRANA Estética & Spa. Todos los derechos reservados.</span>
          <div className="flex gap-12 font-bold italic">
            <a href="#" className="hover:text-acid-green transition-colors">Privacidad</a>
            <a href="#" className="hover:text-acid-green transition-colors">Términos</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-prana-brown/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md shadow-2xl"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-acid-green transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
              >
                Cerrar <X size={20} />
              </button>
              <BookingWidget />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

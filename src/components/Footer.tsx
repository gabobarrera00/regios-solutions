import { MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-brand-navy text-[#c7d3e8] py-10 border-t border-white/[0.08]">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between flex-wrap gap-6">
        <div>
          <span className="text-white font-extrabold text-lg tracking-[0.5px] leading-[1.1] flex flex-col">
            REGIOS
            <span className="text-[10px] font-semibold text-brand-green tracking-[1.5px]">
              TECH SOLUTIONS
            </span>
          </span>
          <p className="mt-2.5 text-[13px] text-brand-green font-semibold">
            Inversión inteligente, beneficios para toda la vida.
          </p>
        </div>
        <div>
          <p className="my-1 text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Guadalupe, Nuevo León, México
          </p>
          <p className="my-1 text-sm">Ing. Pablo Góngora</p>
          <p className="my-1 text-sm">
            <a
              href="https://wa.me/528112095779?text=Hola%2C%20vi%20su%20p%C3%A1gina%20en%20la%20secci%C3%B3n%20de%20contacto%20y%20quiero%20hablar%20sobre%20instalaci%C3%B3n%20de%20paneles%20solares."
              target="_blank"
              rel="noopener"
              data-umami-event="whatsapp-click"
              data-umami-event-ubicacion="footer"
              className="flex items-center gap-1.5 hover:text-brand-green"
            >
              <MessageCircle className="w-4 h-4" /> 811 209 5779
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Smartphone } from "lucide-react";

export default function Cotiza() {
  return (
    <section id="cotiza" className="py-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-7 bg-brand-navy text-white rounded-[16px] md:rounded-[20px] p-7 md:p-10">
          <Smartphone className="w-10 h-10 text-white shrink-0" />
          <div>
            <h2 className="text-left text-white mb-3 text-[28px]">
              ¡Cotización sin compromiso!
            </h2>
            <p className="text-[#c7d3e8] mb-5">
              Para recibir una propuesta personalizada, envíanos por WhatsApp una
              fotografía clara de la{" "}
              <strong className="text-white">parte trasera de tu recibo de CFE</strong>.
              Analizaremos tu consumo y te recomendaremos la mejor solución solar para
              maximizar tu ahorro.
            </p>
            <a
              href="https://wa.me/528112095779"
              target="_blank"
              rel="noopener"
              className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-transform hover:-translate-y-px bg-[#25d366] text-white hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]"
            >
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

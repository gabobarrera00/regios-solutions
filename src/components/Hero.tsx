export default function Hero() {
  return (
    <section className="hero-section bg-[linear-gradient(160deg,#0a1f44_0%,#12305e_55%,#1e6fd9_130%)] text-white pt-[88px] pb-[72px]">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <span className="inline-block bg-[rgba(47,179,68,0.18)] text-[#7de08a] border border-[rgba(47,179,68,0.4)] px-4 py-1.5 rounded-full text-[13px] font-bold mb-5">
          18 años de experiencia
        </span>
        <h1 className="text-[clamp(28px,5vw,46px)] font-extrabold max-w-[780px] mx-auto mb-[18px]">
          Energía solar para tu hogar,
          <br />
          <span className="text-brand-green">ahorra hoy, disfruta siempre.</span>
        </h1>
        <p className="max-w-[560px] mx-auto mb-8 text-[#c7d3e8] text-base">
          Venta, instalación y mantenimiento de sistemas fotovoltaicos. Soluciones
          inteligentes para un futuro sostenible.
        </p>
        <div className="flex justify-center gap-3.5 flex-wrap">
          <a
            href="#cotiza"
            className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-[transform,box-shadow] hover:-translate-y-px bg-brand-green text-on-green hover:shadow-[0_8px_20px_rgba(47,179,68,0.35)]"
          >
            Cotización sin compromiso
          </a>
          <a
            href="#servicios"
            className="inline-block px-[22px] py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-px bg-white/[0.08] border-white/[0.35] text-white"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}

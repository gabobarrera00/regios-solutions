import { Home, ClipboardList, Star, CheckCircle, HardHat, Award } from "lucide-react";

const SERVICIOS = [
  { Icon: Home, label: "Sistema llave en mano" },
  { Icon: ClipboardList, label: "Gestión CFE" },
  { Icon: Star, label: "Equipos Tier 1" },
  { Icon: CheckCircle, label: "Servicios garantizados" },
  { Icon: HardHat, label: "Instalación profesional certificada" },
  { Icon: Award, label: "Mejores marcas" },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-[72px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-center text-[28px] text-brand-navy mb-10">
          Nuestros servicios incluyen
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SERVICIOS.map(({ Icon, label }) => (
            <div
              key={label}
              className="bg-brand-bg-soft border border-brand-border rounded-[14px] py-[26px] px-[18px] text-center"
            >
              <Icon className="w-[26px] h-[26px] text-brand-navy mx-auto mb-2.5" />
              <p className="m-0 font-semibold text-brand-navy text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

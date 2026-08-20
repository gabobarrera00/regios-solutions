import { TrendingUp, Sprout, ShieldCheck } from "lucide-react";

const BENEFICIOS = [
  { Icon: TrendingUp, title: "Ahorra", text: "en tu recibo de luz" },
  { Icon: Sprout, title: "Energía", text: "limpia y renovable" },
  { Icon: ShieldCheck, title: "Sistemas", text: "con garantía y respaldo" },
];

export default function Beneficios() {
  return (
    <section className="bg-brand-green-light py-11">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {BENEFICIOS.map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon className="w-[30px] h-[30px] text-brand-green mx-auto" />
            <h3 className="text-brand-navy text-lg mt-2">{title}</h3>
            <p className="m-0 text-[#4b5b76]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

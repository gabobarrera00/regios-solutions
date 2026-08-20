const PANELES = ["JA Solar", "Jinko Solar", "Canadian Solar", "SolaBasic"];
const INVERSORES = ["SMA", "Growatt", "Solis", "Fronius", "Huawei"];

export default function Marcas() {
  return (
    <section id="marcas" className="bg-brand-bg-soft py-[72px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-center text-[28px] text-brand-navy mb-10">
          Marcas con las que trabajamos
        </h2>

        <h3 className="text-brand-navy text-[15px] uppercase tracking-[1px] mt-7 mb-3.5">
          Paneles solares
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {PANELES.map((marca) => (
            <span
              key={marca}
              className="bg-white border border-brand-border rounded-full px-[18px] py-2 font-bold text-sm text-brand-navy"
            >
              {marca}
            </span>
          ))}
        </div>

        <h3 className="text-brand-navy text-[15px] uppercase tracking-[1px] mt-7 mb-3.5">
          Inversores
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {INVERSORES.map((marca) => (
            <span
              key={marca}
              className="bg-white border border-brand-border rounded-full px-[18px] py-2 font-bold text-sm text-brand-navy"
            >
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

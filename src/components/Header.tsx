import { useState } from "react";
import { Sun, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-brand-navy border-b border-white/[0.08]">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center gap-6 h-[68px] relative">
        <a href="#top" className="flex items-center gap-2.5 mr-auto">
          <Sun className="w-[26px] h-[26px] text-brand-green" />
          <span className="text-white font-extrabold text-lg tracking-[0.5px] leading-[1.1] flex flex-col">
            REGIOS
            <span className="text-[10px] font-semibold text-brand-green tracking-[1.5px]">
              TECH SOLUTIONS
            </span>
          </span>
        </a>

        <nav
          id="nav"
          className={`${
            open
              ? "flex flex-col absolute top-[68px] left-0 right-0 bg-brand-navy px-6 py-4 gap-4 border-b border-white/[0.08]"
              : "hidden"
          } md:static md:flex md:flex-row md:gap-7 md:bg-transparent md:p-0 md:border-0`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#dbe4f5] font-semibold text-sm hover:text-brand-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/528112095779?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20informaci%C3%B3n%20sobre%20instalaci%C3%B3n%20de%20paneles%20solares."
          target="_blank"
          rel="noopener"
          className="hidden md:inline-block whitespace-nowrap bg-[#25d366] text-on-whatsapp px-[22px] py-3 rounded-full font-bold text-sm border-2 border-transparent transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]"
        >
          WhatsApp
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((o) => !o)}
          className="block md:hidden bg-transparent border-none text-white cursor-pointer"
        >
          <Menu className="w-[22px] h-[22px]" />
        </button>
      </div>
    </header>
  );
}

import {
  Scissors, Shirt, Megaphone, Tag, Monitor, Flame,
  Droplets, Ruler, ShieldCheck, Wind, Star, Check,
} from "lucide-react";

const services = [
  {
    title: "Stikere & Autocolante",
    color: "#ffa300",
    Icon: Scissors,
    items: ["Forme die-cut personalizate", "Orice dimensiune", "Rezistente la apă"],
  },
  {
    title: "Textile personalizate",
    color: "#e70050",
    Icon: Shirt,
    items: ["Tricouri, hanorace, bluze", "Print DTF & serigrafie", "De la 1 bucată"],
  },
  {
    title: "Bannere & Afișe",
    color: "#2e8b57",
    Icon: Megaphone,
    items: ["Interior & exterior", "Roll-up, mesh, canvas", "Formate mari"],
  },
  {
    title: "Etichete & Ambalaje",
    color: "#1a6fd4",
    Icon: Tag,
    items: ["Etichete produse & brand", "Ambalaje personalizate", "Tiraje mici"],
  },
  {
    title: "Print Digital",
    color: "#652f7d",
    Icon: Monitor,
    items: ["Flyere, cărți de vizită", "Broșuri & postere", "Rezoluție înaltă"],
  },
  {
    title: "Gravură Laser",
    color: "#202b38",
    Icon: Flame,
    items: ["Lemn, metal, acril", "Personalizare trofeee", "Detalii fine"],
  },
];

export function ServicesGrid() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg width="19" height="24" fill="none" viewBox="0 0 18.3439 23.6943">
              <path d="M0 0V23.6899L18.3439 23.6943L0 0Z" fill="#ffa300" />
            </svg>
            <span className="text-[18px] text-[#445e79] font-['Mulish',sans-serif]">
              Servicii complete
            </span>
          </div>
          <h2
            className="text-[#202b38] leading-tight font-['Mulish',sans-serif] font-extrabold"
            style={{ fontSize: "clamp(32px, 3.3vw, 47.5px)" }}
          >
            Tot ce producem pentru tine
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ title, color, Icon, items }) => (
            <div
              key={title}
              className="flex flex-col rounded-xl overflow-hidden border transition-all duration-200 hover:shadow-lg hover:-translate-y-[2px]"
              style={{ borderColor: `${color}30` }}
            >
              {/* Colored top band */}
              <div
                className="flex items-center gap-4 px-6 py-5"
                style={{ background: `${color}10` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={22} color={color} strokeWidth={1.8} />
                </div>
                <h3
                  className="text-[17px] font-['Mulish',sans-serif] font-extrabold leading-snug"
                  style={{ color: "#202b38" }}
                >
                  {title}
                </h3>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5 px-6 py-5 bg-white flex-1">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Check size={9} color={color} strokeWidth={3} />
                    </div>
                    <span className="text-[#445e79] text-[14px] font-['Mulish',sans-serif]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

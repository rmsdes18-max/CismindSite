import svgPaths from "./svg-6jnrd90je1";

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center tracking-[1.8px] uppercase whitespace-nowrap">
        <p className="leading-[18px]">Procesul nostru</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center justify-center left-0 right-0 top-0" data-name="Container">
      <div className="bg-[#f5a623] h-[2px] shrink-0 w-[24px]" data-name="Horizontal Divider" />
      <Container3 />
      <div className="bg-[#f5a623] h-[2px] shrink-0 w-[24px]" data-name="Horizontal Divider" />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[38px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Serif_Display:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[52px] text-center text-white tracking-[-1.04px] whitespace-nowrap">
        <p className="leading-[59.8px]">Cum funcționează</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[378px] max-w-[460px] right-[378px] top-[113.79px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[15px] text-center whitespace-nowrap">
        <p className="leading-[22.5px] mb-0">Procesul simplu în 4 pași — de la idee până la produsul finit</p>
        <p className="leading-[22.5px]">livrat la ușa ta.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[158.8px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Heading />
      <Container4 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#f5a623] content-stretch flex items-center justify-center right-[-8px] rounded-[1px] size-[24px] top-[-8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[15px]">01</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p19568f00} id="Vector" stroke="var(--stroke-0, #F5A623)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M21 21L16.7 16.7" id="Vector_2" stroke="var(--stroke-0, #F5A623)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex items-center justify-center p-px relative shrink-0 size-[64px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(245,166,35,0.25)] border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <BackgroundBorder />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.17px] w-full">
        <p className="leading-[25.5px]">Alegi produsul</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[23.8px] mb-0">Explorezi serviciile noastre și selectezi ce</p>
        <p className="leading-[23.8px]">tip de produs ai nevoie.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[9.4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#c7185b] content-stretch flex items-center justify-center right-[-8px] rounded-[1px] size-[24px] top-[-8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[15px]">02</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #C7185B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #C7185B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #C7185B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #C7185B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #C7185B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex items-center justify-center p-px relative shrink-0 size-[64px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(199,24,91,0.25)] border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <BackgroundBorder1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.17px] w-full">
        <p className="leading-[25.5px]">Completezi cererea</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[23.8px] mb-0">Completezi formularul cu detalii: cantitate,</p>
        <p className="leading-[23.8px]">dimensiune și specificații tehnice.</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[9.4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#6b2fa0] content-stretch flex items-center justify-center right-[-8px] rounded-[1px] size-[24px] top-[-8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[15px]">03</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #6B2FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M17 8L12 3L7 8" id="Vector_2" stroke="var(--stroke-0, #6B2FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 3V15" id="Vector_3" stroke="var(--stroke-0, #6B2FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex items-center justify-center p-px relative shrink-0 size-[64px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(107,47,160,0.25)] border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <BackgroundBorder2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.17px] w-full">
        <p className="leading-[25.5px]">Încarci fișierul</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[23.8px] mb-0">Trimiți fișierele de design gata pentru print</p>
        <p className="leading-[23.8px]">sau ceri ajutorul echipei noastre.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[9.4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#1a6fd4] content-stretch flex items-center justify-center right-[-8px] rounded-[1px] size-[24px] top-[-8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="leading-[15px]">04</p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p1f023100} id="Vector" stroke="var(--stroke-0, #1A6FD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, #1A6FD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex items-center justify-center p-px relative shrink-0 size-[64px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(26,111,212,0.25)] border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <BackgroundBorder3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white tracking-[-0.17px] w-full">
        <p className="leading-[25.5px]">Primești oferta</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[23.8px] mb-0">În maxim 24h primești o ofertă</p>
        <p className="leading-[23.8px]">personalizată cu preț și termen de livrare.</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[9.4px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container21 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <div className="absolute h-px left-0 right-0 top-[32px]" data-name="Horizontal Divider" style={{ backgroundImage: "linear-gradient(90deg, rgba(51, 51, 51, 0) 12.5%, rgb(51, 51, 51) 12.5%, rgb(51, 51, 51) 87.5%, rgba(51, 51, 51, 0) 87.5%)" }} />
      <Container6 />
      <Container10 />
      <Container14 />
      <Container18 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[40px] py-[16px] relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[1.12px] whitespace-nowrap">
        <p className="leading-[21px]">ÎNCEPE ACUM → CERE OFERTĂ</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[inherit] px-[32px] relative w-full">
        <Container1 />
        <Container5 />
        <Container22 />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#111] content-stretch flex flex-col items-start px-[320px] py-[100px] relative size-full" data-name="Section">
      <Container />
    </div>
  );
}
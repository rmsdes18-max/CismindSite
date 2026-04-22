import { LegalLayout } from "./LegalLayout";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-[#202b38] font-['Mulish',sans-serif] font-bold text-[20px] mb-3">{title}</h2>
      <div className="text-[#445e79] text-[15px] leading-relaxed font-['Mulish',sans-serif] flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

export function TermsAndConditions() {
  return (
    <LegalLayout title="Termeni și Condiții">
      <p className="text-[#445e79] text-[14px] mb-8 font-['Mulish',sans-serif]">
        Ultima actualizare: aprilie 2026
      </p>

      <Section title="1. Despre noi">
        <p>
          <strong>CISMIND SOLUTIONS S.R.L.</strong>, CUI RO 52496293, cu sediul în Str. Rahovei 63, Sc. B, Et. 3, Ap. 34, Sibiu, România.
          Punct de lucru: Strada Școlii de Înot 22, Sibiu. Email: comenzi@cismind.ro
        </p>
      </Section>

      <Section title="2. Serviciile oferite">
        <p>
          CISMIND oferă servicii de print digital și producție de materiale personalizate (stikere, bannere, afișe, materiale promo etc.) pentru persoane fizice și juridice din România.
        </p>
        <p>
          Site-ul funcționează ca un <strong>formular de cerere de ofertă</strong>, nu ca un magazin online. Nicio plată nu se efectuează pe site — comenzile și prețurile sunt stabilite direct prin comunicare după trimiterea cererii.
        </p>
      </Section>

      <Section title="3. Procesul de comandă">
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Completezi formularul de cerere de ofertă cu detaliile produsului dorit.</li>
          <li>Echipa CISMIND te contactează în cel mai scurt timp cu o ofertă personalizată.</li>
          <li>La confirmarea ofertei, vei primi instrucțiuni pentru finalizarea comenzii și plată.</li>
          <li>Producția începe după confirmarea plății și primirea fișierelor necesare.</li>
        </ul>
      </Section>

      <Section title="4. Fișiere și materiale">
        <p>
          Clientul este responsabil pentru calitatea și conținutul fișierelor transmise. CISMIND nu răspunde pentru erori de conținut (greșeli de tipar, imagini de calitate slabă) transmise de client.
        </p>
        <p>
          Fișierele acceptate: PDF, AI, EPS, PNG (300 DPI minim pentru print de calitate).
        </p>
      </Section>

      <Section title="5. Prețuri și plată">
        <p>
          Prețurile sunt comunicate individual, în funcție de specificațiile comenzii. Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă, cu excepția comenzilor deja confirmate.
        </p>
        <p>
          Metodele de plată disponibile vor fi comunicate la confirmarea ofertei.
        </p>
      </Section>

      <Section title="6. Livrare">
        <p>
          Termenele de livrare sunt estimate și comunicate la confirmarea comenzii. CISMIND nu răspunde pentru întârzieri cauzate de factori externi (curierat, forță majoră).
        </p>
      </Section>

      <Section title="7. Drepturi de autor">
        <p>
          Clientul garantează că deține drepturile necesare asupra materialelor transmise și că acestea nu încalcă drepturile terților. CISMIND nu răspunde pentru încălcări ale drepturilor de autor generate de conținutul furnizat de client.
        </p>
      </Section>

      <Section title="8. Limitarea răspunderii">
        <p>
          CISMIND nu răspunde pentru daune indirecte, pierderi de profit sau daune rezultate din utilizarea sau incapacitatea de a utiliza produsele livrate, altele decât cele cauzate din culpa noastră dovedită.
        </p>
      </Section>

      <Section title="9. Legea aplicabilă">
        <p>
          Prezentele condiții sunt guvernate de legislația română. Orice litigiu va fi soluționat pe cale amiabilă sau, în caz de eșec, la instanțele competente din Sibiu, România.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Pentru orice întrebări legate de termenii și condițiile noastre, ne poți contacta la{" "}
          <a href="mailto:comenzi@cismind.ro" className="text-[#ffa300] hover:underline">comenzi@cismind.ro</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}

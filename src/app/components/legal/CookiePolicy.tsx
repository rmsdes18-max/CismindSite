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

export function CookiePolicy() {
  return (
    <LegalLayout title="Politică de Cookies">
      <p className="text-[#445e79] text-[14px] mb-8 font-['Mulish',sans-serif]">
        Ultima actualizare: aprilie 2026
      </p>

      <Section title="Ce sunt cookie-urile?">
        <p>
          Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul tău atunci când vizitezi un site web. Ele ajută site-ul să funcționeze corect și să îmbunătățească experiența utilizatorului.
        </p>
      </Section>

      <Section title="Ce cookie-uri folosim">
        <p><strong>Cookie-uri strict necesare</strong> — nu necesită consimțământ:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded text-[13px]">cismind_cookie_consent</code> — stochează preferința ta privind cookie-urile (localStorage)</li>
        </ul>

        <p className="mt-2"><strong>Cookie-uri funcționale:</strong></p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded text-[13px]">cismind_site_data</code> — stochează setările vizuale ale site-ului (localStorage)</li>
        </ul>

        <p className="mt-2">
          Nu folosim cookie-uri de tracking, publicitate sau analiză terțe (Google Analytics, Facebook Pixel etc.) fără consimțământul tău explicit.
        </p>
      </Section>

      <Section title="Cum poți controla cookie-urile">
        <p>
          Poți șterge sau bloca cookie-urile din setările browser-ului tău. Rețineți că blocarea tuturor cookie-urilor poate afecta funcționalitatea site-ului.
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#ffa300] hover:underline">Chrome</a></li>
          <li><a href="https://support.mozilla.org/ro/kb/activarea-si-dezactivarea-cookie-urilor" target="_blank" rel="noopener noreferrer" className="text-[#ffa300] hover:underline">Firefox</a></li>
          <li><a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#ffa300] hover:underline">Safari</a></li>
        </ul>
      </Section>

      <Section title="Contact">
        <p>
          Pentru întrebări despre cookie-uri, scrie-ne la <a href="mailto:comenzi@cismind.ro" className="text-[#ffa300] hover:underline">comenzi@cismind.ro</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}

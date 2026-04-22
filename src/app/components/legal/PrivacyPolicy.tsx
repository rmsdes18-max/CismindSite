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

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Politică de Confidențialitate">
      <p className="text-[#445e79] text-[14px] mb-8 font-['Mulish',sans-serif]">
        Ultima actualizare: aprilie 2026
      </p>

      <Section title="1. Cine suntem">
        <p>
          <strong>CISMIND SOLUTIONS S.R.L.</strong>, CUI RO 52496293, cu sediul în Str. Rahovei 63, Sc. B, Et. 3, Ap. 34, Sibiu, România.
          Punct de lucru: Strada Școlii de Înot 22, Sibiu. Email: comenzi@cismind.ro
        </p>
        <p>
          Suntem operatorul datelor tale cu caracter personal, în sensul Regulamentului (UE) 2016/679 (GDPR).
        </p>
      </Section>

      <Section title="2. Ce date colectăm">
        <p>Prin intermediul formularului de comandă colectăm:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Nume și prenume</li>
          <li>Adresă de email</li>
          <li>Număr de telefon</li>
          <li>Detalii despre produsele solicitate</li>
        </ul>
        <p>
          Nu colectăm date sensibile (CNP, date bancare, date medicale).
        </p>
      </Section>

      <Section title="3. De ce folosim datele tale">
        <p>Datele sunt folosite exclusiv pentru:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Procesarea și răspunsul la cererea ta de ofertă</li>
          <li>Comunicarea cu tine privind comanda</li>
          <li>Respectarea obligațiilor legale</li>
        </ul>
      </Section>

      <Section title="4. Temeiul legal">
        <p>
          Prelucrarea datelor se bazează pe <strong>executarea unui contract</strong> (art. 6 alin. 1 lit. b GDPR) — adică pentru a putea răspunde cererii tale de ofertă — și pe <strong>interesul legitim</strong> (art. 6 alin. 1 lit. f GDPR) pentru comunicări legate de comandă.
        </p>
      </Section>

      <Section title="5. Cât timp păstrăm datele">
        <p>
          Datele din cererile de ofertă sunt păstrate maximum <strong>3 ani</strong> de la ultima interacțiune, după care sunt șterse sau anonimizate.
        </p>
      </Section>

      <Section title="6. Cu cine împărtășim datele">
        <p>
          Nu vindem și nu cedăm datele tale terților. Datele pot fi procesate de:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li><strong>EmailJS</strong> — serviciu de trimitere email (SUA, cu clauze contractuale standard GDPR)</li>
        </ul>
      </Section>

      <Section title="7. Drepturile tale">
        <p>Conform GDPR, ai dreptul la:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Acces la datele tale</li>
          <li>Rectificarea datelor incorecte</li>
          <li>Ștergerea datelor („dreptul de a fi uitat")</li>
          <li>Restricționarea prelucrării</li>
          <li>Portabilitatea datelor</li>
          <li>Opoziția față de prelucrare</li>
        </ul>
        <p>
          Pentru exercitarea acestor drepturi, scrie-ne la <a href="mailto:comenzi@cismind.ro" className="text-[#ffa300] hover:underline">comenzi@cismind.ro</a>.
        </p>
      </Section>

      <Section title="8. Reclamații">
        <p>
          Dacă consideri că datele tale sunt prelucrate ilegal, poți depune o plângere la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#ffa300] hover:underline">www.dataprotection.ro</a>.
        </p>
      </Section>

      <Section title="9. Cookie-uri">
        <p>
          Pentru informații despre cookie-urile folosite pe site, consultă <a href="/cookies" className="text-[#ffa300] hover:underline">Politica de Cookies</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}

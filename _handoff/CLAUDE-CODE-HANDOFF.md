# Cismind · Comenzi Tracker — Claude Code Handoff

> **Cum folosești documentul:** deschide Claude Code în rădăcina monorepo-ului CISMIND/Website și trimite-i acest fișier ca prim mesaj. Execută fazele pe rând; la finalul fiecărei faze ai un checkpoint cu ce trebuie să funcționeze înainte să treci mai departe. Nu sări peste checkpoint-uri.

---

## 0. Context

Construim un order-tracker intern pentru Cismind — print-shop în Sibiu, echipă de 3 oameni (Andrei, Mihaela, Radu). Comenzile vin pe WhatsApp, mail și telefon; aplicația le centralizează, le atribuie deadline-uri, sincronizează cu Google Sheets (sursa de adevăr) și creează foldere Drive automate per comandă.

**Design-ul e deja făcut și se află în `/comenzi/project/`** (bundle HTML/CSS/JS din Claude Design). Citește `README.md`-ul din bundle și apoi `Comenzi.html` în întregime, urmăreste toate importurile. Design-ul trebuie reprodus **fidel vizual** în React+TypeScript — nu copia structura internă a prototipului, ci replică output-ul final.

**Aplicația intră ca subproiect în monorepo-ul existent** (pnpm workspace + shadcn/ui). Nu inițializa un proiect nou separat — integrează-te în ce e deja acolo.

---

## 1. Reguli de lucru

1. **Înainte să scrii cod, inspectează repo-ul.** Citește `pnpm-workspace.yaml`, `package.json` root, `tsconfig.base.json` (dacă există), `default_shadcn_theme.css`, `guidelines/`, `apps/*/package.json` și cel puțin un `apps/*/vite.config.*` ca să înțelegi conventions. Nu presupune — confirmă.

2. **Match existing conventions.** Dacă repo-ul folosește anumite versiuni React/Vite/TypeScript, aliasuri `@/`, configurări Tailwind sau structură de foldere — urmează-le identic. Nu introduce un stil nou.

3. **Nu instala dependențe duplicate.** Dacă un package e deja în workspace root sau într-un `packages/ui`, extinde de acolo — nu-l reinstala local.

4. **Verifică fiecare checkpoint** prin rulare efectivă (build, dev server, lint, typecheck) înainte să treci la faza următoare.

5. **Cere confirmare înainte de decizii ireversibile**: ștergere fișiere, rewriting configs existente, modificări la `packages/ui`.

6. **Commituri atomice, pe faze.** Fiecare fază = 1-3 commits cu mesaje în engleză (conform conventions commit dacă există: `feat(comenzi): ...`).

---

## 2. Arhitectură — frontend-only cu Google OAuth

Nu avem backend. Aplicația rulează 100% în browser:

- **Autentificare:** Google Identity Services (GIS) — OAuth 2.0 implicit cu PKCE, scope `spreadsheets` + `drive.file`. Access token trăiește în memorie (nu în localStorage).
- **Date:** Google Sheets e sursa de adevăr. Fiecare rând = o comandă. Fetch prin Sheets API v4 (range-based read).
- **Fișiere:** Google Drive API v3 — la comandă nouă, creăm folder cu 2 subfoldere (`Input/`, `Final/`). Link shareable pentru `Input/` se generează cu permisiune `writer` + `allowFileDiscovery: false`.
- **Sync:** TanStack Query cu `refetchInterval: 30s` + invalidare la fiecare mutation. Optimistic updates pentru schimbări de status/note/versiuni.
- **Serializare complexă:** câmpurile `items`, `notes`, `versions` se stochează ca JSON stringified într-o singură celulă per câmp (Sheets e flat; nu ne batem cu multi-row per order).

**Motive pentru această arhitectură:**
- Zero cost server
- Fără chei secrete de protejat în cod
- Fiecare user vede doar ce permite Google Drive-ul lui
- Audit trail automat prin Sheets history

---

## 3. Structură de foldere țintă

```
apps/comenzi/                     # app nouă în workspace
├── public/
│   └── icon.svg
├── src/
│   ├── main.tsx                  # entry point
│   ├── App.tsx                   # shell + router
│   ├── routes/
│   │   ├── index.tsx             # redirect la /today
│   │   ├── today.tsx             # view "Azi"
│   │   ├── all.tsx               # view "Toate"
│   │   ├── week.tsx              # view "Săptămâna"
│   │   └── login.tsx             # Google OAuth gate
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx
│   │   │   ├── Greeting.tsx
│   │   │   └── ViewTabs.tsx
│   │   ├── orders/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderCardExpanded.tsx
│   │   │   ├── StatusDot.tsx
│   │   │   ├── StatusPills.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── AddProductForm.tsx
│   │   │   ├── VersionsBlock.tsx
│   │   │   ├── NotesBlock.tsx
│   │   │   └── DriveFolders.tsx
│   │   ├── views/
│   │   │   ├── TodayFeed.tsx     # grupat pe zi (azi/mâine/d-3/etc.)
│   │   │   ├── AllList.tsx       # filtrabil pe status
│   │   │   └── WeekTimeline.tsx  # cu navigare ← → și buton "azi"
│   │   └── new-order/
│   │       ├── NewOrderChat.tsx
│   │       └── chat-steps.ts     # definirea pașilor
│   ├── hooks/
│   │   ├── useOrders.ts          # TanStack Query wrapper
│   │   ├── useGoogleAuth.ts      # GIS login/logout
│   │   └── useCreateOrder.ts     # mutation: Sheets + Drive atomic
│   ├── lib/
│   │   ├── google/
│   │   │   ├── client.ts         # GIS init + token manager
│   │   │   ├── sheets.ts         # read/append/update rows
│   │   │   ├── drive.ts          # createFolder, createShareLink
│   │   │   └── schema.ts         # Sheet column map + serializers
│   │   ├── dates.ts              # port din helpers.js (dayDiff, bucketLabel, fmtRelative...)
│   │   ├── constants.ts          # STATUSES, CHANNELS, PEOPLE, working hours 9-17
│   │   └── cn.ts                 # tailwind-merge (dacă nu există deja in @/lib)
│   ├── types/
│   │   ├── order.ts              # Order, OrderItem, OrderNote, OrderVersion
│   │   └── google.ts             # AuthState, DriveFolder, etc.
│   ├── styles/
│   │   └── globals.css           # @layer base, font imports, CSS variables
│   └── env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 4. Plan pe faze

### Faza 1 — Setup proiect (nu peste 1 oră)

**Scop:** Aplicație care rulează `pnpm dev` și afișează "hello" stilizat cu fonturile și culorile corecte.

**De făcut:**
1. Citește config-urile root din monorepo și raportează ce găsești (pnpm version, react version, tsconfig paths, shadcn setup). Așteaptă confirmarea mea înainte să continui dacă găsești ceva neobișnuit.
2. Creează `apps/comenzi` cu Vite + React + TypeScript template, ajustat să match-uiască versiunile și config-urile root.
3. Adaugă `apps/comenzi` în `pnpm-workspace.yaml` dacă nu e acoperit deja de glob.
4. Configurează Tailwind identic cu site-ul principal (același preset dacă există în `packages/config` sau similar).
5. Import fonturi Fraunces + JetBrains Mono în `index.html` (preconnect + css2 link — exact ca în handoff).
6. Copiază CSS variables din `comenzi/project/styles.css` (paper/ink/accent palette) în `globals.css`, dar **transformă-le în Tailwind theme tokens** în `tailwind.config.ts` (`colors.paper`, `colors.ink`, `colors.accent` etc.) — ca să poți folosi `bg-paper text-ink` natural.
7. Pagină stub `routes/today.tsx` cu greeting-ul din design.

**Checkpoint 1:**
- [ ] `pnpm dev` din `apps/comenzi` pornește
- [ ] Pagina afișează "Bună dimineața. Azi sunt 0 comenzi..." cu fonturile + culorile corecte
- [ ] `pnpm typecheck` și `pnpm lint` trec în `apps/comenzi`
- [ ] `pnpm build` trece

---

### Faza 2 — Design system & componente prezentaționale (1-2 ore)

**Scop:** Toate componentele din design funcționează cu date mock, fără backend. Design 1:1 cu handoff-ul.

**De făcut:**
1. Copiază `comenzi/project/data.js` → portează în `src/lib/mock-data.ts` ca date de test TypeScript. Folosește tipurile din `types/order.ts`.
2. Portează `helpers.js` → `lib/dates.ts` ca funcții pure, tipate, exportate (`dayDiff`, `dayBucketLabel`, `fmtTime`, `fmtRelative`, `nextStatus`, `statusLabel`).
3. Implementează toate componentele din `components/` folosind date mock:
   - `OrderCard` + `OrderCardExpanded` (expandare inline, nu modal — ca în design)
   - `TodayFeed`, `AllList`, `WeekTimeline`
   - `NewOrderChat` cu toți pașii conversaționali
4. CSS: folosește `styles.css` din bundle ca **sursă de adevăr vizual**. Transformă în Tailwind + `@layer components` unde e mai curat. Nu scrie CSS custom pentru ce se poate face cu utilities.
5. **Respectă programul 9—17** în toate time pickers, afișare calendar, deadline defaults.
6. **Calendar săptămânal:** navigare ← → infinită (săptămâni viitoare și trecute), buton "azi" când te abați de la săptămâna curentă.
7. State management local cu `useState` — integrarea Google vine în faza 3.

**Checkpoint 2:**
- [ ] Toate cele 3 view-uri merg cu mock data
- [ ] OrderCard se expandează și afișează produse, versiuni, note, foldere, status pills
- [ ] Pot adăuga produs / versiune / notă în UI (state local)
- [ ] New Order Chat flow complet: base → produs → "mai adaugi?" → deadline → creare
- [ ] Week timeline navighează înapoi/înainte; butonul "azi" apare când offset ≠ 0
- [ ] Pixel-match cu prototipul din `comenzi/project/` (verifică vizual prin comparație)
- [ ] Zero erori în consolă, zero warning-uri TypeScript

---

### Faza 3 — Google integration (2-3 ore)

**Scop:** Aplicația citește și scrie efectiv în Google Sheets și creează foldere Drive.

**Pre-rechizite (de făcut MANUAL de mine, Mihai, înainte de asta — Claude Code îmi dă instrucțiunile exacte):**
1. Google Cloud Console → proiect nou "Cismind Comenzi"
2. Activează Google Sheets API + Google Drive API
3. Creează OAuth 2.0 Client ID (tip: Web application)
   - Authorized JavaScript origins: `http://localhost:5173`, `https://comenzi.cismind.ro`
   - Authorized redirect URIs: N/A (folosim implicit flow)
4. Creează un Google Sheet nou "Cismind Comenzi 2026" cu headers-urile exacte (lista vine de la Claude Code)
5. Creează un folder Drive root "Cismind/Comenzi/" și ia ID-ul

**De făcut de Claude Code:**
1. `lib/google/client.ts`: wrapper peste GIS (`google.accounts.oauth2.initTokenClient`) cu scope `https://www.googleapis.com/auth/spreadsheets` + `https://www.googleapis.com/auth/drive.file`. Token în memorie, refresh la expirare.
2. `lib/google/schema.ts`: definiție coloane Sheet + serializers JSON pentru `items`, `notes`, `versions`. Schema minimă:
   ```
   id | name | client | contact | channel | status | deadline
   created | items_json | notes_json | versions_json
   drive_folder_id | drive_input_id | drive_final_id | drive_upload_link
   ```
3. `lib/google/sheets.ts`:
   - `listOrders()` → `GET values/Orders!A2:N` → parse rows → `Order[]`
   - `appendOrder(order)` → `POST values/Orders!A:N:append` cu `valueInputOption: RAW`
   - `updateOrder(id, partial)` → găsește rândul după `id`, face `PUT values/Orders!A{n}:N{n}`
4. `lib/google/drive.ts`:
   - `createOrderFolder(orderName, orderId)` → creează `#{id}_{slug}` în root, apoi `Input/` și `Final/` în interior
   - `createUploadLink(folderId)` → `permissions.create` cu `role: writer`, `type: anyone`
5. `hooks/useOrders.ts`: `useQuery` cu cheia `['orders']`, refetch la 30s
6. `hooks/useCreateOrder.ts`: mutation care cheamă ATOMIC (cu rollback on error):
   - Drive.createOrderFolder
   - Drive.createUploadLink
   - Sheets.appendOrder
7. Toate mutations de update (status, notă, versiune, produs nou): optimistic update + invalidate la success
8. Environment variables în `.env.example`:
   ```
   VITE_GOOGLE_CLIENT_ID=
   VITE_SHEETS_ID=
   VITE_DRIVE_ROOT_FOLDER_ID=
   ```
9. `.env` în `.gitignore` global (verifică)

**Checkpoint 3:**
- [ ] Buton "Login cu Google" funcționează; acces token vizibil în devtools Network
- [ ] Prima încărcare: aplicația afișează comenzi reale din Sheet (poți popula manual 2-3 rânduri ca test)
- [ ] "Comandă nouă" → creează rând în Sheet + folder cu 2 subfoldere în Drive + link upload copiat în clipboard
- [ ] Schimbare status de pe UI → se reflectă în Sheet în < 2s
- [ ] Adăugare produs/versiune/notă → se reflectă în Sheet (JSON-ul corespunzător se updatează)
- [ ] Refresh pagină → starea persistă (pentru că citește din Sheet, nu din localStorage)
- [ ] Dacă API-ul Google dă eroare (ex. offline), UI-ul arată notificare politicoasă, nu crash

---

### Faza 4 — Auth guard & security (30-60 min)

**Scop:** Aplicația e accesibilă doar membrilor echipei, nu oricui cu link-ul.

**De făcut:**
1. `routes/login.tsx`: ecran de login simplu cu buton Google.
2. `AuthGuard` component: wrap pe toate rutele cu excepția `/login`. Dacă nu ești logat, redirect.
3. **Allowlist de email-uri** în `lib/constants.ts`:
   ```ts
   export const ALLOWED_EMAILS = [
     'mihai@cismind.ro',
     'andrei@cismind.ro',
     'mihaela@cismind.ro',
     'radu@cismind.ro',
   ];
   ```
   După login, extrage email-ul din ID token Google. Dacă nu e în listă → logout + mesaj "Acces restricționat".
4. Content Security Policy prin `<meta http-equiv>` în `index.html`:
   - `default-src 'self'`
   - `script-src 'self' https://accounts.google.com https://apis.google.com`
   - `connect-src 'self' https://sheets.googleapis.com https://www.googleapis.com https://oauth2.googleapis.com`
   - `font-src 'self' https://fonts.gstatic.com`
   - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
5. Token-ul de access NU se salvează în localStorage. Doar în memorie React + re-obținut la refresh via `prompt: ''` silent flow.
6. Logout button în TopBar + revocă token cu `google.accounts.oauth2.revoke`.

**Checkpoint 4:**
- [ ] Un email care nu e în allowlist nu poate intra
- [ ] Refresh browser → app cere silent re-auth (nu deranjează userul)
- [ ] Logout → întoarce la ecranul de login, token revocat la Google
- [ ] Nu există `localStorage.setItem('...token...')` nicăieri
- [ ] CSP verificat în devtools Security

---

### Faza 5 — Polish + deployment prep (1 oră)

**Scop:** Gata pentru producție.

**De făcut:**
1. **Error boundaries** pe toate view-urile; mesaje user-friendly în română.
2. **Loading states** pe toate fetch-urile inițiale (skeleton cards, nu spinner generic).
3. **Keyboard shortcuts:** `n` = new order, `t` = today view, `a` = all view, `w` = week view, `Esc` = închide card expandat sau chat.
4. **Mobile responsive** — verifică pe 375px; feed-ul e deja vertical, dar week timeline și chat modal trebuie verificate.
5. **README.md** în `apps/comenzi/` cu: ce face, cum se rulează local, variabilele de env, flow-ul OAuth, cum se adaugă un om în allowlist.
6. **Build production** cu sourcemaps dezactivate în prod, code splitting per rută.
7. **Deploy config:** vercel.json / netlify.toml / ce folosești tu deja pentru site-ul principal. Subdomeniu `comenzi.cismind.ro` pointat la build-ul din `apps/comenzi/dist`.

**Checkpoint 5:**
- [ ] `pnpm build` produce bundle < 500KB gzipped
- [ ] Lighthouse > 90 la Performance & Accessibility
- [ ] Testat pe iPhone (Safari) și Chrome desktop
- [ ] README suficient cât să onboardezi un dezvoltator nou în 15 min

---

## 5. Ce să NU faci

1. **Nu folosi service account** pentru autentificarea Google din frontend — cheile nu trebuie să atingă browserul. Doar OAuth user-based.
2. **Nu scrie access token în localStorage.** Doar în memorie React.
3. **Nu pune `VITE_GOOGLE_CLIENT_SECRET`** — nu există. Clienții web OAuth nu au secret, doar client ID.
4. **Nu commita** `.env`, `service-account.json`, `credentials.json`, nimic de genul.
5. **Nu folosi `dangerouslySetInnerHTML`** nicăieri. Inputurile de la user se pun ca text.
6. **Nu încărca** jQuery, Bootstrap, lodash full — folosește utilities moderne din ecosistem (date-fns dacă vrei, dar helpers.js-ul original e destul de lean, doar portează-l).
7. **Nu presupune structura finală a Sheet-ului** fără să-mi confirmi headers-urile. Schema migrations manuale în Sheet sunt painful.
8. **Nu-mi face UI "îmbunătățit"** peste design-ul din handoff. Dacă ai idei mai bune, listează-le la final ca propuneri, nu le implementa direct.

---

## 6. Deliverable final

La final vreau:
1. `apps/comenzi/` funcțional în monorepo
2. Un commit pe fază, cu mesaje clare
3. `README.md` în app cu instrucțiuni pentru mine
4. Un fișier `SETUP-GOOGLE.md` cu pașii pe care eu îi fac în Google Cloud Console + crearea sheet-ului + folder root Drive
5. O listă de propuneri / follow-ups (ex: notificări push, statistici lunare, import comenzi vechi) — ca TODO pentru iterații viitoare

---

## 7. Design reference

Bundle-ul de design este în `/comenzi/project/` relativ la rădăcina unde am pus acest document. Fișiere importante:

- `Comenzi.html` — entry point HTML al prototipului
- `App.jsx` — shell-ul aplicației, gestionarea de state, tweaks panel
- `OrderCard.jsx` — card-ul expandabil cu toate blocurile
- `TodayView.jsx` / `AllView.jsx` / `WeekView.jsx` — cele 3 view-uri
- `ChatNew.jsx` — flow conversațional pentru comandă nouă
- `data.js` — schema datelor (e sursa de adevăr pt. shape-ul Order-ului!)
- `helpers.js` — utilități date care trebuie portate ca atare
- `styles.css` — design tokens + toate stilurile componente

**Citește toate fișierele astea înainte să începi Faza 1.** Nu skip nimic, nu deduce.

---

**Începe prin a răspunde cu:**
1. Sumarul a ce ai înțeles din bundle (5-10 rânduri)
2. Ce ai găsit în monorepo (versiuni, conventions, aliasuri)
3. Orice ambiguități pe care le vezi și vrei să le clarifici înainte de a scrie prima linie de cod

Pe urmă îți dau go pentru Faza 1.

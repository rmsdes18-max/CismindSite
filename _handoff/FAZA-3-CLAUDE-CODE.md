# Faza 3 · Google Integration — Claude Code

> **Cum folosești:** continui sesiunea Claude Code de la Faza 2. Dă-i acest document ca mesaj nou. La final îți raportează checkpoint-urile. Timp estimat: 2-3 ore.

---

## Context

Faza 2 e completă — aplicația merge pe mock data cu toate feature-urile UI. Acum înlocuim mock data cu Google Sheets (sursa de adevăr) + Google Drive (fișiere), folosind OAuth 2.0 user-based. Zero backend.

---

## Reguli de lucru (continuare)

1. **Nu sparge ce funcționează.** Tot ce merge în Faza 2 trebuie să continue să meargă. Mock data rămâne disponibil ca fallback (pentru dezvoltare offline sau test).
2. **Feature flag pentru tranziție.** Adaugă un env var `VITE_USE_GOOGLE=true/false`. Când e `false`, aplicația folosește mock data (ca în Faza 2). Când e `true`, folosește Google. Default: `false`. Asta-mi permite să lucrez fără internet sau să testez rapid UI changes.
3. **Commit atomic pe sub-faze.** 5 sub-faze mai jos, 1-2 commits fiecare.
4. **La checkpoint intermediar, oprește-te și raportează.** Nu continua dacă o sub-fază nu e solidă.

---

## Arhitectură

```
Browser
  ├── Google Identity Services (GIS)
  │     ↳ OAuth 2.0 Implicit Flow + PKCE
  │     ↳ Token client în memorie (nu localStorage)
  │
  ├── Google Sheets API v4
  │     ↳ READ:   GET  /values/Orders!A2:N
  │     ↳ APPEND: POST /values/Orders!A:N:append
  │     ↳ UPDATE: PUT  /values/Orders!A{n}:N{n}
  │
  └── Google Drive API v3
        ↳ CREATE folder: POST /files (mimeType folder)
        ↳ SHARE folder:  POST /files/{id}/permissions
```

**Serializare câmpuri complexe în Sheet:**
- `items_json`, `notes_json`, `versions_json` stocate ca JSON string în celule unice
- Rest câmpuri: plain string/ISO date

---

## Schema Sheet (exact, cu tipuri)

| Col | Nume            | Tip                 | Ex                                           |
|-----|-----------------|---------------------|----------------------------------------------|
| A   | id              | string              | `2604`                                       |
| B   | name            | string              | `Stickere logo cafenea`                      |
| C   | client          | string              | `Alice Cafe`                                 |
| D   | contact         | string              | `+40 742 118 309`                            |
| E   | channel         | `whatsapp\|mail\|telefon` | `whatsapp`                             |
| F   | status          | `oferta\|nou\|in-lucru\|finalizat` | `in-lucru`                     |
| G   | deadline        | ISO 8601            | `2026-04-22T16:00:00.000Z`                   |
| H   | created         | ISO 8601            | `2026-04-20T09:00:00.000Z`                   |
| I   | items_json      | JSON array string   | `[{"what":"Stickere","dim":"80mm","material":"vinyl","qty":500}]` |
| J   | notes_json      | JSON array string   | `[{"at":"2026-04-20T10:15:00Z","by":"Andrei","text":"..."}]` |
| K   | versions_json   | JSON array string   | `[{"v":1,"at":"2026-04-20T12:00:00Z","note":"..."}]` |
| L   | drive_folder_id | string (Drive ID)   | `1abc...XYZ`                                 |
| M   | drive_input_id  | string (Drive ID)   | `1def...XYZ`                                 |
| N   | drive_final_id  | string (Drive ID)   | `1ghi...XYZ`                                 |

**Rânduri:** 1 = header (frozen), 2+ = date. Ordinea rândurilor = ordine cronologică de creare (nu sortare după deadline).

---

## Structură de foldere țintă

```
apps/comenzi/src/
├── lib/
│   └── google/
│       ├── client.ts          # GIS init + token manager
│       ├── sheets.ts          # SheetsService
│       ├── drive.ts           # DriveService
│       ├── schema.ts          # Row <-> Order mapping + JSON serializers
│       └── errors.ts          # GoogleApiError + retry logic
├── hooks/
│   ├── useGoogleAuth.ts       # useAuth() → { user, login, logout, isAuthenticated }
│   ├── useOrders.ts           # useQuery wrapper (existing, dar updated)
│   ├── useCreateOrder.ts      # mutation atomică Drive+Sheets
│   ├── useUpdateOrder.ts      # mutation update parțial
│   └── useOrdersMutations.ts  # addNote / addVersion / addItem / changeStatus
├── types/
│   └── google.ts              # AuthState, TokenResponse, etc.
├── components/
│   └── auth/
│       ├── LoginScreen.tsx
│       ├── AuthGuard.tsx
│       └── UserBadge.tsx      # în TopBar
└── config/
    └── env.ts                 # validare env vars la startup
```

---

## Plan pe sub-faze

### 3.1 · Environment + GIS loader (20 min)

**Goal:** Aplicația încarcă scriptul GIS și validează env vars la startup.

**De făcut:**

1. Adaugă în `apps/comenzi/.env.example`:
   ```
   VITE_USE_GOOGLE=false
   VITE_GOOGLE_CLIENT_ID=
   VITE_SHEETS_ID=
   VITE_SHEETS_TAB=Orders
   VITE_DRIVE_ROOT_FOLDER_ID=
   VITE_ALLOWED_EMAILS=
   ```

2. Creează `.env.local` (gitignored) cu valorile reale pe care le voi pune eu manual după.

3. `src/config/env.ts`:
   ```ts
   import { z } from 'zod';

   const schema = z.object({
     VITE_USE_GOOGLE: z.enum(['true', 'false']).default('false'),
     VITE_GOOGLE_CLIENT_ID: z.string().optional(),
     VITE_SHEETS_ID: z.string().optional(),
     VITE_SHEETS_TAB: z.string().default('Orders'),
     VITE_DRIVE_ROOT_FOLDER_ID: z.string().optional(),
     VITE_ALLOWED_EMAILS: z.string().optional(),
   });

   export const env = (() => {
     const parsed = schema.parse(import.meta.env);
     const useGoogle = parsed.VITE_USE_GOOGLE === 'true';
     if (useGoogle) {
       const required = ['VITE_GOOGLE_CLIENT_ID', 'VITE_SHEETS_ID', 'VITE_DRIVE_ROOT_FOLDER_ID'];
       for (const k of required) {
         if (!parsed[k as keyof typeof parsed]) throw new Error(`Missing env: ${k}`);
       }
     }
     return {
       useGoogle,
       googleClientId: parsed.VITE_GOOGLE_CLIENT_ID || '',
       sheetsId: parsed.VITE_SHEETS_ID || '',
       sheetsTab: parsed.VITE_SHEETS_TAB,
       driveRootFolderId: parsed.VITE_DRIVE_ROOT_FOLDER_ID || '',
       allowedEmails: (parsed.VITE_ALLOWED_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean),
     };
   })();
   ```

4. În `index.html`, adaugă scriptul GIS **înainte de `<script type="module" src="/src/main.tsx">`**:
   ```html
   <script src="https://accounts.google.com/gsi/client" async defer></script>
   ```

5. `src/lib/google/client.ts`:
   ```ts
   // Global GIS types
   declare global {
     interface Window {
       google?: {
         accounts: {
           oauth2: {
             initTokenClient: (config: any) => any;
             revoke: (token: string, callback: () => void) => void;
           };
         };
       };
     }
   }

   const SCOPES = [
     'https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive.file',
     'https://www.googleapis.com/auth/userinfo.email',
     'https://www.googleapis.com/auth/userinfo.profile',
   ].join(' ');

   let accessToken: string | null = null;
   let tokenExpiresAt: number = 0;
   let userEmail: string | null = null;

   export function isGisReady(): boolean {
     return typeof window !== 'undefined' && !!window.google?.accounts?.oauth2;
   }

   export async function waitForGis(timeoutMs = 5000): Promise<void> {
     const start = Date.now();
     while (!isGisReady()) {
       if (Date.now() - start > timeoutMs) throw new Error('GIS failed to load');
       await new Promise(r => setTimeout(r, 100));
     }
   }

   // Implementarea completă: login(), logout(), getToken(), refreshToken(), getUserEmail()
   // Token-ul TRĂIEȘTE ÎN MEMORIE. Nu localStorage. Nu sessionStorage.
   // Pentru re-auth la refresh: folosește `prompt: ''` ca să încerce silent flow.
   ```

**Checkpoint 3.1:**
- [ ] `pnpm dev` pornește fără erori când `VITE_USE_GOOGLE=false`
- [ ] Consolă: `window.google.accounts.oauth2` e disponibil după 1-2 sec
- [ ] Când `VITE_USE_GOOGLE=true` și lipsește un env var, app-ul aruncă eroare clară la startup cu numele variabilei lipsă

---

### 3.2 · OAuth login + AuthGuard (45 min)

**Goal:** User se loghează cu Google, emailul e verificat contra allowlist, token-ul e disponibil pentru request-uri.

**De făcut:**

1. `src/hooks/useGoogleAuth.ts` — React hook care expune:
   ```ts
   interface AuthState {
     status: 'loading' | 'unauthenticated' | 'authenticated' | 'unauthorized';
     email: string | null;
     name: string | null;
     picture: string | null;
     login: () => Promise<void>;
     logout: () => Promise<void>;
   }
   ```

2. Flow-ul `login()`:
   - Așteaptă GIS ready
   - `initTokenClient({ client_id, scope: SCOPES, callback: ... })`
   - `.requestAccessToken({ prompt: 'consent' })` la prima dată, apoi `prompt: ''` pentru silent re-auth
   - În callback: primești `access_token` + `expires_in`
   - Cu token-ul, fetch la `https://www.googleapis.com/oauth2/v3/userinfo` ca să iei email, name, picture
   - Verifică `env.allowedEmails.includes(email)` — dacă nu e în listă, setează status `unauthorized` și logout imediat

3. `src/components/auth/LoginScreen.tsx` — ecran simplu cu buton "Login cu Google". Design minimal, pe același stil Fraunces.

4. `src/components/auth/AuthGuard.tsx` — wrap pe App:
   ```tsx
   function AuthGuard({ children }: { children: ReactNode }) {
     const { status, ... } = useAuth();
     if (!env.useGoogle) return <>{children}</>; // bypass în mock mode
     if (status === 'loading') return <LoadingScreen />;
     if (status === 'unauthenticated') return <LoginScreen />;
     if (status === 'unauthorized') return <UnauthorizedScreen />;
     return <>{children}</>;
   }
   ```

5. `src/components/auth/UserBadge.tsx` în TopBar — avatar + nume + dropdown cu "Logout".

6. La refresh: `useEffect` în `useGoogleAuth` încearcă silent re-auth (`prompt: ''`). Dacă reușește → authenticated. Dacă nu → unauthenticated, user vede LoginScreen.

7. Logout: apel `window.google.accounts.oauth2.revoke(token, () => ...)` + clear state local.

**Checkpoint 3.2:**
- [ ] Cu `VITE_USE_GOOGLE=true` și email corect în allowlist: login funcționează, vezi avatar în TopBar
- [ ] Cu email NU în allowlist: vezi ecranul "Acces restricționat" + logout automat
- [ ] Refresh pagină → reloghează silent, fără prompt (dacă token încă valid)
- [ ] Logout → revine la LoginScreen, token revocat (verifică în DevTools Application → Cookies că nu rămân artefacte)
- [ ] Cu `VITE_USE_GOOGLE=false` → AuthGuard bypass, aplicația merge ca în Faza 2
- [ ] Token NU apare în localStorage sau sessionStorage (verifică manual în DevTools)

---

### 3.3 · Sheets service + listOrders (45 min)

**Goal:** Aplicația citește comenzile din Sheet și le afișează în toate view-urile.

**De făcut:**

1. `src/lib/google/schema.ts`:
   ```ts
   // Row tuple, în ordinea coloanelor A-N
   export type SheetRow = [
     id: string,
     name: string,
     client: string,
     contact: string,
     channel: string,
     status: string,
     deadline: string,
     created: string,
     items_json: string,
     notes_json: string,
     versions_json: string,
     drive_folder_id: string,
     drive_input_id: string,
     drive_final_id: string,
   ];

   export function rowToOrder(row: SheetRow): Order {
     return {
       id: row[0],
       name: row[1],
       client: row[2],
       contact: row[3],
       channel: row[4] as Channel,
       status: row[5] as Status,
       deadline: row[6],
       created: row[7],
       items: safeParseJson<OrderItem[]>(row[8], []),
       notes: safeParseJson<OrderNote[]>(row[9], []),
       versions: safeParseJson<OrderVersion[]>(row[10], []),
       drive: {
         folderId: row[11] || null,
         inputId:  row[12] || null,
         finalId:  row[13] || null,
       },
     };
   }

   export function orderToRow(order: Order): SheetRow { /* invers */ }

   function safeParseJson<T>(s: string, fallback: T): T {
     if (!s || !s.trim()) return fallback;
     try { return JSON.parse(s); } catch { return fallback; }
   }
   ```

2. `src/lib/google/sheets.ts`:
   ```ts
   const API = 'https://sheets.googleapis.com/v4/spreadsheets';

   export class SheetsService {
     constructor(private sheetsId: string, private tabName: string, private getToken: () => Promise<string>) {}

     async listOrders(): Promise<Order[]> {
       const token = await this.getToken();
       const range = `${this.tabName}!A2:N`;
       const res = await fetch(`${API}/${this.sheetsId}/values/${range}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
       if (!res.ok) throw new GoogleApiError(res.status, await res.text());
       const data = await res.json();
       const values = (data.values || []) as SheetRow[];
       return values.filter(r => r[0]).map(rowToOrder); // filter out empty rows
     }

     async appendOrder(order: Order): Promise<void> { /* ... */ }
     async updateOrder(rowIndex: number, order: Order): Promise<void> { /* ... */ }
     async findRowIndexById(id: string): Promise<number> {
       // GET Orders!A:A → find index → return (index + 2) ca să fie row number absolut
     }
   }
   ```

3. `src/hooks/useOrders.ts` — update:
   ```ts
   export function useOrders() {
     const { getToken } = useGoogleAuth();
     return useQuery({
       queryKey: ['orders'],
       queryFn: async () => {
         if (!env.useGoogle) return mockOrders;
         const svc = new SheetsService(env.sheetsId, env.sheetsTab, getToken);
         return svc.listOrders();
       },
       refetchInterval: 30_000,
       staleTime: 10_000,
     });
   }
   ```

4. Populează manual sheet-ul cu 2-3 rânduri de test (le scrii tu, Mihai, direct în Sheets — instrucțiuni mai jos).

5. Error handling: dacă token e expirat (401), trigger silent re-auth automat și retry o dată. Dacă 403 / 404, mesaj clar "Sheet nu e accesibil — verifică sharing-ul cu contul tău Google".

**Date de test pentru mine (Mihai) — să populez manual Sheet:**

Vei primi de la Claude Code un set de 2-3 rânduri de copiat direct în Sheet înainte de checkpoint. Un exemplu:

```
A2: 2604
B2: Stickere logo cafenea
C2: Alice Cafe
D2: +40 742 118 309
E2: whatsapp
F2: in-lucru
G2: 2026-04-22T16:00:00.000Z
H2: 2026-04-20T09:00:00.000Z
I2: [{"what":"Stickere rotunde vinyl","dim":"80mm","material":"vinyl mat","qty":500}]
J2: []
K2: []
L2, M2, N2: (gol)
```

**Checkpoint 3.3:**
- [ ] Cu `VITE_USE_GOOGLE=true` și rânduri de test în Sheet: refresh pagina → comenzile apar în Today view
- [ ] Network tab: vezi request la `sheets.googleapis.com` cu `Authorization: Bearer ...`
- [ ] Dacă mut manual un rând în Sheets → după 30s refetch, aplicația arată schimbarea
- [ ] `items_json` cu conținut valid se parsează corect; `items_json` gol sau invalid → items: []
- [ ] Consolă: zero erori; zero request-uri către `fonts.gstatic.com` cu 4xx (CSP nu a stricat fonturile)

---

### 3.4 · Drive service + mutation atomică comandă nouă (45 min)

**Goal:** "Comandă nouă" creează folder Drive + 2 subfoldere + link upload + rând Sheet, totul atomic.

**De făcut:**

1. `src/lib/google/drive.ts`:
   ```ts
   const API = 'https://www.googleapis.com/drive/v3';

   export class DriveService {
     constructor(private rootFolderId: string, private getToken: () => Promise<string>) {}

     async createFolder(name: string, parentId: string): Promise<string> {
       const token = await this.getToken();
       const res = await fetch(`${API}/files`, {
         method: 'POST',
         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
         body: JSON.stringify({
           name,
           mimeType: 'application/vnd.google-apps.folder',
           parents: [parentId],
         }),
       });
       if (!res.ok) throw new GoogleApiError(res.status, await res.text());
       const { id } = await res.json();
       return id;
     }

     async createOrderFolders(orderId: string, orderName: string): Promise<{
       folderId: string; inputId: string; finalId: string;
     }> {
       // 1. Slugify: "Stickere logo cafenea" → "Stickere-logo-cafenea"
       const slug = orderName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                             .replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
       const folderName = `#${orderId}_${slug}`;
       const folderId = await this.createFolder(folderName, this.rootFolderId);
       const inputId  = await this.createFolder('Input', folderId);
       const finalId  = await this.createFolder('Final', folderId);
       return { folderId, inputId, finalId };
     }

     async createUploadLink(folderId: string): Promise<string> {
       // permissions.create → role: writer, type: anyone
       // apoi webViewLink → returnezi URL-ul folderului
     }

     async rollback(folderIds: string[]): Promise<void> {
       // Best-effort delete pentru cleanup în caz de eroare parțială
     }
   }
   ```

2. `src/hooks/useCreateOrder.ts`:
   ```ts
   export function useCreateOrder() {
     const { getToken } = useGoogleAuth();
     const qc = useQueryClient();

     return useMutation({
       mutationFn: async (payload: NewOrderPayload) => {
         if (!env.useGoogle) { /* mock: adaugă în local state */ return; }

         const id = generateId(); // timestamp-based unique
         const drive = new DriveService(env.driveRootFolderId, getToken);
         const sheets = new SheetsService(env.sheetsId, env.sheetsTab, getToken);

         const createdFolders: string[] = [];
         try {
           // 1. Creează foldere Drive
           const { folderId, inputId, finalId } = await drive.createOrderFolders(id, payload.name);
           createdFolders.push(folderId);

           // 2. Generează link upload pentru Input
           // (link-ul e URL-ul folder-ului, care are deja permisiune publică după createUploadLink)

           // 3. Build Order object complet
           const order: Order = { id, ...payload, drive: { folderId, inputId, finalId }, notes: [], versions: [] };

           // 4. Append în Sheet
           await sheets.appendOrder(order);

           return order;
         } catch (err) {
           // Rollback: șterge folderele create (best-effort)
           if (createdFolders.length > 0) {
             await drive.rollback(createdFolders).catch(() => {});
           }
           throw err;
         }
       },
       onSuccess: (order) => {
         qc.invalidateQueries({ queryKey: ['orders'] });
         toast.success(`Comandă #${order.id} creată`);
       },
       onError: (err) => {
         toast.error('Eroare la creare. Încearcă din nou.');
         console.error(err);
       },
     });
   }
   ```

3. În `NewOrderChat.tsx` — la ultimul pas (după deadline), cheamă `createOrder.mutateAsync(payload)`. În timp ce rulează, arată "Creez folderele Drive..." apoi "Scriu în Sheet..." apoi "Gata".

4. Butoanele din `DriveFolders.tsx` (Input/ și Final/) — updateaza să deschidă URL-ul real al folderului:
   ```ts
   const url = `https://drive.google.com/drive/folders/${order.drive.inputId}`;
   window.open(url, '_blank', 'noopener,noreferrer');
   ```

5. Buton "Copiază link upload client" — copy în clipboard URL-ul folderului Input (care are deja permisiune shareable).

**Checkpoint 3.4:**
- [ ] Click "+ Comandă nouă" → completez chat flow → apare în Sheet imediat
- [ ] În Drive, folderul `Cismind/Comenzi/#{id}_{slug}/` există cu subfolderele Input + Final
- [ ] Click pe buton Input/ în card expanded → deschide folderul corect în tab nou
- [ ] Link upload (dat unui alt email, de test) → poate upload fișier fără să fie logat în contul meu
- [ ] Dacă simulez eroare după createFolder (ex: tai internet înainte de sheets.appendOrder), folderele se șterg (best-effort rollback, verifică log-urile)
- [ ] Comanda nouă apare în "Azi" cu status "nou" și cardul pre-deschis

---

### 3.5 · Mutations restante (30 min)

**Goal:** Schimbare status, adăugare notă/versiune/produs — toate sync-uite cu Sheet.

**De făcut:**

1. `src/hooks/useOrdersMutations.ts`:
   ```ts
   export function useChangeStatus() {
     return useMutation({
       mutationFn: async ({ id, newStatus }) => {
         // 1. findRowIndexById(id)
         // 2. Get current row → update status column → PUT row
       },
       onMutate: async ({ id, newStatus }) => {
         // Optimistic update: schimbă status local imediat
         await qc.cancelQueries(['orders']);
         const prev = qc.getQueryData(['orders']);
         qc.setQueryData(['orders'], (old) => old.map(o => o.id === id ? { ...o, status: newStatus } : o));
         return { prev };
       },
       onError: (err, vars, ctx) => {
         qc.setQueryData(['orders'], ctx.prev); // rollback
         toast.error('Nu am putut salva. Verifică conexiunea.');
       },
       onSettled: () => qc.invalidateQueries(['orders']),
     });
   }

   // Similar pentru addNote, addVersion, addItem — toate optimistic
   ```

2. În `App.tsx` / `OrderCard.tsx`, înlocuiește handlerele local state cu mutations:
   ```ts
   const changeStatus = useChangeStatus();
   // onClick → changeStatus.mutate({ id, newStatus });
   ```

3. Optimistic UI = schimbarea apare instant, fără să aștepți network. Dacă eșuează → rollback + toast.

**Checkpoint 3.5:**
- [ ] Click status dot → cardul se updatează instant în UI, după 1-2s se reflectă și în Sheet
- [ ] Adaug notă → apare în feed instant, verific în Sheet că `notes_json` s-a updatat
- [ ] Tai internet → fac o modificare → UI se updatează optimistic → toast de eroare → UI face rollback
- [ ] 2 tab-uri deschise cu aceeași aplicație: modific în tab 1 → după 30s apare în tab 2 (refetch automat)

---

## Ce să NU faci (recap + addendum)

1. **Nu stoca access token în localStorage.** Doar în memorie.
2. **Nu folosi service account** sau JSON keys. Doar OAuth user-based.
3. **Nu pune `VITE_GOOGLE_CLIENT_SECRET`** — nu există.
4. **Nu folosi drive scope full** (`.../auth/drive`). Doar `drive.file`.
5. **Nu optimistic update pentru createOrder** — creare de foldere Drive NU e reversibilă cu UX-ul pe care îl vrem. Așteaptă confirmarea.
6. **Nu face batch requests** în faza asta — cod simplu e mai ușor de debug. Optimizăm la nevoie.
7. **Nu implementa webhooks Drive / Sheets changes listener.** Polling la 30s e suficient pentru echipa de 3.
8. **Nu hardcoda ID-urile** în cod. Toate vin din env.

---

## Deliverable final

1. Toate checkpoint-urile 3.1 — 3.5 bifate
2. Un set de instrucțiuni (3-4 rânduri) de copiat manual în Sheet pentru test rapid la 3.3
3. `README.md` updatat cu:
   - Cum se rulează în mock mode (`VITE_USE_GOOGLE=false`) vs Google mode
   - Cum se adaugă un om nou în `VITE_ALLOWED_EMAILS`
   - Troubleshooting: "access_denied" → verifică Test users în Google Cloud
4. Lista de follow-ups pentru Faza 4 (deployment + polish)

---

## Începe prin:

1. Confirmă-mi că ai înțeles toate sub-fazele
2. Întreabă-mă orice neclar înainte să scrii cod (mai ales despre edge cases în rollback, sau comportament când user e offline la mijlocul unei mutations)
3. Dă-i drumul la 3.1 și raportează după fiecare sub-fază

---
name: start
description: Raport complet proiect Cismind Comenzi — status, ce s-a făcut, ce urmează
user_invocable: true
---

Când userul invocă /start, afișează acest raport:

---

# Cismind Comenzi · Raport proiect

**Data:** 22 aprilie 2026
**Repo:** github.com/rmsdes18-max/CismindSite
**Branch activ:** `feat/design-refinements` (10 commits ahead of main)
**Branch main:** checkpoint faza 3 completă + soft delete
**App path:** `apps/comenzi/` în monorepo pnpm workspace
**Stack:** React 18 + TypeScript + Vite 6 + Tailwind v4 + TanStack Query + Sonner

---

## CE S-A FĂCUT

### Faza 1 — Setup proiect ✅
- `apps/comenzi/` creat ca workspace package în monorepo
- Vite + React + TypeScript + Tailwind v4 configurat
- ESLint + typecheck funcționale
- Fonturi Fraunces + JetBrains Mono

### Faza 2 — Componente prezentaționale ✅
- 3 view-uri: Azi (feed pe zile), Toate (filtrabil), Săptămâna (calendar 7 zile)
- OrderCard expandabil cu: produse, versiuni, note, foldere Drive, status pills
- Chat conversațional pentru comandă nouă (client → contact → canal → nume → produse → deadline)
- Mock data cu 7 comenzi realiste

### Faza 3 — Google Integration ✅
- 3.1: Environment + GIS loader + feature flag `VITE_USE_GOOGLE`
- 3.2: OAuth login + AuthGuard + allowlist emailuri + UserBadge
- 3.3: Sheets service (listOrders, appendOrder, updateRow) + TanStack Query (refetch 30s)
- 3.4: Drive service (createOrderFolders, createUploadLink, rollback) + mutation atomică comandă nouă
- 3.5: Mutations cu optimistic updates (changeStatus, addNote, addVersion, addItem)
- Login persistence via sessionStorage (token + user info, fără popup la refresh)
- Soft delete cu coloana `deleted_at` + view Arhivă + undo toast 10s

### Design Refinements (branch feat/design-refinements) ✅
- **Faza A:** Brand alignment (#e70050 cismind-pink), ID format 0001, font sizes crescute
- **Faza B:** Status pills colorate cu iconuri lucide (FileText/Inbox/Loader/Check)
- **Faza C:** Card compact (fără oră deadline, versiuni dezactivate, separator accent, foldere Primit/De printat, spații reduse)
- **Faza D:** Chat flow skip pe dim/material, deadline custom cu date picker
- **Mobile responsive:** container padding, flex-wrap tabs, grid responsive card
- **Status icons:** lucide icons în loc de buline colorate, dreapta pe mobile
- **Inline editing:** click pe text → input (nume, client, contact, canal, deadline, produse)
- **Delete:** ștergere produs individual + ștergere notă
- **Card redesign:** client/deadline mutat sus-dreapta cu popover, produse cu checkbox vizual

---

## SCHEMA GOOGLE SHEET (coloane A-O)

| Col | Câmp | Tip |
|-----|------|-----|
| A | id | string (0001 format) |
| B | name | string |
| C | client | string |
| D | contact | string |
| E | channel | whatsapp/mail/telefon |
| F | status | oferta/nou/in-lucru/finalizat |
| G | deadline | ISO 8601 |
| H | created | ISO 8601 |
| I | items_json | JSON array |
| J | notes_json | JSON array |
| K | versions_json | JSON array |
| L | drive_folder_id | string |
| M | drive_input_id | string |
| N | drive_final_id | string |
| O | deleted_at | ISO 8601 sau gol |

---

## ENV VARS (apps/comenzi/.env.local)

```
VITE_USE_GOOGLE=true/false
VITE_GOOGLE_CLIENT_ID=631363245770-...
VITE_SHEETS_ID=1E4tSEmi8r63Vf6kRY6vxHj8mIMcYFvZ_SQdjrCC6sYI
VITE_SHEETS_TAB=Orders
VITE_DRIVE_ROOT_FOLDER_ID=1Pf3JJiZkit-vZwEsaDgs7Fa2YsuM6nPy
VITE_ALLOWED_EMAILS=rms.des18@gmail.com,cismindsolutions@gmail.com
```

---

## COMENZI UTILE

```bash
cd apps/comenzi
pnpm dev              # dev server pe :5174
pnpm build            # production build
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
VITE_USE_GOOGLE=false pnpm build  # build fără login (mock data)
```

---

## CE URMEAZĂ

### Imediat (săptămâna viitoare)
1. **PR review** — merge `feat/design-refinements` → `main` după review vizual
2. **Deploy producție** — Netlify/Vercel cu domeniu `comenzi.cismind.ro`
3. **Google Cloud Console** — adaugă domeniul producție în Authorized Origins
4. **Testare cu echipa** — Andrei, Mihaela, Radu (emailuri în allowlist)

### Faza 4 — Auth guard & security
- CSP headers în index.html
- Silent re-auth flow refinement
- Logout + revoke token

### Faza 5 — Polish + deployment
- Error boundaries pe view-uri (mesaje în română)
- Loading skeletons (nu spinner generic)
- Keyboard shortcuts (n=new, t=today, a=all, w=week, Esc=close)
- Mobile responsive final check (375px Safari iOS)
- README.md + SETUP-GOOGLE.md

### Follow-ups viitoare
- Notificări push (deadline approaching)
- Statistici lunare (comenzi/status/client)
- Import comenzi vechi din Sheet existent
- Căutare full-text pe comenzi
- Drag & drop reordonare produse
- Export PDF per comandă
- Integrare WhatsApp Business API (mesaje automate client)
- Versiuni de progres — reactivare UI când business-ul cere

---

## FIȘIERE CHEIE (40 surse TypeScript)

```
apps/comenzi/
├── src/
│   ├── App.tsx                          # Shell + state + routing
│   ├── main.tsx                         # Entry + QueryClient + Toaster
│   ├── config/env.ts                    # Zod validation env vars
│   ├── hooks/
│   │   ├── useGoogleAuth.ts             # OAuth + sessionStorage persistence
│   │   ├── useOrders.ts                 # TanStack Query read
│   │   ├── useCreateOrder.ts            # Mutation: Drive + Sheets atomic
│   │   ├── useDeleteOrder.ts            # Soft delete mutation
│   │   ├── useDeletedOrders.ts          # Query archived orders
│   │   └── useOrdersMutations.ts        # All CRUD mutations (8 total)
│   ├── lib/
│   │   ├── google/client.ts             # GIS + token management
│   │   ├── google/sheets.ts             # SheetsService (CRUD)
│   │   ├── google/drive.ts              # DriveService (folders + permissions)
│   │   ├── google/schema.ts             # Row ↔ Order mapping
│   │   ├── google/errors.ts             # GoogleApiError
│   │   ├── constants.ts                 # STATUSES, CHANNELS, PEOPLE
│   │   ├── dates.ts                     # dayDiff, fmtRelative, etc.
│   │   ├── format.ts                    # formatPhone
│   │   └── mock-data.ts                 # 7 comenzi mock
│   ├── components/
│   │   ├── orders/OrderCard.tsx          # Card principal (collapsed + expanded)
│   │   ├── orders/ProductList.tsx        # Produse cu checkbox + edit + delete
│   │   ├── orders/NotesBlock.tsx         # Note cu add + delete
│   │   ├── orders/StatusDot.tsx          # Icon status lucide
│   │   ├── orders/StatusPills.tsx        # Pills colorate cu iconuri
│   │   ├── orders/EditableField.tsx      # Click-to-edit component
│   │   ├── orders/DriveFolders.tsx       # Butoane Primit/De printat
│   │   ├── orders/AddProductForm.tsx     # Form adăugare produs
│   │   ├── orders/DeleteConfirm.tsx      # Dialog confirmare ștergere
│   │   ├── views/TodayFeed.tsx           # View Azi (bucket-uri)
│   │   ├── views/AllList.tsx             # View Toate (filtre status)
│   │   ├── views/WeekTimeline.tsx        # View Săptămâna (calendar)
│   │   ├── views/ArchiveList.tsx         # View Arhivă (soft deleted)
│   │   ├── new-order/NewOrderChat.tsx    # Chat conversațional
│   │   ├── auth/AuthGuard.tsx            # Login gate
│   │   ├── auth/LoginScreen.tsx          # Ecran login
│   │   └── auth/UserBadge.tsx            # Avatar + dropdown
│   └── styles/globals.css                # Tailwind v4 + design tokens
```

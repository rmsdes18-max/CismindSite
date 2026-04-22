// ---------- helpers ----------
const TODAY = new Date(2026, 3, 22, 9, 30); // Marți, 22 aprilie 2026, 09:30
const DAYS_RO = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
const DAYS_RO_SHORT = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm'];
const MONTHS_RO = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];

function startOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function dayDiff(a, b) {
  return Math.round((startOfDay(a) - startOfDay(b)) / 86400000);
}
function fmtTime(iso) {
  const d = new Date(iso);
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}
function dayBucketLabel(iso) {
  const diff = dayDiff(new Date(iso), TODAY);
  if (diff < 0)  return { key: 'intarziat', label: 'Întârziat', meta: 'deadline trecut' };
  if (diff === 0) return { key: 'azi',  label: 'Azi',  meta: DAYS_RO[TODAY.getDay()] + ', ' + TODAY.getDate() + ' ' + MONTHS_RO[TODAY.getMonth()] };
  if (diff === 1) return { key: 'maine', label: 'Mâine', meta: DAYS_RO[(TODAY.getDay()+1)%7] };
  if (diff <= 6)  {
    const d = new Date(iso);
    return { key: 'd-' + diff, label: DAYS_RO[d.getDay()].charAt(0).toUpperCase()+DAYS_RO[d.getDay()].slice(1), meta: 'în ' + diff + ' zile' };
  }
  if (diff <= 13) return { key: 'saptviit', label: 'Săptămâna viitoare', meta: 'în ' + diff + ' zile' };
  return { key: 'later', label: 'Mai târziu', meta: 'în ' + diff + ' zile' };
}

function statusLabel(id) { return window.STATUSES.find(s => s.id === id).label; }
function nextStatus(id) {
  const idx = window.STATUSES.findIndex(s => s.id === id);
  return window.STATUSES[(idx + 1) % window.STATUSES.length].id;
}
function fmtDateShort(iso) {
  const d = new Date(iso);
  return d.getDate() + ' ' + MONTHS_RO[d.getMonth()].slice(0,3);
}
function fmtRelative(iso) {
  const d = new Date(iso);
  const diff = dayDiff(d, TODAY);
  if (diff === 0) return 'azi · ' + fmtTime(iso);
  if (diff === -1) return 'ieri · ' + fmtTime(iso);
  if (diff === 1) return 'mâine · ' + fmtTime(iso);
  if (diff < 0 && diff > -7) return 'acum ' + (-diff) + ' zile';
  return fmtDateShort(iso);
}

window.H = { TODAY, DAYS_RO, DAYS_RO_SHORT, MONTHS_RO, dayDiff, startOfDay, fmtTime, dayBucketLabel, statusLabel, nextStatus, fmtDateShort, fmtRelative };

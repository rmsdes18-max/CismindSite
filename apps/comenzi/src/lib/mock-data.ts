import type { Order } from '@/types/order'

const daysFromNow = (offset: number, h = 17, m = 0): string => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  d.setHours(h, m, 0, 0)
  return d.toISOString()
}

const noDrive = { folderId: null, inputId: null, finalId: null }

export const MOCK_ORDERS: Order[] = [
  {
    id: '2604',
    name: 'Stickere logo cafenea',
    client: 'Alice Cafe',
    contact: '+40 742 118 309',
    channel: 'whatsapp',
    status: 'in-lucru',
    deadline: daysFromNow(0, 16, 0),
    created: daysFromNow(-2),
    items: [
      { what: 'Stickere rotunde vinyl', dim: 'Ø 80 mm', material: 'vinyl mat', qty: 500 },
      { what: 'Stickere transparente logo mic', dim: '30 × 30 mm', material: 'PP transparent', qty: 200 },
    ],
    notes: [
      { at: daysFromNow(-2, 10, 15), by: 'Andrei', text: 'Primit fișier în AI, convertit la CMYK.' },
      { at: daysFromNow(-1, 14, 30), by: 'Mihaela', text: 'Client a cerut să fie tăiate individual, nu pe coală.' },
    ],
    versions: [
      { v: 1, at: daysFromNow(-2, 12, 0), note: 'primul proof trimis spre aprobare' },
      { v: 2, at: daysFromNow(-1, 11, 20), note: 'ajustat grosimea conturului alb' },
      { v: 3, at: daysFromNow(0, 9, 40), note: 'final, gata de print' },
    ],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2605',
    name: 'Banner meserie fațadă',
    client: 'Croitorie Doina',
    contact: 'doina.popescu@gmail.com',
    channel: 'mail',
    status: 'in-lucru',
    deadline: daysFromNow(0, 18, 0),
    created: daysFromNow(-3),
    items: [
      { what: 'Banner mesh', dim: '3000 × 1000 mm', material: 'mesh 340g', qty: 1 },
    ],
    notes: [
      { at: daysFromNow(-3, 9, 0), by: 'Radu', text: 'Montaj la client mâine dimineață.' },
      { at: daysFromNow(-1, 16, 10), by: 'Radu', text: 'Finisaj cu ocheți la 50cm, confirmat telefonic.' },
    ],
    versions: [
      { v: 1, at: daysFromNow(-2, 10, 0), note: 'machetă inițială' },
      { v: 2, at: daysFromNow(-1, 15, 0), note: 'mărit font nume, contrast pe alb' },
    ],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2606',
    name: 'Tricouri DTF echipă fotbal',
    client: 'AS Viitorul Șelimbăr',
    contact: '+40 755 402 117',
    channel: 'telefon',
    status: 'nou',
    deadline: daysFromNow(0, 20, 0),
    created: daysFromNow(-1),
    items: [
      { what: 'Tricouri DTF față+spate', dim: 'S–XXL', material: 'bumbac 180g galben', qty: 18 },
      { what: 'Șorturi DTF', dim: 'S–XXL', material: 'poliester', qty: 18 },
      { what: 'Stickere autocolante echipă', dim: '100 × 100 mm', material: 'vinyl', qty: 50 },
    ],
    notes: [
      { at: daysFromNow(-1, 11, 0), by: 'Andrei', text: 'Lista cu numere și mărimi în Input/.' },
    ],
    versions: [],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2607',
    name: 'Canvas portret nuntă',
    client: 'Familia Ardelean',
    contact: '+40 721 905 430',
    channel: 'whatsapp',
    status: 'nou',
    deadline: daysFromNow(1, 12, 0),
    created: daysFromNow(-1),
    items: [
      { what: 'Canvas print pe șasiu', dim: '600 × 900 mm', material: 'canvas 380g mat', qty: 1 },
    ],
    notes: [],
    versions: [
      { v: 1, at: daysFromNow(0, 8, 30), note: 'retuș foto, așteptăm aprobare' },
    ],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2608',
    name: 'Gravură laser plăcuțe cadou',
    client: 'Bogdan (persoană fizică)',
    contact: '+40 733 221 084',
    channel: 'whatsapp',
    status: 'oferta',
    deadline: daysFromNow(2, 17, 0),
    created: daysFromNow(0, 9, 20),
    items: [
      { what: 'Plăcuțe lemn gravate', dim: '100 × 60 mm', material: 'MDF 5mm', qty: 12 },
    ],
    notes: [
      { at: daysFromNow(0, 9, 40), by: 'Mihaela', text: 'I-am trimis ofertă azi la 09:40. Așteaptă confirmare preț.' },
    ],
    versions: [],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2609',
    name: 'Roll-up + flyere prezentare produs',
    client: 'Medilab SRL',
    contact: 'alexandru.cretu@medilab.ro',
    channel: 'mail',
    status: 'nou',
    deadline: daysFromNow(3, 15, 0),
    created: daysFromNow(0, 8, 10),
    items: [
      { what: 'Roll-up economic 85×200', dim: '850 × 2000 mm', material: 'blueback 150g', qty: 2 },
      { what: 'Flyere A5 față-verso', dim: '148 × 210 mm', material: 'hârtie lucioasă 170g', qty: 1000 },
    ],
    notes: [
      { at: daysFromNow(0, 8, 15), by: 'Andrei', text: 'Livrare pe adresa lor din Bulevardul Victoriei.' },
    ],
    versions: [
      { v: 1, at: daysFromNow(0, 10, 0), note: 'layout inițial, așteptăm feedback' },
    ],
    drive: noDrive,
    deletedAt: '',
  },
  {
    id: '2610',
    name: 'Stickere transparente sticle miere',
    client: 'Apicola Mărgineanu',
    contact: '+40 744 028 991',
    channel: 'telefon',
    status: 'oferta',
    deadline: daysFromNow(5, 17, 0),
    created: daysFromNow(0, 11, 0),
    items: [
      { what: 'Etichete transparente', dim: '60 × 90 mm', material: 'PP transparent', qty: 800 },
    ],
    notes: [
      { at: daysFromNow(0, 11, 5), by: 'Radu', text: 'De clarificat dacă vor tăiere conturată sau dreptunghi.' },
    ],
    versions: [],
    drive: noDrive,
    deletedAt: '',
  },
]

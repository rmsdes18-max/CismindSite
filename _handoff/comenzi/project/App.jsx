// ---------- App root ----------
const { useState: useStateApp, useMemo: useMemoApp } = React;

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "accent": "brick",
  "showFinalized": true
}/*EDITMODE-END*/;

const CURRENT_USER = 'Andrei'; // autorul notelor adăugate live

function App() {
  const [orders, setOrders] = useStateApp(window.ORDERS);
  const [view, setView] = useStateApp(() => localStorage.getItem('cismind.view') || 'today');
  const [openId, setOpenId] = useStateApp(null);
  const [chatOpen, setChatOpen] = useStateApp(false);
  const [tweaks, setTweaks] = useStateApp(DEFAULT_TWEAKS);
  const [tweaksVisible, setTweaksVisible] = useStateApp(false);

  React.useEffect(() => { localStorage.setItem('cismind.view', view); }, [view]);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const accents = {
      brick: '#C14A28',
      forest: '#2E6F5E',
      ink: '#1F1B16',
      ochre: '#B88614',
    };
    root.style.setProperty('--accent', accents[tweaks.accent] || accents.brick);
    document.body.dataset.density = tweaks.density;
  }, [tweaks]);

  const handleChangeStatus = (id, newStatus) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleAddNote = (id, text) => {
    const now = new Date().toISOString();
    setOrders(os => os.map(o => o.id === id
      ? { ...o, notes: [...o.notes, { at: now, by: CURRENT_USER, text }] }
      : o));
  };

  const handleAddVersion = (id, note) => {
    const now = new Date().toISOString();
    setOrders(os => os.map(o => {
      if (o.id !== id) return o;
      const nextV = (o.versions[o.versions.length - 1]?.v || 0) + 1;
      return { ...o, versions: [...o.versions, { v: nextV, at: now, note }] };
    }));
  };

  const handleAddItem = (id, item) => {
    setOrders(os => os.map(o => o.id === id
      ? { ...o, items: [...o.items, item] }
      : o));
  };

  const handleNewOrder = (payload) => {
    const dlOffset = { today: 0, tomorrow: 1, d3: 3, d7: 7 }[payload.deadline] ?? 1;
    const dl = new Date(H.TODAY); dl.setDate(dl.getDate() + dlOffset); dl.setHours(17,0,0,0);
    const newId = String(2611 + orders.length - 7);
    const items = (payload.products && payload.products.length > 0)
      ? payload.products.map(p => ({
          what: p.what || 'Produs',
          dim: p.dim || '—',
          material: p.material || '—',
          qty: parseInt(p.qty) || 1,
        }))
      : [{ what: 'Produs', dim: '—', material: '—', qty: 1 }];
    const newOrder = {
      id: newId,
      name: payload.name || 'Comandă nouă',
      client: payload.client || '—',
      contact: payload.contact || '—',
      channel: payload.channel || 'whatsapp',
      status: 'nou',
      deadline: dl.toISOString(),
      created: new Date().toISOString(),
      items,
      notes: [],
      versions: [],
      files: { input: 0, final: 0 },
    };
    setOrders(os => [newOrder, ...os]);
    setChatOpen(false);
    setView('today');
    setOpenId(newId);
  };

  const visibleOrders = useMemoApp(() => {
    if (!tweaks.showFinalized) return orders.filter(o => o.status !== 'finalizat');
    return orders;
  }, [orders, tweaks.showFinalized]);

  const stats = useMemoApp(() => {
    const today = orders.filter(o => H.dayDiff(new Date(o.deadline), H.TODAY) === 0 && o.status !== 'finalizat').length;
    const tomorrow = orders.filter(o => H.dayDiff(new Date(o.deadline), H.TODAY) === 1 && o.status !== 'finalizat').length;
    return { today, tomorrow };
  }, [orders]);

  const hh = H.TODAY.getHours();
  const salut = hh < 11 ? 'Bună dimineața' : hh < 18 ? 'Bună ziua' : 'Bună seara';

  const cardProps = {
    onChangeStatus: handleChangeStatus,
    onAddNote: handleAddNote,
    onAddVersion: handleAddVersion,
    onAddItem: handleAddItem,
    openId,
    setOpenId,
  };

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">Cismind<em>.</em></div>
        <div className="date">
          {H.DAYS_RO[H.TODAY.getDay()]}, {H.TODAY.getDate()} {H.MONTHS_RO[H.TODAY.getMonth()]}
        </div>
      </div>

      <h1 className="greeting">
        {salut}. Azi sunt <span className="num">{stats.today}</span> {stats.today === 1 ? 'comandă' : 'comenzi'}, mâine <span className="num">{stats.tomorrow}</span>.
      </h1>
      <div className="greeting-sub">
        sync google sheets · acum 2 min
      </div>

      <div className="views">
        <button className={'view-tab' + (view === 'today' ? ' active' : '')} onClick={() => setView('today')}>Azi</button>
        <button className={'view-tab' + (view === 'all' ? ' active' : '')} onClick={() => setView('all')}>Toate</button>
        <button className={'view-tab' + (view === 'week' ? ' active' : '')} onClick={() => setView('week')}>Săptămâna</button>
        <span className="spacer"></span>
        <button className="new-btn" onClick={() => setChatOpen(true)}>
          <span className="plus">+</span> Comandă nouă
        </button>
      </div>

      {view === 'today' && <TodayView orders={visibleOrders} {...cardProps} />}
      {view === 'all'   && <AllView   orders={visibleOrders} {...cardProps} />}
      {view === 'week'  && <WeekView  orders={visibleOrders} setOpenId={setOpenId} setView={setView} />}

      {chatOpen && <ChatNew onDone={handleNewOrder} onCancel={() => setChatOpen(false)} />}

      {tweaksVisible && (
        <div className="tweaks">
          <button className="tweaks-close" onClick={() => setTweaksVisible(false)}>✕</button>
          <h4>Tweaks</h4>

          <span className="label">Accent</span>
          <div className="row">
            {['brick','forest','ink','ochre'].map(a => (
              <button
                key={a}
                className={tweaks.accent === a ? 'active' : ''}
                onClick={() => {
                  const next = { ...tweaks, accent: a };
                  setTweaks(next);
                  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accent: a } }, '*');
                }}
              >{a}</button>
            ))}
          </div>

          <span className="label">Densitate</span>
          <div className="row">
            {['compact','comfortable'].map(d => (
              <button
                key={d}
                className={tweaks.density === d ? 'active' : ''}
                onClick={() => {
                  const next = { ...tweaks, density: d };
                  setTweaks(next);
                  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { density: d } }, '*');
                }}
              >{d}</button>
            ))}
          </div>

          <span className="label">Finalizate</span>
          <div className="row">
            <button
              className={tweaks.showFinalized ? 'active' : ''}
              onClick={() => {
                const next = { ...tweaks, showFinalized: !tweaks.showFinalized };
                setTweaks(next);
                window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { showFinalized: next.showFinalized } }, '*');
              }}
            >{tweaks.showFinalized ? 'vizibile' : 'ascunse'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

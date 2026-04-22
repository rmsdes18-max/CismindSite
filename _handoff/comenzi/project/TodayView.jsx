// ---------- View: Azi (feed pe zile) ----------
const { useMemo: useMemoAzi } = React;

function TodayView({ orders, openId, setOpenId, onChangeStatus, onAddNote, onAddVersion, onAddItem }) {
  const buckets = useMemoAzi(() => {
    const sorted = [...orders]
      .filter(o => o.status !== 'finalizat')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const groups = {};
    const order = [];
    sorted.forEach(o => {
      const b = H.dayBucketLabel(o.deadline);
      if (!groups[b.key]) { groups[b.key] = { ...b, items: [] }; order.push(b.key); }
      groups[b.key].items.push(o);
    });
    return order.map(k => groups[k]);
  }, [orders]);

  const done = useMemoAzi(() => orders.filter(o => o.status === 'finalizat'), [orders]);

  const cp = { onChangeStatus, onAddNote, onAddVersion, onAddItem };

  if (buckets.length === 0 && done.length === 0) {
    return <div className="empty">Nimic de făcut. Bea o cafea.</div>;
  }

  return (
    <div>
      {buckets.map(bucket => (
        <div key={bucket.key} className="day-group">
          <div className={'day-header' + (bucket.key === 'azi' ? ' today' : '')}>
            <div className="day-label">{bucket.label}</div>
            <div className="day-meta">{bucket.meta} · {bucket.items.length}</div>
          </div>
          {bucket.items.map(o => (
            <OrderCard
              key={o.id}
              order={o}
              isOpen={openId === o.id}
              onToggle={(id) => setOpenId(openId === id ? null : id)}
              {...cp}
            />
          ))}
        </div>
      ))}

      {done.length > 0 && (
        <div className="day-group">
          <div className="day-header">
            <div className="day-label" style={{ color: 'var(--ink-faded)', fontStyle: 'normal', fontSize: 15 }}>
              Finalizate recent
            </div>
            <div className="day-meta">{done.length}</div>
          </div>
          {done.map(o => (
            <OrderCard
              key={o.id}
              order={o}
              isOpen={openId === o.id}
              onToggle={(id) => setOpenId(openId === id ? null : id)}
              {...cp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

window.TodayView = TodayView;

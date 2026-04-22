// ---------- View: Toate (listă filtrabilă) ----------
const { useState: useStateAll, useMemo: useMemoAll } = React;

function AllView({ orders, openId, setOpenId, onChangeStatus, onAddNote, onAddVersion, onAddItem }) {
  const [filter, setFilter] = useStateAll('all');

  const counts = useMemoAll(() => {
    const c = { all: orders.length };
    window.STATUSES.forEach(s => { c[s.id] = orders.filter(o => o.status === s.id).length; });
    return c;
  }, [orders]);

  const filtered = useMemoAll(() => {
    const f = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    return [...f].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }, [orders, filter]);

  const cp = { onChangeStatus, onAddNote, onAddVersion, onAddItem };

  return (
    <div>
      <div className="filter-row">
        <button className={'filter-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>
          Toate <span className="n">{counts.all}</span>
        </button>
        {window.STATUSES.map(s => (
          <button
            key={s.id}
            className={'filter-btn' + (filter === s.id ? ' active' : '')}
            onClick={() => setFilter(s.id)}
          >
            {s.label} <span className="n">{counts[s.id]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty">— gol —</div>}

      {filtered.map(o => (
        <OrderCard
          key={o.id}
          order={o}
          isOpen={openId === o.id}
          onToggle={(id) => setOpenId(openId === id ? null : id)}
          {...cp}
        />
      ))}
    </div>
  );
}

window.AllView = AllView;

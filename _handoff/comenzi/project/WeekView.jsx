// ---------- View: Săptămâna (timeline orizontal 7 zile, cu navigare) ----------
const { useState: useStateWeek } = React;

function WeekView({ orders, setOpenId, setView }) {
  const [offset, setOffset] = useStateWeek(0); // săptămâni față de cea curentă

  const base = new Date(H.TODAY);
  base.setDate(base.getDate() + offset * 7);
  const dow = base.getDay();
  const diffToMonday = (dow === 0 ? -6 : 1 - dow);
  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);
  monday.setHours(0,0,0,0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    return d;
  });

  const ordersByDay = days.map(day => {
    return orders
      .filter(o => {
        const od = new Date(o.deadline);
        return od.getFullYear() === day.getFullYear() &&
               od.getMonth() === day.getMonth() &&
               od.getDate() === day.getDate();
      })
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  });

  const handleClick = (orderId) => {
    setOpenId(orderId);
    setView('today');
  };

  const weekLabel = days[0].getDate() + ' ' + H.MONTHS_RO[days[0].getMonth()].slice(0,3) +
                    ' – ' +
                    days[6].getDate() + ' ' + H.MONTHS_RO[days[6].getMonth()].slice(0,3);

  const totalWeek = orders.filter(o => {
    const od = new Date(o.deadline);
    return od >= days[0] && od < new Date(days[6].getTime() + 86400000);
  }).length;

  const weekOffsetLabel =
    offset === 0 ? 'săptămâna curentă' :
    offset === -1 ? 'săptămâna trecută' :
    offset === 1 ? 'săptămâna viitoare' :
    offset < 0 ? 'acum ' + (-offset) + ' săptămâni' :
    'peste ' + offset + ' săptămâni';

  return (
    <div>
      <div className="week-nav">
        <button className="week-nav-btn" onClick={() => setOffset(offset - 1)} title="săptămâna precedentă">←</button>
        <div className="week-nav-main">
          <div className="week-nav-range">{weekLabel}</div>
          <div className="week-nav-sub">{weekOffsetLabel} · {totalWeek} {totalWeek === 1 ? 'comandă' : 'comenzi'}</div>
        </div>
        <button className="week-nav-btn" onClick={() => setOffset(offset + 1)} title="săptămâna următoare">→</button>
        {offset !== 0 && (
          <button className="week-nav-today" onClick={() => setOffset(0)}>azi</button>
        )}
      </div>

      <div className="week">
        {days.map((day, i) => {
          const isToday = H.dayDiff(day, H.TODAY) === 0;
          const d_dow = day.getDay();
          const isWeekend = d_dow === 0 || d_dow === 6;
          const items = ordersByDay[i];
          return (
            <div key={i} className={'week-col' + (isToday ? ' today' : '') + (isWeekend ? ' weekend' : '')}>
              <div className="d-head">{H.DAYS_RO_SHORT[d_dow]}</div>
              <div className="d-num">{day.getDate()}</div>
              {items.map(o => (
                <div key={o.id} className={'week-item s-' + o.status} onClick={() => handleClick(o.id)}>
                  <span className="t"><span className="dot"></span>{H.fmtTime(o.deadline)}</span>
                  {o.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-faded)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Click pe o comandă → deschide în "Azi"
      </div>
    </div>
  );
}

window.WeekView = WeekView;

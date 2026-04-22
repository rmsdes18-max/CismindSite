// ---------- OrderCard ----------
const { useState: useStateCard } = React;

function OrderCard({ order, onChangeStatus, onAddNote, onAddVersion, onAddItem, isOpen, onToggle, showDeadline = true }) {
  const diff = H.dayDiff(new Date(order.deadline), H.TODAY);
  const isUrgent = diff <= 0 && order.status !== 'finalizat';
  const isDone = order.status === 'finalizat';

  const [noteText, setNoteText] = useStateCard('');
  const [versionText, setVersionText] = useStateCard('');
  const [addingItem, setAddingItem] = useStateCard(false);
  const [newItem, setNewItem] = useStateCard({ what: '', dim: '', material: '', qty: '' });

  const totalQty = order.items.reduce((s, it) => s + (parseInt(it.qty) || 0), 0);
  const itemSummary = order.items.length === 1
    ? order.items[0].qty + ' × ' + order.items[0].what.toLowerCase()
    : order.items.length + ' produse · ' + totalQty + ' buc total';

  const handleDotClick = (e) => {
    e.stopPropagation();
    onChangeStatus(order.id, H.nextStatus(order.status));
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(order.id, noteText.trim());
    setNoteText('');
  };
  const submitVersion = (e) => {
    e.preventDefault();
    if (!versionText.trim()) return;
    onAddVersion(order.id, versionText.trim());
    setVersionText('');
  };
  const submitItem = (e) => {
    e.preventDefault();
    if (!newItem.what.trim()) return;
    onAddItem(order.id, {
      what: newItem.what.trim(),
      dim: newItem.dim.trim() || '—',
      material: newItem.material.trim() || '—',
      qty: parseInt(newItem.qty) || 1,
    });
    setNewItem({ what: '', dim: '', material: '', qty: '' });
    setAddingItem(false);
  };

  return (
    <div className={'card' + (isOpen ? ' open' : '')} onClick={() => onToggle(order.id)}>
      <button
        className={'status-dot s-' + order.status}
        onClick={handleDotClick}
        title={'Status: ' + H.statusLabel(order.status) + ' (click: avansează)'}
      />
      <div className="card-body">
        <h3 className={'card-title' + (isDone ? ' done' : '')}>
          <span className="num">#{order.id}</span>
          {order.name}
        </h3>
        <div className="card-meta">
          <span className="client">{order.client}</span>
          <span className="sep">·</span>
          <span>{itemSummary}</span>
          <span className="sep">·</span>
          <span className="channel">{window.CHANNELS[order.channel]}</span>
        </div>

        {isOpen && (
          <div className="expand" onClick={(e) => e.stopPropagation()}>
            {/* Meta sus */}
            <div className="field">
              <span className="k">Client · {window.CHANNELS[order.channel]}</span>
              <span className="v">{order.client}</span>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-faded)', marginTop: 2 }}>
                {order.contact}
              </div>
            </div>
            <div className="field">
              <span className="k">Deadline</span>
              <span className="v">
                {H.fmtDateShort(order.deadline)} · {H.fmtTime(order.deadline)}
              </span>
            </div>

            {/* Produse */}
            <div className="block full">
              <div className="block-head">
                <span className="block-title">Produse</span>
                <span className="block-meta">{order.items.length} {order.items.length === 1 ? 'produs' : 'produse'}</span>
              </div>
              <ul className="items">
                {order.items.map((it, i) => (
                  <li key={i} className="item">
                    <span className="item-n">{String(i+1).padStart(2,'0')}</span>
                    <div className="item-main">
                      <div className="item-what">{it.what}</div>
                      <div className="item-sub">{it.dim} · {it.material}</div>
                    </div>
                    <div className="item-qty">× {it.qty}</div>
                  </li>
                ))}
              </ul>
              {!addingItem && (
                <button className="add-btn" onClick={() => setAddingItem(true)}>
                  + adaugă încă un produs
                </button>
              )}
              {addingItem && (
                <form onSubmit={submitItem} className="add-item-form">
                  <input
                    autoFocus
                    placeholder="ce printăm (ex: Stickere rotunde)"
                    value={newItem.what}
                    onChange={(e) => setNewItem({ ...newItem, what: e.target.value })}
                    className="add-field add-field-full"
                  />
                  <input
                    placeholder="dimensiuni (ex: 80 × 80 mm)"
                    value={newItem.dim}
                    onChange={(e) => setNewItem({ ...newItem, dim: e.target.value })}
                    className="add-field"
                  />
                  <input
                    placeholder="material"
                    value={newItem.material}
                    onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                    className="add-field"
                  />
                  <input
                    placeholder="cantitate"
                    value={newItem.qty}
                    onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                    className="add-field add-field-small"
                  />
                  <div className="add-actions">
                    <button type="button" className="add-cancel" onClick={() => setAddingItem(false)}>renunță</button>
                    <button type="submit" className="add-save">salvează produs ↵</button>
                  </div>
                </form>
              )}
            </div>

            {/* Versiuni */}
            <div className="block full">
              <div className="block-head">
                <span className="block-title">Versiuni de progres</span>
                <span className="block-meta">{order.versions.length} {order.versions.length === 1 ? 'versiune' : 'versiuni'}</span>
              </div>
              {order.versions.length === 0 && (
                <div className="empty-line">— nicio versiune încă —</div>
              )}
              {order.versions.length > 0 && (
                <ol className="versions">
                  {order.versions.map((ver, i) => (
                    <li key={i} className={'version' + (i === order.versions.length - 1 ? ' latest' : '')}>
                      <span className="v-label">v{ver.v}</span>
                      <span className="v-date">{H.fmtRelative(ver.at)}</span>
                      <span className="v-note">{ver.note}</span>
                    </li>
                  ))}
                </ol>
              )}
              <form onSubmit={submitVersion} className="inline-add">
                <span className="inline-prefix mono">v{(order.versions[order.versions.length-1]?.v || 0) + 1}</span>
                <input
                  placeholder="ce s-a schimbat în această versiune"
                  value={versionText}
                  onChange={(e) => setVersionText(e.target.value)}
                  className="inline-input"
                />
                <button type="submit" className="inline-submit">+ adaugă</button>
              </form>
            </div>

            {/* Note */}
            <div className="block full">
              <div className="block-head">
                <span className="block-title">Note</span>
                <span className="block-meta">{order.notes.length}</span>
              </div>
              {order.notes.length === 0 && (
                <div className="empty-line">— fără note —</div>
              )}
              {order.notes.length > 0 && (
                <ul className="notes">
                  {order.notes.map((n, i) => (
                    <li key={i} className="note-item">
                      <div className="n-head">
                        <span className="n-by">{n.by}</span>
                        <span className="n-at">{H.fmtRelative(n.at)}</span>
                      </div>
                      <div className="n-body">{n.text}</div>
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={submitNote} className="inline-add">
                <span className="inline-prefix mono">›</span>
                <input
                  placeholder="adaugă o notă…"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="inline-input"
                />
                <button type="submit" className="inline-submit">+ adaugă</button>
              </form>
            </div>

            {/* Foldere Drive */}
            <div className="folders">
              <button className="folder-btn" onClick={(e) => { e.stopPropagation(); alert('Deschide Google Drive → Input/ (mock)'); }}>
                <span className="label">Input/</span>
                <span className="count">{order.files.input} fișiere</span>
              </button>
              <button className="folder-btn" onClick={(e) => { e.stopPropagation(); alert('Deschide Google Drive → Final/ (mock)'); }}>
                <span className="label">Final/</span>
                <span className="count">{order.files.final} fișiere</span>
              </button>
            </div>

            {/* Status row */}
            <div className="status-row">
              {window.STATUSES.map(s => (
                <button
                  key={s.id}
                  className={'status-pill s-' + s.id + (s.id === order.status ? ' current' : '')}
                  onClick={() => onChangeStatus(order.id, s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!isOpen && showDeadline && (
        <div className={'card-deadline' + (isUrgent ? ' urgent' : '')}>
          <span className="time">{H.fmtTime(order.deadline)}</span>
          <span className="sub">{H.fmtDateShort(order.deadline)}</span>
        </div>
      )}
    </div>
  );
}

window.OrderCard = OrderCard;

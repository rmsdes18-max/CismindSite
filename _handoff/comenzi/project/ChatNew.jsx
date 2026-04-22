// ---------- Conversational New Order ----------
const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

const BASE_STEPS = [
  { key: 'client',   q: <>Cine e <em>clientul</em>?</>,        placeholder: 'Nume sau firmă', type: 'text' },
  { key: 'contact',  q: <>Contact?</>,                          placeholder: 'telefon sau email', type: 'text' },
  { key: 'channel',  q: <>Pe unde a <em>venit</em> comanda?</>, type: 'choice', options: [
      { v: 'whatsapp', l: 'WhatsApp' }, { v: 'mail', l: 'mail' }, { v: 'telefon', l: 'telefon' },
  ]},
  { key: 'name',     q: <>Nume scurt pentru comandă?</>, placeholder: 'ex: Stickere logo cafenea', type: 'text' },
];

const PRODUCT_FIELDS = [
  { key: 'what',     q: <>Ce <em>printăm</em>? Descrie produsul.</>, placeholder: 'ex: Stickere rotunde vinyl' },
  { key: 'dim',      q: <>Ce dimensiuni?</>,                           placeholder: 'ex: 80 × 80 mm' },
  { key: 'material', q: <>Pe ce material?</>,                           placeholder: 'ex: vinyl mat' },
  { key: 'qty',      q: <>Câte bucăți?</>,                              placeholder: 'cantitate' },
];

const FINAL_STEPS = [
  { key: 'deadline', q: <>Până <em>când</em>?</>, type: 'choice', options: [
      { v: 'today',    l: 'azi' },
      { v: 'tomorrow', l: 'mâine' },
      { v: 'd3',       l: 'în 3 zile' },
      { v: 'd7',       l: 'săptămâna viitoare' },
  ]},
];

function ChatNew({ onDone, onCancel }) {
  // Phase: 'base' (0..3), 'product' (iterates), 'product-more' (da/nu), 'final' (deadline), 'done'
  const [phase, setPhase] = useStateChat('base');
  const [baseIdx, setBaseIdx] = useStateChat(0);
  const [productIdx, setProductIdx] = useStateChat(0);
  const [currentProduct, setCurrentProduct] = useStateChat({});
  const [products, setProducts] = useStateChat([]);
  const [answers, setAnswers] = useStateChat({});
  const [input, setInput] = useStateChat('');
  const [done, setDone] = useStateChat(false);
  const inputRef = useRefChat(null);

  useEffectChat(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [phase, baseIdx, productIdx]);

  const finish = (finalAnswers, finalProducts) => {
    setDone(true);
    setTimeout(() => onDone({ ...finalAnswers, products: finalProducts }), 900);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const val = input.trim();
    setInput('');

    if (phase === 'base') {
      const key = BASE_STEPS[baseIdx].key;
      setAnswers(a => ({ ...a, [key]: val }));
      if (baseIdx + 1 < BASE_STEPS.length) {
        // skip choice steps within base via next useEffect? Actually base has choice at idx 2.
        // Move to next; if next is choice, we don't call this path.
        setBaseIdx(baseIdx + 1);
      } else {
        setPhase('product');
        setProductIdx(0);
      }
    } else if (phase === 'product') {
      const key = PRODUCT_FIELDS[productIdx].key;
      const updated = { ...currentProduct, [key]: val };
      setCurrentProduct(updated);
      if (productIdx + 1 < PRODUCT_FIELDS.length) {
        setProductIdx(productIdx + 1);
      } else {
        // Product complete
        setProducts([...products, updated]);
        setCurrentProduct({});
        setProductIdx(0);
        setPhase('product-more');
      }
    }
  };

  const handleChoice = (key, val, label) => {
    if (phase === 'base') {
      setAnswers(a => ({ ...a, [key]: val }));
      if (baseIdx + 1 < BASE_STEPS.length) {
        setBaseIdx(baseIdx + 1);
      } else {
        setPhase('product');
        setProductIdx(0);
      }
    } else if (phase === 'product-more') {
      if (val === 'yes') {
        setPhase('product');
        setProductIdx(0);
      } else {
        setPhase('final');
      }
    } else if (phase === 'final') {
      const finalAnswers = { ...answers, deadline: val };
      setAnswers(finalAnswers);
      finish(finalAnswers, products);
    }
  };

  // Determine current question
  let current = null;
  let summary = [];

  if (phase === 'base') {
    current = BASE_STEPS[baseIdx];
    summary = BASE_STEPS.slice(0, baseIdx).map(s => ({ q: s.q, a: answers[s.key] || '(sărit)' }));
  } else if (phase === 'product') {
    current = PRODUCT_FIELDS[productIdx];
    // Keep summary minimal — show base done + current product progress
  } else if (phase === 'product-more') {
    current = {
      key: 'more',
      q: <>Mai <em>adaugi</em> un produs la această comandă?</>,
      type: 'choice',
      options: [
        { v: 'yes', l: '+ încă un produs' },
        { v: 'no',  l: 'nu, gata' },
      ],
    };
  } else if (phase === 'final') {
    current = FINAL_STEPS[0];
  }

  const totalSteps = BASE_STEPS.length + 2; // base + "products" + deadline
  const progress =
    phase === 'base'        ? baseIdx :
    phase === 'product'     ? BASE_STEPS.length :
    phase === 'product-more'? BASE_STEPS.length + (products.length > 0 ? 1 : 0) :
    phase === 'final'       ? BASE_STEPS.length + 1 :
    totalSteps;

  return (
    <div className="chat-overlay" onClick={onCancel}>
      <div className="chat" onClick={(e) => e.stopPropagation()}>
        <button className="chat-close" onClick={onCancel}>închide ✕</button>
        <div className="chat-head">
          Comandă nouă
          {phase === 'product' && <span> · produs {products.length + 1} · pas {productIdx + 1}/{PRODUCT_FIELDS.length}</span>}
        </div>

        <div className="chat-log">
          {/* Base answers summary */}
          {phase !== 'base' && (
            <div className="chat-summary">
              {answers.client && <div className="chat-sum-line"><span className="k">client</span> {answers.client}</div>}
              {answers.name && <div className="chat-sum-line"><span className="k">comandă</span> {answers.name}</div>}
            </div>
          )}

          {/* Products so far */}
          {(phase === 'product-more' || phase === 'final') && products.length > 0 && (
            <div className="chat-products">
              <div className="chat-products-head">Produse adăugate</div>
              {products.map((p, i) => (
                <div key={i} className="chat-product-line">
                  <span className="mono">{String(i+1).padStart(2,'0')}</span>
                  <span>{p.qty} × {p.what}</span>
                  <span className="sub">{p.dim} · {p.material}</span>
                </div>
              ))}
            </div>
          )}

          {/* Current product being built */}
          {phase === 'product' && productIdx > 0 && (
            <div className="chat-products">
              <div className="chat-products-head">Produs {products.length + 1}</div>
              {PRODUCT_FIELDS.slice(0, productIdx).map(f => (
                currentProduct[f.key] && (
                  <div key={f.key} className="chat-product-line">
                    <span className="k">{f.key}</span>
                    <span>{currentProduct[f.key]}</span>
                  </div>
                )
              ))}
            </div>
          )}

          {!done && current && <div className="chat-q">{current.q}</div>}

          {!done && current && current.type === 'text' && (
            <form onSubmit={handleTextSubmit}>
              <div className="chat-input-row">
                <input
                  ref={inputRef}
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={current.placeholder}
                  autoFocus
                />
                <button type="submit" className="chat-skip" style={{ color: 'var(--accent)' }}>enter ↵</button>
              </div>
            </form>
          )}

          {!done && current && !current.type && current.placeholder && (
            <form onSubmit={handleTextSubmit}>
              <div className="chat-input-row">
                <input
                  ref={inputRef}
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={current.placeholder}
                  autoFocus
                />
                <button type="submit" className="chat-skip" style={{ color: 'var(--accent)' }}>enter ↵</button>
              </div>
            </form>
          )}

          {!done && current && current.type === 'choice' && (
            <div className="chat-opts">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className={'chat-opt' + (opt.v === 'yes' ? ' chat-opt-primary' : '')}
                  onClick={() => handleChoice(current.key, opt.v, opt.l)}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          )}

          {done && (
            <div className="chat-final">
              Gata. Creez <strong>#{String(Math.floor(Math.random()*900)+2611)}</strong> cu <strong>{products.length}</strong> {products.length === 1 ? 'produs' : 'produse'} pentru <strong>{answers.client}</strong>{'...'}
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-faded)', marginTop: 10, letterSpacing: '0.05em' }}>
                → Sync Google Sheets · folder Drive creat
              </div>
            </div>
          )}
        </div>

        <div className="chat-progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <i key={i} className={i < progress || done ? 'done' : ''}></i>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ChatNew = ChatNew;

import { useState, useEffect, useRef } from 'react'
import {
  CHANNEL_OPTIONS,
  MORE_PRODUCT_OPTIONS,
} from './chat-steps'

interface NewOrderPayload {
  client: string
  contact: string
  channel: string
  name: string
  deadline: string
  products: { what: string; dim: string; material: string; qty: string }[]
}

interface Props {
  onDone: (payload: NewOrderPayload) => void
  onCancel: () => void
  isCreating?: boolean
}

type Phase = 'base' | 'product' | 'product-more' | 'final'

interface BaseStep {
  key: string
  q: React.ReactNode
  placeholder?: string
  type: 'text' | 'choice'
  options?: { v: string; l: string }[]
}

const BASE_STEPS: BaseStep[] = [
  { key: 'client', q: <>Cine e <em className="italic text-accent">clientul</em>?</>, placeholder: 'Nume sau firmă', type: 'text' },
  { key: 'contact', q: <>Contact?</>, placeholder: 'telefon sau email', type: 'text' },
  { key: 'channel', q: <>Pe unde a <em className="italic text-accent">venit</em> comanda?</>, type: 'choice', options: CHANNEL_OPTIONS },
  { key: 'name', q: <>Nume scurt pentru comandă?</>, placeholder: 'ex: Stickere logo cafenea', type: 'text' },
]

interface ProductField {
  key: string
  q: React.ReactNode
  placeholder: string
  skippable: boolean
  skipDefault: string
}

const PRODUCT_FIELDS: ProductField[] = [
  { key: 'what', q: <>Ce <em className="italic text-accent">printăm</em>? Descrie produsul.</>, placeholder: 'ex: Stickere rotunde vinyl', skippable: false, skipDefault: '' },
  { key: 'dim', q: <>Ce dimensiuni?</>, placeholder: 'ex: 80 × 80 mm', skippable: true, skipDefault: '—' },
  { key: 'material', q: <>Pe ce material?</>, placeholder: 'ex: vinyl mat', skippable: true, skipDefault: '—' },
  { key: 'qty', q: <>Câte bucăți?</>, placeholder: 'cantitate (default 1)', skippable: false, skipDefault: '1' },
]

const DEADLINE_OPTIONS = [
  { v: 'today', l: 'azi' },
  { v: 'tomorrow', l: 'mâine' },
  { v: 'd3', l: 'în 3 zile' },
  { v: 'd7', l: 'săptămâna viitoare' },
]

export function NewOrderChat({ onDone, onCancel, isCreating }: Props) {
  const [phase, setPhase] = useState<Phase>('base')
  const [baseIdx, setBaseIdx] = useState(0)
  const [productIdx, setProductIdx] = useState(0)
  const [currentProduct, setCurrentProduct] = useState<Record<string, string>>({})
  const [products, setProducts] = useState<Record<string, string>[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [input, setInput] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [phase, baseIdx, productIdx])

  const finish = (finalAnswers: Record<string, string>, finalProducts: Record<string, string>[]) => {
    setIsDone(true)
    onDone({
      client: finalAnswers['client'] ?? '',
      contact: finalAnswers['contact'] ?? '',
      channel: finalAnswers['channel'] ?? '',
      name: finalAnswers['name'] ?? '',
      deadline: finalAnswers['deadline'] ?? 'tomorrow',
      products: finalProducts.map((p) => ({
        what: p['what'] ?? '',
        dim: p['dim'] ?? '',
        material: p['material'] ?? '',
        qty: p['qty'] ?? '1',
      })),
    })
  }

  const advanceProduct = (updated: Record<string, string>) => {
    if (productIdx + 1 < PRODUCT_FIELDS.length) {
      setProductIdx(productIdx + 1)
    } else {
      setProducts([...products, updated])
      setCurrentProduct({})
      setProductIdx(0)
      setPhase('product-more')
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = input.trim()
    setInput('')

    if (phase === 'base') {
      if (!val) return
      const step = BASE_STEPS[baseIdx]!
      const updated = { ...answers, [step.key]: val }
      setAnswers(updated)
      if (baseIdx + 1 < BASE_STEPS.length) {
        setBaseIdx(baseIdx + 1)
      } else {
        setPhase('product')
        setProductIdx(0)
      }
    } else if (phase === 'product') {
      const field = PRODUCT_FIELDS[productIdx]!
      // Skip-able fields accept empty input
      if (!val && !field.skippable && field.key !== 'qty') return
      const value = val || field.skipDefault
      const updated = { ...currentProduct, [field.key]: value }
      setCurrentProduct(updated)
      advanceProduct(updated)
    }
  }

  const handleSkip = () => {
    if (phase !== 'product') return
    const field = PRODUCT_FIELDS[productIdx]!
    const value = field.skipDefault
    const updated = { ...currentProduct, [field.key]: value }
    setCurrentProduct(updated)
    setInput('')
    advanceProduct(updated)
  }

  const handleChoice = (key: string, val: string) => {
    if (phase === 'base') {
      const updated = { ...answers, [key]: val }
      setAnswers(updated)
      if (baseIdx + 1 < BASE_STEPS.length) {
        setBaseIdx(baseIdx + 1)
      } else {
        setPhase('product')
        setProductIdx(0)
      }
    } else if (phase === 'product-more') {
      if (val === 'yes') {
        setPhase('product')
        setProductIdx(0)
      } else {
        setPhase('final')
      }
    } else if (phase === 'final') {
      const finalAnswers = { ...answers, deadline: val }
      setAnswers(finalAnswers)
      finish(finalAnswers, products)
    }
  }

  const handleCustomDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value
    if (!dateStr) return
    // Store as ISO with 17:00
    const d = new Date(dateStr + 'T17:00:00')
    const finalAnswers = { ...answers, deadline: d.toISOString() }
    setAnswers(finalAnswers)
    setShowDatePicker(false)
    finish(finalAnswers, products)
  }

  // Determine current question
  let current: { key: string; q: React.ReactNode; type: 'text' | 'choice'; placeholder?: string; options?: { v: string; l: string }[]; skippable?: boolean } | null = null

  if (phase === 'base') {
    current = BASE_STEPS[baseIdx]!
  } else if (phase === 'product') {
    const pf = PRODUCT_FIELDS[productIdx]!
    current = { key: pf.key, q: pf.q, type: 'text', placeholder: pf.placeholder, skippable: pf.skippable }
  } else if (phase === 'product-more') {
    current = {
      key: 'more',
      q: <>Mai <em className="italic text-accent">adaugi</em> un produs la această comandă?</>,
      type: 'choice',
      options: MORE_PRODUCT_OPTIONS,
    }
  } else if (phase === 'final') {
    current = {
      key: 'deadline',
      q: <>Până <em className="italic text-accent">când</em>?</>,
      type: 'choice',
      options: DEADLINE_OPTIONS,
    }
  }

  const totalSteps = BASE_STEPS.length + 2
  const progress =
    phase === 'base'
      ? baseIdx
      : phase === 'product'
        ? BASE_STEPS.length
        : phase === 'product-more'
          ? BASE_STEPS.length + (products.length > 0 ? 1 : 0)
          : phase === 'final'
            ? BASE_STEPS.length + 1
            : totalSteps

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div
      className="fixed inset-0 bg-ink/35 backdrop-blur-[6px] z-50 flex justify-center items-start pt-[8vh] px-5 pb-5 animate-[fade_0.25s_ease]"
      onClick={onCancel}
    >
      <div
        className="bg-paper w-full max-w-[580px] rounded-[4px] p-7 relative shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3.5 right-4 font-mono text-[11px] text-ink-faded tracking-[0.08em] uppercase hover:text-accent"
          onClick={onCancel}
        >
          închide ✕
        </button>

        <div className="font-mono text-[10px] tracking-[0.1em] text-ink-faded uppercase mb-5">
          Comandă nouă
          {phase === 'product' && (
            <span>
              {' '}· produs {products.length + 1} · pas {productIdx + 1}/{PRODUCT_FIELDS.length}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* Base answers summary */}
          {phase !== 'base' && (
            <div className="font-mono text-[11px] text-ink-faded pb-2.5 mb-1.5 border-b border-dashed border-rule">
              {answers['client'] && (
                <div className="mb-1 tracking-[0.02em]">
                  <span className="inline-block min-w-[70px] uppercase text-[9px] tracking-[0.1em] opacity-60">
                    client
                  </span>{' '}
                  {answers['client']}
                </div>
              )}
              {answers['name'] && (
                <div className="mb-1 tracking-[0.02em]">
                  <span className="inline-block min-w-[70px] uppercase text-[9px] tracking-[0.1em] opacity-60">
                    comandă
                  </span>{' '}
                  {answers['name']}
                </div>
              )}
            </div>
          )}

          {/* Products so far */}
          {(phase === 'product-more' || phase === 'final') && products.length > 0 && (
            <div className="bg-paper-deep rounded-sm px-3.5 py-3">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faded mb-2">
                Produse adăugate
              </div>
              {products.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-baseline py-1 font-display text-sm text-ink flex-wrap"
                >
                  <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em] uppercase min-w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    {p['qty']} × {p['what']}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faded ml-auto">
                    {p['dim']} · {p['material']}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Current product being built */}
          {phase === 'product' && productIdx > 0 && (
            <div className="bg-paper-deep rounded-sm px-3.5 py-3">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faded mb-2">
                Produs {products.length + 1}
              </div>
              {PRODUCT_FIELDS.slice(0, productIdx).map((f) =>
                currentProduct[f.key] ? (
                  <div key={f.key} className="flex gap-3 items-baseline py-1 font-display text-sm text-ink flex-wrap">
                    <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em] uppercase min-w-7">
                      {f.key}
                    </span>
                    <span>{currentProduct[f.key]}</span>
                  </div>
                ) : null,
              )}
            </div>
          )}

          {/* Current question */}
          {!isDone && current && (
            <div className="font-display text-[22px] font-normal tracking-[-0.01em] leading-[1.3] animate-[rise_0.35s_ease]">
              {current.q}
            </div>
          )}

          {/* Text input */}
          {!isDone && current && current.type === 'text' && (
            <form onSubmit={handleTextSubmit}>
              <div className="mt-2 flex items-center gap-2.5 py-2.5 border-b-[1.5px] border-ink">
                <input
                  ref={inputRef}
                  className="flex-1 font-display text-xl bg-transparent text-ink placeholder:text-ink-faded placeholder:italic"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={current.placeholder}
                  autoFocus
                />
                <button
                  type="submit"
                  className="font-mono text-[10px] tracking-[0.1em] uppercase text-accent"
                >
                  enter ↵
                </button>
              </div>
              {current.skippable && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faded hover:text-accent mt-2 transition-colors"
                >
                  sari peste →
                </button>
              )}
            </form>
          )}

          {/* Choice buttons */}
          {!isDone && current && current.type === 'choice' && (
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {current.options!.map((opt, i) => (
                <button
                  key={i}
                  className={`font-mono text-[11px] tracking-[0.06em] uppercase px-3 py-2 border rounded-sm transition-all ${
                    opt.v === 'yes'
                      ? 'bg-accent text-paper border-accent hover:bg-ink hover:border-ink'
                      : 'border-rule hover:border-ink hover:bg-paper-deep'
                  }`}
                  onClick={() => handleChoice(current!.key, opt.v)}
                >
                  {opt.l}
                </button>
              ))}
              {/* Custom date button for deadline phase */}
              {phase === 'final' && !showDatePicker && (
                <button
                  className="font-mono text-[11px] tracking-[0.06em] uppercase px-3 py-2 border border-rule rounded-sm hover:border-ink hover:bg-paper-deep transition-all"
                  onClick={() => {
                    setShowDatePicker(true)
                    setTimeout(() => dateRef.current?.showPicker?.(), 100)
                  }}
                >
                  altă dată
                </button>
              )}
              {phase === 'final' && showDatePicker && (
                <input
                  ref={dateRef}
                  type="date"
                  min={todayStr}
                  className="font-mono text-[11px] px-3 py-2 border border-accent rounded-sm bg-paper text-ink"
                  onChange={handleCustomDate}
                  onKeyDown={(e) => { if (e.key === 'Escape') setShowDatePicker(false) }}
                  autoFocus
                />
              )}
            </div>
          )}

          {/* Done state */}
          {isDone && (
            <div className="font-display text-lg py-3.5">
              {isCreating ? (
                <>
                  Se creează comanda...
                  <div className="font-mono text-[11px] text-ink-faded mt-2.5 tracking-[0.05em]">
                    → Creez folderele Drive... apoi scriu în Sheet...
                  </div>
                </>
              ) : (
                <>
                  Gata. Comandă creată cu{' '}
                  <strong className="italic text-accent font-medium">{products.length}</strong>{' '}
                  {products.length === 1 ? 'produs' : 'produse'} pentru{' '}
                  <strong className="italic text-accent font-medium">{answers['client']}</strong>.
                  <div className="font-mono text-[11px] text-ink-faded mt-2.5 tracking-[0.05em]">
                    → Sync Google Sheets · folder Drive creat
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-5 flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <i
              key={i}
              className={`flex-1 h-0.5 not-italic transition-colors ${
                i < progress || isDone ? 'bg-accent' : 'bg-rule'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

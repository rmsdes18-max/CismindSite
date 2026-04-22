interface Props {
  orderId: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirm({ orderId, onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 bg-ink/35 backdrop-blur-[6px] z-50 flex justify-center items-center px-5"
      onClick={onCancel}
    >
      <div
        className="bg-paper w-full max-w-[400px] rounded-[4px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg font-normal mb-3">Sigur?</h3>
        <p className="font-mono text-xs text-ink-soft leading-relaxed mb-1">
          Comanda <span className="text-ink">#{orderId}</span> va dispărea din listă.
        </p>
        <p className="font-mono text-xs text-ink-soft leading-relaxed mb-6">
          Fișierele din Drive rămân. Poți să o recuperezi din „Arhivă".
        </p>
        <div className="flex justify-end gap-3">
          <button
            autoFocus
            onClick={onCancel}
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-faded hover:text-ink px-3 py-2 transition-colors"
          >
            Anulează
          </button>
          <button
            onClick={onConfirm}
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-paper bg-[#b91c1c] px-3 py-2 rounded-sm hover:bg-[#991b1b] transition-colors"
          >
            Da, șterge
          </button>
        </div>
      </div>
    </div>
  )
}

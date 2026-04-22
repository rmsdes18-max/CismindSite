import type { OrderDrive } from '@/types/order'
import { FOLDER_LABELS } from '@/lib/constants'

interface Props {
  drive: OrderDrive
}

export function DriveFolders({ drive }: Props) {
  const openFolder = (folderId: string | null) => {
    if (!folderId) return
    window.open(`https://drive.google.com/drive/folders/${folderId}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="col-span-full flex gap-2.5 pt-1.5">
      <button
        onClick={() => openFolder(drive.inputId)}
        disabled={!drive.inputId}
        className="flex-1 py-3 px-3.5 border border-rule rounded-sm font-mono text-[11px] flex justify-between items-center bg-paper hover:border-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="tracking-[0.08em] uppercase text-ink-faded">{FOLDER_LABELS.input}</span>
        <span className="text-ink text-[13px]">{drive.inputId ? 'Deschide →' : '—'}</span>
      </button>
      <button
        onClick={() => openFolder(drive.finalId)}
        disabled={!drive.finalId}
        className="flex-1 py-3 px-3.5 border border-rule rounded-sm font-mono text-[11px] flex justify-between items-center bg-paper hover:border-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="tracking-[0.08em] uppercase text-ink-faded">{FOLDER_LABELS.final}</span>
        <span className="text-ink text-[13px]">{drive.finalId ? 'Deschide →' : '—'}</span>
      </button>
    </div>
  )
}

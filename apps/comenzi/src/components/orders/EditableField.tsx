import { useState, useRef, useEffect } from 'react'

interface Props {
  value: string
  onSave: (newValue: string) => void
  className?: string
  inputClassName?: string
  placeholder?: string
  type?: 'text' | 'date'
  min?: string
}

export function EditableField({
  value,
  onSave,
  className = '',
  inputClassName = '',
  placeholder = '',
  type = 'text',
  min,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  useEffect(() => {
    setDraft(value)
  }, [value])

  const save = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    } else {
      setDraft(value)
    }
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type={type}
        min={min}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === 'Enter') save()
          if (e.key === 'Escape') cancel()
        }}
        className={`bg-transparent border-b border-accent outline-none ${inputClassName || className}`}
        placeholder={placeholder}
      />
    )
  }

  return (
    <span
      className={`cursor-pointer hover:border-b hover:border-dashed hover:border-ink-faded ${className}`}
      onClick={(e) => {
        e.stopPropagation()
        setEditing(true)
      }}
      title="Click pentru a edita"
    >
      {value || placeholder}
    </span>
  )
}

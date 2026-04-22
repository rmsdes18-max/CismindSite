import type { ReactNode } from 'react'

export interface ChatStepText {
  key: string
  q: ReactNode
  placeholder: string
  type: 'text'
}

export interface ChatStepChoice {
  key: string
  q: ReactNode
  type: 'choice'
  options: { v: string; l: string }[]
}

export type ChatStep = ChatStepText | ChatStepChoice

// These are defined as data; the JSX is created by the component that renders them.
// We export the raw config without JSX so this file stays .ts (not .tsx).

export const BASE_STEP_KEYS = ['client', 'contact', 'channel', 'name'] as const

export const PRODUCT_FIELD_KEYS = ['what', 'dim', 'material', 'qty'] as const

export const CHANNEL_OPTIONS = [
  { v: 'whatsapp', l: 'WhatsApp' },
  { v: 'mail', l: 'mail' },
  { v: 'telefon', l: 'telefon' },
]

export const DEADLINE_OPTIONS = [
  { v: 'today', l: 'azi' },
  { v: 'tomorrow', l: 'mâine' },
  { v: 'd3', l: 'în 3 zile' },
  { v: 'd7', l: 'săptămâna viitoare' },
]

export const MORE_PRODUCT_OPTIONS = [
  { v: 'yes', l: '+ încă un produs' },
  { v: 'no', l: 'nu, gata' },
]

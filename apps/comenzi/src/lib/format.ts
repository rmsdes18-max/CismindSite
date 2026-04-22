/**
 * Format phone numbers with spaces for readability.
 * "0757450365" → "0757 450 365"
 * "+40742118309" → "+40 742 118 309"
 * Non-phone strings (emails, etc.) pass through unchanged.
 */
export function formatPhone(contact: string): string {
  // Strip all non-digit/+ chars for analysis
  const digits = contact.replace(/[^\d+]/g, '')

  // If it looks like an email or doesn't have enough digits, return as-is
  if (contact.includes('@') || digits.replace('+', '').length < 8) return contact

  // Already formatted (has spaces)? Return as-is
  if (/\d\s\d/.test(contact)) return contact

  // +40XXXXXXXXX → +40 XXX XXX XXX
  if (digits.startsWith('+40') && digits.length >= 12) {
    const rest = digits.slice(3)
    return '+40 ' + rest.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
  }

  // 07XXXXXXXX → 07XX XXX XXX
  if (digits.startsWith('0') && digits.length === 10) {
    return digits.slice(0, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7)
  }

  // Fallback: groups of 3
  return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
}

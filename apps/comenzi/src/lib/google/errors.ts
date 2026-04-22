export class GoogleApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
  ) {
    const msg =
      status === 401
        ? 'Sesiunea a expirat. Re-autentifică-te.'
        : status === 403
          ? 'Acces interzis. Verifică permisiunile contului.'
          : status === 404
            ? 'Resursa nu a fost găsită. Verifică ID-urile din configurare.'
            : `Eroare Google API (${status})`
    super(msg)
    this.name = 'GoogleApiError'
  }

  get isAuthError(): boolean {
    return this.status === 401
  }
}

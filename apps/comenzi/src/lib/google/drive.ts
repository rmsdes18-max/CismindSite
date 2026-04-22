import { GoogleApiError } from './errors'

const API = 'https://www.googleapis.com/drive/v3'

export class DriveService {
  constructor(
    private rootFolderId: string,
    private getToken: () => Promise<string>,
  ) {}

  private async fetch(url: string, init?: RequestInit): Promise<Response> {
    const token = await this.getToken()
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
    if (!res.ok) {
      throw new GoogleApiError(res.status, await res.text())
    }
    return res
  }

  async createFolder(name: string, parentId: string): Promise<string> {
    const res = await this.fetch(`${API}/files`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      }),
    })
    const data = await res.json()
    return data.id as string
  }

  async createOrderFolders(
    orderId: string,
    orderName: string,
  ): Promise<{ folderId: string; inputId: string; finalId: string }> {
    const slug = orderName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    const folderName = `#${orderId}_${slug}`

    const folderId = await this.createFolder(folderName, this.rootFolderId)
    const inputId = await this.createFolder('Input', folderId)
    const finalId = await this.createFolder('Final', folderId)

    return { folderId, inputId, finalId }
  }

  async createUploadLink(folderId: string): Promise<string> {
    await this.fetch(`${API}/files/${folderId}/permissions`, {
      method: 'POST',
      body: JSON.stringify({
        role: 'writer',
        type: 'anyone',
        allowFileDiscovery: false,
      }),
    })
    return `https://drive.google.com/drive/folders/${folderId}`
  }

  async rollback(folderIds: string[]): Promise<void> {
    for (const id of folderIds) {
      try {
        const token = await this.getToken()
        await fetch(`${API}/files/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        console.warn(`[Drive] Rollback: nu am putut șterge folderul ${id}`)
      }
    }
  }
}

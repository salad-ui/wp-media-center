import {MediaItem} from './MediaItem';

const getDataOrThrow = (json: any): any => {
  if (json.success) {
    return json.data;
  } else {
    throw new Error(json.data.message);
  }
};

export interface MediaFetcherOptions {
  url?: string;
  nonce: string;
}

export class MediaFetcher {
  private url: string;
  private nonce: string;

  public constructor(options: MediaFetcherOptions) {
    this.url = options.url || '';
    this.nonce = options.nonce;
  }

  public async list(): Promise<MediaItem[]> {
    const data = new FormData();
    data.append('action', 'query-attachments');
    data.append('post_id', '0');
    data.append('query[orderby]', 'date');
    data.append('query[order]', 'DESC');
    data.append('query[posts_per_page]', '40');
    data.append('query[paged]', '1');
    const res = await fetch(`${this.url}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    const items = getDataOrThrow(json);
    return items;
  }

  public async upload(name: string, file: File): Promise<MediaItem> {
    // TODO: return observable with progress
    const data = new FormData();
    data.append('name', name);
    data.append('action', 'upload-attachment');
    data.append('async-upload', file);
    data.append('_wpnonce', this.nonce);
    const res = await fetch(`${this.url}/wp-admin/async-upload.php`, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    const items = getDataOrThrow(json);
    return items;
  }

  public async delete(id: number, nonce?: string): Promise<void> {
    const data = new FormData();
    data.append('action', 'delete-post');
    data.append('id', String(id));
    data.append('_wpnonce', nonce || this.nonce);
    const res = await fetch(`${this.url}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    if (json !== 1) {
      throw new Error('Failed to delete file');
    }
  }
}

export interface MediaClientOptions {
  url?: string;
  nonce: string;
}

export interface MediaItem {
  id: number;
  title: string;
  filename: string;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  mime: string;
  type: string;
  subtype: string;
  icon: string;
  sizes: {
    [name: string]: {
      orientation: 'landscape' | 'portrait';
      url: string;
      width: number;
      height: number;
    };
  };
  nonces: {
    update: string;
    edit: string;
    delete: string;
  };
}

const getDataOrThrow = (json: any): any => {
  if (json.success) {
    return json.data;
  } else {
    throw new Error(json.data.message);
  }
};

export class MediaClient {
  private url: string;
  private nonce: string;

  public constructor(options: MediaClientOptions) {
    this.url = options.url || '';
    this.nonce = options.nonce;
  }

  private async request(path: string, data: FormData): Promise<any> {
    const res = await fetch(`${this.url}${path}`, {method: 'POST', body: data});
    const json = await res.json();
    return json;
  }

  public async list(): Promise<MediaItem[]> {
    const data = new FormData();
    data.append('action', 'query-attachments');
    data.append('post_id', '0');
    data.append('query[orderby]', 'date');
    data.append('query[order]', 'DESC');
    data.append('query[posts_per_page]', '40');
    data.append('query[paged]', '1');
    const json = await this.request('/wp-admin/admin-ajax.php', data);
    return getDataOrThrow(json);
  }

  public async upload(name: string, file: File): Promise<MediaItem> {
    // TODO: return observable with progress
    const data = new FormData();
    data.append('name', name);
    data.append('action', 'upload-attachment');
    data.append('async-upload', file);
    data.append('_wpnonce', this.nonce);
    const json = await this.request('/wp-admin/async-upload.php', data);
    return getDataOrThrow(json);
  }

  public async delete(id: number, nonce?: string): Promise<void> {
    const data = new FormData();
    data.append('action', 'delete-post');
    data.append('id', String(id));
    data.append('_wpnonce', nonce || this.nonce);
    const json = await this.request('/wp-admin/admin-ajax.php', data);
    if (json !== 1) {
      throw new Error('Failed to delete file');
    }
  }
}

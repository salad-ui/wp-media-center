import {ReplaySubject, Observable} from 'rxjs';
import {MediaItem} from './MediaItem';
import {MediaFetcher} from './MediaFetcher';

export interface MediaClientOptions {
  url?: string;
  nonce: string;
}

export class MediaClient {
  private store: MediaFetcher;
  private _listCache: MediaItem[] | undefined;
  private _listSubject = new ReplaySubject<MediaItem[]>();

  public constructor(options: MediaClientOptions) {
    this.store = new MediaFetcher(options);
  }

  private async fetchList(): Promise<void> {
    try {
      const items = await this.store.list();
      this._listCache = items;
      this._listSubject.next(items);
    } catch (error) {
      this._listSubject.error(error);
    }
  }

  public list(): Observable<MediaItem[]> {
    if (!this._listCache) {
      this.fetchList();
    }
    return this._listSubject;
  }

  public async upload(name: string, file: File): Promise<MediaItem> {
    const item = await this.store.upload(name, file);
    this.fetchList();
    return item;
  }

  public async delete(id: number, nonce?: string): Promise<void> {
    await this.store.delete(id, nonce);
    this.fetchList();
  }
}

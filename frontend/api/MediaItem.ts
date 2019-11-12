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

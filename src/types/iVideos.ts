export interface iVideos {
  id: number;
  results: ResultVideos[];
}

export interface ResultVideos {
  iso_639_1: ISO639_1;
  iso_3166_1: ISO3166_1;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export enum ISO3166_1 {
  Us = 'US',
}

export enum ISO639_1 {
  En = 'en',
}

export enum Site {
  YouTube = 'YouTube',
}

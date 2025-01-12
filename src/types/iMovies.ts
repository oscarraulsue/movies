export interface iMovies {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
export interface Result {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  adult: boolean;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MediaType {
  Movie: 'movie';
}
export interface OriginalLanguage {
  En: 'en';
  Fr: 'fr';
  Ko: 'ko';
  LV: 'lv';
}
export interface iErrorMovies {
  status_code: number;
  status_message: string;
  success: boolean;
}

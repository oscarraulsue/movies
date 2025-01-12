'use server';

import { iCredits, iMovie, iMovies } from '@/types';
import { notFound } from 'next/navigation';

export async function getTrendingMovies(page: number): Promise<iMovies> {
  try {
    const url = `${process.env.URL_BASE}/trending/movie/week?language=es-ES&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      revalidate: 86400,
    };

    const data = await fetch(url, options);
    const movies = await data.json();
    if (!movies || movies.success === false) throw new Error('No se encontraron películas');
    return movies;
  } catch (error) {
    console.error(error);
    throw new Error('No se encontraron películas');
  }
}

export async function getMovieDetails(id: string): Promise<iMovie> {
  try {
    const url = `${process.env.URL_BASE}/movie/${id}?language=es-ES`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };

    const res = await fetch(url, options);
    const movie = await res.json();
    if (!movie || movie.success === false) notFound();
    return movie;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
export async function getCredits(id: string): Promise<iCredits> {
  try {
    const url = `${process.env.URL_BASE}/movie/${id}/credits?language=es-ES`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };
    const res = await fetch(url, options);
    const movie = await res.json();
    if (!movie || movie.success === false) notFound();
    return movie;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getMoviesByTitle({
  page,
  query,
}: {
  page: string;
  query: string;
}): Promise<iMovies> {
  try {
    const url = `${process.env.URL_BASE}/search/movie?query=${query}&include_adult=false&language=es-ES&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };

    fetch(url, options);

    const res = await fetch(url, options);
    const movies = await res.json();
    if (!movies || movies.success === false) notFound();
    return movies;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

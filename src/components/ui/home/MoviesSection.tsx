'use client';
import { getMoviesByTitle, getTrendingMovies } from '@/app/actions';
import { Card, PaginationComponent } from '@/components/commons';
import { iMovies, Result } from '@/types';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MoviesSection = ({ movies }: { movies: iMovies }) => {
  const [favorites, setFavorites] = useState<Result[]>([]);
  const { replace } = useRouter();

  const [dataPage, setDataPage] = useState(movies);
  const searchParams = useSearchParams();
  const params = searchParams.get('search')?.toString();
  useEffect(() => {
    const getfavoritesMovies = localStorage?.getItem('favoritesMovies');
    const favoritesMovies = getfavoritesMovies ? JSON.parse(getfavoritesMovies) : [];
    setFavorites(favoritesMovies);
  }, []);
  useEffect(() => {
    if (params) {
      (async () => {
        const dataMovies = await getMoviesByTitle({ page: '1', query: params });
        setDataPage(dataMovies);
      })();
      return;
    }
    (async () => {
      const dataMovies = await getTrendingMovies(1);
      setDataPage(dataMovies);
    })();
  }, [params]);

  return (
    <div className="w-full px-3 py-5">
      {params ? (
        <div className="flex gap-5 items-center my-4">
          <h2 className="text-2xl font-bold mb-4">Resultados de la búsqueda: {params}</h2>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('search');
              replace('/');
            }}
            className="text-white px-2 py-1 bg-gray-800 border border-gray-300 px-2 mt-[-15px] rounded-2xl flex gap-2"
          >
            Limpiar <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Películas populares</h2>
      )}
      <div className="gap-4  px-3 py-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
        {dataPage?.results?.map(movie => (
          <Card
            movieData={movie}
            key={movie.id}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        ))}
      </div>
      <PaginationComponent count={dataPage.total_pages} setDataPage={setDataPage} />
    </div>
  );
};

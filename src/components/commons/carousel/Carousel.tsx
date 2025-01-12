'use client';
import { Card } from '@/components/commons';
import { scrollX } from '@/hooks';
import { Result } from '@/types';
import { ArrowBackIosNew, ArrowForwardIos, StarRateOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

export const Carousel = () => {
  const [favorites, setFavorites] = useState<Result[]>([]);
  const [scroll, setScroll] = useState('init');
  useEffect(() => {
    const getfavoritesMovies = localStorage?.getItem('favoritesMovies');
    const favoritesMovies = getfavoritesMovies ? JSON.parse(getfavoritesMovies) : [];
    setFavorites(favoritesMovies);
  }, []);

  if (!favorites.length) {
    return <></>;
  }
  return (
    <div className="px-3 py-5 relative">
      <h2 className="text-2xl font-bold mb-4">
        <StarRateOutlined className="mt-[-10px]" />
        Mis Favoritas
      </h2>
      <div id="carouselFavorite" className="overflow-auto custom-scrollbar-none pb-5">
        <div className="flex gap-4 pr-20 ">
          {favorites.map(movie => (
            <div key={movie.id} className=" min-w-[220px] ">
              <Card movieData={movie} setFavorites={setFavorites} favorites={favorites} />
            </div>
          ))}
        </div>
      </div>
      {!(scroll === 'init') && (
        <div className="absolute flex justify-center mt-4 left-1 top-[35%] shadow-xl shadow-slate-700 bg-white rounded-full">
          <IconButton
            onClick={() => scrollX({ element: 'carouselFavorite', setScroll: setScroll })}
          >
            <ArrowBackIosNew />
          </IconButton>
        </div>
      )}
      {!(scroll === 'end') && (
        <div className="absolute flex justify-center mt-4 right-1 top-[35%] shadow-xl shadow-slate-700 bg-white rounded-full">
          <IconButton
            onClick={() =>
              scrollX({ element: 'carouselFavorite', isToLeft: true, setScroll: setScroll })
            }
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      )}
    </div>
  );
};

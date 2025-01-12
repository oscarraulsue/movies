'use client';
import { Result } from '@/types';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
const Rating = dynamic(() => import('@mui/material/Rating'), { ssr: false });

export const Card = ({
  movieData,
  setFavorites,
  favorites,
}: {
  movieData: Result;
  setFavorites: Dispatch<SetStateAction<Result[]>>;
  favorites: Result[];
}) => {
  const average = movieData?.vote_average ? movieData.vote_average / 2 : 0;

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const favorite = favorites.some((movie: Result) => movie?.id === movieData?.id);
    setIsFavorite(favorite);
  }, [favorites]);

  const handleFavorites = (movie: Result) => {
    if (isFavorite) {
      const newFavoritesMovies = favorites.filter((fav: Result) => fav.id !== movie?.id);
      localStorage.setItem('favoritesMovies', JSON.stringify(newFavoritesMovies));
      setFavorites(newFavoritesMovies);
    } else {
      const newFavoritesMovies = [...favorites, movie];
      localStorage.setItem('favoritesMovies', JSON.stringify(newFavoritesMovies));
      setFavorites(newFavoritesMovies);
    }
  };
  return (
    <>
      <div className="relative">
        <div className="absolute " style={{ top: '3px', right: '3px' }}>
          <IconButton
            sx={!isFavorite ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } : {}}
            aria-label="add to favorites"
            onClick={() => handleFavorites(movieData)}
          >
            <FavoriteIcon sx={isFavorite ? { color: 'red' } : {}} />
          </IconButton>
        </div>
        <Link href={`/movie/${movieData?.id}`} passHref>
          <div>
            <Image
              src={`https://www.themoviedb.org/t/p/w1280${movieData?.poster_path}`}
              alt={movieData?.title || ''}
              width={250}
              height={300}
              className="rounded-md h-[300px] w-[250px] object-cover"
            />
          </div>
        </Link>
      </div>
      <Link href={`/movie/${movieData?.id}`} passHref>
        <div>
          <h2 className="font-bold w-full">{movieData?.title}</h2>
          <Rating name="half-rating-read" defaultValue={average} precision={0.01} readOnly />
          <h3>{movieData?.release_date}</h3>
        </div>
      </Link>
    </>
  );
};

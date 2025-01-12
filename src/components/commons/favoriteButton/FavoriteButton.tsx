'use client';
import React, { useEffect, useState } from 'react';
import { iMovie } from '@/types';
import dynamic from 'next/dynamic';

const FavoriteIcon = dynamic(() => import('@mui/icons-material/Favorite'), { ssr: false });
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false });

export const FavoriteButton = ({ movieData }: { movieData: iMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem('favoritesMovies');
    const favorites = data ? JSON.parse(data) : [];
    const favorite = favorites?.some((movie: iMovie) => movie?.id === movieData?.id);
    setIsFavorite(favorite);
  }, []);
  const handleFavorites = () => {
    const data = localStorage.getItem('favoritesMovies');
    const favorites = data ? JSON.parse(data) : [];
    if (isFavorite) {
      const newFavoritesMovies = favorites.filter((fav: iMovie) => fav.id !== movieData?.id);
      localStorage.setItem('favoritesMovies', JSON.stringify(newFavoritesMovies));
      setIsFavorite(false);
    } else {
      const newFavoritesMovies = [...favorites, movieData];
      localStorage.setItem('favoritesMovies', JSON.stringify(newFavoritesMovies));
      setIsFavorite(true);
    }
  };
  return (
    <IconButton
      sx={{ backgroundColor: '#94a3b8', border: '2px solid #030712' }}
      aria-label="add to favorites"
      onClick={() => handleFavorites()}
    >
      <FavoriteIcon sx={isFavorite ? { color: 'red' } : {}} />
    </IconButton>
  );
};

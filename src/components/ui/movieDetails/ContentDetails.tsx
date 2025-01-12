'use client';
import { FavoriteButton, ModalVideo } from '@/components/commons';
import { iCredits, iMovie } from '@/types';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Rating = dynamic(() => import('@mui/material/Rating'), { ssr: false });

export const ContentDetails = ({ movie }: { movie: iMovie; credits: iCredits }) => {
  const [open, setOpen] = useState(false);
  const average = movie?.vote_average ? movie.vote_average / 2 : 0;
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const seconds = movie.runtime % 60;

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-white shadow-lg">{movie.title}</h1>
        <div
          className="flex flex-col sm:flex-row gap-4 text-xl text-gray-500"
          style={{ textShadow: '1px 1px 1px white' }}
        >
          <p>{movie.release_date}</p>
          <div className="flex gap-2">
            {movie.genres?.map(genre => <span key={genre.id}>{genre.name}</span>)}
          </div>
          <p>
            Duración: {hours}:{minutes}:{seconds}
          </p>
        </div>
      </div>
      <div className="bg-gray-400 border-2 border-gray-950 rounded-3xl w-min px-2 pt-[2px] mt-7 ">
        <Rating name="half-rating-read" defaultValue={average} precision={0.01} readOnly />
      </div>
      <div className="flex gap-4 mt-10">
        <FavoriteButton movieData={movie} />
        {movie.id && (
          <>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 bg-slate-400 border-2 border-gray-950 rounded-3xl px-2"
            >
              Ver trailer <VideoCameraIcon className="h-5 w-5" />
            </button>
            <ModalVideo title={movie.title} video={movie.id} open={open} setOpen={setOpen} />
          </>
        )}
      </div>
      <div>
        <h2 className="text-3xl text-white mt-10 mb-4">Detalles</h2>
        <p className="text-lg text-white">{movie.overview}</p>
      </div>
    </div>
  );
};

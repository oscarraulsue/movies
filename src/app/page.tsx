import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import './globals.css';
import { Carousel } from '@/components/commons';
import { MoviesSection } from '@/components/ui/home/MoviesSection';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://movies-neon-eta.vercel.app/'),
    title: 'The Movie Database',
    description: 'Encuentra las mejores películas y series de televisión',
    creator: 'Oscar Sue',
    openGraph: {
      images: ['/logo.jpg'],
      title: 'The Movie Database',
      description: 'Encuentra las mejores películas y series de televisión',
      type: 'website',
      url: 'https://movies-neon-eta.vercel.app/',
      siteName: 'The Movie Database',
    },
    twitter: {
      site: '@themoviedb',
      images: ['/logo.jpg'],
      title: 'The Movie Database',
      description: 'Encuentra las mejores películas y series de televisión',
    },
  };
}
// get search params
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchData = await searchParams;
  const url = `${process.env.URL_BASE}/trending/movie/week?language=es-ES`;
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
  if (!movies || movies.success === false) notFound();
  return (
    <main className="h-auto sm:min-h-[calc(100vh-64px)] items-center">
      <div>
        <Suspense fallback={<div>Loading...</div>}>{!searchData.search && <Carousel />}</Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <MoviesSection movies={movies} />
        </Suspense>
      </div>
    </main>
  );
}

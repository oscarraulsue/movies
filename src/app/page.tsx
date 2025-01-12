import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import './globals.css';
import { Carousel } from '@/components/commons';
import { MoviesSection } from '@/components/ui/home/MoviesSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Movie Database',
    description: 'Encuentra las mejores películas y series de televisión',
    creator: 'Oscar Sue',
    openGraph: {
      images: ['/logo.jpg'],
      title: 'The Movie Database',
      description: 'Encuentra las mejores películas y series de televisión',
      type: 'website',
      url: 'https://localhost:3000/',
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
    <main className="min-h-[calc(100vh-64px)] items-center">
      <div>
        {!searchData.search && <Carousel />}
        <MoviesSection movies={movies} />
      </div>
    </main>
  );
}

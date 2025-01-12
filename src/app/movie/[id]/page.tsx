import { getCredits, getMovieDetails, getTrendingMovies } from '@/app/actions';
import { ContentDetails, Credits } from '@/components/ui';
import { iMovies } from '@/types';
import { ArrowBackIos } from '@mui/icons-material';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const movies: iMovies = await getTrendingMovies(1);
  return movies.results.map(movie => ({
    id: String(movie.id),
  }));
}
export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;
  const movie = await getMovieDetails(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://movies-neon-eta.vercel.app/'),
    title: movie.title,
    description: movie.overview,
    creator: 'Oscar Sue',
    openGraph: {
      images: [`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`, ...previousImages],
      title: movie.title,
      description: movie.overview,
      type: 'website',
      url: `https://www.themoviedb.org/movie/${movie.id}`,
      siteName: 'The Movie Database',
    },
    twitter: {
      site: '@themoviedb',
      images: [`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`, ...previousImages],
      title: movie.title,
      description: movie.overview,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  if (!id) notFound();

  const movie = await getMovieDetails(id);
  const credits = await getCredits(id);

  return (
    <main>
      <Link href="/">
        <ArrowBackIos /> atrás
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <div
          style={{
            backgroundImage: `url('https://www.themoviedb.org/t/p/w1280${movie.backdrop_path})`,
            height: 'calc(100vh - 64px)',
          }}
        >
          <div className="bg-slate-800/[0.7] h-full flex flex-col sm:flex-row gap-4 p-5">
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                width={400}
                height={600}
                src={`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`}
                alt={movie.title}
                className="rounded-3xl hidden sm:block"
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <ContentDetails movie={movie} credits={credits} />
            </Suspense>
          </div>
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Credits credits={credits} />
      </Suspense>
    </main>
  );
}

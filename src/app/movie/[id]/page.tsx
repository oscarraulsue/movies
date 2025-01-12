import { getCredits, getMovieDetails, getTrendingMovies } from '@/app/actions';
import { ContentDetails, Credits } from '@/components/ui';
import { iMovies } from '@/types';
import classNames from 'classnames';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
      <div
        style={{
          backgroundImage: `url('https://www.themoviedb.org/t/p/w1280${movie.backdrop_path})`,
          height: 'calc(100vh - 64px)',
        }}
      >
        <div className="bg-slate-800/[0.7] h-full flex gap-4 p-5">
          <Image
            width={400}
            height={600}
            src={`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            className="rounded-3xl"
          />
          <ContentDetails movie={movie} credits={credits} />
        </div>
      </div>
      <Credits credits={credits} />
    </main>
  );
}

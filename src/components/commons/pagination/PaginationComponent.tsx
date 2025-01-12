'use client';
import { getMoviesByTitle, getTrendingMovies } from '@/app/actions';
import { restartScroll } from '@/hooks';
import { iMovies } from '@/types';
import { Pagination } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

async function onChange({
  page,
  setDataPage,
  params,
}: {
  page: number;
  setDataPage: Dispatch<SetStateAction<iMovies>>;
  params?: string;
}) {
  const data = params
    ? await getMoviesByTitle({ page: page.toString(), query: params })
    : await getTrendingMovies(page);
  setDataPage(data);
}

export function PaginationComponent({
  count,
  setDataPage,
}: {
  count: number;
  setDataPage: Dispatch<SetStateAction<iMovies>>;
}) {
  const searchParams = useSearchParams();
  const params = searchParams.get('search')?.toString();

  return (
    <div className="w-full flex items-center justify-center py-5">
      <Pagination
        count={count}
        color="primary"
        onChange={(_, value) => {
          restartScroll();
          onChange({ page: value, setDataPage, params });
        }}
      />
    </div>
  );
}

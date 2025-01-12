import { Carousel } from '@/components/commons';
import { ArrowBackIos } from '@mui/icons-material';
import Link from 'next/link';
import { Suspense } from 'react';

export default function NamePage() {
  return (
    <div>
      <Link href="/">
        <ArrowBackIos /> atrás
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel />
      </Suspense>
    </div>
  );
}

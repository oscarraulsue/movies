import { Carousel } from '@/components/commons';
import { Suspense } from 'react';

export default function NamePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel />
      </Suspense>
    </div>
  );
}

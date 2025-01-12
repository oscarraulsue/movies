'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Algo salio mal!</h2>
      <button onClick={() => router.replace('/')}>Ir al inicio</button>
    </div>
  );
}

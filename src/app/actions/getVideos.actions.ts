'use server';

import { iVideos } from '@/types';
import { notFound } from 'next/navigation';

export async function getVideo(id: number): Promise<iVideos> {
  try {
    const url = `${process.env.URL_BASE}/movie/${id}/videos?language=es-ES`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };

    fetch(url, options);

    const res = await fetch(url, options);
    const video = await res.json();
    if (!video || video.success === false) notFound();
    return video;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

'use client';

import { ImagePlayer } from '../ui/image-player';
import Image from 'next/image';
import { LayeredText } from '../ui/layered-text';

export default function ActualitesHero() {
  const IMAGES = [
    '/happy-university-students-using-laptop-while-sitting-hallway.jpg',
    '/actions/people-meeting-support-group.jpg',
    '/about/conference-room-hotel.jpg',
    '/about/authentic-book-club-scene.jpg',
  ];
  const lines = [
    { top: '\u00A0', bottom: 'Toute' },
    { top: 'Toute', bottom: "l'actualité" },
    { top: "l'actualité", bottom: 'de' },
    { top: 'de', bottom: 'Pont' },
    { top: 'Pont', bottom: 'du' },
    { top: 'du', bottom: 'Futur' },
    { top: 'Futur', bottom: '\u00A0' },
  ];

  return (
    <section className="relative min-h-[70vh] flex max-lg:flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-50 to-primary-50 pt-12 lg:pt-24 pb-12">
      <div className="max-w-7xl lg:flex-1 mx-auto px-6 relative z-10">
        <div className="text-center">
          <LayeredText lines={lines} />
        </div>
      </div>
      <div className="h-full inset-0 lg:flex-1 w-full  flex items-center justify-center">
        <ImagePlayer
          images={IMAGES}
          interval={200}
          renderImage={(src) => (
            <Image
              src={src}
              width={400}
              height={300}
              className="size-full aspect-video h-auto max-h-full px-6 max-w-sm object-cover inline-block align-middle"
              alt="showcalse"
            />
          )}
        />
      </div>
    </section>
  );
}

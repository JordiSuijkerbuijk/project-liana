'use client';

import Container from '@/components/Container';
import playScrollBasedAnimation from '@/helpers/playScrollBasedAnimation';
import { useScroll } from '@/helpers/useScroll';
import { EmbedField } from '@prismicio/types';
import anime, { AnimeTimelineInstance } from 'animejs';
import { RefObject, useCallback, useEffect, useRef } from 'react';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export type VideoSliceProps = {
  title?: string;
  youtube?: EmbedField;
  youtubeId?: string;
};

export default function VideoSlice({ title, youtubeId, youtube }: VideoSliceProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLIFrameElement>(null);
  const titleWrapper = useRef<HTMLHeadingElement>(null);

  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const timelineSize = useRef<'mobile' | 'tablet' | 'desktop'>('mobile');

  const handleResize = useCallback(() => {
    const size =
      window.innerWidth < 1024 ? (window.innerWidth < 768 ? 'mobile' : 'tablet') : 'desktop';
    if (timelineSize.current !== size) createTimeline();
  }, []);

  useEffect(() => {
    createTimeline();

    window.addEventListener('resize', handleResize);
    () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  function createTimeline() {
    const words = titleWrapper?.current?.querySelectorAll('.word');

    const paddingValues = {
      mobile: {
        start: '0.25rem',
        end: '1rem',
      },
      tablet: {
        start: '0.5rem',
        end: '2rem',
      },
      desktop: {
        start: '0.75rem',
        end: '3.5rem',
      },
    };

    const size =
      window.innerWidth < 1024 ? (window.innerWidth < 768 ? 'mobile' : 'tablet') : 'desktop';
    const paddingAmountStart = paddingValues[size].start;
    const paddingAmountEnd = paddingValues[size].end;

    timelineSize.current = size;

    timelineRef.current = anime
      .timeline({
        duration: 100,
        easing: 'linear',
        autoplay: false,
      })
      .add({
        targets: words,
        paddingLeft: [paddingAmountStart, paddingAmountEnd],
        paddingRight: [paddingAmountStart, paddingAmountEnd],
      })
      .add(
        {
          targets: videoContainerRef.current,
          clipPath: ['inset(0% 7.5% 0% 7.5% round 1rem)', 'inset(0% 0% 0% 0% round 0rem)'],
        },
        0
      )
      .add(
        {
          targets: videoRef.current,
          scale: [1, 1.1],
        },
        0
      );
  }

  // Scroll-based zoom animation
  const sectionContainer = useScroll(
    (progress) => {
      playScrollBasedAnimation(progress, timelineRef.current);
    },
    {
      startTracking: 'top',
      stopTracking: 'top',
    }
  );

  const splitTitle = title?.split(' ');

  return (
    <section className='flex flex-col w-full py-24 translate-y-4 opacity-0 video-animation'>
      <div ref={sectionContainer as RefObject<HTMLDivElement>}>
        <Container className='flex justify-center pt-12 pb-8 overflow-hidden lg:pb-12 lg:pt-24'>
          <h2
            className='flex flex-col justify-center font-semibold text-center text-heading-2'
            ref={titleWrapper}
          >
            <span>
              {splitTitle?.slice(0, splitTitle?.length / 2).map((item, key) => (
                <span className='px-3 word' key={`0-${item}-${key}`}>
                  {item}
                </span>
              ))}
            </span>
            <span>
              {splitTitle?.slice(splitTitle?.length / 2, splitTitle?.length).map((item, key) => (
                <span className='px-3 word' key={`1-${item}-${key}`}>
                  {item}
                </span>
              ))}
            </span>
          </h2>
        </Container>
      </div>
      {youtubeId && youtube?.title && (
        <div
          ref={videoContainerRef}
          className='relative w-full h-screen overflow-hidden clip-path-video-element'
        >
          <LiteYouTubeEmbed
            params='start=0&controls=0&disablekb=1&autoplay=0&loop=1&muted=1'
            id={youtubeId}
            title={youtube?.title}
            wrapperClass='absolute inset-0 w-full h-full'
            iframeClass='absolute top-0 left-0 bg-cover bg-center w-full h-full'
            poster='maxresdefault'
            muted
          />
        </div>
      )}
    </section>
  );
}

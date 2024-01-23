'use client';

import Container from '@/components/Container';
import playScrollBasedAnimation from '@/helpers/playScrollBasedAnimation';
import { useScroll } from '@/helpers/useScroll';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime, { AnimeTimelineInstance } from 'animejs';
import { RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * Props for `VideoSlice`.
 */
export type VideoSliceProps = SliceComponentProps<Content.VideoSliceSlice>;

/**
 * Component for "VideoSlice" Slices.
 */
// const VideoSlice = ({ slice }: VideoSliceProps): JSX.Element => {
const VideoSlice = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
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
          clipPath: ['inset(0% 7.5% 0% 7.5%)', 'inset(0% 0% 0% 0%)'],
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
      stopTracking: 'top'
    }
  );

  return (
    <section className='flex flex-col w-full py-24 translate-y-4 opacity-0 video-animation'>
      <div ref={sectionContainer as RefObject<HTMLDivElement>}>
        <Container className='flex justify-center pt-12 pb-8 overflow-hidden lg:pb-12 lg:pt-24'>
          <h2
            className='flex flex-col justify-center font-semibold text-center text-heading-2'
            ref={titleWrapper}
          >
            <span>
              <span className='px-3 word'>Create</span>
              <span className='px-3 word'>stunning</span>
              <span className='px-3 word'>websites</span>
            </span>
            <span>
              <span className='px-3 word'>with</span>
              <span className='px-3 word'>Liana</span>
            </span>
          </h2>
        </Container>
      </div>
      <div
        className='relative w-full h-screen overflow-hidden clip-path-video-element'
        ref={videoContainerRef}
      >
        <video
          muted
          disablePictureInPicture
          disableRemotePlayback
          loop
          playsInline
          autoPlay
          className='absolute inset-0 object-cover w-full h-full'
          ref={videoRef}
        >
          <source src='https://terrazabalear.com/wp-content/uploads/2023/03/terraza_balear-awakening_senses_-_loop-1.mp4-1080p-1.mp4' />
        </video>
      </div>
    </section>
  );
};

export default VideoSlice;

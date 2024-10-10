import type { Metadata } from 'next';

// import { getClient } from '@/helpers/getClient';

export const metadata: Metadata = {
  title: 'Liana - Creating digital experiences',
  description:
    'Liana is a young creative digital agency that makes powerful and engaging web-based solutions.',
};

export default async function Home() {
  // const client = getClient();
  // const data = await client?.getSingle('home');

  return (
    <main className="relative z-10 flex flex-col items-center justify-between min-h-screen">
      <div className="relative z-20 w-full">
        {/* <SliceZone slices={data?.data?.slices} components={components} /> */}
      </div>

      <div className="fixed top-0 left-0 flex justify-around w-full h-0 lines-animation">
        <div className="w-0.5 h-full bg-color-text opacity-20" />
        <div className="w-0.5 h-full bg-color-text opacity-20" />
        <div className="w-0.5 h-full bg-color-text opacity-20" />
        <div className="w-0.5 h-full bg-color-text opacity-20 hidden lg:block" />
        <div className="w-0.5 h-full bg-color-text opacity-20 hidden lg:block" />
      </div>
    </main>
  );
}

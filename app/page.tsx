import { getClient } from '@/helpers/getClient';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';

export default async function Home() {
  const client = getClient();
  const data = await client?.getSingle('home');

  return (
    <main className='relative z-10 flex flex-col items-center justify-between min-h-screen'>
      <div className='relative z-20 w-full'>
        <SliceZone slices={data?.data?.slices} components={components} />
      </div>
      {/* <OnScrollLine /> */}

      <div className='fixed top-0 left-0 flex justify-around w-full h-0 lines-animation'>
        <div className='w-0.5 h-full bg-color-text opacity-20' />
        <div className='w-0.5 h-full bg-color-text opacity-20' />
        <div className='w-0.5 h-full bg-color-text opacity-20' />
        <div className='w-0.5 h-full bg-color-text opacity-20 hidden lg:block' />
        <div className='w-0.5 h-full bg-color-text opacity-20 hidden lg:block' />
      </div>
    </main>
  );
}

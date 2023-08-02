import HeadingAnimation2 from '@/components/HeadingAnimation2';
import Section from '@/components/Section';
import SliceZone, { Components } from '@/helpers/SliceZone';
import { getClient } from '@/helpers/getClient';
import Projects from '@/slices/Projects';

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle('home');

    return { props };
  }
}

const components: Components = {
  projects: Projects,
};

export default async function Home() {
  const home = await getData();
  const data = home?.props?.data;

  return (
    <main className='flex flex-col items-center justify-between min-h-screen'>
      <Section />
      <Section color='#000' className='flex items-center justify-center'>
        <HeadingAnimation2 text='test' />
      </Section>
      <Section />
      {SliceZone(data?.slices, components)}
      <Section />
      <Section />
    </main>
  );
}

import Section from '@/components/Section';
import SliceZone, { Components } from '@/helpers/SliceZone';
import { getClient } from '@/helpers/getClient';
import { Slice } from '@prismicio/client';
import ProjectsSection from './sections/ProjectsSection';

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle('home');

    return { props };
  }
}

const components: Components = {
  projects: (props: Slice) => (
    <Section color='#000'>
      <ProjectsSection {...props} />
    </Section>
  ),
};

export default async function Home() {
  const home = await getData();
  const data = home?.props?.data;

  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <Section />
      <Section />
      <Section color='#fefefe'>
        <ProjectsSection />
      </Section>
      {SliceZone(data?.slices, components)}
      <Section />
      <Section />
    </main>
  );
}

import Section from '@/components/Section';
import { Components } from '@/helpers/SliceZone';
import { getClient } from '@/helpers/getClient';
import ProjectsSection from './sections/ProjectsSection';

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle('home');

    return { props };
  }
}

const components: Components = {
  projects: ProjectsSection,
};

export default async function Home() {
  const home = await getData();
  const data = home?.props?.data;

  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <Section />
      <Section />
      <Section color='#f7938b' />
      <Section />
      <Section />
      {/* {SliceZone(data?.slices, components)} */}
    </main>
  );
}

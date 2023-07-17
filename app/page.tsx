import { Components } from '@/helpers/SliceZone';
import { getClient } from '@/helpers/getClient';
import HeadingAnimation from './components/HeadingAnimation';

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle('home');

    return { props };
  }
}

const components: Components = {};

export default async function Home() {
  const home = await getData();
  if (!home) return;

  const data = home.props.data;

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <HeadingAnimation text="Project liana" />
      {/* {SliceZone(data.slices, components)} */}
    </main>
  );
}

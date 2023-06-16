import { Components } from "@/helpers/SliceZone";
import { getClient } from "@/helpers/getClient";
import FakeSection from "./sections/FakeSection";

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle("home");

    return { props };
  }
}

const components: Components = {};

export default async function Home() {
  const home = await getData();
  if (!home) return;

  const data = home.props.data;

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="h-screen bg-[beige] w-full"></div>
      <FakeSection />
      <div className="h-screen bg-[beige] w-full"></div>
    </main>
  );
}

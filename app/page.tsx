import Section from "@/components/Section";
import SliceZone, { Components } from "@/helpers/SliceZone";
import { getClient } from "@/helpers/getClient";
import Projects from "@/slices/Projects";

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle("home");

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
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>Welcome to project Liana</h1>
      <p>
        Welcome to the future of website creation! Say goodbye to the hassle of
        coding or spending countless hours designing every element from scratch.
        With SectionMaster, our revolutionary product, you can now effortlessly
        create breathtaking websites by arranging pre-built sections like
        building blocks. Whether youre a business owner, a creative
        professional, or an aspiring entrepreneur, SectionMaster empowers you to
        bring your vision to life with unparalleled ease and flexibility.
      </p>
      <Section />
      <Section />
      {SliceZone(data?.slices, components)}
      <Section />
      <Section />
    </main>
  );
}

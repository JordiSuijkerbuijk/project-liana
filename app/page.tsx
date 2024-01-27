import ProjectsSlice from "@/components/ProjectsV2Slice";
import { Components } from "@/helpers/SliceZone";
import { getClient } from "@/helpers/getClient";
import Hero from "@/slices/Hero";
import HighlightedText from "@/slices/HighlightedText";
import Projects from "@/slices/Projects";
import VideoSlice from "@/slices/VideoSlice";

async function getData() {
  const client = getClient();

  if (client) {
    const props = await client.getSingle("home");

    return { props };
  }
}

const components: Components = {
  projects: Projects,
  video_slice: VideoSlice,
  hero: Hero,
  highlighted_text: HighlightedText,
};

export default async function Home() {
  const home = await getData();
  const data = home?.props?.data;

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen">
      {/* `TODO: fix all commented out stuff */}
      {/* <div className='relative z-10 w-full'>{SliceZone(data?.slices, components)}</div> */}
      <ProjectsSlice />
      {/* <OnScrollLine /> */}

      <div className="fixed top-0 left-0 flex justify-around w-full h-0 lines-animation">
        <div className="w-0.5 h-full bg-white/10" />
        <div className="w-0.5 h-full bg-white/10" />
        <div className="w-0.5 h-full bg-white/10" />
        <div className="w-0.5 h-full bg-white/10" />
        <div className="w-0.5 h-full bg-white/10" />
      </div>
    </main>
  );
}

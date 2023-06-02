'use client';

import ProjectsSection from './sections/ProjectsSection';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24 py-96'>
      <ProjectsSection />
    </main>
  );
}

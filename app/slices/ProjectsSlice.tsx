import ProjectsSliceItem from '@/components/ProjectsSliceItem';
import { ImageField } from '@prismicio/types';

export type ProjectSliceProps = {
  items: Array<{
    type: string;
    image: ImageField;
    image2: ImageField;
    title: string;
    description: string;
  }>;
};

export default function ProjectsSlice({ items }: ProjectSliceProps): JSX.Element {
  return (
    <section className='w-full'>
      {Array.isArray(items) &&
        items.map((item, key) => {
          const isFirstItem = key === 0;
          const isLastItem = key === items.length - 1;
          const isMiddleItem = !isFirstItem && !isLastItem;
          return (
            <ProjectsSliceItem
              {...item}
              isFirstItem={isFirstItem}
              isLastItem={isLastItem}
              isMiddleItem={isMiddleItem}
              key={key}
            />
          );
        })}
      {/* Setting empty 100vh div to make sure contact slice doesn't overlap with the projects slice */}
      <div className='w-full h-screen' />
    </section>
  );
}

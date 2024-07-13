import autoMapping from '@/helpers/autoMapping';
import type { ProjectSliceProps } from '@/slices/ProjectsSlice';
import ProjectsSlice from '@/slices/ProjectsSlice';
import { asText, Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import model from './model.json';

/**
 * Props for `ProjectSlice`.
 */
export type ProjectProps = SliceComponentProps<Content.ProjectsSlice>;

export default function Projects({ slice }: ProjectProps): JSX.Element | null {
  let props = autoMapping<ProjectSliceProps>(slice, model);

  if (props && Array.isArray(slice?.items)) {
    props.items = slice?.items?.map((item) => {
      return {
        title: asText(item.title),
        description: asText(item.description),
        image: item.background_image,
        image2: item.hover_image,
      };
    });
    return <ProjectsSlice {...props} />;
  }

  return null;
}

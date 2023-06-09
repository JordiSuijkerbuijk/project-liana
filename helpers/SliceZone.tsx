import { Slice } from '@prismicio/client';

export type Components = {
  [key: string]: string;
};

export default function SliceZone(slices: Slice[] = [], components: Components = {}) {
  return slices.map((slice: Slice, key) => {
    const Element = components[slice.slice_type];

    return <Element {...slice} key={key} />;
  });
}

import { Slice } from '@prismicio/client';

export type Components = {
  [key: string]: (slice: any) => JSX.Element;
};

export default function SliceZone(slices: any, components: Components) {
  return slices.map((slice: Slice, key: number) => {
    const Element = components[slice.slice_type];

    return <Element {...slice} key={key} />;
  });
}

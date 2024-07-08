import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import autoMapping from '@/helpers/autoMapping';
import HeroSlice from '@/slices/HeroSlice';

import type { HeroSliceProps } from '@/slices/HeroSlice';

import model from './model.json';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
export default function Hero({ slice }: HeroProps): JSX.Element {
  const props = autoMapping<HeroSliceProps>(slice, model);
  return <HeroSlice {...props} />;
}

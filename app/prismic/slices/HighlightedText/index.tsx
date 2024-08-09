'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import autoMapping from '@/helpers/autoMapping';
import type { HighlightedTextSliceProps } from '@/slices/HighlightedTextSlice';
import HighlightedTextSlice from '@/slices/HighlightedTextSlice';

import model from './model.json';

/**
 * Props for `HighlightedText`.
 */
export type HighlightedTextProps = SliceComponentProps<Content.HighlightedTextSlice>;

/**
 * Component for "HighlightedText" Slices.
 */
const HighlightedText = ({ slice }: HighlightedTextProps): JSX.Element => {
  let props = autoMapping<HighlightedTextSliceProps>(slice, model);

  if (props?.description) {
    props.splitDescription = props.description ? props.description.split(/\s/) : undefined;
  }

  return <HighlightedTextSlice {...props} />;
};

export default HighlightedText;

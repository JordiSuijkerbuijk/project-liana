import Container from '@/components/Container';
import { Content, HTMLRichTextMapSerializer, asHTML } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `HighlightedText`.
 */
export type HighlightedTextProps = SliceComponentProps<Content.HighlightedTextSlice>;

const serializer = {
  heading2: ({ children }: HTMLRichTextMapSerializer) => {
    return `<span class='flex flex-wrap items-center gap-x-2 text-7xl'><div class='px-8 py-4 bg-pink rounded-full text-lg h-full'>Agency</div>${children}</span>`;
  },
  strong: ({ children }: HTMLRichTextMapSerializer) => {
    return `<div class="bg-purple rounded-xl px-6 py-2">${children}</div>`;
  },
};

/**
 * Component for "HighlightedText" Slices.
 */
const HighlightedText = (slice: Content.HighlightedTextSlice): JSX.Element => {
  const description = asHTML(slice.primary.description, { serializer });
  return (
    <section>
      <Container className='flex lg:max-w-6xl'>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
    </section>
  );
};

export default HighlightedText;

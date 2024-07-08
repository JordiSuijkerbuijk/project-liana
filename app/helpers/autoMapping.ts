import { LinkField, RichTextField, SharedSlice, asHTML } from '@prismicio/client';
import createLinkType from './createLinkType';

type Model = {
  variations: Array<{
    primary: {
      [key: string]:
        | {
            type: string;
            config: {
              label: string;
            };
          }
        | undefined;
    };
    id: string;
  }>;
};

export default function autoMapping<Type>(slice: SharedSlice, model: Model): Type | undefined {
  let props: { [key: string]: unknown } = {};

  const currentVariation = model.variations.find((item) => item.id === slice?.variation);

  if (!currentVariation) return;

  if (slice?.id) {
    props.sliceId = slice.id;
  }

  if (slice?.variation) {
    props.variation = slice.variation;
  }

  Object.keys(currentVariation?.primary).map((key) => {
    const item = currentVariation?.primary[key];
    if (!item) return;

    if (item.type === 'StructuredText') {
      // We don't specifically check the type since we know for sure the
      // RichtTextField type is correct since we get it from the model.json
      props[key] = asHTML(slice.primary[key] as RichTextField);
      return;
    }

    if (item.type === 'Link') {
      // We don't specifically check the type since we know for sure the
      // LinkField type is correct since we get it from the model.json
      const link = slice.primary[key] as LinkField;

      props[key] = createLinkType(link);
      return;
    }

    props[key] = slice.primary[key];
  });

  return props as Type;
}

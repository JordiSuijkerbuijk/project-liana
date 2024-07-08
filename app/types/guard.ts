import { FilledLinkToWebField, LinkField, PrismicDocument } from '@prismicio/types';

export function isLinkToWebField(
  field: LinkField | PrismicDocument
): field is FilledLinkToWebField {
  return 'url' in field && 'target' in field;
}

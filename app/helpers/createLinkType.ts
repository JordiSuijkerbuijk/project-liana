import { LinkType } from '@/types/general';
import { isLinkToWebField } from '@/types/guard';
import { LinkField, PrismicDocument, asLink } from '@prismicio/client';

export default function createLinkType(link: LinkField | PrismicDocument): LinkType {
  return {
    link_type: 'link_type' in link ? link?.link_type || 'Any' : 'Document',
    url: asLink(link),
    target: isLinkToWebField(link) ? link.target : undefined,
  };
}

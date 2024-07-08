import { EmbedField } from '@prismicio/types';

export default function splitYoutube(embed: EmbedField) {
  if (embed?.embed_url?.includes('youtu.be')) {
    return embed?.embed_url.split('youtu.be/')[1];
  }
  return embed?.embed_url.split('?v=')?.[1]?.split('&')?.[0];
}

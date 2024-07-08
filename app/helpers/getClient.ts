import * as prismic from '@prismicio/client';

export function getClient(options = {}) {
  const config = process.env;

  if (!config.PRISMIC_PROJECT) return;

  // Define the Prismic API endpoint
  const endpoint = `https://${config.PRISMIC_PROJECT}.cdn.prismic.io/api/v2`;
  // Assign the new Prismic Client
  const client = prismic.createClient(endpoint);

  // Return the client
  return client;
}

import { createClient } from '@sanity/client';
import { defineQuery } from 'groq';
import { fallbackPosts, type BlogPost } from '@/data/fallbackPosts';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client = projectId ? createClient({ projectId, dataset, apiVersion: '2026-08-01', useCdn: false, perspective: 'published' }) : null;

const POST_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  author->{name, bio},
  categories[]->{"_key": _id, title, "slug": slug.current},
  mainImage{alt, asset->{url, metadata{lqip, dimensions{width, height, aspectRatio}}}},
  seo
`;

const POSTS_QUERY = defineQuery(/* groq */ `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) { ${POST_FIELDS} }`);
const POST_QUERY = defineQuery(/* groq */ `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS}, body[]{..., asset->{url, metadata{lqip, dimensions}}} }`);

export async function getPosts(): Promise<BlogPost[]> {
  if (!client) {
    if (import.meta.env.DEV) return fallbackPosts;
    throw new Error('PUBLIC_SANITY_PROJECT_ID is required to build the production blog.');
  }

  try {
    return await client.fetch<BlogPost[]>(POSTS_QUERY);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Sanity is unavailable; using local fallback posts in development.', error);
      return fallbackPosts;
    }
    throw error;
  }
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  if (!client) {
    if (import.meta.env.DEV) return fallbackPosts.find((post) => post.slug === slug);
    throw new Error('PUBLIC_SANITY_PROJECT_ID is required to build the production blog.');
  }

  try {
    return (await client.fetch<BlogPost | null>(POST_QUERY, { slug })) ?? undefined;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Sanity is unavailable; using a local fallback post in development.', error);
      return fallbackPosts.find((post) => post.slug === slug);
    }
    throw error;
  }
}

import { createClient } from '@sanity/client';
import { defineQuery } from 'groq';
import { fallbackPosts, type BlogPost } from '@/data/fallbackPosts';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client = projectId ? createClient({ projectId, dataset, apiVersion: '2026-08-01', useCdn: true, perspective: 'published' }) : null;

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
  if (!client) return fallbackPosts;
  try { return await client.fetch<BlogPost[]>(POSTS_QUERY); } catch { return fallbackPosts; }
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  if (!client) return fallbackPosts.find((post) => post.slug === slug);
  try { return (await client.fetch<BlogPost | null>(POST_QUERY, { slug })) ?? undefined; } catch { return fallbackPosts.find((post) => post.slug === slug); }
}

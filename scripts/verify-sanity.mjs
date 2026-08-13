import { createClient } from '@sanity/client';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');
const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-08-13',
  useCdn: false,
  perspective: 'published',
});

const result = await client.fetch(`{
  "authors": *[_type == "author"]{_id, name, defined(image) => {"hasImage": true}},
  "categories": *[_type == "category"] | order(title asc){_id, title, "slug": slug.current},
  "posts": *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    "hasImage": defined(mainImage.asset),
    "hasSeo": defined(seo.title) && defined(seo.description)
  }
}`);

console.log(JSON.stringify(result, null, 2));

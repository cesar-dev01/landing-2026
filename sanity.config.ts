import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId =
  import.meta.env.SANITY_STUDIO_PROJECT_ID || import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.SANITY_STUDIO_DATASET || import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'richard-agapito-blog',
  title: 'Richard Agapito — Contenido',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

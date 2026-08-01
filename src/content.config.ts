import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Definition der Projects-Collection mit Markdown-Loader
const projects = defineCollection({
  loader: glob({ 
    pattern: '**/[^_]*.{md,mdx}', 
    base: './src/content/projects' 
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    cover: image().optional(),
  }),
});

// Export aller verfügbaren Collections
export const collections = { projects };
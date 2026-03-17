import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const opportunities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/opportunities" }),
  schema: z.object({
    title: z.string(),
    deadline: z.string(),
    type: z.string(),
    location: z.string(),
    description: z.string(),
    sponsored: z.boolean().optional()
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    jobType: z.string(),
    salary: z.string().optional(),
    link: z.string().url().optional(),
    logo: z.string().optional(),
    sponsored: z.boolean().optional()
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    date: z.string(),
    excerpt: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

export const collections = { opportunities, jobs, news };
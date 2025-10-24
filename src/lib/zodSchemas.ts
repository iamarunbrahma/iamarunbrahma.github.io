import { z } from 'zod';

// Shared helpers
const stringOrStringArray = z
  .union([z.string().trim().min(1), z.array(z.string().trim().min(1))])
  .transform((v) => (Array.isArray(v) ? v : [v]));

export const workExperienceMetaSchema = z.object({
  companyName: z.string().trim().min(1),
  companyLogo: z.string().trim().optional(), // URL or path
  description: stringOrStringArray, // normalized to string[]
});
export type WorkExperienceMeta = z.infer<typeof workExperienceMetaSchema>;

export const projectMetaSchema = z.object({
  title: z.string().trim().min(1),
  description: stringOrStringArray,
  links: z.array(z.string().url()).optional(),
});
export type ProjectMeta = z.infer<typeof projectMetaSchema>;

export const consultingMetaSchema = z.object({
  consultingName: z.string().trim().min(1),
  // Support multiple external links; optional to allow collapsed cards when absent
  links: z.array(z.string().url()).optional(),
  description: stringOrStringArray,
});
export type ConsultingMeta = z.infer<typeof consultingMetaSchema>;

export const aboutMetaSchema = z.object({
  title: z.string().default('About Me'),
});
export type AboutMeta = z.infer<typeof aboutMetaSchema>;

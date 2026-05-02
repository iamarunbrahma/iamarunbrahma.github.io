import { z } from 'zod';

const stringOrStringArray = z
  .union([z.string().trim().min(1), z.array(z.string().trim().min(1))])
  .transform((v) => (Array.isArray(v) ? v : [v]));

export const workExperienceMetaSchema = z.object({
  companyName: z.string().trim().min(1),
  companyLogo: z.string().trim().optional(),
  description: stringOrStringArray,
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
  links: z.array(z.string().url()).optional(),
  description: stringOrStringArray,
});
export type ConsultingMeta = z.infer<typeof consultingMetaSchema>;

export const aboutMetaSchema = z.object({
  title: z.string().default('About Me'),
});
export type AboutMeta = z.infer<typeof aboutMetaSchema>;

import { z } from 'zod';
import type { ComponentType } from 'react';
import {
  workExperienceMetaSchema,
  projectMetaSchema,
  consultingMetaSchema,
  aboutMetaSchema,
  type WorkExperienceMeta,
  type ProjectMeta,
  type ConsultingMeta,
  type AboutMeta,
} from './zodSchemas';

type MdxModule<M> = {
  default: ComponentType<Record<string, unknown>>;
  meta?: M;
};

function safeParseMeta<S extends z.ZodTypeAny>(
  schema: S,
  meta: unknown | undefined,
): z.infer<S> | undefined {
  if (meta === undefined) return undefined;
  const res = schema.safeParse(meta);
  if (!res.success) {
    console.warn('[mdx] Invalid meta skipped', res.error.flatten());
    return undefined;
  }
  return res.data;
}

export type LoadedMdx<M> = {
  id: string;
  path: string;
  Component: ComponentType<Record<string, unknown>>;
  meta?: M;
};

const contentOrder: Record<'work' | 'projects' | 'consulting', string[]> = {
  work: [
    'work-walmart',
    'work-citi',
    'work-carelon',
    'work-accenture',
  ],
  projects: [
    'projects-vision-parse',
    'projects-fine-tuning',
  ],
  consulting: [
    'consulting-altgan',
    'consulting-wellma',
  ],
};

function loadFromModules<S extends z.ZodTypeAny>(
  modules: Record<string, MdxModule<z.infer<S>>>,
  schema: S,
): Array<LoadedMdx<z.infer<S>>> {
  const items = Object.entries(modules).map(([path, mod]) => {
    const id = path
      .replace(/^.*\/src\/context\//, '')
      .replace(/\.mdx$/, '')
      .replace(/\//g, '-');
    const meta = safeParseMeta(schema, (mod as unknown as { meta?: unknown }).meta);
    return { id, path, Component: (mod as MdxModule<z.infer<S>>).default, meta };
  });
  const namespace: 'work' | 'projects' | 'consulting' | undefined = items[0]?.id
    ? (items[0].id.split('-')[0] as 'work' | 'projects' | 'consulting')
    : undefined;
  const order = namespace ? contentOrder[namespace] : undefined;
  if (order && order.length > 0) {
    const priority = new Map(order.map((v, i) => [v, i] as const));
    items.sort((a, b) => (priority.get(a.id) ?? 1e9) - (priority.get(b.id) ?? 1e9));
  }
  return items;
}

const workModules = import.meta.glob<MdxModule<WorkExperienceMeta>>('/src/context/work/**/*.mdx', {
  eager: true,
});

const projectModules = import.meta.glob<MdxModule<ProjectMeta>>('/src/context/projects/**/*.mdx', {
  eager: true,
});

const consultingModules = import.meta.glob<MdxModule<ConsultingMeta>>('/src/context/consulting/**/*.mdx', {
  eager: true,
});

const aboutModules = import.meta.glob<MdxModule<AboutMeta>>('/src/context/about.mdx', {
  eager: true,
});

const readModules = import.meta.glob<MdxModule<AboutMeta>>('/src/context/shelf.mdx', {
  eager: true,
});

export const workExperience = loadFromModules(workModules, workExperienceMetaSchema);
export const projects = loadFromModules(projectModules, projectMetaSchema);
export const consulting = loadFromModules(consultingModules, consultingMetaSchema);
export const about = loadFromModules(aboutModules, aboutMetaSchema);
export const read = loadFromModules(readModules, aboutMetaSchema);

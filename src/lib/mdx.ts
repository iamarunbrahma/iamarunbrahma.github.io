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

// Types for MDX modules
type MdxModule<M> = {
  default: ComponentType<Record<string, unknown>>;
  meta?: M;
};

// Parse helper (non-throwing): returns undefined when invalid
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
  id: string; // derived from path
  path: string;
  Component: ComponentType<Record<string, unknown>>;
  meta?: M;
};

// Declarative ordering for content. Keys are the derived ids produced below.
// Change arrays to control order without renaming files.
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

// Map globbed modules into LoadedMdx entries
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
  // Determine namespace from first item's id and apply order if available
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

export async function loadWorkExperience() {
  const modules = import.meta.glob<MdxModule<WorkExperienceMeta>>('/src/context/work/**/*.mdx', {
    eager: true,
  });
  return loadFromModules(modules, workExperienceMetaSchema);
}

export async function loadProjects() {
  const modules = import.meta.glob<MdxModule<ProjectMeta>>('/src/context/projects/**/*.mdx', {
    eager: true,
  });
  return loadFromModules(modules, projectMetaSchema);
}

export async function loadConsulting() {
  const modules = import.meta.glob<MdxModule<ConsultingMeta>>('/src/context/consulting/**/*.mdx', {
    eager: true,
  });
  return loadFromModules(modules, consultingMetaSchema);
}

export async function loadAbout() {
  const modules = import.meta.glob<MdxModule<AboutMeta>>('/src/context/about.mdx', {
    eager: true,
  });
  return loadFromModules(modules, aboutMetaSchema);
}

export async function loadRead() {
  const modules = import.meta.glob<MdxModule<AboutMeta>>('/src/context/shelf.mdx', {
    eager: true,
  });
  return loadFromModules(modules, aboutMetaSchema);
}

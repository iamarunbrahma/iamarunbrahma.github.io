/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  // MDX comp default export is a valid React component with arbitrary props
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
  export const meta: unknown;
}

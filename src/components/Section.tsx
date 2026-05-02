import type { ReactNode } from 'react';

type SectionProps = { id: string; title: string; children: ReactNode };

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="container-page">
      <h2 className="section-title animate-fade-in" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

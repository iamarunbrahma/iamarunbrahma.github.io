import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function AboutCard({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        'mdx-typography',
        // Layout and readable copy defaults
        'max-w-2xl text-sm leading-6 [text-wrap:pretty] text-black dark:text-neutral-300',
        // Vertical rhythm for direct children paragraphs and lists
        '[&>p]:mt-3 [&>p:first-child]:mt-0',
        // Headings hierarchy
        '[&_*:where(h1,h2,h3,h4,h5,h6)]:tracking-tight',
        '[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-2 [&>h1]:mb-3',
        '[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-5 [&>h2]:mb-2',
        '[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-4 [&>h3]:mb-2',
        '[&>h4]:text-lg [&>h4]:font-semibold [&>h4]:mt-3 [&>h4]:mb-1.5',
        '[&>h5]:text-base [&>h5]:font-semibold [&>h5]:mt-3 [&>h5]:mb-1',
        '[&>h6]:text-sm [&>h6]:font-semibold [&>h6]:mt-3 [&>h6]:mb-1',
        // Emphasis
        '[&_*:where(strong,b)]:font-semibold [&_*:where(em,i)]:italic',
        // Links
        '[&_*:where(a)]:underline [&_*:where(a)]:underline-offset-2 [&_*:where(a)]:decoration-1',
        '[&_*:where(a)]:text-[var(--link)] hover:[&_*:where(a)]:text-[var(--link-hover)]',
        // Lists (restore bullets / numbers and spacing)
        '[&_*:where(ul)]:list-disc [&_*:where(ul)]:pl-5 [&_*:where(ul)]:space-y-1',
        '[&_*:where(ol)]:list-decimal [&_*:where(ol)]:pl-5 [&_*:where(ol)]:space-y-1',
        '[&_*:where(li)]:leading-6',
        // Code (inline and blocks)
        '[&_*:where(code)]:font-mono [&_*:where(code)]:text-[13px] [&_*:where(code)]:px-1.5 [&_*:where(code)]:py-0.5',
        '[&_*:where(code)]:rounded [&_*:where(code)]:bg-neutral-100 [&_*:where(code)]:text-neutral-800',
        'dark:[&_*:where(code)]:bg-neutral-800 dark:[&_*:where(code)]:text-neutral-100',
        '[&_*:where(pre)]:bg-neutral-900 [&_*:where(pre)]:text-neutral-100 [&_*:where(pre)]:p-3',
        '[&_*:where(pre)]:rounded-lg [&_*:where(pre)]:overflow-x-auto dark:[&_*:where(pre)]:bg-neutral-900',
        // Blockquote
        '[&_*:where(blockquote)]:border-l-4 [&_*:where(blockquote)]:border-neutral-300',
        '[&_*:where(blockquote)]:pl-3 [&_*:where(blockquote)]:italic',
        'dark:[&_*:where(blockquote)]:border-neutral-700',
        // Horizontal rule and images
        '[&_*:where(hr)]:my-6 [&_*:where(hr)]:border-t',
        '[&_*:where(img)]:rounded-xl',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function WorkCard({
  logo,
  company,
  description,
}: {
  logo?: string;
  company: string;
  description: string[];
}) {
  return (
    <div className="card p-4 pr-6 sm:pr-8">
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 items-start">
        <div className="h-8 w-8 rounded-lg overflow-hidden flex-shrink-0 soft-surface">
          {logo ? (
            <img
              src={logo}
              alt={company}
              className="h-full w-full object-contain brightness-[1.05] contrast-[1.1] saturate-125"
            />
          ) : null}
        </div>
        <div className="font-bold">{company}</div>
        <div className="col-span-2">
          {description.length <= 1 ? (
            <p
              className="mt-1 text-sm leading-6 whitespace-normal break-words text-justify [text-wrap:pretty] text-black dark:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: description[0] ?? '' }}
            />
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm text-justify [text-wrap:pretty] text-black dark:text-neutral-300">
              {description.map((d, i) => (
                <li
                  key={i}
                  className="whitespace-normal break-words leading-6 text-black dark:text-neutral-300"
                  dangerouslySetInnerHTML={{ __html: d }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  title,
  description,
  links,
}: {
  title: string;
  description: string[];
  links?: string[];
}) {
  return (
    <div className="card p-4 pr-6 sm:pr-8">
      <div className="flex items-start justify-between gap-4">
        <div className="font-bold">{title}</div>
        {links && links.length > 0 ? (
          <div className="flex gap-2 items-center text-right flex-nowrap">
            {links.map((l) => {
              const label = /medium\.com/i.test(l)
                ? 'Medium'
                : /github\.com/i.test(l)
                  ? 'GitHub'
                  : /pypi\.org\//i.test(l)
                    ? 'Python Package'
                    : 'Link';
              return (
                <a
                  key={l}
                  href={l}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-sm underline whitespace-nowrap"
                >
                  {label} <ArrowUpRight className="h-3 w-3" />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
      {description.length <= 1 ? (
        <p
          className="mt-1 text-sm leading-6 whitespace-normal break-words text-justify [text-wrap:pretty] text-black dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: description[0] ?? '' }}
        />
      ) : (
        <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-justify [text-wrap:pretty] text-black dark:text-neutral-300">
          {description.map((d, i) => (
            <li
              key={i}
              className="whitespace-normal break-words leading-6 text-black dark:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: d }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export function ConsultingCard({
  name,
  links,
  description,
}: {
  name: string;
  links?: string[];
  description: string[];
}) {
  return (
    <div className="card p-4 pr-6 sm:pr-8">
      <div className="flex items-start justify-between gap-4">
        <div className="font-bold">{name}</div>
        {links && links.length > 0 ? (
          <div className="flex gap-2 items-center text-right flex-nowrap">
            {links.map((l) => {
              const label = /medium\.com/i.test(l)
                ? 'Medium'
                : /github\.com/i.test(l)
                  ? 'GitHub'
                  : /pypi\.org\//i.test(l)
                    ? 'Python Package'
                    : 'Link';
              return (
                <a
                  key={l}
                  href={l}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-sm underline whitespace-nowrap"
                >
                  {label} <ArrowUpRight className="h-3 w-3" />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
      <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-justify [text-wrap:pretty] text-black dark:text-neutral-300">
        {description.map((d, i) => (
          <li
            key={i}
            className="whitespace-normal break-words leading-6 text-black dark:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: d }}
          />
        ))}
      </ul>
    </div>
  );
}

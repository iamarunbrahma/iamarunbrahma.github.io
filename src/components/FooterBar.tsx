import type { ComponentType } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type SocialLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

const socials: SocialLink[] = [
  { href: 'mailto:contact@arunbrahma.com', label: 'Email', Icon: Mail },
  { href: 'https://www.linkedin.com/in/iamarunbrahma', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/iamarunbrahma', label: 'GitHub', Icon: Github },
];

export function FooterBar() {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center">
      <div className="card rounded-3xl flex items-center gap-3 px-3 py-2">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 px-3 py-2 bg-white/70 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/15 transition text-black hover:text-black dark:text-white dark:hover:text-white"
            style={{ color: 'var(--fg-contrast)' }}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">{label}</span>
          </a>
        ))}
        <ThemeToggle />
      </div>
    </div>
  );
}

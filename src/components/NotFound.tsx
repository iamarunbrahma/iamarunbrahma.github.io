import { ArrowLeft, Sparkles } from 'lucide-react';

export function NotFound() {
  return (
    <section className="container-page -mt-4">
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-6xl sm:text-7xl font-extrabold tracking-tight">404</span>
          <span className="h-8 sm:h-10 w-px bg-neutral-300 dark:bg-neutral-700" />
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            This page took a coffee break. It never came back.
          </p>
        </div>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-prose">
          You unearthed a wormhole in the site map. Try the homepage — it
          actually exists. If you think this is a bug, do tell me.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--link)] text-white hover:opacity-90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Take me home
          </a>
          <a
            href="mailto:contact@arunbrahma.com?subject=Link%20not%20working%20on%20arunbrahma.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/20 text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <Sparkles className="h-4 w-4" />
            Report this
          </a>
        </div>
      </div>
    </section>
  );
}

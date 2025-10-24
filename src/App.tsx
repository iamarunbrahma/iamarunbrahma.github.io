import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { FooterBar } from './components/FooterBar';
import { NotFound } from './components/NotFound';
import { AboutCard, ConsultingCard, ProjectCard, WorkCard } from './components/Cards';
import { loadAbout, loadConsulting, loadProjects, loadWorkExperience, loadRead } from './lib/mdx';
import profileImage from './assets/images/arun_brahma.webp';

export default function App() {
  const [about, setAbout] = useState<Awaited<ReturnType<typeof loadAbout>>>([]);
  const [read, setRead] = useState<Awaited<ReturnType<typeof loadRead>>>([]);
  const [work, setWork] = useState<Awaited<ReturnType<typeof loadWorkExperience>>>([]);
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof loadProjects>>>([]);
  const [consulting, setConsulting] = useState<Awaited<ReturnType<typeof loadConsulting>>>([]);

  useEffect(() => {
    void (async () => {
      const [a, r, w, p, c] = await Promise.all([
        loadAbout(),
        loadRead(),
        loadWorkExperience(),
        loadProjects(),
        loadConsulting(),
      ]);
      setAbout(a);
      setRead(r);
      setWork(w);
      setProjects(p);
      setConsulting(c);
    })();
  }, []);

  const AboutComponent = about[0]?.Component;
  const ReadComponent = read[0]?.Component;

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isRead = path === '/shelf';
  const isNotFound = path !== '/' && !isRead;

  return (
    <div className="min-h-dvh">
      <Header />

      <main className="space-y-6 sm:space-y-8">
        {isNotFound ? (
          <NotFound />
        ) : isRead ? (
          <section className="container-page -mt-4">
            {ReadComponent ? (
              <AboutCard>
                <ReadComponent />
              </AboutCard>
            ) : null}
          </section>
        ) : (
          <section className="container-page -mt-4">
            {AboutComponent ? (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-6 md:gap-10">
                <AboutCard>
                  <h1>Hi! My name is Arun</h1>
                  <AboutComponent />
                </AboutCard>
                <div className="hidden md:block md:self-center">
                  <div className="h-64 w-64 rounded-3xl overflow-hidden soft-surface p-0">
                    <img
                      src={profileImage}
                      alt="Portrait of Arun Brahma"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        )}

        {!isRead && !isNotFound && (
          <>
            <Section id="work" title="Work Experience">
              {work.map((w) => (
                <WorkCard
                  key={w.id}
                  logo={w.meta?.companyLogo}
                  company={w.meta?.companyName ?? w.id}
                  description={w.meta?.description ?? []}
                />
              ))}
            </Section>

            <Section id="projects" title="Personal Projects">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  title={p.meta?.title ?? p.id}
                  description={p.meta?.description ?? []}
                  links={p.meta?.links}
                />
              ))}
            </Section>

            <Section id="consulting" title="Independent Consulting">
              {consulting.map((c) => (
                <ConsultingCard
                  key={c.id}
                  name={c.meta?.consultingName ?? c.id}
                  links={c.meta?.links}
                  description={c.meta?.description ?? []}
                />
              ))}
            </Section>
          </>
        )}

        {/* Footer spacer + CTA */}
        {!isNotFound && (
          <div className="container-page pt-10 sm:pt-14 pb-24 sm:pb-28">
            <div className="mx-auto max-w-sm sm:max-w-md text-center">
              <div
                className="mx-auto h-1.5 w-10 rounded-full mb-6"
                style={{ backgroundColor: 'var(--link)' }}
              />
              <a
                href="mailto:contact@arunbrahma.com"
                className="inline-flex items-center gap-2 text-neutral-500 hover:text-[var(--link)] dark:text-neutral-400 dark:hover:text-[var(--link)] transition-colors"
              >
                say hello on
                <Mail className="h-4 w-4" aria-hidden style={{ color: 'var(--link)' }} />
                <span className="sr-only">email</span>
              </a>
            </div>
          </div>
        )}
      </main>

      <FooterBar />
    </div>
  );
}

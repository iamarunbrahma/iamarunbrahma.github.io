import { Mail } from 'lucide-react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { FooterBar } from './components/FooterBar';
import { NotFound } from './components/NotFound';
import { AboutCard, ConsultingCard, ProjectCard, WorkCard } from './components/Cards';
import { about, read, workExperience, projects, consulting } from './lib/mdx';
import profileImage from './assets/images/arun_brahma.webp';

export default function App() {
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
                <div className="md:hidden flex justify-center animate-scale-in opacity-0">
                  <div
                    className="h-32 w-32 rounded-2xl overflow-hidden soft-surface p-0"
                    style={{ aspectRatio: '1/1', minHeight: '128px' }}
                  >
                    <img
                      src={profileImage}
                      alt="Portrait of Arun Brahma"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  </div>
                </div>
                <AboutCard>
                  <h1>Hi! My name is Arun</h1>
                  <AboutComponent />
                </AboutCard>
                <div className="hidden md:block md:self-center animate-scale-in opacity-0 animation-delay-200">
                  <div
                    className="h-64 w-64 rounded-3xl overflow-hidden soft-surface p-0"
                    style={{ aspectRatio: '1/1', minHeight: '256px' }}
                  >
                    <img
                      src={profileImage}
                      alt="Portrait of Arun Brahma"
                      width={256}
                      height={256}
                      className="h-full w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
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
              {workExperience.map((w, index) => (
                <WorkCard
                  key={w.id}
                  logo={w.meta?.companyLogo}
                  company={w.meta?.companyName ?? w.id}
                  description={w.meta?.description ?? []}
                  index={index}
                />
              ))}
            </Section>

            <Section id="projects" title="Personal Projects">
              {projects.map((p, index) => (
                <ProjectCard
                  key={p.id}
                  title={p.meta?.title ?? p.id}
                  description={p.meta?.description ?? []}
                  links={p.meta?.links}
                  index={index}
                />
              ))}
            </Section>

            <Section id="consulting" title="Independent Consulting">
              {consulting.map((c, index) => (
                <ConsultingCard
                  key={c.id}
                  name={c.meta?.consultingName ?? c.id}
                  links={c.meta?.links}
                  description={c.meta?.description ?? []}
                  index={index}
                />
              ))}
            </Section>
          </>
        )}

        {!isNotFound && (
          <div className="container-page pt-10 sm:pt-14 pb-24 sm:pb-28">
            <div className="mx-auto max-w-sm sm:max-w-md text-center animate-fade-in opacity-0 animation-delay-300">
              <div
                className="mx-auto h-1.5 w-10 rounded-full mb-6"
                style={{ backgroundColor: 'var(--link)' }}
              />
              <a
                href="mailto:contact@arunbrahma.com"
                className="inline-flex items-center gap-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
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

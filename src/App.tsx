// src/App.tsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import RedirectHandler from './components/RedirectHandler';
import { content } from './utils/content';

const MainContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let closestSection = 'about';
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section.id;
        }
      });

      setActiveSection(closestSection);
    };

    // Check URL hash on mount
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveSection(hash);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <SEO
        title="Arun Brahma | Machine Learning Engineer"
        description="Arun Brahma is a Machine Learning Engineer having experience in developing and deploying ML systems at scale."
        keywords="Machine Learning Consultant, Machine Learning Engineer"
        canonicalUrl="https://arunbrahma.com"
      />
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} activeSection={activeSection} />

        <main className="container mx-auto px-6 pt-24 pb-16">
          <section id="about" className="py-12 pt-12">
            <div className="flex flex-col-reverse md:flex-row items-start md:space-x-8">
              <div className="prose dark:prose-invert max-w-4xl md:pr-8 flex-grow">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-4" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-3" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-md font-semibold mb-2" {...props} />,
                    h5: ({ node, ...props }) => <h5 className="text-base font-semibold mb-2" {...props} />,
                    h6: ({ node, ...props }) => <h6 className="text-sm font-semibold mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    a: ({ node, href, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" {...props} />,
                    img: ({ node, src, alt, ...props }) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg mb-4" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                  }}
                >
                  {content.about}
                </ReactMarkdown>
              </div>
              <div className="md:float-right md:ml-8 mb-6 md:mb-0 flex-shrink-0">
                <img
                  src="/assets/arun_brahma.webp"
                  alt="Arun Brahma"
                  className="w-64 md:w-96 h-auto rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </section>

          <ContentSection id="projects" title="Personal Projects" content={content.projects} />
          <ContentSection id="experience" title="Independent Consulting" content={content.experience} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <HelmetProvider>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HelmetProvider>
    </Router>
  );
};

export default App;

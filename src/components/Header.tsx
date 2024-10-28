import { useState } from 'react';
import { Sun, Moon, ExternalLink, Menu, X } from 'lucide-react';
import { config } from '../utils/config';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ['about', 'projects', 'experience'];

  return (
    <header className="fixed w-full top-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-white/10 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/assets/arun.svg"
              alt="Arun Brahma"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">Arun Brahma</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lead Machine Learning Engineer
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'text-blue-600' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <a
              href={config.externalLinks.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
              <ExternalLink size={16} className="ml-1" />
            </a>
            <a
              href={`mailto:${config.socialLinks.email}`}
              className="nav-link bg-blue-600 text-white hover:bg-blue-900 hover:text-white px-4 py-2 rounded-full transition-colors duration-200 text-center w-fit self-start dark:hover:text-white dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me!
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="flex flex-col items-start space-y-4">
              {navItems.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`nav-link ${activeSection === section ? 'text-blue-600' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <a
                href={config.externalLinks.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
                <ExternalLink size={16} className="ml-1" />
              </a>
              <a
                href={`mailto:${config.socialLinks.email}`}
                className="nav-link bg-blue-600 text-white hover:bg-blue-900 hover:text-white px-4 py-2 rounded-full transition-colors duration-200 text-center w-fit dark:hover:text-white dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me!
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

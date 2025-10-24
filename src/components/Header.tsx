import { useTheme } from '../hooks/useTheme';
import lightLogo from '../assets/images/neural_network_light.png';
import darkLogo from '../assets/images/neural_network_dark.png';

export function Header() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;

  return (
    <header className="container-page flex items-center justify-between py-8">
      <a href="/" aria-label="Home" className="block">
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden p-0">
          <img
            src={logoSrc}
            alt="Arun Brahma"
            className="h-full w-full object-contain"
            fetchPriority="high"
          />
        </div>
      </a>
      {/* Hide header profile when About section renders its own profile */}
      <div className="hidden sm:block h-10 w-10" />
    </header>
  );
}

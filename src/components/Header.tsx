import { useTheme } from '../hooks/useTheme';
import lightLogo from '../assets/images/neural_network_light.webp';
import darkLogo from '../assets/images/neural_network_dark.webp';

export function Header() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;

  return (
    <header className="container-page flex items-center justify-between py-8 animate-fade-in">
      <a href="/" aria-label="Home" className="block">
        <div
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden p-0"
          style={{ aspectRatio: '1/1', minWidth: '56px' }}
        >
          <img
            src={logoSrc}
            alt="Arun Brahma"
            width={64}
            height={64}
            className="h-full w-full object-contain"
            fetchPriority="high"
            decoding="sync"
          />
        </div>
      </a>
      <div className="hidden sm:block h-10 w-10" />
    </header>
  );
}

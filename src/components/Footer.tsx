import { Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://linkedin.com/in/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:john@example.com"
            className="text-gray-600 dark:text-gray-400 hover:text-red-600"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Arun Brahma. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

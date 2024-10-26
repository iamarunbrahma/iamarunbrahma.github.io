import ReactMarkdown from 'react-markdown';

interface ContentSectionProps {
  id: string;
  title: string;
  content: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ id, title, content }) => {
  const contentItems = content
    ? content.split('---').filter(item => item.trim().length > 0)
    : [];

  return (
    <section id={id} className="py-12 pt-12" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-2xl font-bold mb-6 text-center">
        🚀 {title}
      </h2>
      <div className="flex flex-wrap justify-center -mx-3">
        {contentItems.map((item, index) => (
          <div 
            key={index} 
            className={`w-full lg:w-1/2 px-3 mb-6 ${
              index === contentItems.length - 1 && contentItems.length % 2 !== 0
                ? 'md:w-full'
                : ''
            }`}
          >
            <div className="h-full prose dark:prose-invert border border-gray-200 rounded-lg shadow-md p-6 flex flex-col bg-white dark:bg-gray-800">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-4 text-center underline" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-4 text-center" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-md font-semibold mb-3 text-center" {...props} />,
                  h5: ({ node, ...props }) => <h5 className="text-base font-semibold mb-2 text-center" {...props} />,
                  h6: ({ node, ...props }) => <h6 className="text-sm font-semibold mb-2 text-center" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                  a: ({ node, href, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" {...props} />,
                  img: ({ node, src, alt, ...props }) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg mb-4" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic" {...props} />,
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded" {...props}>
                        {children}
                      </code>
                    )
                  },
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                }}
              >
                {item.trim()}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;

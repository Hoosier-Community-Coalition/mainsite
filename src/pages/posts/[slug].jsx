import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import {
  CoalitionTitle,
  CoalitionHeader,
  CoalitionParagraph,
  CoalitionList,
  CoalitionListItem,
  CoalitionQuote,
  CoalitionDefinition,
  CoalitionSection,
  CoalitionTable,
  CoalitionContact,
  CoalitionSummary,
  CoalitionNote,
  PageHeader,
  EventGallery,
  HCCPageComponent,
  HCCPageContainer,
  HCCPageTextContainer,
  CoalitionMainHeader,
  HCCFooter
} from '@components/core-components'; // Adjust import path as needed


// MDX Components mapping for HCC
const mdxComponents = {
  // Basic HTML tag mappings
  h1: (props) => <CoalitionTitle {...props} />,
  h2: (props) => <CoalitionHeader level={2} {...props} />,
  h3: (props) => <CoalitionHeader level={3} {...props} />,
  h4: (props) => <CoalitionHeader level={4} {...props} />,
  h5: (props) => <CoalitionHeader level={5} {...props} />,
  h6: (props) => <CoalitionHeader level={6} {...props} />,
  
  p: (props) => <CoalitionParagraph {...props} />,
  
  ul: (props) => <CoalitionList ordered={false} {...props} />,
  ol: (props) => <CoalitionList ordered={true} {...props} />,
  li: (props) => <CoalitionListItem {...props} />,
  
  blockquote: (props) => <CoalitionQuote {...props} />,
  
  // Table mappings
  table: ({ children, ...props }) => {
    // Extract headers and rows from table children
    const processTableChildren = (children) => {
      const childArray = React.Children.toArray(children);
      let headers = [];
      let rows = [];
      
      childArray.forEach((child) => {
        if (child?.type === 'thead' || child?.props?.children?.type === 'tr') {
          // Extract headers
          const headerRow = child?.props?.children || child;
          if (headerRow?.props?.children) {
            headers = React.Children.toArray(headerRow.props.children)
              .map((th) => th?.props?.children || '')
              .filter(Boolean);
          }
        } else if (child?.type === 'tbody') {
          // Extract rows from tbody
          const bodyRows = React.Children.toArray(child.props.children);
          rows = bodyRows.map((row) => {
            if (row?.props?.children) {
              return React.Children.toArray(row.props.children)
                .map((td) => td?.props?.children || '')
                .filter(Boolean);
            }
            return [];
          }).filter(row => row.length > 0);
        }
      });
      
      return { headers, rows };
    };
    
    const { headers, rows } = processTableChildren(children);
    
    if (headers.length > 0 && rows.length > 0) {
      return <CoalitionTable headers={headers} rows={rows} {...props} />;
    }
    
    // Fallback to regular table if parsing fails
    return <table {...props}>{children}</table>;
  },
  
  // Pass through table elements for processing
  thead: ({ children }) => children,
  tbody: ({ children }) => children,
  tr: ({ children }) => children,
  th: ({ children }) => children,
  td: ({ children }) => children,
  
  // Custom HCC components available in MDX
  CoalitionTitle,
  CoalitionHeader,
  CoalitionParagraph,
  CoalitionList,
  CoalitionListItem,
  CoalitionQuote,
  CoalitionDefinition,
  CoalitionSection,
  CoalitionTable,
  CoalitionContact,
  CoalitionSummary,
  CoalitionNote,
  PageHeader,
  EventGallery,
  HCCFooter,
  
  // Shorthand aliases for convenience
  Summary: CoalitionSummary,
  Note: CoalitionNote,
  Definition: CoalitionDefinition,
  Section: CoalitionSection,
  Contact: CoalitionContact,
  Gallery: EventGallery,
  Footer: HCCFooter,
  Header: PageHeader,
  
  // Enhanced anchor links with external link styling
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('//');
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-800 underline font-medium inline-flex items-center gap-1"
          {...props}
        >
          {children}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    
    return (
      <a
        href={href}
        className="text-red-600 hover:text-red-800 underline font-medium"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  // Enhanced code styling
  code: ({ children, ...props }) => (
    <code
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }) => (
    <pre
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"
      {...props}
    >
      {children}
    </pre>
  ),
  
  // Enhanced emphasis and strong text
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700" {...props}>
      {children}
    </em>
  ),
  
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  
  // Horizontal rule styling
  hr: (props) => (
    <hr
      className="my-8 border-0 h-px bg-gray-300"
      {...props}
    />
  ),
  
  // Image wrapper with responsive styling
  img: ({ src, alt, title, ...props }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        title={title}
        className="w-full h-auto rounded-lg shadow-md"
        {...props}
      />
      {(alt || title) && (
        <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
          {title || alt}
        </figcaption>
      )}
    </figure>
  ),
};

// Utility function to get all articles with slug-to-filename mapping
function getAllArticles() {
  const contentDir = path.join(process.cwd(), 'content');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const filenames = fs.readdirSync(contentDir);
  
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        filename: filename.replace(/\.md$/, ''),
        slug: data.slug || filename.replace(/\.md$/, ''), // Use frontmatter slug or fallback to filename
        frontMatter: data,
        isDraft: data.draft === true
      };
    })
    .filter(article => !article.isDraft); // Filter out drafts
}

// Utility function to format dates
function formatDate(dateString) {
  if (!dateString) return null;
  
  // Handle both ISO strings and Date objects
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

export async function getStaticProps({ params }) {
  // Get all articles to find the filename for this slug
  const articles = getAllArticles();
  const article = articles.find(a => a.slug === params.slug);
  
  if (!article) {
    return {
      notFound: true,
    };
  }
  
  // Use the actual filename to read the file
  const filePath = path.join(process.cwd(), 'content', `${article.filename}.md`);
  
  // Check if file exists (should exist since we just read it, but safety check)
  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    };
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse YAML front matter and Markdown content
  const { data, content } = matter(fileContent);

  // Double-check draft status (should already be filtered out, but safety check)
  if (data.draft === true) {
    return {
      notFound: true,
    };
  }

  // Convert Date objects to ISO strings for JSON serialization
  const frontMatter = {
    ...data,
    pubDatetime: data.pubDatetime ? data.pubDatetime.toISOString() : null,
    modDatetime: data.modDatetime ? data.modDatetime.toISOString() : null,
  };

  // Serialize MDX content with our custom components
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMdx],
      development: process.env.NODE_ENV === 'development',
    },
  });

  return {
    props: {
      frontMatter,
      mdxSource,
    },
  };
}

export async function getStaticPaths() {
  // Get all articles and generate paths based on their slugs
  const articles = getAllArticles();

  const paths = articles.map(article => ({
    params: { 
      slug: article.slug 
    },
  }));

  return {
    paths,
    fallback: false, // Set to 'true' or 'blocking' if you want dynamic paths
  };
}

export default function ArticlePage({ frontMatter, mdxSource }) {
  const {
    title,
    pubDatetime,
    modDatetime,
    author,
    description,
    tags = [],
    featured = false
  } = frontMatter;

  return (<>
<HCCPageContainer>
    <CoalitionMainHeader headText={"HCC Articles: " + title}/>
    <HCCPageTextContainer>
    <HCCPageComponent>
      {/* Article Header with CoalitionTitle */}
      <CoalitionTitle
        lastUpdated={modDatetime ? formatDate(modDatetime) : null}
        effectiveDate={pubDatetime ? formatDate(pubDatetime) : null}
      >
        {title}
      </CoalitionTitle>

      {/* Article Metadata */}
      {(author || description || featured) && (
        <CoalitionSummary title="Article Information">
          {author && (
            <CoalitionParagraph>
              <strong>Author:</strong> {author}
            </CoalitionParagraph>
          )}
          {description && (
            <CoalitionParagraph>
              {description}
            </CoalitionParagraph>
          )}
          {featured && (
            <CoalitionNote type="action" title="Featured Article">
              This article has been featured by the HCC editorial team.
            </CoalitionNote>
          )}
        </CoalitionSummary>
      )}

      {/* Article Content - rendered with HCC component mapping */}
      <div className="article-content">
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </div>

      {/* Article Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <CoalitionHeader level={3}>Tags</CoalitionHeader>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: '#f9494915',
                  color: '#f94949'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </HCCPageComponent>
    </HCCPageTextContainer>
      </HCCPageContainer>
    </>
  );
}

// Export the page component wrapper for use in other components
export { HCCPageComponent };
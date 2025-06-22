import React from 'react';
import { MDXComponents } from 'mdx/types';
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
  HCCFooter
} from '@components/core-components'; // Adjust import path as needed

// Custom components that extend basic HTML functionality
export function useMDXComponents(components: MDXComponents): MDXComponents {
  // Basic HTML tag mappings
  return {h1: (props) => <CoalitionTitle {...props} />,
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
    const processTableChildren = (children: any) => {
      const childArray = React.Children.toArray(children);
      let headers: string[] = [];
      let rows: string[][] = [];
      
      childArray.forEach((child: any) => {
        if (child?.type === 'thead' || child?.props?.children?.type === 'tr') {
          // Extract headers
          const headerRow = child?.props?.children || child;
          if (headerRow?.props?.children) {
            headers = React.Children.toArray(headerRow.props.children)
              .map((th: any) => th?.props?.children || '')
              .filter(Boolean);
          }
        } else if (child?.type === 'tbody') {
          // Extract rows from tbody
          const bodyRows = React.Children.toArray(child.props.children);
          rows = bodyRows.map((row: any) => {
            if (row?.props?.children) {
              return React.Children.toArray(row.props.children)
                .map((td: any) => td?.props?.children || '')
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
  
  // We'll let these pass through normally since CoalitionTable handles the structure
  thead: ({ children }) => children,
  tbody: ({ children }) => children,
  tr: ({ children }) => children,
  th: ({ children }) => children,
  td: ({ children }) => children,
  
  // Custom HCC-specific components available in MDX
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
}
};


// Export individual components for direct use
export {
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
  HCCFooter
};

// Type definitions for custom props (optional, for TypeScript users)
export interface CoalitionTitleProps {
  children: React.ReactNode;
  lastUpdated?: string;
  effectiveDate?: string;
  className?: string;
}

export interface CoalitionHeaderProps {
  level?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export interface CoalitionNoteProps {
  type?: 'info' | 'action' | 'warning' | 'urgent' | 'success' | 'important';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface PageHeaderProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface EventGalleryProps {
  title?: string;
  images: Array<{
    src: string;
    alt?: string;
    caption?: string;
    date?: string;
  }>;
  className?: string;
}
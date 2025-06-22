import React from 'react';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  FileText,
  Scale,
  Shield,
  Eye,
  Link,
  Calendar,
  User,
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  ExternalLink,
  Camera
} from 'lucide-react';

// HCC Color Palette
const hccColors = {
  primary: '#f94949',      // Red
  lightPrimary: '#ff6d6d',
  secondary: '#0a0808',    // Near black
  lightGray: '#e8e7e7',   // Light gray
  mediumGray: '#737473',   // Medium gray
  darkGray: '#949394',     // Dark gray
};

// Page Header Image Component
export function PageHeader({ src, alt, title, subtitle, className = "" }) {
  return (
    <div className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white px-4">
          {title && (
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Event Image Gallery Component
export function EventGallery({ title = "Event Gallery", images = [], className = "" }) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-6 h-6" style={{ color: hccColors.primary }} />
        <h2 className="text-2xl font-semibold" style={{ color: hccColors.secondary }}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img 
              src={image.src} 
              alt={image.alt || `Event photo ${index + 1}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
                <p className="text-sm font-medium">{image.caption}</p>
                {image.date && (
                  <p className="text-xs opacity-75">{image.date}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Footer Component
export function HCCFooter({ className = "" }) {
  return (
    <footer className={`bg-gray-900 text-white mt-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: hccColors.primary }}>
              Hoosier Community Coalition
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Advocating for community, equity, culture, and social justice in our communities. 
              Together, we build a more equitable future for all.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-75 transition-opacity">
                <Facebook className="w-6 h-6" style={{ color: hccColors.primary }} />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <Twitter className="w-6 h-6" style={{ color: hccColors.primary }} />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <Instagram className="w-6 h-6" style={{ color: hccColors.primary }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Mission Statement</a></li>
              <li><a href="/bill-watch" className="text-gray-300 hover:text-white transition-colors">Bill Watch</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Get Involved</a></li>
              <li><a href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" style={{ color: hccColors.primary }} />
                <a href="mailto:info@hoosiercc.org" className="text-gray-300 hover:text-white transition-colors">
                  info@hoosiercc.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: hccColors.primary }} />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" style={{ color: hccColors.primary }} />
                <span className="text-gray-300">
                  123 Community Drive<br />
                  Fort Wayne, IN 46805
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Hoosier Community Coalition. All rights reserved.  
            {/* We don't presently collect data but if at some point we do, we'll want these:
            | <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
            */}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Coalition Title Component (maps to h1)
export function CoalitionTitle({ children, lastUpdated, effectiveDate, className = "" }) {
  return (
    <div className={`mb-8 pb-6 border-b-2 ${className}`} style={{ borderColor: hccColors.primary }}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: hccColors.secondary }}>
        {children}
      </h1>
      {(lastUpdated || effectiveDate) && (
        <div className="flex flex-wrap gap-6 text-sm opacity-75" style={{ color: hccColors.mediumGray }}>
          {effectiveDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Effective: {effectiveDate}</span>
            </div>
          )}
          {lastUpdated && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Coalition Header Components (maps to h2, h3, h4)
export function CoalitionHeader({ level = 2, children, id, className = "" }) {
  const headerClasses = {
    2: "text-3xl font-semibold mb-6 mt-12 pb-2 border-b",
    3: "text-2xl font-semibold mb-4 mt-8",
    4: "text-xl font-medium mb-3 mt-6",
    5: "text-lg font-medium mb-2 mt-4",
    6: "text-base font-medium mb-2 mt-3"
  };

  const Tag = `h${level}`;
  
  const borderStyle = level === 2 ? { borderColor: hccColors.lightGray } : {};
  
  return React.createElement(
    Tag,
    {
      id,
      className: `${headerClasses[level]} ${className}`,
      style: { color: hccColors.secondary, ...borderStyle }
    },
    children
  );
}

// Coalition Paragraph Component (maps to p)
export function CoalitionParagraph({ children, className = "" }) {
  return (
    <p className={`mb-4 leading-relaxed ${className}`} style={{ color: hccColors.secondary }}>
      {children}
    </p>
  );
}

// Coalition Summary Component
export function CoalitionSummary({ title = "Summary", children, className = "" }) {
  return (
    <div 
      className={`border-l-4 rounded-r-lg p-6 mb-8 ${className}`}
      style={{ 
        backgroundColor: `${hccColors.primary}15`,
        borderColor: hccColors.primary 
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-5 h-5" style={{ color: hccColors.primary }} />
        <h2 className="text-lg font-semibold" style={{ color: hccColors.secondary }}>
          {title}
        </h2>
      </div>
      <div className="space-y-3" style={{ color: hccColors.secondary }}>
        {children}
      </div>
    </div>
  );
}

// Coalition Note Components (for different types of callouts)
export function CoalitionNote({ type = 'info', title, children, className = "" }) {
  const noteStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200 border-l-blue-500',
      icon: <Info className="w-5 h-5 text-blue-600" />,
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700'
    },
    action: {
      container: 'border-l-4 p-4 my-6',
      containerStyle: { backgroundColor: `${hccColors.primary}10`, borderColor: hccColors.primary },
      icon: <Heart className="w-5 h-5" style={{ color: hccColors.primary }} />,
      titleColor: hccColors.secondary,
      textColor: hccColors.secondary
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 border-l-yellow-500',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700'
    },
    urgent: {
      container: 'bg-red-50 border-red-200 border-l-red-500',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      titleColor: 'text-red-800',
      textColor: 'text-red-700'
    },
    success: {
      container: 'bg-green-50 border-green-200 border-l-green-500',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      titleColor: 'text-green-800',
      textColor: 'text-green-700'
    },
    important: {
      container: 'bg-purple-50 border-purple-200 border-l-purple-500',
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      titleColor: 'text-purple-800',
      textColor: 'text-purple-700'
    }
  };

  const style = noteStyles[type];

  if (type === 'action') {
    return (
      <div 
        className={`${style.container} ${className}`}
        style={style.containerStyle}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {style.icon}
          </div>
          <div className="flex-1">
            {title && (
              <h4 className="font-semibold mb-2" style={{ color: style.titleColor }}>
                {title}
              </h4>
            )}
            <div style={{ color: style.textColor }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-l-4 rounded-r-lg p-4 my-6 ${style.container} ${className}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-2 ${style.titleColor}`}>
              {title}
            </h4>
          )}
          <div className={style.textColor}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Coalition List Components (maps to ul, ol, li)
export function CoalitionList({ ordered = false, children, className = "" }) {
  const Tag = ordered ? 'ol' : 'ul';
  const listClass = ordered 
    ? "list-decimal list-inside space-y-2 mb-4 pl-4" 
    : "list-disc list-inside space-y-2 mb-4 pl-4";
  
  return React.createElement(
    Tag,
    {
      className: `${listClass} ${className}`,
      style: { color: hccColors.secondary }
    },
    children
  );
}

export function CoalitionListItem({ children, className = "" }) {
  return (
    <li className={`leading-relaxed ${className}`}>
      {children}
    </li>
  );
}

// Coalition Quote Component (for quoting sources, testimonials, etc.)
export function CoalitionQuote({ source, sourceUrl, children, className = "" }) {
  return (
    <blockquote 
      className={`border-l-4 p-6 my-6 italic rounded-r-lg ${className}`}
      style={{ 
        borderColor: hccColors.primary,
        backgroundColor: hccColors.lightGray 
      }}
    >
      <div className="leading-relaxed mb-3" style={{ color: hccColors.secondary }}>
        {children}
      </div>
      {source && (
        <cite className="block text-sm not-italic opacity-75" style={{ color: hccColors.mediumGray }}>
          {sourceUrl ? (
            <a 
              href={sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono hover:underline flex items-center gap-1"
              style={{ color: hccColors.primary }}
            >
              — {source}
              <Link className="w-3 h-3" />
            </a>
          ) : (
            <span>— {source}</span>
          )}
        </cite>
      )}
    </blockquote>
  );
}

export function CoalitionMainHeader({headText, description}){
    return(
    <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: hccColors.secondary }}>
            {headText}
          </h1>
          <p style={{ color: hccColors.mediumGray }}>
            {description}
          </p>
        </div>
      </div>);
}

// Coalition Definition Component
export function CoalitionDefinition({ term, children, className = "" }) {
  return (
    <div 
      className={`border rounded-lg p-4 my-4 ${className}`}
      style={{ 
        backgroundColor: hccColors.lightGray,
        borderColor: hccColors.darkGray
      }}
    >
      <dt className="font-semibold mb-2 text-lg" style={{ color: hccColors.secondary }}>
        {term}
      </dt>
      <dd className="leading-relaxed opacity-90" style={{ color: hccColors.secondary }}>
        {children}
      </dd>
    </div>
  );
}

// Coalition Section Component (for grouping related content)
export function CoalitionSection({ title, id, children, className = "" }) {
  return (
    <section id={id} className={`mb-12 ${className}`}>
      {title && (
        <CoalitionHeader level={2} id={id}>
          {title}
        </CoalitionHeader>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

// Coalition Table Component
export function CoalitionTable({ headers, rows, caption, className = "" }) {
  return (
    <div className={`overflow-x-auto my-6 ${className}`}>
      <table 
        className="min-w-full bg-white border rounded-lg overflow-hidden"
        style={{ borderColor: hccColors.darkGray }}
      >
        {caption && (
          <caption 
            className="text-left p-4 font-semibold border-b"
            style={{ 
              backgroundColor: "black", // could use custom tailwind colors but like
              color: "white",
              borderColor: "white"
            }}
          >
            {caption}
          </caption>
        )}
        <thead style={{ backgroundColor: hccColors.lightPrimary }}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold border-b"
                style={{ 
                  color: hccColors.secondary,
                  borderColor: "white"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm border-b border-gray-100"
                  style={{ color: hccColors.secondary }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HCCPageContainer( {children}){
    return <div className="min-h-screen" style={{ backgroundColor: hccColors.lightGray }}>{children}</div>
  }

// Coalition Contact Information Component
export function CoalitionContact({ title = "Contact Information", name, email, phone, office, className = "" }) {
  return (
    <div 
      className={`text-white rounded-lg p-6 my-8 ${className}`}
      style={{ backgroundColor: hccColors.secondary }}
    >
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5" style={{ color: hccColors.primary }} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {name && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Name:</span>
            <span>{name}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Email:</span>
            <a 
              href={`mailto:${email}`} 
              className="hover:underline"
              style={{ color: hccColors.primary }}
            >
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Phone:</span>
            <a 
              href={`tel:${phone}`} 
              className="hover:underline"
              style={{ color: hccColors.primary }}
            >
              {phone}
            </a>
          </div>
        )}
        {office && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Office:</span>
            <span>{office}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Demo Page Component
export default function HCCComponentsDemo() {
  const sampleEventImages = [
    {
      src: "/images/hcc_nokings_1.jpg",
      alt: "Community gathering",
      caption: "Annual Community Forum 2024",
      date: "October 15, 2024"
    },
    {
      src: "/images/hcc_nokings_2.jpeg",
      alt: "Advocacy workshop",
      caption: "DEI Leadership Workshop",
      date: "September 22, 2024"
    },
    {
      src: "/images/hcc_nokings_3.jpeg",
      alt: "Volunteer event",
      caption: "Community Service Day",
      date: "August 30, 2024"
    }
  ];

  const sampleTableData = {
    headers: ['Initiative', 'Status', 'Impact', 'Next Steps'],
    rows: [
      ['Workplace Equity Program', 'Active', 'High', 'Expand to 5 more companies'],
      ['Community Education Series', 'Planning', 'Medium', 'Finalize curriculum'],
      ['Policy Advocacy Campaign', 'Active', 'High', 'Present to city council'],
      ['Youth Mentorship Program', 'Completed', 'High', 'Launch follow-up program']
    ]
  };



  return (
    <div className="min-h-screen" style={{ backgroundColor: hccColors.lightGray }}> {/* Page container, but I don't care to change it?*/}
      {/* Page Header */}
      <PageHeader 
        src="/images/hcc_nokings_3.jpeg"
        alt="Community gathering"
        title="HCC Coalition Components"
        subtitle="Building tools for justice and community"
      />

      {/* Demo Header */}
      <CoalitionMainHeader headText={"Hoosier Community Coalition Components"} description={"Components designed for MDX pages advocating for DEI and social justice"}/>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        
        {/* Component Guide */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: hccColors.secondary }}>
            HTML Tag Mapping Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Standard Mappings:</h3>
              <ul className="space-y-1" style={{ color: hccColors.mediumGray }}>
                <li><code className="bg-gray-100 px-1 rounded">h1</code> → CoalitionTitle</li>
                <li><code className="bg-gray-100 px-1 rounded">h2-h6</code> → CoalitionHeader</li>
                <li><code className="bg-gray-100 px-1 rounded">p</code> → CoalitionParagraph</li>
                <li><code className="bg-gray-100 px-1 rounded">ul/ol</code> → CoalitionList</li>
                <li><code className="bg-gray-100 px-1 rounded">li</code> → CoalitionListItem</li>
                <li><code className="bg-gray-100 px-1 rounded">blockquote</code> → CoalitionQuote</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Custom Components:</h3>
              <ul className="space-y-1" style={{ color: hccColors.mediumGray }}>
                <li>PageHeader</li>
                <li>EventGallery</li>
                <li>HCCFooter</li>
                <li>CoalitionSummary</li>
                <li>CoalitionNote (info/action/warning/urgent/success)</li>
                <li>CoalitionDefinition</li>
                <li>CoalitionSection</li>
                <li>CoalitionTable</li>
                <li>CoalitionContact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Coalition Page */}
        <div className="bg-white rounded-lg shadow p-8">
          
          {/* Coalition Title */}
          <CoalitionTitle 
            lastUpdated="December 15, 2024" 
            effectiveDate="January 1, 2025"
          >
            HCC Community Standards and Values
          </CoalitionTitle>

          {/* Coalition Summary */}
          <CoalitionSummary title="Our Commitment">
            <CoalitionParagraph>
              The Hoosier Community Coalition is dedicated to creating lasting change through advocacy, education, and community engagement. We believe that diversity, equity, and inclusion are not just ideals, but fundamental rights that strengthen our entire community.
            </CoalitionParagraph>
            <CoalitionParagraph>
              Our work focuses on dismantling systemic barriers and building bridges between communities to create a more just and equitable society for all.
            </CoalitionParagraph>
          </CoalitionSummary>

          {/* Main Content */}
          <CoalitionSection title="1. Our Core Values" id="core-values">
            <CoalitionParagraph>
              The HCC is built on principles that guide our work and shape our community interactions. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CoalitionParagraph>

            <CoalitionHeader level={3}>1.1 Equity and Justice</CoalitionHeader>
            <CoalitionParagraph>
              We are committed to addressing systemic inequalities and working toward a society where everyone has equal opportunity to thrive.
            </CoalitionParagraph>

            <CoalitionNote type="action" title="Take Action">
              Every voice matters in our fight for justice. Join us in advocating for policies that promote equity and dismantle discriminatory practices in our communities.
            </CoalitionNote>

            <CoalitionHeader level={3}>1.2 Community Empowerment</CoalitionHeader>
            <CoalitionParagraph>
              We believe in empowering communities to advocate for themselves and providing resources for sustainable change.
            </CoalitionParagraph>

            <CoalitionList>
              <CoalitionListItem>Support grassroots organizing efforts</CoalitionListItem>
              <CoalitionListItem>Provide educational resources and stuff</CoalitionListItem>
              <CoalitionListItem>Amplify marginalized voices</CoalitionListItem>
              <CoalitionListItem>Build coalition partnerships</CoalitionListItem>
            </CoalitionList>
          </CoalitionSection>

          <CoalitionSection title="2. Areas of Focus" id="focus-areas">
            <CoalitionNote type="important" title="Priority Areas">
              Our work spans multiple areas of social justice, with particular emphasis on the issues most impacting our local communities.
            </CoalitionNote>

            <CoalitionList ordered>
              <CoalitionListItem>
                <strong>Criminal Justice Reform:</strong> Advocating for fair sentencing, police accountability, and rehabilitation programs
              </CoalitionListItem>
              <CoalitionListItem>
                <strong>Economic Justice:</strong> Fighting for living wages, affordable housing, and economic opportunities for all
              </CoalitionListItem>
              <CoalitionListItem>
                <strong>Educational Equity:</strong> Ensuring quality education and resources for all students regardless of background
              </CoalitionListItem>
              <CoalitionListItem>
                <strong>Healthcare Access:</strong> Promoting equitable healthcare access and addressing health disparities
              </CoalitionListItem>
            </CoalitionList>

            <CoalitionDefinition term="Environmental Justice">
              The fair treatment and meaningful involvement of all people regardless of race, color, national origin, or income with respect to environmental laws, regulations, and policies.
            </CoalitionDefinition>
          </CoalitionSection>

          <CoalitionSection title="3. Current Initiatives" id="initiatives">
            <CoalitionParagraph>
              Our ongoing initiatives demonstrate our commitment to creating measurable change in our community.
            </CoalitionParagraph>

            <CoalitionTable 
              caption="Active HCC Initiatives Status Report"
              headers={sampleTableData.headers}
              rows={sampleTableData.rows}
            />

            <CoalitionNote type="success" title="Recent Victory">
              Thanks to community advocacy, the city council approved our proposal for bias training in all municipal departments. This represents a significant step forward in our ongoing efforts to promote equity in local government.
            </CoalitionNote>
          </CoalitionSection>

          <CoalitionSection title="4. Get Involved" id="get-involved">
            <CoalitionParagraph>
              Change happens when communities come together. There are many ways to support our mission and get involved in the work of social justice.
            </CoalitionParagraph>

            <CoalitionNote type="action" title="Join the Movement">
              Whether you can volunteer time, attend events, or simply spread awareness, every contribution makes a difference in our fight for justice and equality.
            </CoalitionNote>

            <CoalitionList ordered>
              <CoalitionListItem>Attend our monthly community meetings</CoalitionListItem>
              <CoalitionListItem>Volunteer for advocacy campaigns</CoalitionListItem>
              <CoalitionListItem>Join our educational outreach programs</CoalitionListItem>
              <CoalitionListItem>Support community members facing discrimination</CoalitionListItem>
            </CoalitionList>
          </CoalitionSection>

          <CoalitionSection title="5. Community Voices" id="voices">
            <CoalitionParagraph>
              The strength of our coalition lies in the diverse voices and experiences of our community members.
            </CoalitionParagraph>

            <CoalitionQuote 
              source="Maria Rodriguez, Community Organizer"
            >
              The HCC has given me the tools and support to advocate for my family and neighbors. Together, we're not just demanding change—we're creating it.
            </CoalitionQuote>

            <CoalitionQuote 
              source="Dr. James Washington, Education Advocate"
            >
              Real change requires sustained effort and community partnership. The HCC provides both the vision and the practical support needed to make lasting progress on social justice issues.
            </CoalitionQuote>
          </CoalitionSection>

          {/* Event Gallery */}
          <EventGallery 
            title="Recent Community Events"
            images={sampleEventImages}
          />

          {/* Contact Information */}
          <CoalitionContact 
            title="Coalition Leadership"
            name="Made up person, Steering Committee"
            email="director@hoosiercoalition.org"
            phone="(260) 555-0199"
            office="Community Justice Center, Room 205"
          />

          <CoalitionNote type="info" title="Stay Connected">
            Follow us on social media and subscribe to our newsletter to stay updated on upcoming events, advocacy opportunities, and community victories.
          </CoalitionNote>
        </div>

        {/* Component Showcase */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: hccColors.secondary }}>
            Component Showcase
          </h2>
          
          <div className="space-y-8">
            {/* Note Types */}
            <div>
              <h3 className="text-lg font-medium mb-4">Coalition Note Variants</h3>
              <div className="space-y-4">
                <CoalitionNote type="info" title="Information">
                  This is an informational note for sharing important details about our programs and initiatives.
                </CoalitionNote>
                
                <CoalitionNote type="action" title="Call to Action">
                  This is an action note for encouraging community engagement and participation in our advocacy efforts.
                </CoalitionNote>
                
                <CoalitionNote type="warning" title="Important Notice">
                  This is a warning note for highlighting urgent issues or time-sensitive opportunities for advocacy.
                </CoalitionNote>
                
                <CoalitionNote type="urgent" title="Critical Alert">
                  This is an urgent note for highlighting immediate threats to community wellbeing or civil rights.
                </CoalitionNote>
                
                <CoalitionNote type="success" title="Community Victory">
                  This is a success note for celebrating policy wins, community achievements, and progress toward justice.
                </CoalitionNote>
                
                <CoalitionNote type="important" title="Key Priority">
                  This is an important note for highlighting core values, fundamental principles, or critical policy positions.
                </CoalitionNote>
              </div>
            </div>

            {/* Headers */}
            <div>
              <h3 className="text-lg font-medium mb-4">Header Hierarchy</h3>
              <CoalitionHeader level={2}>Level 2 Header (Major Section)</CoalitionHeader>
              <CoalitionHeader level={3}>Level 3 Header (Subsection)</CoalitionHeader>
              <CoalitionHeader level={4}>Level 4 Header (Topic)</CoalitionHeader>
              <CoalitionHeader level={5}>Level 5 Header (Subtopic)</CoalitionHeader>
              <CoalitionHeader level={6}>Level 6 Header (Detail)</CoalitionHeader>
            </div>

            {/* Definition Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">Definition Component</h3>
              <CoalitionDefinition term="Intersectionality">
                A framework for understanding how multiple social identities such as race, gender, sexual orientation, and class intersect to create unique experiences of discrimination and privilege. Coined by legal scholar Kimberlé Crenshaw, this concept is fundamental to our approach to social justice advocacy.
              </CoalitionDefinition>
            </div>

            {/* Page Header Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">Page Header Component</h3>
              <div className="border rounded-lg overflow-hidden">
                <PageHeader 
                  src="/images/hcc_nokings_3.jpeg"
                  alt="Advocacy workshop"
                  title="Justice in Action"
                  subtitle="Building equitable communities together"
                />
              </div>
            </div>

            {/* Event Gallery Example */}
            <div>
              <h3 className="text-lg font-medium mb-4">Event Gallery Component</h3>
              <EventGallery 
                title="Community Impact Gallery"
                images={[
                  {
                    src: "/images/hcc_nokings_2.jpeg",
                    alt: "Community forum",
                    caption: "Quarterly Community Forum",
                    date: "November 2024"
                  },
                  {
                    src: "/images/hcc_nokings_1.jpg",
                    alt: "Volunteer training",
                    caption: "Volunteer Training Session",
                    date: "October 2024"
                  }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Footer Example */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: hccColors.secondary }}>
            Footer Component Preview
          </h2>
          <p className="mb-4" style={{ color: hccColors.mediumGray }}>
            The HCCFooter component provides consistent navigation and contact information across all pages:
          </p>
          <div className="border rounded-lg overflow-hidden">
            <HCCFooter />
          </div>
        </div>

        {/* Color Palette Reference */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: hccColors.secondary }}>
            HCC Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: hccColors.primary }}
              ></div>
              <p className="text-sm font-mono">#f94949</p>
              <p className="text-xs text-gray-600">Primary Red</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: hccColors.secondary }}
              ></div>
              <p className="text-sm font-mono">#0a0808</p>
              <p className="text-xs text-gray-600">Near Black</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-inner border"
                style={{ backgroundColor: hccColors.lightGray }}
              ></div>
              <p className="text-sm font-mono">#e8e7e7</p>
              <p className="text-xs text-gray-600">Light Gray</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: hccColors.mediumGray }}
              ></div>
              <p className="text-sm font-mono">#737473</p>
              <p className="text-xs text-gray-600">Medium Gray</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: hccColors.darkGray }}
              ></div>
              <p className="text-sm font-mono">#949394</p>
              <p className="text-xs text-gray-600">Dark Gray</p>
            </div>
          </div>
        </div>
      </div>
      <HCCFooter />
    </div>
  );
}
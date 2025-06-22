import React, { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { 
  Search, 
  ExternalLink, 
  Filter,
  X,
  BookOpen,
  FileText,
  Phone,
  Users,
  Scale,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  Shield,
  Globe,
  Video,
  Download,
  Mail,
  MapPin,
  Calendar,
  LinkIcon
} from 'lucide-react';

// HCC Color Palette
const hccColors = {
  primary: '#f94949',
  secondary: '#0a0808',
  lightGray: '#e8e7e7',
  mediumGray: '#737473',
  darkGray: '#949394',
};

//Load YAML data 

// Utility function to parse YAML using js-yaml library
export async function getStaticProps() {
  // Define the path to the YAML file
  const filePath = path.join(process.cwd(), 'data', 'resources.yaml');
  
  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse YAML content
  const yamlData = yaml.load(fileContent);

  return {
    props: {
      yamlData, // Pass the parsed data as props
    },
  };
}



// Resource Type Icon Component
function ResourceTypeIcon({ type, className = "w-5 h-5" }) {
  const icons = {
    organization: <Users className={className} />,
    document: <FileText className={className} />,
    service: <Heart className={className} />,
    hotline: <Phone className={className} />,
    toolkit: <Briefcase className={className} />,
    workshop: <GraduationCap className={className} />
  };
  
  return icons[type] || <LinkIcon className={className} />;
}

// Resource Category Badge Component
function CategoryBadge({ category }) {
  const categoryColors = {
    'Legal Aid': 'bg-blue-100 text-blue-800',
    'Community Organizations': 'bg-green-100 text-green-800',
    'Educational Materials': 'bg-purple-100 text-purple-800',
    'Health & Wellness': 'bg-pink-100 text-pink-800',
    'Civic Engagement': 'bg-indigo-100 text-indigo-800',
    'Educational Programs': 'bg-yellow-100 text-yellow-800',
    'Advocacy Tools': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
      {category}
    </span>
  );
}

// Resource Card Component
function ResourceCard({ resource }) {
  const handleClick = () => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 p-6 ${resource.url ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={handleClick}
      style={resource.featured ? { borderColor: hccColors.primary, borderWidth: '2px' } : {}}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${hccColors.primary}15` }}
          >
            <ResourceTypeIcon type={resource.type} style={{ color: hccColors.primary }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold" style={{ color: hccColors.secondary }}>
              {resource.title}
              {resource.featured && (
                <span className="ml-2 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: hccColors.primary, color: 'white' }}>
                  Featured
                </span>
              )}
            </h3>
            <CategoryBadge category={resource.category} />
          </div>
        </div>
        {resource.url && (
          <ExternalLink className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: hccColors.secondary }}>
        {resource.description}
      </p>

      {/* Contact Information */}
      {resource.contact_info && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: hccColors.lightGray }}>
          <h4 className="font-semibold text-sm mb-2" style={{ color: hccColors.secondary }}>
            Contact Information
          </h4>
          <div className="space-y-1">
            {resource.contact_info.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" style={{ color: hccColors.primary }} />
                <a 
                  href={`tel:${resource.contact_info.phone}`}
                  className="hover:underline"
                  style={{ color: hccColors.secondary }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {resource.contact_info.phone}
                  {resource.contact_info.emergency && (
                    <span className="ml-1 text-xs px-1 py-0.5 bg-red-100 text-red-800 rounded">
                      Emergency
                    </span>
                  )}
                </a>
              </div>
            )}
            {resource.contact_info.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" style={{ color: hccColors.primary }} />
                <a 
                  href={`mailto:${resource.contact_info.email}`}
                  className="hover:underline"
                  style={{ color: hccColors.secondary }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {resource.contact_info.email}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Schedule */}
      {resource.schedule && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" style={{ color: hccColors.primary }} />
          <span style={{ color: hccColors.mediumGray }}>
            Schedule: {resource.schedule}
          </span>
        </div>
      )}

      {/* Languages */}
      {resource.languages && Array.isArray(resource.languages) && resource.languages.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Globe className="w-4 h-4" style={{ color: hccColors.primary }} />
          <span style={{ color: hccColors.mediumGray }}>
            Languages: {resource.languages.join(', ')}
          </span>
        </div>
      )}

      {/* File Type */}
      {resource.file_type && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" style={{ color: hccColors.primary }} />
          <span style={{ color: hccColors.mediumGray }}>
            File Type: {resource.file_type}
          </span>
        </div>
      )}

      {/* Tags */}
      {resource.tags && Array.isArray(resource.tags) && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${hccColors.darkGray}20`,
                color: hccColors.mediumGray 
              }}
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span 
              className="px-2 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${hccColors.darkGray}20`,
                color: hccColors.mediumGray 
              }}
            >
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Filter Controls Component
function FilterControls({ 
  categories, 
  types, 
  selectedCategory, 
  selectedType, 
  showFeaturedOnly,
  onCategoryChange, 
  onTypeChange,
  onFeaturedToggle,
  onClearFilters 
}) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedType !== 'all' || showFeaturedOnly;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" style={{ color: hccColors.primary }} />
        <h3 className="text-lg font-semibold" style={{ color: hccColors.secondary }}>
          Filter Resources
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
            style={{ color: hccColors.mediumGray }}
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: hccColors.secondary }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ 
              borderColor: hccColors.lightGray,
              focusRingColor: hccColors.primary 
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: hccColors.secondary }}>
            Resource Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ 
              borderColor: hccColors.lightGray,
              focusRingColor: hccColors.primary 
            }}
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => onFeaturedToggle(e.target.checked)}
              className="rounded"
              style={{ accentColor: hccColors.primary }}
            />
            <span className="text-sm font-medium" style={{ color: hccColors.secondary }}>
              Featured Resources Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Search Component
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative mb-6">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
        style={{ color: hccColors.mediumGray }} 
      />
      <input
        type="text"
        placeholder="Search resources by title, description, or tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-lg"
        style={{ 
          borderColor: hccColors.lightGray,
          focusRingColor: hccColors.primary 
        }}
      />
    </div>
  );
}

// Stats Component
function ResourceStats({ resources, filteredResources }) {
  const stats = {
    total: resources.length,
    filtered: filteredResources.length,
    featured: filteredResources.filter(r => r.featured).length,
    organizations: filteredResources.filter(r => r.type === 'organization').length,
    services: filteredResources.filter(r => r.type === 'service').length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.filtered}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Resources Shown
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.featured}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Featured
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.organizations}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Organizations
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.services}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Services
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.mediumGray }}>
          {stats.total}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Total Available
        </div>
      </div>
    </div>
  );
}

// Main Resources Page Component
export default function HCCResourcesPage( {yamlData} ) {
  // Parse YAML data
  const data = yamlData
  console.log(yamlData);
  const resources = data.resources || [];

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Get unique categories and types
  const categories = useMemo(() => 
    [...new Set(resources.map(resource => resource.category))].sort(), 
    [resources]
  );
  
  const types = useMemo(() => 
    [...new Set(resources.map(resource => resource.type))].sort(), 
    [resources]
  );

  // Filter and search resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchTerm === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags && Array.isArray(resource.tags) && resource.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesFeatured = !showFeaturedOnly || resource.featured;

      return matchesSearch && matchesCategory && matchesType && matchesFeatured;
    });
  }, [resources, searchTerm, selectedCategory, selectedType, showFeaturedOnly]);

  // Sort resources (featured first, then alphabetically)
  const sortedResources = useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredResources]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setShowFeaturedOnly(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: hccColors.lightGray }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold" style={{ color: hccColors.secondary }}>
              HCC Community Resources
            </h1>
          </div>
          <p className="text-lg" style={{ color: hccColors.mediumGray }}>
            Your comprehensive guide to organizations, services, and tools supporting justice and equity in our community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Filter Controls */}
        <FilterControls
          categories={categories}
          types={types}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          showFeaturedOnly={showFeaturedOnly}
          onCategoryChange={setSelectedCategory}
          onTypeChange={setSelectedType}
          onFeaturedToggle={setShowFeaturedOnly}
          onClearFilters={clearFilters}
        />

        {/* Stats */}
        <ResourceStats resources={resources} filteredResources={filteredResources} />

        {/* Resources Grid */}
        {sortedResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: hccColors.mediumGray }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: hccColors.secondary }}>
              No Resources Found
            </h3>
            <p style={{ color: hccColors.mediumGray }}>
              Try adjusting your search terms or filters to see more results.
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: hccColors.secondary }}>
            About Our Resource Directory
          </h3>
          <p className="leading-relaxed mb-4" style={{ color: hccColors.secondary }}>
            The HCC Community Resources directory connects individuals and families with organizations, services, and tools that support social justice, civil rights, and community empowerment. We will attempt to maintain a helpful list of community resources!!
          </p>
          <p className="leading-relaxed" style={{ color: hccColors.mediumGray }}>
            Featured resources are community driven, and so may become outdated (or co-opted/changed). Please validate the resources found here, and notify us of any errors!
          </p>
        </div>
      </div>
    </div>
  );
}
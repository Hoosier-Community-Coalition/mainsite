import React, { useState, useMemo } from 'react';
import { CoalitionMainHeader } from '../components/core-components';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { 
  Search, 
  AlertTriangle, 
  ExternalLink, 
  Filter,
  X,
  Clock,
  MapPin,
  FileText,
  Scale,
  Users,
  Shield,
  Eye
} from 'lucide-react';

// HCC Color Palette
const hccColors = {
  primary: '#f94949',
  secondary: '#0a0808',
  lightGray: '#e8e7e7',
  mediumGray: '#737473',
  darkGray: '#949394',
};



export async function getStaticProps() {
  // Define the path to the YAML file
  const filePath = path.join(process.cwd(), 'data', 'bills.yaml');
  
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

// Bill Status Badge Component
function BillStatusBadge({ status }) {
  const statusColors = {
    'Introduced': 'bg-blue-100 text-blue-800',
    'Committee Review': 'bg-yellow-100 text-yellow-800',
    'Floor Vote Scheduled': 'bg-purple-100 text-purple-800',
    'Passed House': 'bg-green-100 text-green-800',
    'Passed Senate': 'bg-green-100 text-green-800',
    'Under Review': 'bg-orange-100 text-orange-800',
    'Signed': 'bg-green-200 text-green-900',
    'Vetoed': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}

// Threat Level Indicator Component
function ThreatLevelIndicator({ level }) {
  const levelConfig = {
    critical: {
      color: hccColors.primary,
      bgColor: `${hccColors.primary}15`,
      label: 'Critical',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    high: {
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      label: 'High',
      icon: <Eye className="w-4 h-4" />
    },
    medium: {
      color: '#3b82f6',
      bgColor: '#3b82f615',
      label: 'Medium',
      icon: <Shield className="w-4 h-4" />
    },
    low: {
      color: '#10b981',
      bgColor: '#10b98115',
      label: 'Low',
      icon: <FileText className="w-4 h-4" />
    }
  };

  const config = levelConfig[level] || levelConfig.low;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1 rounded-lg font-medium text-sm"
      style={{ 
        color: config.color, 
        backgroundColor: config.bgColor 
      }}
    >
      {config.icon}
      <span>{config.label} Priority</span>
    </div>
  );
}

// Bill Card Component
function BillCard({ bill }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold" style={{ color: hccColors.secondary }}>
              {bill.title}
            </h3>
            {bill.link && (
              <a 
                href={bill.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: hccColors.mediumGray }}>
            <span className="font-mono font-semibold">{bill.number}</span>
            <span>{bill.chamber}</span>
            <span>{bill.sponsor}</span>
          </div>
        </div>
        <ThreatLevelIndicator level={bill.threat_level} />
      </div>

      {/* Status and Location */}
      <div className="flex items-center gap-4 mb-4">
        <BillStatusBadge status={bill.status} />
        <div className="flex items-center gap-1 text-sm" style={{ color: hccColors.mediumGray }}>
          <MapPin className="w-4 h-4" />
          <span>{bill.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2" style={{ color: hccColors.secondary }}>
          Summary
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: hccColors.secondary }}>
          {bill.summary}
        </p>
      </div>

      {/* Negative Outcomes */}
      {bill.negative_outcomes && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: hccColors.secondary }}>
            <AlertTriangle className="w-4 h-4" style={{ color: hccColors.primary }} />
            Concerns & Opposition
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: hccColors.secondary }}>
            {bill.negative_outcomes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: hccColors.lightGray }}>
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: hccColors.lightGray, 
            color: hccColors.mediumGray 
          }}
        >
          {bill.category}
        </span>
        <div className="flex items-center gap-1 text-xs" style={{ color: hccColors.mediumGray }}>
          <Clock className="w-3 h-3" />
          <span>Updated: {bill.last_updated}</span>
        </div>
      </div>
    </div>
  );
}

// Filter Controls Component
function FilterControls({ 
  categories, 
  threatLevels, 
  selectedCategory, 
  selectedThreatLevel, 
  onCategoryChange, 
  onThreatLevelChange,
  onClearFilters 
}) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedThreatLevel !== 'all';

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" style={{ color: hccColors.primary }} />
        <h3 className="text-lg font-semibold" style={{ color: hccColors.secondary }}>
          Filter Bills
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

      <div className="grid md:grid-cols-2 gap-4">
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
            Priority Level
          </label>
          <select
            value={selectedThreatLevel}
            onChange={(e) => onThreatLevelChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            style={{ 
              borderColor: hccColors.lightGray,
              focusRingColor: hccColors.primary 
            }}
          >
            <option value="all">All Priority Levels</option>
            {threatLevels.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)} Priority
              </option>
            ))}
          </select>
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
        placeholder="Search bills by title, number, sponsor, or content..."
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
function BillStats({ bills, filteredBills }) {
  const stats = {
    total: bills.length,
    filtered: filteredBills.length,
    critical: filteredBills.filter(b => b.threat_level === 'critical').length,
    high: filteredBills.filter(b => b.threat_level === 'high').length,
    active: filteredBills.filter(b => 
      ['Committee Review', 'Floor Vote Scheduled', 'Under Review'].includes(b.status)
    ).length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.filtered}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Bills Shown
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.critical + stats.high}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          High Priority
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.primary }}>
          {stats.active}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Active Bills
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold" style={{ color: hccColors.mediumGray }}>
          {stats.total}
        </div>
        <div className="text-sm" style={{ color: hccColors.mediumGray }}>
          Total Tracked
        </div>
      </div>
    </div>
  );
}

// Main Bill Watch Page Component
export default function BillWatchPage( {yamlData} ) {

  const data = yamlData;
  const bills = data.bills || [];

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedThreatLevel, setSelectedThreatLevel] = useState('all');

  // Get unique categories and threat levels
  const categories = useMemo(() => 
    [...new Set(bills.map(bill => bill.category))].sort(), 
    [bills]
  );
  
  const threatLevels = useMemo(() => 
    [...new Set(bills.map(bill => bill.threat_level))].sort().reverse(), 
    [bills]
  );

  // Filter and search bills
  const filteredBills = useMemo(() => {
    return bills.filter(bill => {
      const matchesSearch = searchTerm === '' || 
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.sponsor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.negative_outcomes?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || bill.category === selectedCategory;
      const matchesThreatLevel = selectedThreatLevel === 'all' || bill.threat_level === selectedThreatLevel;

      return matchesSearch && matchesCategory && matchesThreatLevel;
    });
  }, [bills, searchTerm, selectedCategory, selectedThreatLevel]);

  // Sort bills by threat level priority
  const sortedBills = useMemo(() => {
    const threatOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return [...filteredBills].sort((a, b) => {
      const aOrder = threatOrder[a.threat_level] ?? 999;
      const bOrder = threatOrder[b.threat_level] ?? 999;
      return aOrder - bOrder;
    });
  }, [filteredBills]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedThreatLevel('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: hccColors.lightGray }}>
      {/* Header (Sorry its ugly)*/}
      <CoalitionMainHeader headText={"HCC Bill Watch"} description={"Tracking legislation that impacts our communities. Stay informed on bills affecting social justice, equity, and civil rights."}/>


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
          threatLevels={threatLevels}
          selectedCategory={selectedCategory}
          selectedThreatLevel={selectedThreatLevel}
          onCategoryChange={setSelectedCategory}
          onThreatLevelChange={setSelectedThreatLevel}
          onClearFilters={clearFilters}
        />

        {/* Stats */}
        <BillStats bills={bills} filteredBills={filteredBills} />

        {/* Bills Grid */}
        {sortedBills.length > 0 ? (
          <div className="grid gap-6">
            {sortedBills.map(bill => (
              <BillCard key={bill.id} bill={bill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: hccColors.mediumGray }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: hccColors.secondary }}>
              No Bills Found
            </h3>
            <p style={{ color: hccColors.mediumGray }}>
              Try adjusting your search terms or filters to see more results.
            </p>
          </div>
        )}

        {/* Additional Info, we can change this */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: hccColors.secondary }}>
            About HCC Bill Watch
          </h3>
          <p className="leading-relaxed mb-4" style={{ color: hccColors.secondary }}>
            The Hoosier Community Coalition Bill Watch program gives us the opportunity to provide a centralized repository of knowledge to our members! We're not perfect, so please notify us of any errors. Please contact us with errors or to help.
          </p>
          <p className="leading-relaxed" style={{ color: hccColors.mediumGray }}>
            Priority levels are assigned based on potential community impact, urgency of action needed, and alignment with HCC advocacy priorities. Critical and high-priority bills require immediate community attention and advocacy.
          </p>
        </div>
      </div>
    </div>
  );
}
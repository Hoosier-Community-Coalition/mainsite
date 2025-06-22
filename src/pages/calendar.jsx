import React, { useState, useMemo } from 'react';
import * as yaml from 'js-yaml';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Tag,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

// HCC Color Palette
const hccColors = {
  primary: '#f94949',
  secondary: '#0a0808',
  lightGray: '#e8e7e7',
  mediumGray: '#737473',
  darkGray: '#949394',
};

// Sample YAML data for events
const yamlData = `
events:
  - id: "community-forum-2025"
    title: "Quarterly Community Forum"
    date: "2025-01-15"
    time: "6:00 PM - 8:30 PM"
    location: "Fort Wayne Community Center"
    address: "227 E Washington Blvd, Fort Wayne, IN 46802"
    description: "Join us for our quarterly community forum where we discuss current social justice initiatives, upcoming advocacy campaigns, and community needs. This is an opportunity for community members to voice concerns and get involved."
    category: "Community Meeting"
    organizer: "HCC Leadership Team"
    contact:
      email: "events@hoosiercoalition.org"
      phone: "(260) 555-0123"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/forum-q1"
    capacity: 150
    tags: ["community", "forum", "advocacy"]

  - id: "voter-registration-drive"
    title: "Voter Registration Drive"
    date: "2025-01-25"
    time: "10:00 AM - 4:00 PM"
    location: "Downtown Fort Wayne"
    address: "Various locations - see website"
    description: "Help register voters in downtown Fort Wayne. We'll be at multiple locations throughout the day helping community members register to vote and providing information about upcoming elections."
    category: "Civic Engagement"
    organizer: "Civic Action Committee"
    contact:
      email: "civic@hoosiercoalition.org"
      phone: "(260) 555-0156"
    registration_required: false
    volunteer_opportunities: true
    tags: ["voting", "civic engagement", "volunteer"]

  - id: "dei-workshop-february"
    title: "Workplace DEI Training Workshop"
    date: "2025-02-08"
    time: "9:00 AM - 3:00 PM"
    location: "IPFW Conference Center"
    address: "2101 E Coliseum Blvd, Fort Wayne, IN 46805"
    description: "Comprehensive diversity, equity, and inclusion training for workplace leaders. Learn practical strategies for creating inclusive environments, addressing bias, and building equitable policies."
    category: "Educational Workshop"
    organizer: "Education & Training Committee"
    contact:
      email: "training@hoosiercoalition.org"
      phone: "(260) 555-0189"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/dei-workshop-feb"
    cost: "Free for HCC members, $25 for non-members"
    capacity: 75
    tags: ["DEI", "workplace", "training"]

  - id: "legislative-advocacy-day"
    title: "State Legislative Advocacy Day"
    date: "2025-02-20"
    time: "8:00 AM - 6:00 PM"
    location: "Indiana State House"
    address: "200 W Washington St, Indianapolis, IN 46204"
    description: "Join HCC members for a day of advocacy at the state capitol. We'll meet with legislators to discuss criminal justice reform, voting rights, and economic justice legislation."
    category: "Advocacy Action"
    organizer: "Policy & Advocacy Team"
    contact:
      email: "advocacy@hoosiercoalition.org"
      phone: "(260) 555-0134"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/advocacy-day"
    transportation_provided: true
    tags: ["advocacy", "legislation", "policy"]

  - id: "community-service-day"
    title: "Community Service Day"
    date: "2025-03-15"
    time: "8:00 AM - 2:00 PM"
    location: "Multiple Locations"
    address: "See registration for specific sites"
    description: "Join fellow community members for a day of service. Projects include neighborhood cleanups, food pantry assistance, and community garden work."
    category: "Community Service"
    organizer: "Community Action Committee"
    contact:
      email: "service@hoosiercoalition.org"
      phone: "(260) 555-0167"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/service-day"
    volunteer_opportunities: true
    tags: ["service", "community", "volunteer"]

  - id: "monthly-meeting-march"
    title: "Monthly Coalition Meeting"
    date: "2025-03-28"
    time: "7:00 PM - 8:30 PM"
    location: "HCC Office"
    address: "123 Community Drive, Fort Wayne, IN 46805"
    description: "Regular monthly meeting for HCC members to discuss ongoing initiatives, plan upcoming events, and coordinate advocacy efforts."
    category: "Internal Meeting"
    organizer: "HCC Leadership"
    contact:
      email: "info@hoosiercoalition.org"
      phone: "(260) 555-0123"
    registration_required: false
    members_only: true
    tags: ["meeting", "planning", "members"]

  - id: "know-your-rights-workshop"
    title: "Know Your Rights Workshop"
    date: "2025-04-12"
    time: "6:00 PM - 8:00 PM"
    location: "Fort Wayne Public Library"
    address: "900 Library Plaza, Fort Wayne, IN 46802"
    description: "Learn about your constitutional rights during police encounters, at the workplace, and in housing situations. Led by local civil rights attorneys."
    category: "Educational Workshop"
    organizer: "Legal Education Committee"
    contact:
      email: "legal@hoosiercoalition.org"
      phone: "(260) 555-0145"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/rights-workshop"
    free_event: true
    tags: ["legal", "rights", "education"]

  - id: "spring-fundraiser"
    title: "Annual Spring Fundraising Gala"
    date: "2025-05-10"
    time: "6:00 PM - 10:00 PM"
    location: "Grand Wayne Convention Center"
    address: "120 W Jefferson Blvd, Fort Wayne, IN 46802"
    description: "Our biggest fundraising event of the year featuring dinner, awards ceremony, and keynote speaker. Funds raised support our year-round advocacy and community programs."
    category: "Fundraising Event"
    organizer: "Development Committee"
    contact:
      email: "events@hoosiercoalition.org"
      phone: "(260) 555-0123"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/spring-gala"
    cost: "Tickets start at $75"
    formal_attire: true
    tags: ["fundraising", "gala", "awards"]

  - id: "summer-community-picnic"
    title: "Community Unity Picnic"
    date: "2025-06-21"
    time: "11:00 AM - 4:00 PM"
    location: "Foster Park"
    address: "3900 Old Mill Rd, Fort Wayne, IN 46807"
    description: "Family-friendly community picnic celebrating diversity and unity. Features food trucks, live music, children's activities, and information booths from local organizations."
    category: "Community Event"
    organizer: "Community Engagement Team"
    contact:
      email: "community@hoosiercoalition.org"
      phone: "(260) 555-0178"
    registration_required: false
    free_event: true
    family_friendly: true
    tags: ["community", "family", "celebration"]

  - id: "youth-leadership-summit"
    title: "Youth Leadership Summit"
    date: "2025-07-19"
    time: "9:00 AM - 4:00 PM"
    location: "University of Saint Francis"
    address: "2701 Spring St, Fort Wayne, IN 46808"
    description: "Leadership development program for high school and college students interested in social justice advocacy. Includes workshops, networking, and mentorship opportunities."
    category: "Youth Program"
    organizer: "Youth Development Committee"
    contact:
      email: "youth@hoosiercoalition.org"
      phone: "(260) 555-0191"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/youth-summit"
    age_restriction: "High school and college students only"
    scholarships_available: true
    tags: ["youth", "leadership", "development"]

  - id: "policy-workshop-august"
    title: "Policy Analysis and Advocacy Workshop"
    date: "2025-08-16"
    time: "10:00 AM - 2:00 PM"
    location: "HCC Training Center"
    address: "123 Community Drive, Fort Wayne, IN 46805"
    description: "Learn how to analyze legislation, track bills, and effectively communicate with elected officials. Perfect for new advocates and community organizers."
    category: "Educational Workshop"
    organizer: "Policy & Advocacy Team"
    contact:
      email: "advocacy@hoosiercoalition.org"
      phone: "(260) 555-0134"
    registration_required: true
    registration_url: "https://hoosiercoalition.org/register/policy-workshop"
    materials_provided: true
    tags: ["policy", "advocacy", "training"]

  - id: "fall-volunteer-fair"
    title: "Fall Volunteer Opportunities Fair"
    date: "2025-09-14"
    time: "12:00 PM - 5:00 PM"
    location: "Allen County Public Library"
    address: "900 Library Plaza, Fort Wayne, IN 46802"
    description: "Connect with local organizations and find volunteer opportunities that match your interests and schedule. Over 40 organizations will be represented."
    category: "Volunteer Event"
    organizer: "Volunteer Coordination Committee"
    contact:
      email: "volunteer@hoosiercoalition.org"
      phone: "(260) 555-0156"
    registration_required: false
    free_event: true
    networking_opportunity: true
    tags: ["volunteer", "networking", "community"]
`;

// Utility function to parse YAML using js-yaml library
function parseYAML(yamlString) {
  try {
    const data = yaml.load(yamlString);
    return data || { events: [] };
  } catch (error) {
    console.error('Error parsing YAML:', error);
    return { events: [] };
  }
}

// Utility functions for calendar
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(timeString) {
  if (!timeString) return '';
  
  // Handle time ranges like "6:00 PM - 8:30 PM"
  if (timeString.includes(' - ')) {
    const [start, end] = timeString.split(' - ');
    return `${start.trim()} - ${end.trim()}`;
  }
  
  return timeString;
}

// Event Category Badge Component
function CategoryBadge({ category }) {
  const categoryColors = {
    'Community Meeting': 'bg-blue-100 text-blue-800',
    'Civic Engagement': 'bg-green-100 text-green-800',
    'Educational Workshop': 'bg-purple-100 text-purple-800',
    'Advocacy Action': 'bg-red-100 text-red-800',
    'Community Service': 'bg-yellow-100 text-yellow-800',
    'Internal Meeting': 'bg-gray-100 text-gray-800',
    'Fundraising Event': 'bg-pink-100 text-pink-800',
    'Community Event': 'bg-indigo-100 text-indigo-800',
    'Youth Program': 'bg-orange-100 text-orange-800',
    'Volunteer Event': 'bg-teal-100 text-teal-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
      {category}
    </span>
  );
}

// Event Modal Component
function EventModal({ event, isOpen, onClose }) {
  if (!isOpen || !event) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b" style={{ borderColor: hccColors.lightGray }}>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2" style={{ color: hccColors.secondary }}>
              {event.title}
            </h2>
            <CategoryBadge category={event.category} />
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" style={{ color: hccColors.mediumGray }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date and Time */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: hccColors.primary }} />
            <div>
              <div className="font-semibold" style={{ color: hccColors.secondary }}>
                {formatDate(event.date)}
              </div>
              {event.time && (
                <div className="text-sm" style={{ color: hccColors.mediumGray }}>
                  {formatTime(event.time)}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-0.5" style={{ color: hccColors.primary }} />
            <div>
              <div className="font-semibold" style={{ color: hccColors.secondary }}>
                {event.location}
              </div>
              {event.address && (
                <div className="text-sm" style={{ color: hccColors.mediumGray }}>
                  {event.address}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: hccColors.secondary }}>
              Description
            </h3>
            <p className="leading-relaxed" style={{ color: hccColors.secondary }}>
              {event.description}
            </p>
          </div>

          {/* Organizer */}
          {event.organizer && (
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" style={{ color: hccColors.primary }} />
              <div>
                <span className="font-semibold" style={{ color: hccColors.secondary }}>
                  Organized by: 
                </span>
                <span className="ml-1" style={{ color: hccColors.mediumGray }}>
                  {event.organizer}
                </span>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {event.contact && (
            <div>
              <h3 className="font-semibold mb-3" style={{ color: hccColors.secondary }}>
                Contact Information
              </h3>
              <div className="space-y-2">
                {event.contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4" style={{ color: hccColors.primary }} />
                    <a 
                      href={`mailto:${event.contact.email}`}
                      className="hover:underline"
                      style={{ color: hccColors.primary }}
                    >
                      {event.contact.email}
                    </a>
                  </div>
                )}
                {event.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" style={{ color: hccColors.primary }} />
                    <a 
                      href={`tel:${event.contact.phone}`}
                      className="hover:underline"
                      style={{ color: hccColors.primary }}
                    >
                      {event.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Registration */}
            {event.registration_required && (
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: hccColors.lightGray }}
              >
                <h4 className="font-semibold mb-2" style={{ color: hccColors.secondary }}>
                  Registration Required
                </h4>
                {event.registration_url ? (
                  <a 
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: hccColors.primary, color: 'white' }}
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: hccColors.mediumGray }}>
                    Contact organizer to register
                  </p>
                )}
              </div>
            )}

            {/* Cost */}
            {(event.cost || event.free_event) && (
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: hccColors.lightGray }}
              >
                <h4 className="font-semibold mb-2" style={{ color: hccColors.secondary }}>
                  Cost
                </h4>
                <p className="text-sm" style={{ color: hccColors.mediumGray }}>
                  {event.free_event ? 'Free Event' : event.cost}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2" style={{ color: hccColors.secondary }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${hccColors.primary}15`,
                      color: hccColors.primary 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="text-sm space-y-1" style={{ color: hccColors.mediumGray }}>
            {event.capacity && (
              <p>Capacity: {event.capacity} attendees</p>
            )}
            {event.age_restriction && (
              <p>Age Restriction: {event.age_restriction}</p>
            )}
            {event.transportation_provided && (
              <p>Transportation provided</p>
            )}
            {event.materials_provided && (
              <p>Materials provided</p>
            )}
            {event.scholarships_available && (
              <p>Scholarships available</p>
            )}
            {event.volunteer_opportunities && (
              <p>Volunteer opportunities available</p>
            )}
            {event.members_only && (
              <p>HCC Members Only</p>
            )}
            {event.family_friendly && (
              <p>Family-friendly event</p>
            )}
            {event.formal_attire && (
              <p>Formal attire requested</p>
            )}
            {event.networking_opportunity && (
              <p>Networking opportunities available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Calendar Day Component
function CalendarDay({ day, events, isToday, isCurrentMonth, onClick }) {
  const hasEvents = events.length > 0;
  
  return (
    <div 
      className={`
        relative h-12 flex items-center justify-center text-sm cursor-pointer transition-all duration-200
        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
        ${isToday ? 'font-bold ring-2' : ''}
        ${hasEvents ? 'hover:bg-red-50' : 'hover:bg-gray-50'}
      `}
      style={isToday ? { ringColor: hccColors.primary } : {}}
      onClick={() => onClick(day, events)}
    >
      <span className="z-10 relative">{day}</span>
      
      {/* Event indicator */}
      {hasEvents && (
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: hccColors.primary }}
        />
      )}
      
      {/* Event count badge */}
      {hasEvents && events.length > 0 && (
        <div 
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: hccColors.primary }}
        >
          {events.length}
        </div>
      )}
    </div>
  );
}

// Month Calendar Component
function MonthCalendar({ year, month, events, onDayClick }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();
  
  // Create array of days including leading/trailing days from adjacent months
  const days = [];
  
  // Previous month trailing days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(daysInPrevMonth - i).padStart(2, '0')}`
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    });
  }
  
  // Next month leading days
  const totalCells = 42; // 6 rows × 7 days
  const remainingCells = totalCells - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let day = 1; day <= remainingCells; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      date: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    });
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Month header */}
      <div 
        className="p-4 text-center font-semibold text-lg border-b"
        style={{ color: hccColors.secondary, borderColor: hccColors.lightGray }}
      >
        {monthNames[month]} {year}
      </div>
      
      {/* Day names header */}
      <div className="grid grid-cols-7 border-b" style={{ borderColor: hccColors.lightGray }}>
        {dayNames.map(dayName => (
          <div 
            key={dayName}
            className="p-2 text-center text-sm font-medium"
            style={{ color: hccColors.mediumGray }}
          >
            {dayName}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((dayInfo, index) => {
          const dayEvents = events.filter(event => event.date === dayInfo.date);
          const isToday = isCurrentMonth && dayInfo.isCurrentMonth && dayInfo.day === todayDate;
          
          return (
            <CalendarDay
              key={index}
              day={dayInfo.day}
              events={dayEvents}
              isToday={isToday}
              isCurrentMonth={dayInfo.isCurrentMonth}
              onClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
}

// Main Calendar Page Component
export default function HCCCalendarPage() {
  // Parse YAML data
  const data = useMemo(() => parseYAML(yamlData), []);
  const events = data.events || [];
  
  // State
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleDayClick = (day, dayEvents) => {
    if (dayEvents.length === 1) {
      setSelectedEvent(dayEvents[0]);
      setIsModalOpen(true);
    } else if (dayEvents.length > 1) {
      // For multiple events, show the first one for now
      // In a real app, you might show a list to choose from
      setSelectedEvent(dayEvents[0]);
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: hccColors.lightGray }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8" style={{ color: hccColors.primary }} />
              <h1 className="text-4xl font-bold" style={{ color: hccColors.secondary }}>
                HCC Events Calendar
              </h1>
            </div>
            
            {/* Year Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentYear(currentYear - 1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: hccColors.mediumGray }} />
              </button>
              <span className="text-2xl font-bold" style={{ color: hccColors.secondary }}>
                {currentYear}
              </span>
              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" style={{ color: hccColors.mediumGray }} />
              </button>
            </div>
          </div>
          
          <p className="text-lg mt-4" style={{ color: hccColors.mediumGray }}>
            Click on highlighted dates to view event details. Numbers indicate the count of events on that day.
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }, (_, index) => (
            <MonthCalendar
              key={index}
              year={currentYear}
              month={index}
              events={events}
              onDayClick={handleDayClick}
            />
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: hccColors.secondary }}>
            Calendar Legend
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full opacity-20"
                style={{ backgroundColor: hccColors.primary }}
              />
              <span style={{ color: hccColors.mediumGray }}>
                Days with events
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: hccColors.primary }}
              >
                #
              </div>
              <span style={{ color: hccColors.mediumGray }}>
                Number of events on that day
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 border-2 rounded"
                style={{ borderColor: hccColors.primary }}
              />
              <span style={{ color: hccColors.mediumGray }}>
                Today's date
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Events Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: hccColors.secondary }}>
            Upcoming Events ({currentYear})
          </h3>
          <div className="space-y-3">
            {events
              .filter(event => {
                const eventYear = new Date(event.date).getFullYear();
                return eventYear === currentYear;
              })
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 5)
              .map(event => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold" style={{ color: hccColors.secondary }}>
                        {event.title}
                      </h4>
                      <CategoryBadge category={event.category} />
                    </div>
                    <div className="flex items-center gap-4 text-sm" style={{ color: hccColors.mediumGray }}>
                      <span>{formatDate(event.date)}</span>
                      {event.time && <span>{formatTime(event.time)}</span>}
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: hccColors.mediumGray }} />
                </div>
              ))}
            
            {events.filter(event => new Date(event.date).getFullYear() === currentYear).length === 0 && (
              <p style={{ color: hccColors.mediumGray }}>
                No events scheduled for {currentYear}.
              </p>
            )}
          </div>
        </div>

        {/* Event Categories Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: hccColors.secondary }}>
            Event Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...new Set(events.map(event => event.category))]
              .sort()
              .map(category => {
                const categoryEvents = events.filter(event => 
                  event.category === category && 
                  new Date(event.date).getFullYear() === currentYear
                );
                
                return (
                  <div key={category} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: hccColors.lightGray }}>
                    <CategoryBadge category={category} />
                    <span className="text-sm font-medium" style={{ color: hccColors.mediumGray }}>
                      {categoryEvents.length} event{categoryEvents.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
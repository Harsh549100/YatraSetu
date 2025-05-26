
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Star, Users } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  nameGu: string;
  date: string;
  location: string;
  district: string;
  description: string;
  category: string;
  duration: string;
}

const CulturalEvents = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events: Event[] = [
    {
      id: '1',
      name: 'Navratri Festival',
      nameGu: 'નવરાત્રી ઉત્સવ',
      date: '2024-10-15',
      location: 'Vadtal',
      district: 'Kheda',
      description: 'Nine nights of traditional Gujarati dance and music celebration',
      category: 'festival',
      duration: '9 days'
    },
    {
      id: '2',
      name: 'Rann Utsav',
      nameGu: 'રણ ઉત્સવ',
      date: '2024-12-01',
      location: 'Kutch',
      district: 'Kutch',
      description: 'Cultural festival celebrating the white desert of Kutch',
      category: 'festival',
      duration: '3 months'
    },
    {
      id: '3',
      name: 'Kite Festival',
      nameGu: 'ઉત્તરાયણ',
      date: '2025-01-14',
      location: 'Ahmedabad',
      district: 'Ahmedabad',
      description: 'International kite flying festival on Makar Sankranti',
      category: 'festival',
      duration: '2 days'
    },
    {
      id: '4',
      name: 'Modhera Dance Festival',
      nameGu: 'મોઢેરા નૃત્ય ઉત્સવ',
      date: '2025-01-20',
      location: 'Modhera',
      district: 'Mehsana',
      description: 'Classical dance performances at the Sun Temple',
      category: 'dance',
      duration: '3 days'
    },
    {
      id: '5',
      name: 'Bhavnath Fair',
      nameGu: 'ભાવનાથ મેળો',
      date: '2024-02-15',
      location: 'Junagadh',
      district: 'Junagadh',
      description: 'Religious fair at the foothills of Girnar mountain',
      category: 'fair',
      duration: '5 days'
    },
    {
      id: '6',
      name: 'Shamlaji Fair',
      nameGu: 'શામળાજી મેળો',
      date: '2024-11-20',
      location: 'Shamlaji',
      district: 'Aravalli',
      description: 'Traditional tribal fair with folk performances',
      category: 'fair',
      duration: '3 days'
    }
  ];

  const districts = [
    'all', 'Ahmedabad', 'Kutch', 'Kheda', 'Mehsana', 'Junagadh', 'Aravalli', 'Surat', 'Vadodara'
  ];

  const categories = [
    { value: 'all', label: 'All • બધા' },
    { value: 'festival', label: 'Festivals • ઉત્સવો' },
    { value: 'fair', label: 'Fairs • મેળા' },
    { value: 'dance', label: 'Dance • નૃત્ય' },
    { value: 'music', label: 'Music • સંગીત' }
  ];

  const filteredEvents = events.filter(event => {
    if (selectedDistrict !== 'all' && event.district !== selectedDistrict) return false;
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;
    return true;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      festival: 'bg-orange-500',
      fair: 'bg-green-500',
      dance: 'bg-purple-500',
      music: 'bg-blue-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 text-orange-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cultural Events • સાંસ્કૃતિક કાર્યક્રમો
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {districts.map(district => (
            <option key={district} value={district}>
              {district === 'all' ? 'All Districts • બધા જિલ્લા' : district}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {event.name}
                </h3>
                <p className="text-orange-600 dark:text-orange-400 text-lg">
                  {event.nameGu}
                </p>
              </div>
              <span className={`${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-xs font-medium capitalize`}>
                {event.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}, {event.district}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.duration}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              {event.description}
            </p>

            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Add to Itinerary • પ્રવાસ યોજનામાં ઉમેરો
            </button>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No events found • કોઈ કાર્યક્રમ મળ્યા નથી
          </p>
        </div>
      )}
    </div>
  );
};

export default CulturalEvents;

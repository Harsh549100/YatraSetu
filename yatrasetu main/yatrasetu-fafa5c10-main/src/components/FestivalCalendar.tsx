
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Star, Info, ShirtIcon } from 'lucide-react';

interface Festival {
  id: string;
  name: string;
  nameGu: string;
  date: string;
  location: string;
  district: string;
  description: string;
  whatToWear: string[];
  whenToGo: string;
  localCustoms: string[];
  dos: string[];
  donts: string[];
  bestTime: string;
}

const FestivalCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const festivals: Festival[] = [
    {
      id: '1',
      name: 'Navratri Festival',
      nameGu: 'નવરાત્રી ઉત્સવ',
      date: '2025-09-25',
      location: 'Vadtal & Statewide',
      district: 'All Gujarat',
      description: 'Nine nights of traditional Gujarati dance and music celebration',
      whatToWear: ['Traditional Chaniya Choli for women', 'Kurta Pajama for men', 'Comfortable dancing shoes', 'Light jewelry'],
      whenToGo: 'Evening 7 PM onwards till midnight',
      localCustoms: ['Join community garba circles', 'Respect the goddess Durga', 'Fast during day (optional)', 'Participate in aarti'],
      dos: ['Learn basic garba steps', 'Dress traditionally', 'Stay hydrated', 'Respect local customs'],
      donts: ['Wear leather items', 'Consume alcohol on venue', 'Push in dance circles', 'Use phones during aarti'],
      bestTime: 'September-October'
    },
    {
      id: '2',
      name: 'Rann Utsav',
      nameGu: 'રણ ઉત્સવ',
      date: '2025-12-01',
      location: 'Dhordo, Kutch',
      district: 'Kutch',
      description: 'Cultural festival celebrating the white desert of Kutch',
      whatToWear: ['Warm clothes for night', 'Comfortable walking shoes', 'Sun hat for day', 'Light cotton for day'],
      whenToGo: 'Best during full moon nights, October to March',
      localCustoms: ['Experience local handicrafts', 'Try Kutchi cuisine', 'Respect desert environment', 'Support local artisans'],
      dos: ['Book accommodation early', 'Carry water bottles', 'Try camel safari', 'Buy authentic handicrafts'],
      donts: ['Litter in desert', 'Disturb wildlife', 'Venture alone at night', 'Bargain excessively with artisans'],
      bestTime: 'December-February'
    },
    {
      id: '3',
      name: 'Tarnetar Fair',
      nameGu: 'તરણેતર મેળો',
      date: '2025-08-15',
      location: 'Tarnetar',
      district: 'Surendranagar',
      description: 'Traditional matchmaking fair with folk dances and music',
      whatToWear: ['Colorful traditional attire', 'Comfortable footwear', 'Umbrella for sun protection'],
      whenToGo: 'Early morning to evening, avoid afternoon heat',
      localCustoms: ['Witness traditional matchmaking', 'Enjoy folk performances', 'Respect family traditions'],
      dos: ['Observe cultural performances', 'Try local food', 'Respect privacy of families', 'Carry cash for shopping'],
      donts: ['Interfere in personal matters', 'Take photos without permission', 'Mock traditions', 'Wear revealing clothes'],
      bestTime: 'August-September'
    },
    {
      id: '4',
      name: 'Modhera Dance Festival',
      nameGu: 'મોઢેરા નૃત્ય ઉત્સવ',
      date: '2025-01-20',
      location: 'Sun Temple, Modhera',
      district: 'Mehsana',
      description: 'Classical dance performances at the historic Sun Temple',
      whatToWear: ['Formal traditional wear', 'Comfortable seating clothes', 'Light shawl for evening'],
      whenToGo: 'Evening performances, arrive by 6 PM',
      localCustoms: ['Maintain silence during performances', 'Respect temple premises', 'No shoes in temple area'],
      dos: ['Book tickets in advance', 'Arrive early for good seats', 'Turn off mobile phones', 'Appreciate classical arts'],
      donts: ['Make noise during performance', 'Flash photography', 'Eat inside temple', 'Touch ancient structures'],
      bestTime: 'January'
    }
  ];

  const months = [
    'all', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const districts = ['all', 'Kutch', 'Mehsana', 'Surendranagar', 'All Gujarat', 'Ahmedabad'];

  const filteredFestivals = festivals.filter(festival => {
    if (selectedMonth !== 'all') {
      const festivalMonth = new Date(festival.date).toLocaleString('default', { month: 'long' });
      if (festivalMonth !== selectedMonth) return false;
    }
    if (selectedDistrict !== 'all' && festival.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <div id="festival-calendar" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 text-orange-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Festival Calendar • ઉત્સવ કૅલેન્ડર
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month === 'all' ? 'All Months • બધા મહિના' : month}
            </option>
          ))}
        </select>

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
      </div>

      {/* Festivals */}
      <div className="space-y-6">
        {filteredFestivals.map(festival => (
          <div key={festival.id} className="bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {festival.name}
                </h3>
                <p className="text-orange-600 dark:text-orange-400 text-lg mb-4">
                  {festival.nameGu}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(festival.date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{festival.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{festival.whenToGo}</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {festival.description}
                </p>

                {/* What to Wear */}
                <div className="mb-4">
                  <h4 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <ShirtIcon className="w-5 h-5 mr-2 text-purple-500" />
                    What to Wear • શું પહેરવું
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {festival.whatToWear.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Guidelines */}
              <div className="space-y-4">
                {/* Local Customs */}
                <div>
                  <h4 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Local Customs • સ્થાનિક રીતરિવાજો
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {festival.localCustoms.map((custom, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        {custom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Do's */}
                <div>
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                    ✅ Do's • કરવાનું
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {festival.dos.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div>
                  <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    ❌ Don'ts • ન કરવાનું
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {festival.donts.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFestivals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No festivals found • કોઈ ઉત્સવ મળ્યા નથી
          </p>
        </div>
      )}
    </div>
  );
};

export default FestivalCalendar;

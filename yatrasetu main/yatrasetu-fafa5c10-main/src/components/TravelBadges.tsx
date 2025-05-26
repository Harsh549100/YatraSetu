
import React, { useState, useEffect } from 'react';
import { Award, Star, Map, Camera, Mountain, Users } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  nameGu: string;
  description: string;
  icon: any;
  color: string;
  requirement: string;
  achieved: boolean;
  progress: number;
  maxProgress: number;
}

const TravelBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'explorer',
      name: 'Village Explorer',
      nameGu: 'ગામ અન્વેષક',
      description: 'Visit 5 different villages',
      icon: Map,
      color: 'bg-green-500',
      requirement: 'Visit 5 villages',
      achieved: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'saurashtra',
      name: 'Saurashtra Specialist',
      nameGu: 'સૌરાષ્ટ્ર નિષ્ણાત',
      description: 'Explore the Saurashtra region',
      icon: Star,
      color: 'bg-blue-500',
      requirement: 'Visit 3 Saurashtra destinations',
      achieved: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: 'photographer',
      name: 'Cultural Photographer',
      nameGu: 'સાંસ્કૃતિક ફોટોગ્રાફર',
      description: 'Capture heritage moments',
      icon: Camera,
      color: 'bg-purple-500',
      requirement: 'Take photos at 10 heritage sites',
      achieved: true,
      progress: 10,
      maxProgress: 10
    },
    {
      id: 'temple',
      name: 'Temple Devotee',
      nameGu: 'મંદિર ભક્ત',
      description: 'Visit ancient temples',
      icon: Mountain,
      color: 'bg-orange-500',
      requirement: 'Visit 7 temples',
      achieved: false,
      progress: 4,
      maxProgress: 7
    },
    {
      id: 'guide',
      name: 'Local Guide',
      nameGu: 'સ્થાનિક માર્ગદર્શક',
      description: 'Help other travelers',
      icon: Users,
      color: 'bg-teal-500',
      requirement: 'Write 5 helpful reviews',
      achieved: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'adventurer',
      name: 'Gujarat Adventurer',
      nameGu: 'ગુજરાત સાહસિક',
      description: 'Complete a 7-day journey',
      icon: Award,
      color: 'bg-red-500',
      requirement: 'Complete 7-day itinerary',
      achieved: false,
      progress: 3,
      maxProgress: 7
    }
  ]);

  useEffect(() => {
    const savedBadges = localStorage.getItem('yatraSetu-badges');
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('yatraSetu-badges', JSON.stringify(badges));
  }, [badges]);

  const getProgressPercentage = (badge: Badge) => {
    return (badge.progress / badge.maxProgress) * 100;
  };

  const achievedBadges = badges.filter(badge => badge.achieved);
  const unachievedBadges = badges.filter(badge => !badge.achieved);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Award className="w-8 h-8 text-yellow-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Travel Badges • પ્રવાસ બેજ
        </h2>
      </div>

      {/* Achievement Summary */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{achievedBadges.length}/{badges.length}</div>
          <div className="text-yellow-100">Badges Earned • મેળવેલા બેજ</div>
        </div>
      </div>

      {/* Achieved Badges */}
      {achievedBadges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Achieved • પ્રાપ્ત કર્યા
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievedBadges.map(badge => (
              <div key={badge.id} className={`${badge.color} text-white p-4 rounded-xl relative overflow-hidden`}>
                <div className="absolute top-2 right-2">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div className="flex items-center mb-2">
                  <badge.icon className="w-8 h-8 mr-3" />
                  <div>
                    <h4 className="font-bold">{badge.name}</h4>
                    <p className="text-sm opacity-90">{badge.nameGu}</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 In Progress • પ્રગતિમાં
        </h3>
        <div className="space-y-4">
          {unachievedBadges.map(badge => (
            <div key={badge.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`${badge.color} p-2 rounded-lg mr-3`}>
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{badge.name}</h4>
                    <p className="text-orange-600 dark:text-orange-400">{badge.nameGu}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {badge.progress}/{badge.maxProgress}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                <div 
                  className={`${badge.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${getProgressPercentage(badge)}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.requirement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelBadges;

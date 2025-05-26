
import React, { useState } from 'react';
import { Sparkles, Clock, MapPin, Camera, Heart, Users, Mountain } from 'lucide-react';
import { getDestinationsByMood, gujaratDestinations } from '../data/destinations';

interface MoodSuggestion {
  mood: 'relaxing' | 'adventurous' | 'instagrammable' | 'family-friendly';
  emoji: string;
  label: string;
  labelGu: string;
  description: string;
  descriptionGu: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const EmotionAwareItinerary = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any>(null);

  const moods: MoodSuggestion[] = [
    {
      mood: 'relaxing',
      emoji: '😌',
      label: 'Relaxing',
      labelGu: 'આરામદાયક',
      description: 'Peaceful places for unwinding',
      descriptionGu: 'આરામ માટે શાંત સ્થળો',
      icon: Heart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      mood: 'adventurous',
      emoji: '🎉',
      label: 'Adventurous',
      labelGu: 'સાહસિક',
      description: 'Thrilling experiences and activities',
      descriptionGu: 'રોમાંચક અનુભવો અને પ્રવૃત્તિઓ',
      icon: Mountain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      mood: 'instagrammable',
      emoji: '📸',
      label: 'Instagrammable',
      labelGu: 'ફોટોજેનિક',
      description: 'Picture-perfect spots',
      descriptionGu: 'ફોટો માટે સંપૂર્ણ સ્થળો',
      icon: Camera,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100'
    },
    {
      mood: 'family-friendly',
      emoji: '👨‍👩‍👧‍👦',
      label: 'Family-Friendly',
      labelGu: 'કુટુંબ મિત્ર',
      description: 'Perfect for all ages',
      descriptionGu: 'તમામ ઉંમર માટે યોગ્ય',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    }
  ];

  const generateSuggestions = (mood: 'relaxing' | 'adventurous' | 'instagrammable' | 'family-friendly') => {
    const destinations = getDestinationsByMood(mood);
    const selectedDestinations = destinations.slice(0, 3);

    const timePreferences = {
      relaxing: ['Early morning (6-8 AM)', 'Evening (5-7 PM)', 'Late evening (7-9 PM)'],
      adventurous: ['Early morning (5-7 AM)', 'Morning (8-11 AM)', 'Afternoon (2-5 PM)'],
      instagrammable: ['Golden hour (6-8 AM)', 'Golden hour (5-7 PM)', 'Blue hour (7-8 PM)'],
      'family-friendly': ['Morning (9-11 AM)', 'Afternoon (2-4 PM)', 'Evening (5-7 PM)']
    };

    const activities = {
      relaxing: [
        'Sunset viewing at peaceful locations',
        'Boat rides on calm waters',
        'Meditation and yoga sessions',
        'Spa treatments and wellness activities',
        'Nature walks in serene environments'
      ],
      adventurous: [
        'Trekking and hiking trails',
        'Desert safaris and camel rides',
        'Rock climbing and rappelling',
        'Wildlife spotting expeditions',
        'Off-road vehicle adventures'
      ],
      instagrammable: [
        'Photography workshops',
        'Drone photography sessions',
        'Heritage architecture tours',
        'Colorful market visits',
        'Scenic viewpoint captures'
      ],
      'family-friendly': [
        'Interactive museum visits',
        'Cultural performance shows',
        'Handicraft workshop participation',
        'Easy nature trails',
        'Traditional cooking classes'
      ]
    };

    const tips = {
      relaxing: [
        'Start early to avoid crowds',
        'Carry comfortable seating',
        'Bring meditation music',
        'Pack healthy snacks',
        'Choose accommodation with spa facilities'
      ],
      adventurous: [
        'Carry adequate water and snacks',
        'Wear appropriate adventure gear',
        'Check weather conditions',
        'Hire experienced local guides',
        'Inform someone about your plans'
      ],
      instagrammable: [
        'Visit during golden hour',
        'Carry extra camera batteries',
        'Research best photo spots',
        'Respect local photography rules',
        'Consider hiring local photographers'
      ],
      'family-friendly': [
        'Plan shorter distances between stops',
        'Carry entertainment for kids',
        'Book family-friendly accommodation',
        'Pack first aid kit',
        'Plan meal stops at regular intervals'
      ]
    };

    return {
      destinations: selectedDestinations,
      bestTimes: timePreferences[mood],
      activities: activities[mood],
      tips: tips[mood]
    };
  };

  const handleMoodSelect = (mood: MoodSuggestion) => {
    setSelectedMood(mood.mood);
    setSuggestions(generateSuggestions(mood.mood));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Emotion-Aware Itinerary
          </h3>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          Choose your travel mood • તમારો પ્રવાસ મૂડ પસંદ કરો
        </p>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          ✨ Powered by Micro AI • માઇક્રો AI દ્વારા સંચાલિત
        </p>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.mood}
              onClick={() => handleMoodSelect(mood)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedMood === mood.mood
                  ? `border-${mood.color.split('-')[1]}-500 ${mood.bgColor.replace('hover:', '')} shadow-lg`
                  : `border-gray-200 dark:border-gray-600 hover:border-${mood.color.split('-')[1]}-300 ${mood.bgColor}`
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <Icon className={`w-6 h-6 mx-auto mb-2 ${mood.color}`} />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {mood.label}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {mood.labelGu}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {mood.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Suggestions */}
      {suggestions && selectedMood && (
        <div className="animate-fade-in">
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
              🤖 AI Recommendations for {moods.find(m => m.mood === selectedMood)?.label} Mood
            </h4>
            <p className="text-sm text-purple-600 dark:text-purple-300">
              Based on your mood, here are personalized suggestions • તમારા મૂડના આધારે, અહીં વ્યક્તિગત સૂચનો છે
            </p>
          </div>

          {/* Recommended Destinations */}
          <div className="mb-8">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
              Recommended Destinations • ભલામણ કરેલ સ્થળો
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.destinations.map((dest: any, index: number) => (
                <div key={dest.id} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <h6 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {dest.name}
                  </h6>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {dest.nameGu} • {dest.region}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">
                    {dest.specialty}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-300">
                      ⭐ {dest.rating}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {dest.visitDuration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Times */}
          <div className="mb-8">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-teal-500" />
              Optimal Timings • શ્રેષ્ઠ સમય
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestions.bestTimes.map((time: string, index: number) => (
                <div key={index} className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-teal-800 dark:text-teal-200">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Activities */}
          <div className="mb-8">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Mood-Based Activities • મૂડ આધારિત પ્રવૃત્તિઓ
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.activities.map((activity: string, index: number) => (
                <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <h5 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              🧠 AI-Powered Tips • AI સંચાલિત ટિપ્સ
            </h5>
            <div className="space-y-2">
              {suggestions.tips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span className="text-sm text-blue-700 dark:text-blue-300">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionAwareItinerary;

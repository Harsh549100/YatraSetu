
import React, { useState } from 'react';
import { Moon, Sun, Menu, Phone, Info, Calendar, Sparkles, Package, Shield, DollarSign, Award, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AboutApp from './AboutApp';

interface NavigationProps {
  onFeatureSelect?: (feature: string) => void;
}

const Navigation = ({ onFeatureSelect }: NavigationProps) => {
  const { isDark, toggleTheme } = useTheme();
  const [showAbout, setShowAbout] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const callEmergency = () => {
    if (confirm('Call Emergency Services (100)?')) {
      window.location.href = 'tel:100';
    }
  };

  const handleFeatureClick = (featureId: string) => {
    if (onFeatureSelect) {
      onFeatureSelect(featureId);
    }
    setShowFeatures(false);
    
    // Scroll to the feature section
    setTimeout(() => {
      const element = document.getElementById('dynamic-features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const features = [
    { id: 'emergency', icon: Shield, label: 'Emergency Kit', color: 'text-red-500' },
    { id: 'expenses', icon: DollarSign, label: 'Expense Tracker', color: 'text-green-500' },
    { id: 'events', icon: Calendar, label: 'Cultural Events', color: 'text-purple-500' },
    { id: 'badges', icon: Award, label: 'Travel Badges', color: 'text-yellow-500' },
    { id: 'etiquette', icon: Heart, label: 'Cultural Etiquette', color: 'text-pink-500' },
    { id: 'festival-calendar', icon: Calendar, label: 'Festival Calendar', color: 'text-orange-500' },
    { id: 'travel-fortune', icon: Sparkles, label: 'AI Travel Fortune', color: 'text-purple-600' },
    { id: 'pack-my-bag', icon: Package, label: 'Pack My Bag', color: 'text-blue-500' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-orange-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-teal-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">YatraSetu</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">Home</a>
              <a href="#planner" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">AI Planner</a>
              <a href="#maps" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">Maps</a>
              
              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm flex items-center"
                >
                  Features
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showFeatures && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowFeatures(false)}
                    ></div>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20">
                      <div className="p-3">
                        <div className="grid grid-cols-2 gap-2">
                          {features.map(feature => (
                            <button
                              key={feature.id}
                              onClick={() => handleFeatureClick(feature.id)}
                              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                            >
                              <feature.icon className={`w-4 h-4 mr-2 ${feature.color}`} />
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {feature.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <a href="#community" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm">Community</a>
            </div>

            <div className="flex items-center space-x-3">
              {/* About App Button */}
              <button
                onClick={() => setShowAbout(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 text-sm font-medium"
                title="About YatraSetu App"
              >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </button>

              {/* Emergency Help Button */}
              <button
                onClick={callEmergency}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 text-sm font-medium"
                title="Emergency Help - Call 100"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Help</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* About App Modal */}
      <AboutApp isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

export default Navigation;

import React, { useState } from 'react';
import { Menu, X, Phone, Map, DollarSign, Calendar, Award, Book, AlertTriangle, Languages, Shield, Heart, Sparkles, Package } from 'lucide-react';

interface QuickAccessPanelProps {
  onFeatureSelect: (feature: string) => void;
}

const QuickAccessPanel = ({ onFeatureSelect }: QuickAccessPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    { id: 'emergency', icon: Shield, label: 'Emergency Kit', color: 'bg-red-500' },
    { id: 'expenses', icon: DollarSign, label: 'Expenses', color: 'bg-green-500' },
    { id: 'events', icon: Calendar, label: 'Cultural Events', color: 'bg-purple-500' },
    { id: 'badges', icon: Award, label: 'Travel Badges', color: 'bg-yellow-500' },
    { id: 'etiquette', icon: Heart, label: 'Etiquette Guide', color: 'bg-pink-500' },
    { id: 'festival-calendar', icon: Calendar, label: 'Festival Calendar', color: 'bg-orange-500' },
    { id: 'travel-fortune', icon: Sparkles, label: 'Travel Fortune', color: 'bg-purple-600' },
    { id: 'pack-my-bag', icon: Package, label: 'Pack My Bag', color: 'bg-blue-500' },
  ];

  const handleFeatureClick = (featureId: string) => {
    if (featureId === 'help') {
      if (confirm('Call Emergency Services (100)?')) {
        window.location.href = 'tel:100';
      }
    } else {
      onFeatureSelect(featureId);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Access Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-teal-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Quick Access Panel */}
      <div className={`fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 z-50 transform transition-all duration-300 ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
            Quick Access • ઝડપી પહોંચ
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 w-80">
          {features.map(feature => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature.id)}
              className={`${feature.color} text-white p-3 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <feature.icon className="w-6 h-6 mb-2" />
                <div>
                  <div className="text-sm font-bold">{feature.label}</div>
                  <div className="text-xs opacity-90">{feature.label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickAccessPanel;

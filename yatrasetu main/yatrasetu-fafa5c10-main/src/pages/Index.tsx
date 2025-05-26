
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ItineraryPlanner from '../components/ItineraryPlanner';
import MapSection from '../components/MapSection';
import VoiceDirections from '../components/VoiceDirections';
import LanguageTranslator from '../components/LanguageTranslator';
import CommunityReviews from '../components/CommunityReviews';
import Footer from '../components/Footer';
import EmergencyKit from '../components/EmergencyKit';
import ExpenseTracker from '../components/ExpenseTracker';
import CulturalEvents from '../components/CulturalEvents';
import TravelBadges from '../components/TravelBadges';
import CulturalEtiquette from '../components/CulturalEtiquette';
import FestivalCalendar from '../components/FestivalCalendar';
import AITravelFortune from '../components/AITravelFortune';
import PackMyBag from '../components/PackMyBag';
import QuickAccessPanel from '../components/QuickAccessPanel';
import { ThemeProvider } from '../contexts/ThemeContext';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(activeFeature === feature ? null : feature);
    
    // Scroll to the feature section
    setTimeout(() => {
      const element = document.getElementById('dynamic-features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'emergency':
        return <EmergencyKit />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'events':
        return <CulturalEvents />;
      case 'badges':
        return <TravelBadges />;
      case 'etiquette':
        return <CulturalEtiquette />;
      case 'festival-calendar':
        return <FestivalCalendar />;
      case 'travel-fortune':
        return <AITravelFortune />;
      case 'pack-my-bag':
        return <PackMyBag />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
        <Navigation onFeatureSelect={handleFeatureSelect} />
        <Hero />
        <Features />
        <ItineraryPlanner />
        <MapSection />
        
        {/* Static New Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            <FestivalCalendar />
            <AITravelFortune />
            <PackMyBag />
          </div>
        </section>
        
        {/* Dynamic Features Section */}
        {activeFeature && (
          <section id="dynamic-features" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              {renderActiveFeature()}
            </div>
          </section>
        )}
        
        <VoiceDirections />
        <LanguageTranslator />
        <CommunityReviews />
        
        {/* Support Sections */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Travel Guidelines */}
            <div id="travel-guidelines" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Travel Guidelines • પ્રવાસ માર્ગદર્શિકા
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-3">
                    Before You Travel • પ્રવાસ પહેલાં
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Check weather conditions and pack accordingly</li>
                    <li>• Download offline maps and translation apps</li>
                    <li>• Inform someone about your travel plans</li>
                    <li>• Carry sufficient cash as ATMs may be limited</li>
                    <li>• Research local customs and festivals</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-3">
                    During Travel • પ્રવાસ દરમિયાન
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Respect local traditions and dress codes</li>
                    <li>• Support local businesses and artisans</li>
                    <li>• Stay hydrated and eat at clean places</li>
                    <li>• Keep emergency contacts handy</li>
                    <li>• Be environmentally conscious</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div id="safety-tips" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Safety Tips • સુરક્ષા સૂચનો
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Emergency • કટોકટી
                  </h3>
                  <ul className="space-y-1 text-red-700 dark:text-red-300 text-sm">
                    <li>• Police: 100</li>
                    <li>• Fire: 101</li>
                    <li>• Ambulance: 108</li>
                    <li>• Tourist Helpline: 1363</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
                    Health • આરોગ્ય
                  </h3>
                  <ul className="space-y-1 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• Carry basic first aid kit</li>
                    <li>• Drink bottled/boiled water</li>
                    <li>• Use mosquito repellent</li>
                    <li>• Avoid street food if sensitive stomach</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Security • સુરક્ષા
                  </h3>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• Keep valuables secure</li>
                    <li>• Avoid isolated areas at night</li>
                    <li>• Share location with trusted contacts</li>
                    <li>• Keep copies of important documents</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div id="privacy-policy" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Privacy Policy • ગોપનીયતા નીતિ
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  YatraSetu is committed to protecting your privacy and personal information. 
                  This policy explains how we collect, use, and safeguard your data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Data Collection • ડેટા સંગ્રહ
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Location data for offline maps</li>
                      <li>• Travel preferences for recommendations</li>
                      <li>• User reviews and ratings</li>
                      <li>• Device information for app optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Data Protection • ડેટા સુરક્ષા
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Encrypted data transmission</li>
                      <li>• No sharing with third parties</li>
                      <li>• User control over data deletion</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  For questions about privacy, contact us at: Shrivastavaharsh5491@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
        
        {/* Quick Access Panel */}
        <QuickAccessPanel onFeatureSelect={handleFeatureSelect} />
      </div>
    </ThemeProvider>
  );
};

export default Index;

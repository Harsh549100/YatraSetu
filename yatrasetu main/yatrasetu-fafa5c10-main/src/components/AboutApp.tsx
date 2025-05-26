
import React from 'react';
import { X, Compass, Map, Mic, Users, Route, Star, Phone, Shield, Heart, Zap, Calendar, Sparkles, Package, DollarSign, Award, Languages, Globe } from 'lucide-react';

interface AboutAppProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutApp = ({ isOpen, onClose }: AboutAppProps) => {
  if (!isOpen) return null;

  const coreFeatures = [
    {
      icon: Compass,
      title: "AI Itinerary Planner",
      description: "Get personalized travel plans with emotion-aware suggestions based on your mood and preferences",
      howTo: "Select your destination, choose dates, pick your mood (Relaxing, Adventurous, Instagrammable, Family-Friendly), and let our AI create the perfect itinerary with unique daily activities."
    },
    {
      icon: Map,
      title: "Offline Rural Maps",
      description: "Navigate rural Gujarat even without internet connectivity with detailed village maps",
      howTo: "Download maps before your trip. Use GPS navigation, search for destinations, and get detailed route information offline."
    },
    {
      icon: Mic,
      title: "Voice Directions",
      description: "Get directions in Gujarati, Hindi, and English with AI-powered voice assistance",
      howTo: "Tap the voice button, speak your destination in any supported language, and receive audio navigation instructions in real-time."
    },
    {
      icon: Languages,
      title: "AI Language Translator",
      description: "Real-time translation between English, Gujarati, and Hindi with common travel phrases",
      howTo: "Type or speak your message, select languages, and get instant translations. Use common phrases for quick communication with locals."
    },
    {
      icon: Users,
      title: "Community Reviews",
      description: "Connect with locals and fellow travelers for authentic experiences and recommendations",
      howTo: "Read reviews from other travelers, share your experiences, rate destinations, and connect with the local community for insider tips."
    },
    {
      icon: Route,
      title: "Cultural Routes",
      description: "Discover heritage trails and traditional village experiences with curated cultural paths",
      howTo: "Browse curated cultural routes, learn about local traditions, and experience authentic Gujarat village life through guided cultural journeys."
    }
  ];

  const advancedFeatures = [
    {
      icon: Shield,
      title: "Emergency Kit",
      description: "Quick access to emergency services with location sharing and safety information",
      howTo: "Access emergency contacts (100, 101, 108), share your location automatically, and get safety guidelines for rural travel."
    },
    {
      icon: DollarSign,
      title: "Expense Tracker",
      description: "Track your travel expenses with smart categorization and budget management",
      howTo: "Log expenses by category (food, transport, accommodation), set daily budgets, and get spending insights with visual reports."
    },
    {
      icon: Calendar,
      title: "Cultural Events & Festivals",
      description: "Discover ongoing and upcoming cultural events, festivals, and celebrations",
      howTo: "Browse events by date and location, get festival guides with dress codes and customs, and plan visits around local celebrations."
    },
    {
      icon: Award,
      title: "Travel Badges",
      description: "Earn achievements and badges for exploring different regions and completing activities",
      howTo: "Complete travel milestones, visit heritage sites, participate in cultural activities, and collect digital badges to showcase your Gujarat exploration."
    },
    {
      icon: Heart,
      title: "Cultural Etiquette Guide",
      description: "Learn local customs, do's and don'ts, and cultural sensitivity guidelines",
      howTo: "Read region-specific etiquette guides, learn about local customs, dress codes for temples, and respectful interaction tips."
    },
    {
      icon: Calendar,
      title: "Festival Calendar",
      description: "Complete calendar of Gujarat festivals with cultural tips and participation guidelines",
      howTo: "View festivals by month/region, get detailed guides on what to wear, when to go, local customs, and participation etiquette."
    },
    {
      icon: Sparkles,
      title: "AI Travel Fortune",
      description: "Playful AI-powered destination suggestions with hidden gems and local secrets",
      howTo: "Get random suggestions for unexplored villages, discover cool facts about Gujarat, learn local tips, and find offline routes to hidden places."
    },
    {
      icon: Package,
      title: "Smart Packing Assistant",
      description: "AI-powered packing suggestions based on destination, weather, and season",
      howTo: "Enter your destination and travel dates, get weather-specific packing lists, cultural dress recommendations, and essential items for rural travel."
    }
  ];

  const emergencyFeatures = [
    {
      icon: Phone,
      title: "Emergency Services",
      description: "One-tap access to Police (100), Fire (101), Ambulance (108), and Tourist Helpline (1363)"
    },
    {
      icon: Shield,
      title: "Safety Guidelines",
      description: "Comprehensive safety tips for rural travel, health precautions, and security measures"
    },
    {
      icon: Globe,
      title: "Location Sharing",
      description: "Share your real-time location with trusted contacts for safety and coordination"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About YatraSetu</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Complete Rural Gujarat Travel Companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Overview */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Bridging Villages with Voyages • ગામોને યાત્રાઓ સાથે જોડવું
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              YatraSetu is your comprehensive AI-powered travel companion for exploring Gujarat's rural destinations. 
              Combining advanced AI technology with local insights, we make rural travel accessible, safe, and memorable 
              with features like emotion-aware itinerary planning, real-time translation, and cultural guidance.
            </p>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-500" />
              Core Features & How to Use
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h5>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{feature.description}</p>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-300 font-medium mb-1">How to use:</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.howTo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Advanced AI-Powered Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <feature.icon className="w-5 h-5 text-purple-500 mr-2" />
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">{feature.title}</h5>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{feature.description}</p>
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-300">{feature.howTo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency & Safety */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-500" />
              Emergency & Safety Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyFeatures.map((feature, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <feature.icon className="w-5 h-5 text-red-500 mr-2" />
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">{feature.title}</h5>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start Guide */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Feature Guide</h4>
            <div className="bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h5>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                      Choose your destination from 150+ rural locations across Gujarat
                    </li>
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                      Select your mood for emotion-aware AI recommendations
                    </li>
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                      Download offline maps and translation phrases for your route
                    </li>
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
                      Use voice navigation and real-time translation features
                    </li>
                  </ol>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Pro Tips & Features</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">🤖</span>
                      Use AI Travel Fortune for discovering hidden gems and local secrets
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">📱</span>
                      Enable location sharing for emergency assistance and safety
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">🎒</span>
                      Use Smart Packing Assistant for weather-appropriate packing lists
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">🎭</span>
                      Check Festival Calendar for cultural events and participation tips
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">💰</span>
                      Track expenses and earn travel badges for exploration milestones
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">🗣️</span>
                      Voice commands and translation work in Gujarati, Hindi, and English
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Need Help or Have Feedback?</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Contact us for support, feature requests, or suggestions to improve YatraSetu
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.href = 'mailto:Shrivastavaharsh5491@gmail.com'}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Contact Developer
              </button>
              <button
                onClick={() => window.location.href = 'tel:100'}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Emergency Help (100)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;

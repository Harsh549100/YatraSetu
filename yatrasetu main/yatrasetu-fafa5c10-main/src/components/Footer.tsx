
import React from 'react';
import { Compass, MapPin, Mic, Users } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-teal-500 rounded-lg"></div>
              <span className="text-xl font-bold">YatraSetu</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bridging Villages with Voyages - Your gateway to authentic Gujarat rural experiences.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li 
                className="flex items-center hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('itinerary')}
              >
                <Compass className="w-4 h-4 mr-2 text-orange-400" />
                AI Itinerary Planner
              </li>
              <li 
                className="flex items-center hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                <MapPin className="w-4 h-4 mr-2 text-teal-400" />
                Offline Rural Maps
              </li>
              <li 
                className="flex items-center hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('voice-directions')}
              >
                <Mic className="w-4 h-4 mr-2 text-purple-400" />
                Voice Directions
              </li>
              <li 
                className="flex items-center hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('reviews')}
              >
                <Users className="w-4 h-4 mr-2 text-green-400" />
                Community Reviews
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li 
                className="hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                Kutch Villages
              </li>
              <li 
                className="hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                Saurashtra Rural
              </li>
              <li 
                className="hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                Tribal Heartland
              </li>
              <li 
                className="hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                Coastal Villages
              </li>
              <li 
                className="hover:text-orange-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('maps')}
              >
                Heritage Towns
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support & Tools</h3>
            <ul className="space-y-2 text-gray-400">
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('travel-guidelines')}
              >
                Travel Guidelines
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('safety-tips')}
              >
                Safety Tips
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('festival-calendar')}
              >
                Festival Calendar
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('travel-fortune')}
              >
                AI Travel Fortune
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('pack-my-bag')}
              >
                Pack My Bag
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => window.location.href = 'mailto:Shrivastavaharsh5491@gmail.com'}
              >
                Contact Us
              </li>
              <li 
                className="hover:text-teal-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection('privacy-policy')}
              >
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-2">
                © 2025 YatraSetu. Made with ❤️ for rural Gujarat tourism.
              </p>
              <p className="text-gray-500 text-sm">
                Made by Harsh Shrivastava
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400">Available in:</span>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700 cursor-pointer transition-colors">
                  English
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700 cursor-pointer transition-colors">
                  ગુજરાતી
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700 cursor-pointer transition-colors">
                  हिंदी
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

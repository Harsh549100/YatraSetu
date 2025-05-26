
import React from 'react';
import { Compass, Star } from 'lucide-react';

const Hero = () => {
  const scrollToPlanner = () => {
    document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-20 pb-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-300 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border-2 border-teal-300 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-orange-300 rounded-full animate-pulse delay-700"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-teal-600 to-orange-500 bg-clip-text text-transparent animate-fade-in">
              YatraSetu
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 animate-fade-in delay-300">
              Bridging Villages with Voyages • ગામોને યાત્રાઓ સાથે જોડવું
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in delay-500">
              Discover Gujarat's hidden rural gems with AI-powered itineraries, offline maps, 
              emergency assistance, and local community insights. Your complete travel companion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={scrollToPlanner}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in delay-700"
              >
                <Compass className="inline-block w-5 h-5 mr-2" />
                Plan Your Journey • તમારી યાત્રાનું આયોજન કરો
              </button>
              
              <button 
                onClick={() => document.getElementById('maps')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-orange-500 text-orange-600 dark:text-orange-400 rounded-xl font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 animate-fade-in delay-900"
              >
                Explore Villages • ગામોની શોધ કરો
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="text-center animate-fade-in delay-1000">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">150+</div>
                <div className="text-gray-600 dark:text-gray-400">Rural Destinations • ગ્રામીણ સ્થળો</div>
              </div>
              <div className="text-center animate-fade-in delay-1100">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">15000+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Travelers • ખુશ પ્રવાસીઓ</div>
              </div>
              <div className="text-center animate-fade-in delay-1200">
                <div className="flex justify-center items-center text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  4.8 <Star className="w-6 h-6 ml-1 fill-current" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">User Rating • વપરાશકર્તા રેટિંગ</div>
              </div>
            </div>

            {/* Creator Credit */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Made with ❤️ by <span className="font-semibold text-orange-600 dark:text-orange-400">Harsh Shrivastava</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

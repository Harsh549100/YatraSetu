
import React from 'react';
import { Map, Mic, Users, Compass, Star, Route } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Compass,
      title: "AI Itinerary Planner",
      description: "Get personalized travel plans for Gujarat's rural destinations powered by AI"
    },
    {
      icon: Map,
      title: "Offline Rural Maps",
      description: "Navigate rural areas even without internet connectivity"
    },
    {
      icon: Mic,
      title: "Voice Directions",
      description: "Get directions in Gujarati and English with voice assistance"
    },
    {
      icon: Users,
      title: "Community Reviews",
      description: "Connect with locals and fellow travelers for authentic experiences"
    },
    {
      icon: Route,
      title: "Cultural Routes",
      description: "Discover heritage trails and traditional village experiences"
    },
    {
      icon: Star,
      title: "Local Insights",
      description: "Authentic recommendations from village communities"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Gujarat Like Never Before
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with local knowledge to create 
            unforgettable rural travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Search, Filter, Layers, Zap } from 'lucide-react';
import { gujaratDestinations, Destination } from '../data/destinations';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(gujaratDestinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const L = await import('leaflet');
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        if (mapRef.current && !mapLoaded) {
          const map = L.default.map(mapRef.current).setView([23.0225, 72.5714], 7);

          L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          delete (L.default.Icon.Default.prototype as any)._getIconUrl;
          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          });

          gujaratDestinations.forEach((destination) => {
            const marker = L.default.marker([destination.lat, destination.lng]).addTo(map);
            marker.bindPopup(`
              <div class="p-3 min-w-[200px]">
                <h3 class="font-bold text-lg text-gray-900 mb-1">${destination.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${destination.nameGu}</p>
                <p class="text-xs text-orange-600 font-medium mb-2">${destination.specialty}</p>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-yellow-500 flex items-center">★ ${destination.rating}</span>
                  <span class="text-xs text-gray-500">${destination.reviews} reviews</span>
                </div>
                <p class="text-xs text-gray-700 mb-2">${destination.description.substring(0, 100)}...</p>
                <div class="flex flex-wrap gap-1">
                  ${destination.moods.map(mood => `<span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">${mood}</span>`).join('')}
                </div>
              </div>
            `);
          });

          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadLeaflet();
  }, [mapLoaded]);

  useEffect(() => {
    let filtered = gujaratDestinations;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.nameGu.includes(searchTerm) ||
        dest.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDestinations(filtered);
  }, [selectedCategory, searchTerm]);

  const categories = [
    { value: 'all', label: 'All • બધા', count: gujaratDestinations.length },
    { value: 'heritage', label: 'Heritage • વારસો', count: gujaratDestinations.filter(d => d.category === 'heritage').length },
    { value: 'rural', label: 'Rural • ગ્રામ્ય', count: gujaratDestinations.filter(d => d.category === 'rural').length },
    { value: 'nature', label: 'Nature • કુદરત', count: gujaratDestinations.filter(d => d.category === 'nature').length },
    { value: 'spiritual', label: 'Spiritual • આધ્યાત્મિક', count: gujaratDestinations.filter(d => d.category === 'spiritual').length },
    { value: 'urban', label: 'Urban • શહેરી', count: gujaratDestinations.filter(d => d.category === 'urban').length }
  ];

  return (
    <section id="maps" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Interactive Gujarat Map
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Explore {gujaratDestinations.length}+ destinations with advanced mapping • અદ્યતન મેપિંગ સાથે {gujaratDestinations.length}+ સ્થળોની શોધ કરો
          </p>
          <div className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4 mr-1" />
            Real-time data • Offline support • Interactive features
          </div>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, attractions, or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 shadow-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 shadow-sm min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.slice(1).map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                }`}
              >
                {category.label.split(' • ')[0]} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Map Container */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Live Interactive Map • જીવંત ઇન્ટરેક્ટિવ નકશો
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  Click on markers for detailed information • વિગતવાર માહિતી માટે માર્કર્સ પર ક્લિક કરો
                </p>
              </div>
              <div 
                ref={mapRef}
                className="w-full h-96 lg:h-[600px]"
                style={{ minHeight: '400px' }}
              >
                {!mapLoaded && (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                        Loading Advanced Map Features...
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Preparing {gujaratDestinations.length} destinations
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Destinations List */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center sticky top-0">
                <Navigation className="w-6 h-6 mr-3 text-blue-500" />
                Destinations • સ્થળો
                <span className="ml-auto text-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  {filteredDestinations.length}
                </span>
              </h3>
              
              <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
                {filteredDestinations.map((destination, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDestination(destination)}
                    className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 ${
                      destination.category === 'heritage' ? 'border-l-yellow-500' :
                      destination.category === 'nature' ? 'border-l-green-500' :
                      destination.category === 'spiritual' ? 'border-l-purple-500' :
                      destination.category === 'rural' ? 'border-l-orange-500' :
                      'border-l-blue-500'
                    } hover:scale-105`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors text-lg">
                          {destination.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {destination.nameGu} • {destination.region}
                        </p>
                        <p className="text-xs font-medium mb-2 px-2 py-1 rounded-full inline-block" style={{
                          backgroundColor: destination.category === 'heritage' ? '#fef3c7' :
                                         destination.category === 'nature' ? '#d1fae5' :
                                         destination.category === 'spiritual' ? '#e9d5ff' :
                                         destination.category === 'rural' ? '#fed7aa' : '#dbeafe',
                          color: destination.category === 'heritage' ? '#92400e' :
                                destination.category === 'nature' ? '#065f46' :
                                destination.category === 'spiritual' ? '#6b21a8' :
                                destination.category === 'rural' ? '#9a3412' : '#1e40af'
                        }}>
                          {destination.specialty}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <MapPin className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform mb-2" />
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-600 dark:text-gray-400 ml-1 font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Mood Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.moods.map((mood, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          {mood}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.attractions.slice(0, 2).map((attraction, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          {attraction}
                        </span>
                      ))}
                      {destination.attractions.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{destination.attractions.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{destination.bestTime}</span>
                      <span>{destination.reviews} reviews</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {destination.visitDuration}
                      </span>
                    </div>
                  </div>
                ))}
                
                {filteredDestinations.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                      No destinations found
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      Try adjusting your search or filters • તમારી શોધ અથવા ફિલ્ટર્સ ગોઠવવાનો પ્રયાસ કરો
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Destinations', value: gujaratDestinations.length, color: 'bg-blue-500' },
            { label: 'Heritage Sites', value: gujaratDestinations.filter(d => d.category === 'heritage').length, color: 'bg-yellow-500' },
            { label: 'Nature Spots', value: gujaratDestinations.filter(d => d.category === 'nature').length, color: 'bg-green-500' },
            { label: 'Avg Rating', value: (gujaratDestinations.reduce((acc, d) => acc + d.rating, 0) / gujaratDestinations.length).toFixed(1), color: 'bg-purple-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white font-bold text-lg">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;

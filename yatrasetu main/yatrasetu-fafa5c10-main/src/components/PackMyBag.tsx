
import React, { useState } from 'react';
import { Package, CloudSun, Thermometer, ShirtIcon, AlertTriangle } from 'lucide-react';

interface PackingList {
  clothing: string[];
  essentials: string[];
  seasonal: string[];
  localSpecific: string[];
  tips: string[];
}

const PackMyBag = () => {
  const [destination, setDestination] = useState('');
  const [season, setSeason] = useState('');
  const [duration, setDuration] = useState('');
  const [packingList, setPackingList] = useState<PackingList | null>(null);

  const generatePackingList = () => {
    if (!destination || !season || !duration) return;

    // Smart packing logic based on destination, season, and duration
    const baseClothing = ['Underwear', 'Socks', 'Pajamas'];
    const baseEssentials = ['Toothbrush', 'Toothpaste', 'Phone charger', 'ID cards', 'Cash'];
    
    let clothing = [...baseClothing];
    let seasonal = [];
    let localSpecific = [];
    let tips = [];

    // Season-based packing
    if (season === 'summer') {
      clothing.push('Cotton t-shirts', 'Light pants/shorts', 'Comfortable sandals', 'Sun hat');
      seasonal.push('Sunscreen SPF 30+', 'Sunglasses', 'Water bottle', 'Cooling towel');
      tips.push('Carry ORS packets for hydration', 'Wear light colors to reflect heat');
    } else if (season === 'winter') {
      clothing.push('Warm jacket', 'Sweaters', 'Long pants', 'Closed shoes');
      seasonal.push('Moisturizer', 'Lip balm', 'Warm socks', 'Light blanket');
      tips.push('Layer clothing for temperature changes', 'Carry warm water bottle');
    } else if (season === 'monsoon') {
      clothing.push('Quick-dry clothes', 'Waterproof jacket', 'Extra undergarments');
      seasonal.push('Umbrella', 'Waterproof bag', 'Anti-fungal powder', 'Mosquito repellent');
      tips.push('Pack clothes in plastic bags', 'Carry extra footwear');
    }

    // Destination-specific packing
    if (destination.toLowerCase().includes('kutch') || destination.toLowerCase().includes('rann')) {
      localSpecific.push('Desert scarf', 'Closed shoes for sand', 'Warm clothes for night', 'Camera extra batteries');
      tips.push('Desert gets very cold at night in winter', 'Sand can damage electronics - keep them covered');
    } else if (destination.toLowerCase().includes('dwarka') || destination.toLowerCase().includes('somnath')) {
      localSpecific.push('Modest temple wear', 'Extra clothes for temple visits', 'Waterproof bag for beach');
      tips.push('Dress modestly for temple visits', 'Plastic slippers for temple floors');
    } else if (destination.toLowerCase().includes('saputara')) {
      localSpecific.push('Trekking shoes', 'Raincoat', 'Warm clothes', 'Insect repellent');
      tips.push('Weather changes quickly in hills', 'Carry glucose tablets for energy');
    } else if (destination.toLowerCase().includes('gir')) {
      localSpecific.push('Neutral colored clothes', 'Binoculars', 'Camera with zoom lens', 'Closed shoes');
      tips.push('Avoid bright colors in safari', 'Early morning safaris are best for lion sightings');
    } else if (destination.toLowerCase().includes('bhuj')) {
      localSpecific.push('Comfortable walking shoes', 'Traditional clothes for cultural sites', 'Craft shopping bag');
      tips.push('Bargain respectfully at markets', 'Try local Kutchi embroidery');
    }

    // Festival-specific additions
    if (season === 'navratri' || destination.toLowerCase().includes('navratri')) {
      localSpecific.push('Chaniya choli / Traditional wear', 'Comfortable dancing shoes', 'Light jewelry');
      tips.push('Navratri nights get chilly - carry light shawl', 'Comfortable shoes are essential for garba');
    }

    // Duration-based adjustments
    const durationNum = parseInt(duration);
    if (durationNum > 5) {
      clothing.push('Extra set of everything', 'Laundry detergent packets');
      tips.push('Pack for laundry every 3-4 days', 'Local dhobis available in most towns');
    }

    const newPackingList: PackingList = {
      clothing,
      essentials: baseEssentials,
      seasonal,
      localSpecific,
      tips
    };

    setPackingList(newPackingList);
  };

  const destinations = [
    'Kutch - White Rann', 'Dwarka', 'Somnath', 'Gir National Park', 'Saputara', 
    'Bhuj', 'Mandvi', 'Champaner', 'Modhera', 'Lothal', 'Vadodara', 'Surat'
  ];

  const seasons = [
    { value: 'summer', label: 'Summer (March-June) • ઉનાળો', icon: '☀️' },
    { value: 'monsoon', label: 'Monsoon (July-September) • વરસાદ', icon: '🌧️' },
    { value: 'winter', label: 'Winter (October-February) • શિયાળો', icon: '❄️' },
    { value: 'navratri', label: 'Navratri Season • નવરાત્રી', icon: '🎭' }
  ];

  return (
    <div id="pack-my-bag" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Package className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pack My Bag • મારી બેગ પેક કરો
        </h2>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Smart packing assistant based on destination, weather & season • 
        સ્થળ, હવામાન અને મોસમ પ્રમાણે સ્માર્ટ પેકિંગ સહાયક
      </p>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Destination • ગંતવ્ય
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select destination</option>
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Season • મોસમ
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select season</option>
            {seasons.map(s => (
              <option key={s.value} value={s.value}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration (days) • દિવસો
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 3"
            min="1"
            max="30"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={generatePackingList}
        disabled={!destination || !season || !duration}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-6"
      >
        Generate My Packing List • મારી પેકિંગ યાદી બનાવો
      </button>

      {/* Packing List */}
      {packingList && (
        <div className="space-y-6">
          {/* Example Smart Suggestion */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Smart Suggestion for {destination} in {season}:
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              "Cotton clothes, comfortable slippers, mosquito repellent, light shawl — 
              {season === 'winter' ? 'Winter nights get chilly' : 
               season === 'summer' ? 'Summer days are hot but evenings are pleasant' : 
               'Monsoon brings humidity and insects'} in {destination.split(' - ')[0]}."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clothing */}
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
              <h3 className="flex items-center text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                <ShirtIcon className="w-5 h-5 mr-2" />
                Clothing • કપડાં
              </h3>
              <ul className="space-y-1">
                {packingList.clothing.map((item, index) => (
                  <li key={index} className="flex items-center text-purple-700 dark:text-purple-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Essentials */}
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
              <h3 className="flex items-center text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                <Package className="w-5 h-5 mr-2" />
                Essentials • જરૂરી વસ્તુઓ
              </h3>
              <ul className="space-y-1">
                {packingList.essentials.map((item, index) => (
                  <li key={index} className="flex items-center text-green-700 dark:text-green-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Seasonal Items */}
            <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
              <h3 className="flex items-center text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                <Thermometer className="w-5 h-5 mr-2" />
                Seasonal Items • મોસમી વસ્તુઓ
              </h3>
              <ul className="space-y-1">
                {packingList.seasonal.map((item, index) => (
                  <li key={index} className="flex items-center text-orange-700 dark:text-orange-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Specific */}
            <div className="bg-teal-50 dark:bg-teal-900 rounded-lg p-4">
              <h3 className="flex items-center text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">
                <CloudSun className="w-5 h-5 mr-2" />
                Local Specific • સ્થાનિક વિશેષ
              </h3>
              <ul className="space-y-1">
                {packingList.localSpecific.map((item, index) => (
                  <li key={index} className="flex items-center text-teal-700 dark:text-teal-300">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Travel Tips */}
          {packingList.tips.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
              <h3 className="flex items-center text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Pro Travel Tips • પ્રો ટ્રાવેલ ટિપ્સ
              </h3>
              <ul className="space-y-2">
                {packingList.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-yellow-700 dark:text-yellow-300">
                    <span className="text-yellow-500 mr-2 mt-1">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!packingList && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎒</div>
          <p className="text-gray-500 dark:text-gray-400">
            Fill in your travel details above to get a personalized packing list!
            <br />
            <span className="text-sm">ઉપરની વિગતો ભરો અને તમારી વ્યક્તિગત પેકિંગ યાદી મેળવો!</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PackMyBag;

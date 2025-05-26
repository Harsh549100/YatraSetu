
import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Info, Shuffle } from 'lucide-react';

interface Destination {
  name: string;
  nameGu: string;
  district: string;
  coolFact: string;
  localTip: string;
  howToReach: string;
  gujaratFact: string;
  image: string;
}

const AITravelFortune = () => {
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const destinations: Destination[] = [
    {
      name: 'Dhola-Veraval',
      nameGu: 'ઢોલા-વેરાવળ',
      district: 'Kutch',
      coolFact: 'This village has India\'s first tidal energy project and ancient salt farming techniques passed down for 400+ years.',
      localTip: 'Visit during sunset to see the salt crystals shine like diamonds. Local salt farmers offer authentic experiences.',
      howToReach: 'Take bus from Bhuj (45 km) → Auto to village center. Download offline maps as network is limited.',
      gujaratFact: 'Gujarat produces 76% of India\'s salt, and this region contributes significantly to that production.',
      image: '/placeholder.svg'
    },
    {
      name: 'Champaner',
      nameGu: 'ચંપાનેર',
      district: 'Panchmahal',
      coolFact: 'UNESCO World Heritage site with 114 monuments from the 8th-15th centuries, including India\'s only complete Islamic city.',
      localTip: 'Climb Pavagadh hill early morning for breathtaking views. Try local "Champaner na Samosa" - it\'s legendary!',
      howToReach: 'Train to Halol (5 km) → Auto/taxi to Champaner. Carry water and comfortable shoes for hill climbing.',
      gujaratFact: 'Gujarat has 3 UNESCO World Heritage Sites - the most for any Indian state after Delhi.',
      image: '/placeholder.svg'
    },
    {
      name: 'Mandvi Beach',
      nameGu: 'માંડવી બીચ',
      district: 'Kutch',
      coolFact: 'Home to 400-year-old shipbuilding tradition where artisans still craft wooden ships without modern machinery.',
      localTip: 'Watch shipbuilders at work near the creek. Best camel rides on white sand beach during evening.',
      howToReach: 'Bus from Bhuj (58 km) → Walk to shipyard and beach. Stay overnight for magical sunrise views.',
      gujaratFact: 'Gujarat has the longest coastline in India (1,600 km) with over 40 ports.',
      image: '/placeholder.svg'
    },
    {
      name: 'Balaram Palace',
      nameGu: 'બલરામ પેલેસ',
      district: 'Banaskantha',
      coolFact: 'Former royal hunting lodge turned heritage hotel, surrounded by Aravalli hills and Balaram Ambaji Wildlife Sanctuary.',
      localTip: 'Book leopard safari early morning. The palace serves royal Gujarati thali in original dining hall.',
      howToReach: 'Drive from Palanpur (45 km) via NH27. Public transport limited, best to arrange pickup.',
      gujaratFact: 'Gujarat was ruled by 562 princely states before independence - the highest number in any region.',
      image: '/placeholder.svg'
    },
    {
      name: 'Lothal',
      nameGu: 'લોથલ',
      district: 'Ahmedabad Rural',
      coolFact: 'World\'s earliest known dock built 4,500 years ago during Indus Valley Civilization. Had sophisticated drainage system.',
      localTip: 'Visit the museum first for context, then explore ruins. Best photographed during golden hour.',
      howToReach: 'Bus from Ahmedabad (85 km) to Bagodra → Auto to Lothal. Carry sun protection and water.',
      gujaratFact: 'Gujarat houses several Harappan sites, making it one of the cradles of human civilization.',
      image: '/placeholder.svg'
    },
    {
      name: 'Saputara',
      nameGu: 'સપુતારા',
      district: 'Dang',
      coolFact: 'Gujarat\'s only hill station at 1000m altitude, inhabited by indigenous Dangi tribes with unique culture.',
      localTip: 'Try Dangi tribal dance performances and bamboo handicrafts. Monsoon transforms it into mini-Kashmir.',
      howToReach: 'Bus from Surat (164 km) or Nashik (100 km). Book accommodation early during peak season.',
      gujaratFact: 'Gujarat is home to over 30 tribal communities, each with distinct languages and traditions.',
      image: '/placeholder.svg'
    }
  ];

  const gujaratFacts = [
    'Gujarat is the birthplace of Mahatma Gandhi and is called the "Jewel of Western India".',
    'The state produces 90% of India\'s diamonds and is a global diamond cutting hub.',
    'Gujarat has no prohibition on business activities on Sundays, making it extremely business-friendly.',
    'The Gujarati language has 6 different scripts and over 20 dialects across regions.',
    'Gujarat\'s Gir Forest is the only place in the world where Asiatic lions exist in the wild.',
    'The state contributes 25% of India\'s industrial output despite having only 5% of the population.',
    'Gujarat has over 50 festivals celebrated throughout the year, more than any other Indian state.'
  ];

  const getRandomDestination = () => {
    setIsSpinning(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * destinations.length);
      setCurrentDestination(destinations[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  const getRandomGujaratFact = () => {
    const randomIndex = Math.floor(Math.random() * gujaratFacts.length);
    return gujaratFacts[randomIndex];
  };

  return (
    <div id="travel-fortune" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Travel Fortune • યાત્રા ભવિષ્ય
        </h2>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          "Where Should You Go Next?" • "આગળ ક્યાં જવું?"
        </p>
        
        <button
          onClick={getRandomDestination}
          disabled={isSpinning}
          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 ${
            isSpinning ? 'animate-pulse cursor-not-allowed' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <Shuffle className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>
              {isSpinning ? 'Finding Your Destiny...' : 'Discover Your Next Adventure'}
            </span>
          </div>
        </button>
      </div>

      {/* Gujarat Fun Fact */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-xl p-4 mb-6">
        <h3 className="flex items-center text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
          <Star className="w-5 h-5 mr-2" />
          Cool Gujarat Fact • ગુજરાત વિશે રોચક તથ્ય
        </h3>
        <p className="text-orange-700 dark:text-orange-300">
          {getRandomGujaratFact()}
        </p>
      </div>

      {/* Destination Card */}
      {currentDestination && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentDestination.name}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 text-lg">
                {currentDestination.nameGu}
              </p>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{currentDestination.district} District</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Cool Fact */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <h4 className="flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                <Info className="w-5 h-5 mr-2" />
                Cool Fact • રોચક તથ્ય
              </h4>
              <p className="text-blue-700 dark:text-blue-300">
                {currentDestination.coolFact}
              </p>
            </div>

            {/* Local Tip */}
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                💡 Local Tip • સ્થાનિક સૂચન
              </h4>
              <p className="text-green-700 dark:text-green-300">
                {currentDestination.localTip}
              </p>
            </div>

            {/* How to Reach Offline */}
            <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                🗺️ How to Reach (Offline) • કેવી રીતે પહોંચવું
              </h4>
              <p className="text-orange-700 dark:text-orange-300">
                {currentDestination.howToReach}
              </p>
            </div>

            {/* Gujarat Fact */}
            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                🌟 Related Gujarat Fact • સંબંધિત ગુજરાત તથ્ય
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300">
                {currentDestination.gujaratFact}
              </p>
            </div>
          </div>

          <button className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors">
            Add to My Itinerary • મારી યાત્રા યોજનામાં ઉમેરો
          </button>
        </div>
      )}

      {!currentDestination && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔮</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Click the button above to discover your next Gujarat adventure!
            <br />
            <span className="text-sm">ઉપરનું બટન દબાવો અને તમારું આગલું સાહસ શોધો!</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AITravelFortune;

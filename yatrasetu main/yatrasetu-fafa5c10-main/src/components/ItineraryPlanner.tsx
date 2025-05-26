import React, { useState } from 'react';
import { Calendar, MapPin, Users, Sparkles, Download, Share, Loader2, Brain } from 'lucide-react';
import { generateItinerary, ItineraryRequest, ItineraryResponse } from '../services/aiService';
import EmotionAwareItinerary from './EmotionAwareItinerary';

const ItineraryPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    interests: '',
    groupSize: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'planner' | 'emotion'>('planner');

  const destinations = [
    // Major Cities
    { value: 'ahmedabad', label: 'Ahmedabad • અમદાવાદ' },
    { value: 'vadodara', label: 'Vadodara • વડોદરા' },
    { value: 'surat', label: 'Surat • સુરત' },
    { value: 'rajkot', label: 'Rajkot • રાજકોટ' },
    { value: 'bhavnagar', label: 'Bhavnagar • ભાવનગર' },
    { value: 'jamnagar', label: 'Jamnagar • જામનગર' },
    { value: 'gandhinagar', label: 'Gandhinagar • ગાંધીનગર' },
    { value: 'anand', label: 'Anand • આણંદ' },
    { value: 'bharuch', label: 'Bharuch • ભરૂચ' },
    { value: 'mehsana', label: 'Mehsana • મહેસાણા' },
    
    // Heritage & Spiritual
    { value: 'dwarka', label: 'Dwarka • દ્વારકા' },
    { value: 'somnath', label: 'Somnath • સોમનાથ' },
    { value: 'palitana', label: 'Palitana • પાલીતાણા' },
    { value: 'champaner', label: 'Champaner • ચાંપાનેર' },
    { value: 'modhera', label: 'Modhera • મોઢેરા' },
    { value: 'adalaj', label: 'Adalaj • અડાલજ' },
    { value: 'rani-ki-vav', label: 'Rani ki Vav • રાણીકી વાવ' },
    { value: 'pavagadh', label: 'Pavagadh • પાવાગઢ' },
    { value: 'ambaji', label: 'Ambaji • અંબાજી' },
    { value: 'shamlaji', label: 'Shamlaji • શામળાજી' },
    
    // Kutch Region
    { value: 'kutch', label: 'Kutch • કચ્છ' },
    { value: 'bhuj', label: 'Bhuj • ભુજ' },
    { value: 'mandvi', label: 'Mandvi • માંડવી' },
    { value: 'dholavira', label: 'Dholavira • ધોળાવીરા' },
    { value: 'white-rann', label: 'White Rann • સફેદ રણ' },
    { value: 'kalo-dungar', label: 'Kalo Dungar • કાળો ડુંગર' },
    
    // Nature & Wildlife
    { value: 'gir', label: 'Gir Forest • ગીર વન' },
    { value: 'saputara', label: 'Saputara • સપુતારા' },
    { value: 'polo-forest', label: 'Polo Forest • પોલો ફોરેસ્ટ' },
    { value: 'blackbuck-velavadar', label: 'Blackbuck Velavadar • વેળાવદાર' },
    { value: 'marine-national-park', label: 'Marine National Park • દરિયાઈ રાષ્ટ્રીય ઉદ્યાન' },
    { value: 'nalsarovar', label: 'Nalsarovar • નલસરોવર' },
    { value: 'thol-lake', label: 'Thol Lake • થોળ તળાવ' },
    
    // Coastal Areas
    { value: 'diu', label: 'Diu • દીવ' },
    { value: 'porbandar', label: 'Porbandar • પોરબંદર' },
    { value: 'veraval', label: 'Veraval • વેરાવળ' },
    { value: 'okha', label: 'Okha • ઓખા' },
    { value: 'chorwad', label: 'Chorwad • ચોરવાડ' },
    { value: 'gopnath', label: 'Gopnath • ગોપનાથ' },
    
    // Rural & Cultural Villages
    { value: 'hodka', label: 'Hodka Village • હોડકા ગામ' },
    { value: 'nirona', label: 'Nirona Village • નિરોણા ગામ' },
    { value: 'khavda', label: 'Khavda Village • ખાવડા ગામ' },
    { value: 'ajrakhpur', label: 'Ajrakhpur • અજરખપુર' },
    { value: 'bhirandiyara', label: 'Bhirandiyara • ભીરંદિયારા' },
    { value: 'ludia', label: 'Ludia Village • લુડિયા ગામ' },
    { value: 'dasada', label: 'Dasada • દાસાદા' },
    { value: 'zainabad', label: 'Zainabad • ઝૈનાબાદ' },
    
    // Hill Stations & Tribal Areas
    { value: 'wilson-hills', label: 'Wilson Hills • વિલ્સન હિલ્સ' },
    { value: 'don-hill', label: 'Don Hill • ડોન હિલ' },
    { value: 'shoolpaneshwar', label: 'Shoolpaneshwar • શૂલપાણેશ્વર' },
    { value: 'kevadia', label: 'Kevadia • કેવડિયા' },
    { value: 'dang', label: 'Dang • ડાંગ' },
    
    // Historical Sites
    { value: 'lothal', label: 'Lothal • લોથલ' },
    { value: 'junagadh', label: 'Junagadh • જુનાગઢ' },
    { value: 'uparkot', label: 'Uparkot • ઉપરકોટ' },
    { value: 'girnar', label: 'Girnar • ગિરનાર' },
    { value: 'sidhpur', label: 'Sidhpur • સિદ્ધપુર' },
    { value: 'patan', label: 'Patan • પાટણ' },
    
    // Modern Attractions
    { value: 'statue-of-unity', label: 'Statue of Unity • એકતાની મૂર્તિ' },
    { value: 'tent-city', label: 'Tent City • ટેન્ટ સિટી' },
    { value: 'science-city', label: 'Science City • સાયન્સ સિટી' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const request: ItineraryRequest = {
        destination: formData.destination,
        days: parseInt(formData.days),
        interests: formData.interests,
        groupSize: formData.groupSize
      };

      const generatedItinerary = await generateItinerary(request);
      setItinerary(generatedItinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const downloadItinerary = () => {
    if (!itinerary) return;
    
    const content = `${itinerary.title}\n\n${itinerary.description}\n\n${
      itinerary.days.map((day: any) => 
        `Day ${day.day}: ${day.title}\n${day.activities.map((activity: string) => `- ${activity}`).join('\n')}\n`
      ).join('\n')
    }`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gujarat-itinerary.txt';
    a.click();
  };

  return (
    <section id="planner" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Travel Planning • એઆઈ યાત્રા આયોજક
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Create your perfect Gujarat adventure with advanced AI assistance
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5 inline-block mr-2" />
              Traditional Planner
            </button>
            <button
              onClick={() => setActiveTab('emotion')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'emotion'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Brain className="w-5 h-5 inline-block mr-2" />
              Emotion-Aware AI
            </button>
          </div>
        </div>

        {activeTab === 'planner' ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                    Destination • ગંતવ્ય
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select destination • ગંતવ્ય પસંદ કરો</option>
                    {destinations.map(dest => (
                      <option key={dest.value} value={dest.value}>{dest.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    <Calendar className="w-5 h-5 mr-2 text-teal-500" />
                    Duration • અવધિ
                  </label>
                  <select
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    required
                  >
                    <option value="">Select duration • અવધિ પસંદ કરો</option>
                    <option value="2">2 Days • ૨ દિવસ</option>
                    <option value="3">3 Days • ૩ દિવસ</option>
                    <option value="5">5 Days • ૫ દિવસ</option>
                    <option value="7">7 Days • ૭ દિવસ</option>
                    <option value="10">10 Days • ૧૦ દિવસ</option>
                    <option value="14">14 Days • ૧૪ દિવસ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  Interests & Activities • રુચિઓ અને પ્રવૃત્તિઓ
                </label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g., handicrafts, traditional cooking, wildlife, festivals, photography, heritage sites, rural tourism, spiritual places, adventure sports..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 dark:text-gray-300 font-semibold mb-3">
                  <Users className="w-5 h-5 mr-2 text-green-500" />
                  Group Size • જૂથનું કદ
                </label>
                <select
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  required
                >
                  <option value="">Select group size • જૂથનું કદ પસંદ કરો</option>
                  <option value="solo">Solo Traveler • એકલો પ્રવાસી</option>
                  <option value="couple">Couple • યુગલ</option>
                  <option value="family">Family (3-5) • કુટુંબ</option>
                  <option value="group">Group (6+) • જૂથ</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Generating AI Itinerary... • AI યાત્રા તૈયાર કરી રહ્યું છે...
                  </div>
                ) : (
                  'Generate AI-Powered Itinerary • AI દ્વારા વિગતવાર યાત્રા તૈયાર કરો'
                )}
              </button>
            </form>

            {itinerary && (
              <div className="mt-12 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {itinerary.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={downloadItinerary}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>

                {itinerary.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{itinerary.description}</p>
                )}
                
                <div className="space-y-6">
                  {itinerary.days.map((day: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Day {day.day}: {day.title}
                      </h4>
                      
                      {day.highlights && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Highlights:</h5>
                          <div className="flex flex-wrap gap-2">
                            {day.highlights.map((highlight: string, idx: number) => (
                              <span key={idx} className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Activities:</h5>
                        <ul className="space-y-2">
                          {day.activities.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {day.budget && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Budget (per person):</h5>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                              Budget: ₹{day.budget.low}
                            </span>
                            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                              Comfort: ₹{day.budget.medium}
                            </span>
                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                              Luxury: ₹{day.budget.high}
                            </span>
                          </div>
                        </div>
                      )}

                      {day.tips && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Local Tips:</h5>
                          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                            {day.tips.map((tip: string, idx: number) => (
                              <li key={idx}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-orange-100 to-teal-100 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl">
                  <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                    ✨ This itinerary was generated using AI to provide you with the most authentic Gujarat experience ✨
                  </p>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-2">
                    Made with ❤️ by Harsh Shrivastava
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmotionAwareItinerary />
        )}
      </div>
    </section>
  );
};

export default ItineraryPlanner;

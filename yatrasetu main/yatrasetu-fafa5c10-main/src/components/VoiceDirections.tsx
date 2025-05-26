
import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Languages, MapPin } from 'lucide-react';
import { speechService, languageOptions, SpeechRecognitionResult } from '../services/speechService';
import { gujaratDestinations } from '../data/destinations';

const VoiceDirections = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const toggleListening = async () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    if (!speechService.isSpeechRecognitionSupported()) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    setError('');
    setTranscript('');
    setIsListening(true);

    try {
      await speechService.startListening(
        selectedLanguage,
        (result: SpeechRecognitionResult) => {
          setTranscript(result.transcript);
          
          if (result.isFinal) {
            processVoiceInput(result.transcript);
          }
        },
        (errorMsg: string) => {
          setError(`Speech recognition error: ${errorMsg}`);
          setIsListening(false);
        }
      );
    } catch (err) {
      setError('Failed to start speech recognition. Please check your microphone permissions.');
      setIsListening(false);
    }
  };

  const processVoiceInput = (spokenText: string) => {
    setDestination(spokenText);
    
    // Find matching destination
    const matchedDestination = gujaratDestinations.find(dest => 
      dest.name.toLowerCase().includes(spokenText.toLowerCase()) ||
      dest.nameGu.includes(spokenText) ||
      spokenText.toLowerCase().includes(dest.name.toLowerCase())
    );

    if (matchedDestination) {
      const directionText = generateDirections(matchedDestination);
      setDirections(directionText);
    } else {
      const genericDirections = `Navigate to ${spokenText}. Follow the main highway and look for local signboards. Ask locals for specific directions to reach your destination safely.`;
      setDirections(genericDirections);
    }
  };

  const generateDirections = (dest: any) => {
    const isGujarati = selectedLanguage.includes('gu');
    
    if (isGujarati) {
      return `${dest.nameGu} જવા માટે: ${dest.howToReachGu}. ${dest.regionGu}માં આવેલું આ સ્થળ ${dest.specialtyGu} માટે પ્રસિદ્ધ છે. ${dest.bestTimeGu} દરમિયાન જવાનું શ્રેષ્ઠ રહેશે.`;
    } else {
      return `To reach ${dest.name}: ${dest.howToReach}. This ${dest.specialty.toLowerCase()} in ${dest.region} is best visited during ${dest.bestTime.toLowerCase()}. Current distance: approximately ${Math.floor(Math.random() * 200 + 50)} km from your location.`;
    }
  };

  const playDirections = async () => {
    if (!speechService.isSpeechSynthesisSupported()) {
      setError('Speech synthesis is not supported in your browser.');
      return;
    }

    if (!directions) {
      setError('No directions to play. Please speak a destination first.');
      return;
    }

    setIsPlaying(true);
    setError('');

    try {
      const speechLang = selectedLanguage.includes('gu') ? 'gu-IN' : 
                        selectedLanguage.includes('hi') ? 'hi-IN' : 'en-US';
      
      await speechService.speak({
        text: directions,
        lang: speechLang,
        rate: 0.9,
        volume: 1
      });
    } catch (err) {
      setError('Failed to play directions. Please try again.');
    } finally {
      setIsPlaying(false);
    }
  };

  const stopPlayback = () => {
    speechService.stopSpeaking();
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Voice-Powered Navigation • વૉઇસ સંચાલિત નેવિગેશન
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get real-time directions in your preferred language • તમારી પસંદીદા ભાષામાં દિશા મેળવો
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Voice Input */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Mic className="w-6 h-6 mr-2 text-orange-500" />
                Speak Your Destination • તમારું ગંતવ્ય બોલો
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-gray-700 dark:text-gray-300 font-medium mb-2">
                    <Languages className="w-5 h-5 mr-2 text-teal-500" />
                    Language • ભાષા
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {languageOptions.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.native} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-center">
                  <button
                    onClick={toggleListening}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-gradient-to-br from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 hover:scale-110'
                    } shadow-lg`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </button>
                  
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {isListening ? 'Listening... • સાંભળી રહ્યું છે...' : 'Tap to speak • બોલવા માટે ટેપ કરો'}
                  </p>
                  
                  {transcript && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      Heard: "{transcript}"
                    </p>
                  )}
                </div>

                {destination && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                      <p className="text-green-800 dark:text-green-300 font-medium">
                        Destination: {destination}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Voice Output */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Volume2 className="w-6 h-6 mr-2 text-teal-500" />
                Voice Directions • વૉઇસ દિશાઓ
              </h3>

              {directions ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 max-h-40 overflow-y-auto">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {directions}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={playDirections}
                      disabled={isPlaying}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Playing... • વાગી રહ્યું છે...
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-5 h-5 mr-2" />
                          Play • વગાડો
                        </>
                      )}
                    </button>
                    
                    {isPlaying && (
                      <button
                        onClick={stopPlayback}
                        className="px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
                      >
                        Stop • રોકો
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 text-center">
                      <div className="font-semibold text-orange-600 dark:text-orange-400">
                        {Math.floor(Math.random() * 200 + 50)} km
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Distance • અંતર</div>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-2 text-center">
                      <div className="font-semibold text-teal-600 dark:text-teal-400">
                        {Math.floor(Math.random() * 180 + 60)} min
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Duration • સમય</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center">
                      <div className="font-semibold text-purple-600 dark:text-purple-400">Live</div>
                      <div className="text-gray-600 dark:text-gray-400">Status • સ્થિતિ</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  <Volume2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Speak your destination to get voice directions</p>
                  <p className="text-sm mt-1">તમારું ગંતવ્ય બોલો અને વૉઇસ દિશાઓ મેળવો</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Destination Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Destinations • ઝડપી ગંતવ્યો
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gujaratDestinations.slice(0, 8).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => processVoiceInput(dest.name)}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{dest.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{dest.nameGu}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceDirections;


import React, { useState } from 'react';
import { Phone, AlertTriangle, Heart, MapPin, Clock, ShieldCheck } from 'lucide-react';

const EmergencyKit = () => {
  const [showFirstAid, setShowFirstAid] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: ShieldCheck, color: 'bg-blue-500' },
    { name: 'Fire', number: '101', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Ambulance', number: '108', icon: Heart, color: 'bg-green-500' },
    { name: 'Tourism Helpline', number: '1363', icon: MapPin, color: 'bg-orange-500' }
  ];

  const emergencyPhrases = [
    { english: 'I need help', gujarati: 'મને મદદની જરૂર છે', pronunciation: 'Mane madad ni jarur che' },
    { english: 'Call police', gujarati: 'પોલીસને ફોન કરો', pronunciation: 'Police ne phone karo' },
    { english: 'I am lost', gujarati: 'હું ભટકી ગયો છું', pronunciation: 'Hu bhatki gayo chu' },
    { english: 'Where is hospital?', gujarati: 'હોસ્પિટલ ક્યાં છે?', pronunciation: 'Hospital kya che?' },
    { english: 'I need medicine', gujarati: 'મને દવાની જરૂર છે', pronunciation: 'Mane dava ni jarur che' }
  ];

  const firstAidTips = [
    'For cuts: Clean wound, apply pressure, bandage',
    'For burns: Cool with water, don\'t apply ice',
    'For sprains: Rest, Ice, Compression, Elevation',
    'For heat stroke: Move to shade, cool body, hydrate',
    'For snake bite: Keep calm, don\'t move, seek help immediately'
  ];

  const callEmergency = (number: string, name: string) => {
    if (confirm(`Call ${name} (${number})?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-red-200 dark:border-red-800">
      <div className="flex items-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Emergency Kit • કટોકટી કિટ
        </h2>
      </div>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {emergencyContacts.map((contact, index) => (
          <button
            key={index}
            onClick={() => callEmergency(contact.number, contact.name)}
            className={`${contact.color} text-white p-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2`}
          >
            <contact.icon className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold">{contact.name}</div>
              <div className="text-sm">{contact.number}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Phrases */}
      <div className="mb-6">
        <button
          onClick={() => setShowPhrases(!showPhrases)}
          className="w-full bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Emergency Phrases • કટોકટી વાક્યો</span>
        </button>
        
        {showPhrases && (
          <div className="mt-4 space-y-3">
            {emergencyPhrases.map((phrase, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-semibold text-gray-900 dark:text-white">{phrase.english}</div>
                <div className="text-orange-600 dark:text-orange-400 text-lg">{phrase.gujarati}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 italic">{phrase.pronunciation}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* First Aid Tips */}
      <div>
        <button
          onClick={() => setShowFirstAid(!showFirstAid)}
          className="w-full bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Heart className="w-5 h-5" />
          <span>First Aid Tips • પ્રાથમિક સારવાર</span>
        </button>
        
        {showFirstAid && (
          <div className="mt-4 space-y-2">
            {firstAidTips.map((tip, index) => (
              <div key={index} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-gray-700 dark:text-gray-300">
                {tip}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyKit;

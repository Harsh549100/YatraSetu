
import React, { useState } from 'react';
import { Book, Heart, HandMetal, Shirt, Camera, Utensils } from 'lucide-react';

interface EtiquetteCard {
  id: string;
  title: string;
  titleGu: string;
  icon: any;
  color: string;
  tips: Array<{
    do: string;
    doGu: string;
    dont: string;
    dontGu: string;
  }>;
}

const CulturalEtiquette = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const etiquetteCards: EtiquetteCard[] = [
    {
      id: 'temple',
      title: 'Temple Visits',
      titleGu: 'મંદિર દર્શન',
      icon: HandMetal,
      color: 'bg-orange-500',
      tips: [
        {
          do: 'Remove shoes before entering',
          doGu: 'અંદર જતા પહેલા જૂતા ઉતારો',
          dont: 'Wear leather items inside',
          dontGu: 'અંદર ચામડાની વસ્તુઓ ન પહેરો'
        },
        {
          do: 'Dress modestly and cover shoulders',
          doGu: 'સાદા વસ્ત્રો પહેરો અને ખભા ઢાંકો',
          dont: 'Take photos without permission',
          dontGu: 'પરવાનગી વિના ફોટો ન લો'
        }
      ]
    },
    {
      id: 'greeting',
      title: 'Greetings',
      titleGu: 'અભિવાદન',
      icon: Heart,
      color: 'bg-pink-500',
      tips: [
        {
          do: 'Say "Namaste" with palms together',
          doGu: 'હાથ જોડીને "નમસ્તે" કહો',
          dont: 'Shake hands with opposite gender',
          dontGu: 'વિરુદ્ધ લિંગ સાથે હાથ ન મિલાવો'
        },
        {
          do: 'Touch elders\' feet for blessings',
          doGu: 'વડીલોના પગ સ્પર્શ કરી આશીર્વાદ લો',
          dont: 'Use left hand for greetings',
          dontGu: 'અભિવાદન માટે ડાબો હાથ ન વાપરો'
        }
      ]
    },
    {
      id: 'dress',
      title: 'Dress Code',
      titleGu: 'પોશાક નિયમ',
      icon: Shirt,
      color: 'bg-blue-500',
      tips: [
        {
          do: 'Wear modest, covering clothes',
          doGu: 'સંયમિત, ઢાંકેલા કપડાં પહેરો',
          dont: 'Wear revealing outfits',
          dontGu: 'છૂટા કપડાં ન પહેરો'
        },
        {
          do: 'Respect local customs',
          doGu: 'સ્થાનીય રીતિરિવાજોનો આદર કરો',
          dont: 'Ignore cultural sensitivities',
          dontGu: 'સાંસ્કૃતિક સંવેદનશીલતાને અવગણો નહીં'
        }
      ]
    },
    {
      id: 'dining',
      title: 'Dining Etiquette',
      titleGu: 'ભોજન શિષ્ટાચાર',
      icon: Utensils,
      color: 'bg-green-500',
      tips: [
        {
          do: 'Eat with right hand',
          doGu: 'જમણા હાથે ખાવું',
          dont: 'Use left hand for eating',
          dontGu: 'ખાવા માટે ડાબો હાથ ન વાપરો'
        },
        {
          do: 'Finish all food on plate',
          doGu: 'થાળીમાં બધું ખાવું',
          dont: 'Waste food',
          dontGu: 'ખાવાનું બગાડવું નહીં'
        }
      ]
    },
    {
      id: 'photography',
      title: 'Photography',
      titleGu: 'ફોટોગ્રાફી',
      icon: Camera,
      color: 'bg-purple-500',
      tips: [
        {
          do: 'Ask permission before taking photos',
          doGu: 'ફોટો લેતા પહેલા પરવાનગી લો',
          dont: 'Photograph people without consent',
          dontGu: 'સંમતિ વિના લોકોના ફોટો ન લો'
        },
        {
          do: 'Respect religious sites rules',
          doGu: 'ધાર્મિક સ્થળોના નિયમોનો આદર કરો',
          dont: 'Use flash in temples',
          dontGu: 'મંદિરોમાં ફ્લેશ ન વાપરો'
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Book className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cultural Etiquette • સાંસ્કૃતિક શિષ્ટાચાર
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {etiquetteCards.map(card => (
          <div key={card.id} className="relative">
            <button
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              className={`w-full ${card.color} text-white p-6 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <card.icon className="w-12 h-12 mb-3" />
                <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                <p className="text-sm opacity-90">{card.titleGu}</p>
              </div>
            </button>

            {selectedCard === card.id && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-4 z-10 border-2 border-gray-100 dark:border-gray-600">
                <div className="space-y-4">
                  {card.tips.map((tip, index) => (
                    <div key={index} className="grid grid-cols-1 gap-3">
                      {/* Do */}
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-start">
                          <div className="text-green-500 font-bold mr-2">✓</div>
                          <div>
                            <p className="text-green-800 dark:text-green-300 font-medium">{tip.do}</p>
                            <p className="text-green-600 dark:text-green-400 text-sm">{tip.doGu}</p>
                          </div>
                        </div>
                      </div>

                      {/* Don't */}
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500">
                        <div className="flex items-start">
                          <div className="text-red-500 font-bold mr-2">✗</div>
                          <div>
                            <p className="text-red-800 dark:text-red-300 font-medium">{tip.dont}</p>
                            <p className="text-red-600 dark:text-red-400 text-sm">{tip.dontGu}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setSelectedCard(null)}
        ></div>
      )}
    </div>
  );
};

export default CulturalEtiquette;


import React, { useState } from 'react';
import { Languages, ArrowDown, Copy, RefreshCw } from 'lucide-react';
import { translateService, TranslationResult } from '../services/translateService';

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('gu');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [confidence, setConfidence] = useState<number | null>(null);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' }
  ];

  const commonPhrases = [
    { en: "Hello, how are you?", gu: "નમસ્તે, તમે કેમ છો?", hi: "नमस्ते, आप कैसे हैं?" },
    { en: "Where is the nearest village?", gu: "સૌથી નજીકનું ગામ ક્યાં છે?", hi: "निकटतम गांव कहाँ है?" },
    { en: "Can you help me?", gu: "શું તમે મને મદદ કરી શકો છો?", hi: "क्या आप मेरी मदद कर सकते हैं?" },
    { en: "Thank you very much", gu: "તમારો ખૂબ ખૂબ આભાર", hi: "बहुत-बहुत धन्यवाद" },
    { en: "How much does this cost?", gu: "આનું કેટલું થાય છે?", hi: "इसकी कीमत क्या है?" },
    { en: "I need directions", gu: "મને દિશા જોઈએ છે", hi: "मुझे दिशा चाहिए" },
    { en: "Beautiful place", gu: "સુંદર જગ્યા", hi: "सुंदर जगह" },
    { en: "Traditional culture", gu: "પરંપરાગત સંસ્કૃતિ", hi: "पारंपरिक संस्कृति" }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    setIsTranslating(true);
    setError('');
    setConfidence(null);
    
    try {
      const result: TranslationResult = await translateService.translate({
        text: inputText,
        from: fromLang,
        to: toLang
      });
      
      setOutputText(result.translatedText);
      setConfidence(result.confidence || null);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
    setConfidence(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const usePhrase = (phrase: any) => {
    setInputText(phrase.en);
    const translation = toLang === 'gu' ? phrase.gu : phrase.hi;
    setOutputText(translation);
    setConfidence(1.0);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Language Translator • ભાષા અનુવાદક
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Break language barriers and connect with locals • ભાષાના અવરોધો તોડો અને સ્થાનિકો સાથે જોડાવો
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Language Selection */}
          <div className="flex items-center justify-center mb-8">
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>

            <button
              onClick={swapLanguages}
              className="mx-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
          </div>

          {/* Translation Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                From ({languages.find(l => l.code === fromLang)?.native})
              </label>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here... • અહીં તમારો સંદેશ લખો..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none"
                />
                <button
                  onClick={() => copyToClipboard(inputText)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                To ({languages.find(l => l.code === toLang)?.native})
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Translation will appear here... • અનુવાદ અહીં દેખાશે..."
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white h-32 resize-none"
                />
                <button
                  onClick={() => copyToClipboard(outputText)}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {confidence && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Confidence: {Math.round(confidence * 100)}%
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isTranslating}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            {isTranslating ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Translating... • અનુવાદ કરી રહ્યા છીએ...
              </div>
            ) : (
              <>
                <Languages className="inline-block w-5 h-5 mr-2" />
                Translate • અનુવાદ કરો
              </>
            )}
          </button>

          {/* Common Phrases */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Common Travel Phrases • સામાન્ય પ્રવાસ શબ્દસમૂહો
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonPhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => usePhrase(phrase)}
                  className="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {phrase.en}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {toLang === 'gu' ? phrase.gu : phrase.hi}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageTranslator;

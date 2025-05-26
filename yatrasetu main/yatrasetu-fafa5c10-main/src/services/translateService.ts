
// Enhanced translation service with Groq API integration

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
  confidence?: number;
}

export interface TranslationOptions {
  text: string;
  from: string;
  to: string;
  apiKey?: string;
}

class TranslateService {
 private groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  // Enhanced mock translations for demo
  private mockTranslations: Record<string, Record<string, string>> = {
    'en-gu': {
      'Hello': 'નમસ્તે',
      'How are you?': 'તમે કેમ છો?',
      'Thank you': 'આભાર',
      'Good morning': 'સુપ્રભાત',
      'Good evening': 'સુસાંજ',
      'Where is the market?': 'બજાર ક્યાં છે?',
      'How much does this cost?': 'આનું કેટલું થાય છે?',
      'Can you help me?': 'શું તમે મને મદદ કરી શકો છો?',
      'I need directions': 'મને દિશા જોઈએ છે',
      'Where is the nearest village?': 'સૌથી નજીકનું ગામ ક્યાં છે?',
      'I am a tourist': 'હું એક પ્રવાસી છું',
      'Beautiful place': 'સુંદર જગ્યા',
      'Traditional culture': 'પરંપરાગત સંસ્કૃતિ',
      'Local food': 'સ્થાનિક ખોરાક',
      'Handicrafts': 'હસ્તકલા',
      'Please': 'કૃપા કરીને',
      'Excuse me': 'માફ કરશો',
      'Sorry': 'માફ કરજો',
      'Yes': 'હા',
      'No': 'ના',
      'Water': 'પાણી',
      'Food': 'ખોરાક',
      'Hotel': 'હોટેલ',
      'Restaurant': 'રેસ્ટોરન્ટ',
      'Temple': 'મંદિર',
      'Train': 'ટ્રેન',
      'Bus': 'બસ',
      'Auto': 'ઓટો',
      'Taxi': 'ટેક્સી'
    },
    'en-hi': {
      'Hello': 'नमस्ते',
      'How are you?': 'आप कैसे हैं?',
      'Thank you': 'धन्यवाद',
      'Good morning': 'सुप्रभात',
      'Good evening': 'शुभ संध्या',
      'Where is the market?': 'बाज़ार कहाँ है?',
      'How much does this cost?': 'इसकी कीमत क्या है?',
      'Can you help me?': 'क्या आप मेरी मदद कर सकते हैं?',
      'I need directions': 'मुझे दिशा चाहिए',
      'Where is the nearest village?': 'निकटतम गांव कहाँ है?',
      'I am a tourist': 'मैं एक पर्यटक हूँ',
      'Beautiful place': 'सुंदर जगह',
      'Traditional culture': 'पारंपरिक संस्कृति',
      'Local food': 'स्थानीय भोजन',
      'Handicrafts': 'हस्तशिल्प',
      'Please': 'कृपया',
      'Excuse me': 'माफ़ कीजिये',
      'Sorry': 'माफ़ करें',
      'Yes': 'हाँ',
      'No': 'नहीं',
      'Water': 'पानी',
      'Food': 'खाना',
      'Hotel': 'होटल',
      'Restaurant': 'रेस्तराँ',
      'Temple': 'मंदिर',
      'Train': 'ट्रेन',
      'Bus': 'बस',
      'Auto': 'ऑटो',
      'Taxi': 'टैक्सी'
    },
    'gu-en': {
      'નમસ્તે': 'Hello',
      'તમે કેમ છો?': 'How are you?',
      'આભાર': 'Thank you',
      'સુપ્રભાત': 'Good morning',
      'સુસાંજ': 'Good evening',
      'બજાર ક્યાં છે?': 'Where is the market?',
      'આનું કેટલું થાય છે?': 'How much does this cost?',
      'શું તમે મને મદદ કરી શકો છો?': 'Can you help me?',
      'મને દિશા જોઈએ છે': 'I need directions',
      'સૌથી નજીકનું ગામ ક્યાં છે?': 'Where is the nearest village?'
    },
    'hi-en': {
      'नमस्ते': 'Hello',
      'आप कैसे हैं?': 'How are you?',
      'धन्यवाद': 'Thank you',
      'सुप्रभात': 'Good morning',
      'शुभ संध्या': 'Good evening',
      'बाज़ार कहाँ है?': 'Where is the market?',
      'इसकी कीमत क्या है?': 'How much does this cost?',
      'क्या आप मेरी मदद कर सकते हैं?': 'Can you help me?'
    }
  };

  async translate(options: TranslationOptions): Promise<TranslationResult> {
    const { text, from, to } = options;
    
    // First try mock translations for common phrases
    const mockKey = `${from}-${to}`;
    if (this.mockTranslations[mockKey] && this.mockTranslations[mockKey][text]) {
      return {
        translatedText: this.mockTranslations[mockKey][text],
        detectedSourceLanguage: from,
        confidence: 1.0
      };
    }

    // Use Groq API for better translation
    try {
      const languageNames = {
        'en': 'English',
        'gu': 'Gujarati',
        'hi': 'Hindi'
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator specializing in Indian languages. Translate the given text from ${languageNames[from as keyof typeof languageNames]} to ${languageNames[to as keyof typeof languageNames]}. Provide only the translated text, nothing else. Be accurate and natural in your translation.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.1,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('Translation API request failed');
      }

      const data = await response.json();
      const translatedText = data.choices[0]?.message?.content?.trim() || text;
      
      return {
        translatedText,
        detectedSourceLanguage: from,
        confidence: 0.95
      };
    } catch (error) {
      console.error('Groq translation error:', error);
      // Fall back to enhanced mock translation
      return this.getFallbackTranslation(text, from, to);
    }
  }

  private getFallbackTranslation(text: string, from: string, to: string): TranslationResult {
    // Enhanced word-by-word translation for unknown phrases
    const words = text.split(' ');
    const mockKey = `${from}-${to}`;
    
    if (this.mockTranslations[mockKey]) {
      const translatedWords = words.map(word => {
        const cleanWord = word.replace(/[.,!?]/g, '');
        return this.mockTranslations[mockKey][cleanWord] || cleanWord;
      });
      
      return {
        translatedText: translatedWords.join(' '),
        detectedSourceLanguage: from,
        confidence: 0.8
      };
    }

    // Basic fallback with language indication
    const fallbackTexts = {
      'en-gu': `[ગુજરાતી: ${text}]`,
      'en-hi': `[हिंदी: ${text}]`,
      'gu-en': `[English: ${text}]`,
      'hi-en': `[English: ${text}]`
    };

    return {
      translatedText: fallbackTexts[mockKey as keyof typeof fallbackTexts] || `[Translated: ${text}]`,
      detectedSourceLanguage: from,
      confidence: 0.6
    };
  }

  async detectLanguage(text: string): Promise<string> {
    // Enhanced language detection
    const gujaratiPattern = /[\u0A80-\u0AFF]/;
    const hindiPattern = /[\u0900-\u097F]/;
    
    if (gujaratiPattern.test(text)) return 'gu';
    if (hindiPattern.test(text)) return 'hi';
    return 'en';
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', native: 'English' },
      { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
      { code: 'hi', name: 'Hindi', native: 'हिंदी' }
    ];
  }
}

export const translateService = new TranslateService();

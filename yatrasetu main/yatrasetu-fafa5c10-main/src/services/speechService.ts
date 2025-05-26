
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechSynthesisOptions {
  text: string;
  lang: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;

  constructor() {
    this.initializeSpeechRecognition();
    this.initializeSpeechSynthesis();
  }

  private initializeSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
    }
  }

  private initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  public isSpeechSynthesisSupported(): boolean {
    return this.synthesis !== null;
  }

  public async startListening(
    language: string = 'en-US',
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void
  ): Promise<void> {
    if (!this.recognition) {
      onError('Speech recognition not supported');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    return new Promise((resolve, reject) => {
      this.recognition.lang = language;
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        onResult({
          transcript,
          confidence,
          isFinal
        });

        if (isFinal) {
          this.isListening = false;
          resolve();
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error);
        reject(new Error(event.error));
      };

      this.recognition.onend = () => {
        this.isListening = false;
        resolve();
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        onError('Failed to start speech recognition');
        reject(error);
      }
    });
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public speak(options: SpeechSynthesisOptions): Promise<void> {
    if (!this.synthesis) {
      return Promise.reject(new Error('Speech synthesis not supported'));
    }

    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synthesis!.cancel();

      const utterance = new SpeechSynthesisUtterance(options.text);
      utterance.lang = options.lang;
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event: any) => reject(new Error(event.error));

      // Get available voices
      const voices = this.synthesis!.getVoices();
      const voice = voices.find(v => v.lang.startsWith(options.lang.substring(0, 2)));
      if (voice) {
        utterance.voice = voice;
      }

      this.synthesis!.speak(utterance);
    });
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }
}

export const speechService = new SpeechService();

// Language mappings
export const languageOptions = [
  { code: 'en-US', name: 'English', native: 'English' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' }
];

export const getLanguageName = (code: string): string => {
  const lang = languageOptions.find(l => l.code === code);
  return lang ? lang.native : code;
};

export type AllowedLanguage =
  | 'ar' // Arabic
  | 'de' // German
  | 'en' // English
  | 'es' // Spanish
  | 'fr' // French
  | 'ha' // Hausa
  | 'hi' // Hindi
  | 'it' // Italian
  | 'ja' // Japanese
  | 'ko' // Korean
  | 'pt' // Portuguese (Portugal, Brazil)
  | 'ru' // Russian
  | 'tr' // Turkish
  | 'ur' // Urdu
  | 'zh' // Chineze (Simplified) - "zh-CN"
;

export const LanguageList: AllowedLanguage[] = [
  `ar`, // Arabic
  `zh`, // Cheneze (Simplified)
  `en`, // English
  `fr`, // French
  `de`, // German
  `ha`, // Hausa
  `hi`, // Hindi
  `it`, // Italian
  `ja`, // Japanese
  `ko`, // Korean
  `pt`, // Portuguese (Portugal, Brazil)
  `ru`, // Russian
  `es`, // Spanish
  `tr`, // Turkish
  `ur`, // Urdu
];

export const LanguageNames: Record<AllowedLanguage, string> =  {
  ar: 'Arabic',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  ha: 'Hausa',
  hi: 'Hindi',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  ru: 'Russian',
  tr: 'Turkish',
  ur: 'Urdu',
  zh: 'Chinese',
};

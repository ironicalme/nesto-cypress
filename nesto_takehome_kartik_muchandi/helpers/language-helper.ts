export type Language = 'en' | 'fr';

export class LanguageHelper {
  private static currentLanguage: Language = 'en';

  static setLanguage(language: Language) {
    this.currentLanguage = language;
  }

  static getLanguage(): Language {
    return this.currentLanguage;
  }

  static getText(texts: Record<Language, string>): string {
    return texts[this.currentLanguage];
  }
} 
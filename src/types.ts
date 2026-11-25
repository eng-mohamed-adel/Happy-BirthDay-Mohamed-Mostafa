export type Language = 'ar' | 'en';

export type AppPhase = 'intro' | 'celebrating';

export type CandleState = 'lit' | 'blown';

export interface BirthdayWish {
  id: string;
  author: string;
  relation: string;
  message: string;
  createdAt: string;
  isUserAdded?: boolean;
}

export interface CelebrationParams {
  celebrantNameAr: string;
  celebrantNameEn: string;
  customName: string | null;
  autostart: boolean;
  initialLang: Language;
}

export interface WishValidationResult {
  valid: boolean;
  errorKey?: 'authorRequired' | 'messageRequired' | 'messageTooShort';
}

import type {
  BirthdayWish,
  CelebrationParams,
  Language,
  WishValidationResult,
} from '../types';

export const DEFAULT_CELEBRANT_AR = 'محمد مصطفي';
export const DEFAULT_CELEBRANT_EN = 'Mohamed Mostafa';
export const WISHES_STORAGE_KEY = 'mohamed_mostafa_birthday_wishes_v1';

export const SEEDED_WISHES_AR: BirthdayWish[] = [
  {
    id: 'seed-1',
    author: 'أحمد سامي',
    relation: 'صديق مقرب',
    message:
      'كل سنة وأنت بألف خير يا محمد مصطفي! أتمنى لك عاماً جديداً مليئاً بالنجاحات واللحظات السعيدة التي تليق بقلبك الطيب.',
    createdAt: 'اليوم',
  },
  {
    id: 'seed-2',
    author: 'العائلة',
    relation: 'أطيب الأمنيات',
    message:
      'عيد ميلاد سعيد يا أغلى الناس، دمت فخراً وسنداً لنا، ويا رب تحقق في سنتك الجديدة كل ما تتمناه وأكثر.',
    createdAt: 'اليوم',
  },
  {
    id: 'seed-3',
    author: 'كريم طارق',
    relation: 'رفيق الدرب',
    message:
      'عام سعيد يا محمد! حضورك دائماً يضيف البهجة لأي مكان، أتمنى لك الصحة والرزق والتوفيق في كل خطوة قادمة.',
    createdAt: 'اليوم',
  },
];

export const SEEDED_WISHES_EN: BirthdayWish[] = [
  {
    id: 'seed-1',
    author: 'Ahmed Samy',
    relation: 'Close Friend',
    message:
      'Happy Birthday Mohamed Mostafa! Wishing you a remarkable year filled with milestones, joy, and everything your heart hopes for.',
    createdAt: 'Today',
  },
  {
    id: 'seed-2',
    author: 'Family',
    relation: 'Warmest Wishes',
    message:
      'Wishing you endless happiness, health, and success in your new year. We are proud of everything you achieve every day.',
    createdAt: 'Today',
  },
  {
    id: 'seed-3',
    author: 'Karim Tarek',
    relation: 'Friend',
    message:
      'Have an unforgettable birthday, Mohamed! Your energy brightens every room you enter—cheers to an extraordinary year ahead.',
    createdAt: 'Today',
  },
];

export function parseCelebrationParams(search: string): CelebrationParams {
  const params = new URLSearchParams(search);
  const rawName = params.get('name')?.trim() || '';
  const sanitizedName = rawName.replace(/[<>]/g, '').slice(0, 60).trim();
  const autostartVal = params.get('autostart');
  const langParam = params.get('lang');

  return {
    celebrantNameAr: sanitizedName || DEFAULT_CELEBRANT_AR,
    celebrantNameEn: sanitizedName || DEFAULT_CELEBRANT_EN,
    customName: sanitizedName || null,
    autostart: autostartVal === '1' || autostartVal === 'true',
    initialLang: langParam === 'en' ? 'en' : 'ar',
  };
}

export function getDisplayName(params: CelebrationParams, lang: Language): string {
  return lang === 'ar' ? params.celebrantNameAr : params.celebrantNameEn;
}

export function validateWishInput(
  author: string,
  message: string
): WishValidationResult {
  const cleanAuthor = author.trim();
  const cleanMessage = message.trim();

  if (!cleanAuthor) {
    return { valid: false, errorKey: 'authorRequired' };
  }
  if (!cleanMessage) {
    return { valid: false, errorKey: 'messageRequired' };
  }
  if (cleanMessage.length < 4) {
    return { valid: false, errorKey: 'messageTooShort' };
  }
  return { valid: true };
}

export function createWishItem(
  author: string,
  relation: string,
  message: string,
  lang: Language,
  nowMs: number = Date.now()
): BirthdayWish {
  const cleanRelation = relation.trim();
  const defaultRelation = lang === 'ar' ? 'تهنئة خاصة' : 'Special Wish';
  const timeLabel = lang === 'ar' ? 'الآن' : 'Just now';

  return {
    id: `wish-${nowMs}-${Math.random().toString(36).slice(2, 7)}`,
    author: author.trim().slice(0, 50),
    relation: cleanRelation ? cleanRelation.slice(0, 40) : defaultRelation,
    message: message.trim().slice(0, 320),
    createdAt: timeLabel,
    isUserAdded: true,
  };
}

export function loadSavedUserWishes(storage?: Pick<Storage, 'getItem'> | null): BirthdayWish[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(WISHES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is BirthdayWish =>
        Boolean(
          item &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.author === 'string' &&
            typeof item.message === 'string' &&
            item.author.trim().length > 0 &&
            item.message.trim().length > 0
        )
    );
  } catch {
    return [];
  }
}

export function saveUserWishes(
  wishes: BirthdayWish[],
  storage?: Pick<Storage, 'setItem'> | null
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    return true;
  } catch {
    return false;
  }
}

export function getTypewriterLines(name: string, lang: Language): string[] {
  if (lang === 'en') {
    return [
      `Happy Birthday, ${name}!`,
      'May your new year shine with health, joy, and big milestones.',
      'Wishing you unforgettable memories and every dream fulfilled.',
      `Here is to an extraordinary year ahead, ${name}.`,
    ];
  }

  return [
    `كل عام وأنت بألف خير يا ${name}`,
    'أتمنى لك عاماً مليئاً بالنجاح والسعادة واللحظات الجميلة',
    'دمت مصدر بهجة وإلهام لكل من حولك في كل يوم',
    `يا رب تكون سنتك الجديدة بداية لأجمل ما تتمنى يا ${name}`,
  ];
}

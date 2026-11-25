import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_CELEBRANT_AR,
  DEFAULT_CELEBRANT_EN,
  WISHES_STORAGE_KEY,
  createWishItem,
  getDisplayName,
  getTypewriterLines,
  loadSavedUserWishes,
  parseCelebrationParams,
  saveUserWishes,
  validateWishInput,
} from './celebration';

test('parseCelebrationParams defaults to Mohamed Mostafa in Arabic', () => {
  const result = parseCelebrationParams('');
  assert.equal(result.celebrantNameAr, DEFAULT_CELEBRANT_AR);
  assert.equal(result.celebrantNameEn, DEFAULT_CELEBRANT_EN);
  assert.equal(result.customName, null);
  assert.equal(result.autostart, false);
  assert.equal(result.initialLang, 'ar');
  assert.equal(getDisplayName(result, 'ar'), 'محمد مصطفي');
  assert.equal(getDisplayName(result, 'en'), 'Mohamed Mostafa');
});

test('parseCelebrationParams supports custom ?name=, ?autostart=1, and ?lang=en', () => {
  const result = parseCelebrationParams('?name=%D8%B9%D9%85%D8%B1&autostart=1&lang=en');
  assert.equal(result.celebrantNameAr, 'عمر');
  assert.equal(result.celebrantNameEn, 'عمر');
  assert.equal(result.customName, 'عمر');
  assert.equal(result.autostart, true);
  assert.equal(result.initialLang, 'en');
});

test('parseCelebrationParams strips angle brackets from custom name', () => {
  const result = parseCelebrationParams('?name=<script>أحمد</script>');
  assert.equal(result.celebrantNameAr, 'scriptأحمد/script');
});

test('validateWishInput rejects empty author, empty message, and very short message', () => {
  assert.deepEqual(validateWishInput('   ', 'كل سنة وأنت طيب'), {
    valid: false,
    errorKey: 'authorRequired',
  });
  assert.deepEqual(validateWishInput('أحمد', '   '), {
    valid: false,
    errorKey: 'messageRequired',
  });
  assert.deepEqual(validateWishInput('أحمد', 'هاي'), {
    valid: false,
    errorKey: 'messageTooShort',
  });
  assert.deepEqual(validateWishInput('أحمد', 'كل سنة وأنت طيب يا محمد'), {
    valid: true,
  });
});

test('createWishItem trims fields and applies default relation', () => {
  const item = createWishItem('  سارة  ', '  ', '  كل سنة وأنت بخير يا محمد  ', 'ar', 12345);
  assert.equal(item.author, 'سارة');
  assert.equal(item.relation, 'تهنئة خاصة');
  assert.equal(item.message, 'كل سنة وأنت بخير يا محمد');
  assert.equal(item.isUserAdded, true);
  assert.ok(item.id.startsWith('wish-12345-'));
});

test('storage helpers safely persist, load, and recover from corrupted JSON', () => {
  const map = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, val: string) => {
      map.set(key, val);
    },
  };

  const wish = createWishItem('يوسف', 'زميل', 'عيد ميلاد سعيد يا محمد مصطفي', 'ar', 999);
  assert.equal(saveUserWishes([wish], mockStorage), true);

  const loaded = loadSavedUserWishes(mockStorage);
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].author, 'يوسف');

  map.set(WISHES_STORAGE_KEY, '{corrupted json');
  assert.deepEqual(loadSavedUserWishes(mockStorage), []);
});

test('getTypewriterLines personalizes phrases with celebrant name', () => {
  const arLines = getTypewriterLines('محمد مصطفي', 'ar');
  assert.ok(arLines.length >= 3);
  assert.ok(arLines[0].includes('محمد مصطفي'));

  const enLines = getTypewriterLines('Mohamed Mostafa', 'en');
  assert.ok(enLines[0].includes('Mohamed Mostafa'));
});

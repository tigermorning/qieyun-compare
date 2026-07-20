/**
 * Zhengzhang Shangfang MC Reconstruction
 *
 * Based on the Zhengzhang system from Tiukha/tjuqkox
 * References:
 *   https://github.com/Tiukha/tjuqkox
 *   https://zh.wikipedia.org/wiki/中古音
 *
 * Zhengzhang medial system:
 *   Division 1/4: ø (no medial)
 *   Division 2: ɣ
 *   Division 3 (regular): ɨ
 *   Chongniu B: ɣi
 *   Chongniu A: i
 *   Rounded (合口): u-
 *
 * @author qieyun-compare
 * @license MIT
 */

const INITIALS = {
  幫: 'p', 滂: 'pʰ', 並: 'b', 明: 'm',
  端: 't', 透: 'tʰ', 定: 'd', 泥: 'n', 來: 'l',
  知: 'ʈ', 徹: 'ʈʰ', 澄: 'ɖ', 孃: 'ɳ',
  見: 'k', 溪: 'kʰ', 羣: 'ɡ', 疑: 'ŋ',
  影: 'ʔ', 曉: 'h', 匣: 'ɦ', 云: 'ɦ', 以: 'j',
  精: 'ts', 清: 'tsʰ', 從: 'dz', 心: 's', 邪: 'z',
  莊: 'tʃ', 初: 'tʃʰ', 崇: 'dʒ', 生: 'ʃ', 俟: 'ʒ',
  章: 'tɕ', 昌: 'tɕʰ', 常: 'dʑ', 書: 'ɕ', 船: 'ʑ', 日: 'ȵ',
};

const VOWELS = {
  '歌': { '一': 'ɑ', '三': 'ɑ' },
  '戈': { '一': 'uɑ', '三': 'ɨɑ' },
  '麻': { '二': 'a', '三': 'a' },
  '支': { '三': 'ᴇ' },
  '脂': { '三': 'ɪ' },
  '之': { '三': 'ɨ' },
  '微': { '三': 'ɨ' },
  '模': { '一': 'o' },
  '魚': { '三': 'ʌ' },
  '虞': { '三': 'o' },
  '咍': { '一': 'ʌ' },
  '泰': { '一': 'ɑ' },
  '皆': { '二': 'ɛ' },
  '佳': { '二': 'ɛ' },
  '夬': { '二': 'a' },
  '祭': { '三': 'ᴇ' },
  '廢': { '三': 'ɐ' },
  '齊': { '四': 'e' },
  '灰': { '一': 'ʌ' },
  '豪': { '一': 'ɑ' },
  '肴': { '二': 'a' },
  '宵': { '三': 'ᴇ' },
  '蕭': { '四': 'e' },
  '侯': { '一': 'ə' },
  '尤': { '三': 'ɨ' },
  '幽': { '三': 'ɪ' },
  '覃': { '一': 'ʌ' },
  '談': { '一': 'ɑ' },
  '咸': { '二': 'ɛ' },
  '銜': { '二': 'a' },
  '鹽': { '三': 'ᴇ' },
  '嚴': { '三': 'ɐ' },
  '凡': { '三': 'ɐ' },
  '添': { '四': 'e' },
  '侵': { '三': 'ɪ' },
  '痕': { '一': 'ə' },
  '魂': { '一': 'ə' },
  '寒': { '一': 'ɑ' },
  '桓': { '一': 'ɑ' },
  '刪': { '二': 'a' },
  '山': { '二': 'ɛ' },
  '仙': { '三': 'ᴇ' },
  '元': { '三': 'ɐ' },
  '先': { '四': 'e' },
  '真': { '三': 'ɪ' },
  '諄': { '三': 'ɪ' },
  '臻': { '三': 'ɪ' },
  '欣': { '三': 'ɨ' },
  '文': { '三': 'ɨ' },
  '唐': { '一': 'ɑ' },
  '陽': { '三': 'ɐ' },
  '庚': { '二': 'a', '三': 'ᴇ' },
  '耕': { '二': 'ɛ' },
  '清': { '三': 'ᴇ' },
  '青': { '四': 'e' },
  '登': { '一': 'ə' },
  '蒸': { '三': 'ɨ' },
  '東': { '一': 'u', '三': 'ɨ' },
  '冬': { '一': 'o' },
  '鍾': { '三': 'o' },
  '江': { '二': 'ʌ' },
};

const CODAS = {
  '東': 'ŋ', '冬': 'ŋ', '鍾': 'ŋ', '江': 'ŋ',
  '唐': 'ŋ', '陽': 'ŋ', '庚': 'ŋ', '耕': 'ŋ', '清': 'ŋ', '青': 'ŋ', '登': 'ŋ', '蒸': 'ŋ',
  '真': 'n', '諄': 'n', '臻': 'n', '欣': 'n', '文': 'n', '痕': 'n', '魂': 'n',
  '元': 'n', '仙': 'n', '先': 'n', '寒': 'n', '桓': 'n', '刪': 'n', '山': 'n',
  '覃': 'm', '談': 'm', '咸': 'm', '銜': 'm', '鹽': 'm', '嚴': 'm', '凡': 'm', '添': 'm', '侵': 'm',
  '泰': 'i', '祭': 'i', '夬': 'i', '廢': 'i',
};

const TONE_MARKS = ['˧', '˧˥', '˥˩', '꜊'];
const TONE_DIGITS = ['³³', '³⁵', '⁵¹', '³'];

function getMedial(地位) {
  const division = 地位.等;
  const isRounded = 地位.呼 === '合';
  const rounded = isRounded ? 'u' : '';

  if (division === '一' || division === '四') {
    return rounded;
  }

  if (division === '二') {
    return rounded + 'ɣ';
  }

  // Division 3
  const type = 地位.類;
  if (type === 'B') {
    return rounded + 'ɣi';
  }
  if (type === 'A') {
    return rounded + 'i';
  }

  // Regular division 3
  return rounded + 'ɨ';
}

function 判斷(地位) {
  const initial = INITIALS[地位.母];
  if (!initial) return '';

  const vowel = VOWELS[地位.韻]?.[地位.等];
  if (vowel === undefined) return '';

  const coda = CODAS[地位.韻] || '';
  const medial = getMedial(地位);
  const toneMark = TONE_MARKS['平上去入'.indexOf(地位.聲)] || '';

  return initial + medial + vowel + coda + toneMark;
}

export { 判斷 };
export default { 判斷 };

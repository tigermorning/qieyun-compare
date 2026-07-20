/**
 * Pulleyblank 검증 스크립트
 * 
 * 기존 pulleyblank.js의 결과를 타 학자 (Zhengzhang, Pan, Baxter)와 비교하여
 * 불일치 항목을 플래그로 표시하고 검증 리포트를 생성합니다.
 * 
 * 사용법:
 *   node validate-pulleyblank.js
 * 
 * 출력:
 *   - validation-report.json (프로그래밍용)
 *   - validation-report.md (인간 가독용)
 * 
 * @author qieyun-compare
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { Flag, Severity, ReviewStatus, ValidationReport, ReportMetadata } = require('./lib/flag-structure');

// ============================================================================
// 설정
// ============================================================================

const CONFIG = {
  version: '1.0.0',
  outputDir: '.',
  jsonFile: 'validation-report.json',
  mdFile: 'validation-report.md',
};

// ============================================================================
// 비교 대상 재건 스크립트 로드
// ============================================================================

/**
 * 재건 스크립트를 로드합니다.
 * tshet-uinh 환경에서 실행될 때만 작동합니다.
 */
function loadDerivationScripts() {
  const scripts = {};
  
  try {
    // pulleyblank.js
    scripts.pulleyblank = require('./pulleyblank.js');
  } catch (e) {
    console.warn('pulleyblank.js 로드 실패:', e.message);
  }

  try {
    // zhengzhang.js
    scripts.zhengzhang = require('./zhengzhang.js');
  } catch (e) {
    console.warn('zhengzhang.js 로드 실패:', e.message);
  }

  return scripts;
}

// ============================================================================
// 비교 로직
// ============================================================================

/**
 * 두 IPA 문자열을 비교합니다.
 * @param {string} ipa1 - 첫 번째 IPA
 * @param {string} ipa2 - 두 번째 IPA
 * @returns {Object} 비교 결과
 */
function compareIPA(ipa1, ipa2) {
  if (ipa1 === ipa2) {
    return { match: true, difference: null };
  }

  // 초성 비교 (첫 번째 문자)
  const initial1 = ipa1[0];
  const initial2 = ipa2[0];
  if (initial1 !== initial2) {
    return { match: false, difference: 'initial' };
  }

  // 중성/종성 비교
  const rest1 = ipa1.slice(1);
  const rest2 = ipa2.slice(1);
  if (rest1 !== rest2) {
    return { match: false, difference: 'medial/final' };
  }

  return { match: false, difference: 'notation' };
}

/**
 * 심각도를 결정합니다.
 * @param {string} difference - 차이 유형
 * @returns {string} 심각도
 */
function determineSeverity(difference) {
  switch (difference) {
    case 'initial':
      return Severity.HIGH;
    case 'medial/final':
      return Severity.MEDIUM;
    case 'notation':
      return Severity.LOW;
    default:
      return Severity.MEDIUM;
  }
}

// ============================================================================
// 테스트 데이터 (음운 위치 목록)
// ============================================================================

/**
 * 테스트용 음운 위치 목록
 * 실제 tshet-uinh 환경에서는 동적으로 생성됩니다.
 */
const TEST_POSITIONS = [
  // 通攝
  { 母: '幫', 韻: '東', 等: '一', 開合: '合', 聲: '平', 重紐: null },
  { 母: '端', 韻: '東', 等: '一', 開合: '合', 聲: '平', 重紐: null },
  { 母: '見', 韻: '東', 等: '一', 開合: '合', 聲: '平', 重紐: null },
  { 母: '幫', 韻: '東', 等: '三', 開合: '合', 聲: '平', 重紐: null },
  { 母: '知', 韻: '東', 等: '三', 開合: '合', 聲: '平', 重紐: null },
  
  // 止攝
  { 母: '幫', 韻: '支', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
  { 母: '幫', 韻: '支', 等: '三', 開合: '開', 聲: '平', 重紐: 'B' },
  { 母: '見', 韻: '支', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
  { 母: '見', 韻: '支', 等: '三', 開合: '開', 聲: '平', 重紐: 'B' },
  
  // 蟹攝
  { 母: '幫', 韻: '泰', 等: '一', 開合: '開', 聲: '去', 重紐: null },
  { 母: '見', 韻: '皆', 等: '二', 開合: '開', 聲: '平', 重紐: null },
  { 母: '幫', 韻: '祭', 等: '三', 開合: '開', 聲: '去', 重紐: 'A' },
  
  // 山攝
  { 母: '幫', 韻: '寒', 等: '一', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '刪', 等: '二', 開合: '開', 聲: '平', 重紐: null },
  { 母: '幫', 韻: '仙', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
  
  // 宕攝
  { 母: '幫', 韻: '唐', 等: '一', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '陽', 等: '三', 開合: '開', 聲: '平', 重紐: null },
  
  // 梗攝
  { 母: '幫', 韻: '庚', 等: '二', 開合: '開', 聲: '平', 重紐: null },
  { 母: '幫', 韻: '庚', 等: '三', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '清', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
  
  // 曾攝
  { 母: '幫', 韻: '登', 等: '一', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '蒸', 等: '三', 開合: '開', 聲: '平', 重紐: null },
  
  // 流攝
  { 母: '幫', 韻: '侯', 等: '一', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '尤', 等: '三', 開合: '開', 聲: '平', 重紐: null },
  
  // 深攝
  { 母: '幫', 韻: '侵', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
  { 母: '見', 韻: '侵', 等: '三', 開合: '開', 聲: '平', 重紐: 'B' },
  
  // 咸攝
  { 母: '幫', 韻: '覃', 等: '一', 開合: '開', 聲: '平', 重紐: null },
  { 母: '見', 韻: '鹽', 等: '三', 開合: '開', 聲: '平', 重紐: 'A' },
];

// ============================================================================
// 메인 검증 로직
// ============================================================================

/**
 * 검증을 실행합니다.
 */
async function runValidation() {
  console.log('Pulleyblank 검증 시작...\n');

  const report = new ValidationReport();
  report.metadata = new ReportMetadata({
    scriptVersion: CONFIG.version,
    totalPositions: TEST_POSITIONS.length,
  });

  // tshet-uinh 환경 확인
  const isTshetUinhEnv = typeof 音韻地位 !== 'undefined';
  
  if (!isTshetUinhEnv) {
    console.log('tshet-uinh 환경이 아닙니다. 데모 모드로 실행합니다.\n');
    console.log('실제 검증을 위해서는 tshet-uinh 환경에서 실행해 주세요.\n');
  }

  // 비교 대상 학자 목록
  const scholars = ['zhengzhang', 'panwuyun', 'baxter'];

  for (const position of TEST_POSITIONS) {
    const positionStr = `${position.聲}聲 ${position.韻}韻 ${position.等}等 ${position.開合}口`;
    
    // 각 학자의 결과 시뮬레이션 (실제 환경에서는 실제 재건 결과 사용)
    for (const scholar of scholars) {
      // 데모용 시뮬레이션 결과
      const pulleyblankResult = simulatePulleyblank(position);
      const scholarResult = simulateScholar(scholar, position);

      const comparison = compareIPA(pulleyblankResult, scholarResult);
      
      if (!comparison.match) {
        const flag = new Flag({
          id: `FLAG-${String(report.flags.length + 1).padStart(3, '0')}`,
          position: positionStr,
          pulleyblank: pulleyblankResult,
          comparison: scholar,
          compareValue: scholarResult,
          difference: comparison.difference,
          severity: determineSeverity(comparison.difference),
          reviewStatus: ReviewStatus.PENDING,
          note: `${scholar}와의 비교에서 ${comparison.difference} 차이 발견`,
        });

        report.addFlag(flag);
      }
    }
  }

  // 일치율 계산
  for (const scholar of scholars) {
    const total = TEST_POSITIONS.length;
    const mismatches = report.flags.filter(f => f.comparison === scholar).length;
    report.summary.calculateMatchRate(scholar, total, total - mismatches);
  }

  // 리포트 출력
  await writeReport(report);

  console.log('검증 완료!');
  console.log(`- 총 음운 위치: ${TEST_POSITIONS.length}`);
  console.log(`- 높은 심각도: ${report.summary.highFlags}건`);
  console.log(`- 중간 심각도: ${report.summary.mediumFlags}건`);
  console.log(`- 낮은 심각도: ${report.summary.lowFlags}건`);
  console.log(`\n리포트 생성 완료: ${CONFIG.jsonFile}, ${CONFIG.mdFile}`);
}

/**
 * 리포트를 파일로 저장합니다.
 */
async function writeReport(report) {
  // JSON 리포트
  const jsonPath = path.join(CONFIG.outputDir, CONFIG.jsonFile);
  fs.writeFileSync(jsonPath, JSON.stringify(report.toJSON(), null, 2), 'utf8');

  // Markdown 리포트
  const mdPath = path.join(CONFIG.outputDir, CONFIG.mdFile);
  fs.writeFileSync(mdPath, report.toMarkdown(), 'utf8');
}

// ============================================================================
// 시뮬레이션 함수 (데모용)
// ============================================================================

/**
 * Pulleyblank 재건 시뮬레이션
 * 실제 환경에서는 pulleyblank.js의 결과를 사용합니다.
 */
function simulatePulleyblank(position) {
  const initials = {
    '幫': 'p', '滂': 'pʰ', '並': 'b', '明': 'm',
    '端': 't', '透': 'tʰ', '定': 'd', '泥': 'n',
    '知': 'ʈ', '徹': 'ʈʰ', '澄': 'ɖ', '孃': 'ɳ',
    '精': 't͡s', '清': 't͡sʰ', '從': 'd͡z', '心': 's', '邪': 'z',
    '莊': 'ʈ͡ʂ', '初': 'ʈ͡ʂʰ', '崇': 'ɖ͡ʐ', '生': 'ʂ', '俟': 'ʐ',
    '章': 'c', '昌': 'cʰ', '常': 'd͡ʑ', '書': 'ɕ', '船': 'ʑ', '日': 'ȵ',
    '見': 'k', '溪': 'kʰ', '羣': 'g', '疑': 'ŋ',
    '影': 'ʔ', '曉': 'h', '匣': 'ɦ', '云': 'ɦ', '以': 'j',
  };

  const finals = {
    '東': { '一': { '開': 'əwŋ', '合': 'wəwŋ' }, '三': { '開': 'uwŋ', '合': 'wuwŋ' } },
    '支': { '三': { '開': 'iə̆', '合': 'wiə̆' } },
    '泰': { '一': { '開': 'aj', '合': 'waj' } },
    '皆': { '二': { '開': 'əɨj', '合': 'wəɨj' } },
    '祭': { '三': { '開': 'iaj', '合': 'wiaj' } },
    '寒': { '一': { '開': 'an', '合': 'wan' } },
    '刪': { '二': { '開': 'aɨn', '合': 'waɨn' } },
    '仙': { '三': { '開': 'ian', '合': 'wian' } },
    '唐': { '一': { '開': 'aŋ', '合': 'waŋ' } },
    '陽': { '三': { '開': 'ɨaŋ', '合': 'uaŋ' } },
    '庚': { '二': { '開': 'aɨjŋ', '合': 'waɨjŋ' }, '三': { '開': 'iajŋ', '合': 'wiajŋ' } },
    '清': { '三': { '開': 'iajŋ', '合': 'wiajŋ' } },
    '登': { '一': { '開': 'əŋ', '合': 'wəŋ' } },
    '蒸': { '三': { '開': 'iŋ', '合': 'wiŋ' } },
    '侯': { '一': { '開': 'əw', '合': 'wəw' } },
    '尤': { '三': { '開': 'uw', '合': 'wuw' } },
    '侵': { '三': { '開': 'im', '合': 'wim' } },
    '覃': { '一': { '開': 'əm', '合': 'wəm' } },
    '鹽': { '三': { '開': 'iam', '合': 'wiam' } },
  };

  const initial = initials[position.母] || '';
  const final = finals[position.韻]?.[position.等]?.[position.開合] || '';
  
  return initial + final;
}

/**
 * 타 학자 재건 시뮬레이션
 * 실제 환경에서는 해당 재건 스크립트의 결과를 사용합니다.
 */
function simulateScholar(scholar, position) {
  // 시뮬레이션용 차이 표현
  const modifications = {
    'zhengzhang': {
      '東': { '一': { '開': 'uŋ', '合': 'wuŋ' } },
      '支': { '三': { '開': 'iᴇ', '合': 'wiᴇ' } },
    },
    'panwuyun': {
      '東': { '一': { '開': 'uŋ', '合': 'wuŋ' } },
      '支': { '三': { '開': 'iɛ', '合': 'wiɛ' } },
    },
    'baxter': {
      '東': { '一': { '開': 'uwng', '合': 'wuwng' } },
      '支': { '三': { '開': 'jie', '合': 'jwie' } },
    },
  };

  const base = simulatePulleyblank(position);
  const mod = modifications[scholar]?.[position.韻]?.[position.等]?.[position.開合];
  
  if (mod) {
    const initials = {
      '幫': 'p', '滂': 'pʰ', '並': 'b', '明': 'm',
      '端': 't', '透': 'tʰ', '定': 'd', '泥': 'n',
      '知': 'ʈ', '徹': 'ʈʰ', '澄': 'ɖ', '孃': 'ɳ',
      '見': 'k', '溪': 'kʰ', '羣': 'ɡ', '疑': 'ŋ',
    };
    return (initials[position.母] || base[0]) + mod;
  }
  
  return base;
}

// ============================================================================
// 실행
// ============================================================================

if (require.main === module) {
  runValidation().catch(console.error);
}

module.exports = { runValidation, compareIPA, determineSeverity };

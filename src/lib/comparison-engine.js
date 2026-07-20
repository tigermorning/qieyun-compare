/**
 * 비교 엔진 (Comparison Engine)
 * 
 * 음운 위치별로 여러 재건 체계를 비교하는 핵심 로직
 */

import TshetUinh from 'tshet-uinh';
import { systems } from '../data/systems.json';
import karlgren from '../karlgren.js';
import wangli from '../wangli.js';
import pulleyblank from '../pulleyblank.js';
import baxter from '../baxter.js';
import panwuyun from '../panwuyun.js';
import zhengzhang from '../zhengzhang.js';

/**
 * 재건 스크립트 매핑
 */
const reconstructionScripts = {
  karlgren,
  wangli,
  pulleyblank,
  baxter,
  panwuyun,
  zhengzhang,
};

/**
 * 음운 위치 문자열 생성
 * @param {TshetUinh.音韻地位} position - 음운 위치
 * @returns {string} 음운 위치 문자열 (예: "平聲 東韻 一等 合口")
 */
export function getPositionString(position) {
  const tone = position.聲;
  const rime = position.韻;
  const division = position.等;
  const rounding = position.呼 || '開合中立';
  
  return `${tone}聲 ${rime}韻 ${division}等 ${rounding}`;
}

/**
 * 특정 음운 위치의 재건 결과 비교
 * @param {TshetUinh.音韻地位} position - 음운 위치
 * @param {string[]} systemIds - 비교할 체계 ID 목록
 * @returns {Object} 비교 결과
 */
export function comparePosition(position, systemIds = systems.filter(s => s.default).map(s => id)) {
  const results = {};
  
  for (const systemId of systemIds) {
    const system = systems.find(s => s.id === systemId);
    const script = reconstructionScripts[systemId];
    
    if (!system || !script) {
      results[systemId] = {
        system: system || { id: systemId, name: 'Unknown' },
        error: 'System not found',
      };
      continue;
    }
    
    try {
      const reconstruction = script.判斷(position);
      results[systemId] = {
        system,
        reconstruction,
        error: null,
      };
    } catch (error) {
      results[systemId] = {
        system,
        reconstruction: null,
        error: error.message,
      };
    }
  }
  
  return {
    position: getPositionString(position),
    results,
  };
}

/**
 * 문자에서 음운 위치 찾기
 * @param {string} character - 한자
 * @returns {TshetUinh.音韻地位|null} 음운 위치
 */
export function getPhonologicalPosition(character) {
  // tshet-uinh 데이터베이스에서 문자 검색
  // 이 예시에서는 직접 구현하지 않고, 실제 데이터베이스 연결 필요
  return null;
}

/**
 * 비교 결과 포맷팅
 * @param {Object} comparisonResult - comparePosition 결과
 * @returns {string} 포맷팅된 문자열
 */
export function formatComparisonResult(comparisonResult) {
  const { position, results } = comparisonResult;
  
  let output = `음운 위치: ${position}\n\n`;
  
  for (const [systemId, result] of Object.entries(results)) {
    if (result.error) {
      output += `${result.system.name}: Error - ${result.error}\n`;
    } else {
      output += `${result.system.name}: ${result.reconstruction}\n`;
    }
  }
  
  return output;
}

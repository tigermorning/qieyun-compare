/**
 * 중고음 재건 비교 애플리케이션
 */

import { systems } from './systems.json';
import karlgren from './karlgren.js';
import wangli from './wangli.js';
import pulleyblank from './pulleyblank.js';
import baxter from './baxter.js';
import panwuyun from './panwuyun.js';
import zhengzhang from './zhengzhang.js';

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
 * 기본 비교 체계
 */
const defaultSystems = systems.filter(s => s.default);

/**
 * 음운 위치 문자열 생성
 */
function getPositionString(tone, rime, division, rounding) {
  return `${tone}聲 ${rime}韻 ${division}等 ${rounding}`;
}

/**
 * 재건 결과 비교
 */
function compareReconstruction(position, systemIds) {
  const results = [];
  
  for (const systemId of systemIds) {
    const system = systems.find(s => s.id === systemId);
    const script = reconstructionScripts[systemId];
    
    if (!system || !script) {
      results.push({
        system: system || { id: systemId, name: 'Unknown' },
        reconstruction: 'Error: System not found',
        error: true,
      });
      continue;
    }
    
    try {
      const reconstruction = script.判斷(position);
      results.push({
        system,
        reconstruction,
        error: false,
      });
    } catch (error) {
      results.push({
        system,
        reconstruction: `Error: ${error.message}`,
        error: true,
      });
    }
  }
  
  return results;
}

/**
 * 결과 표시
 */
function displayResults(character, position, comparisonResults) {
  const resultsSection = document.getElementById('resultsSection');
  const characterDisplay = document.getElementById('characterDisplay');
  const phonologicalPosition = document.getElementById('phonologicalPosition');
  const comparisonBody = document.getElementById('comparisonBody');
  const citationList = document.getElementById('citationList');
  
  // 음운 위치 표시
  characterDisplay.textContent = character;
  phonologicalPosition.textContent = position;
  
  // 비교 결과 테이블 채우기
  comparisonBody.innerHTML = '';
  for (const result of comparisonResults) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="system-name">${result.system.name}</td>
      <td class="reconstruction ${result.error ? 'error' : ''}">${result.reconstruction}</td>
    `;
    comparisonBody.appendChild(row);
  }
  
  // 인용 정보 표시
  citationList.innerHTML = '';
  for (const result of comparisonResults) {
    if (!result.error && result.system.citation) {
      const citationDiv = document.createElement('div');
      citationDiv.className = 'citation';
      citationDiv.innerHTML = `<strong>${result.system.name} (${result.system.year}):</strong> ${result.system.citation}`;
      citationList.appendChild(citationDiv);
    }
  }
  
  // 결과 섹션 표시
  resultsSection.style.display = 'block';
}

/**
 * 검색 처리
 */
async function handleSearch() {
  const input = document.getElementById('characterInput');
  const character = input.value.trim();
  
  if (!character) {
    alert('한자를 입력하세요.');
    return;
  }
  
  // 임시: 샘플 데이터로 테스트
  // 실제로는 tshet-uinh 데이터베이스에서 검색 필요
  const samplePositions = {
    '東': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '同': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '銅': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '童': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '桐': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '瞳': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '筒': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '彤': { tone: '平', rime: '東', division: '一', rounding: '合口' },
    '筍': { tone: '上', rime: '東', division: '一', rounding: '合口' },
    '中': { tone: '平', rime: '東', division: '三', rounding: '合口' },
    '衷': { tone: '平', rime: '東', division: '三', rounding: '合口' },
    '忠': { tone: '平', rime: '東', division: '三', rounding: '合口' },
    '衆': { tone: '去', rime: '東', division: '三', rounding: '合口' },
  };
  
  const positionData = samplePositions[character];
  if (!positionData) {
    alert(`${character}에 대한 데이터를 찾을 수 없습니다.`);
    return;
  }
  
  // 음운 위치 생성
  const position = {
    母: '幫', // 임시
    呼: positionData.rounding === '合口' ? '合' : '開',
    等: positionData.division,
    類: null,
    韻: positionData.rime,
    聲: positionData.tone,
  };
  
  // 비교 실행
  const positionString = getPositionString(
    positionData.tone,
    positionData.rime,
    positionData.division,
    positionData.rounding
  );
  
  const comparisonResults = compareReconstruction(position, defaultSystems.map(s => s.id));
  
  // 결과 표시
  displayResults(character, positionString, comparisonResults);
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
  const searchButton = document.getElementById('searchButton');
  const characterInput = document.getElementById('characterInput');
  
  searchButton.addEventListener('click', handleSearch);
  
  characterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
}

/**
 * 애플리케이션 초기화
 */
function init() {
  setupEventListeners();
  console.log('중고음 재건 비교 애플리케이션 초기화됨');
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', init);

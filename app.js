/**
 * Middle Chinese Reconstruction Comparison Application
 */

import { systems } from './systems.json';
import karlgren from './karlgren.js';
import wangli from './wangli.js';
import pulleyblank from './pulleyblank.js';
import baxter from './baxter.js';
import panwuyun from './panwuyun.js';
import zhengzhang from './zhengzhang.js';

/**
 * Reconstruction script mapping (ID → script)
 */
const reconstructionScripts = {
  karlgren,
  wangli1957: wangli,
  pulleyblank1991: pulleyblank,
  baxter1992: baxter,
  pan2000: panwuyun,
  zhengzhang,
};

/**
 * Default comparison systems
 */
const defaultSystems = systems.filter(s => s.default);

/**
 * Generate phonological position string in English
 */
function getPositionString(tone, rime, division, rounding) {
  const toneMap = { '平': 'Level', '上': 'Rising', '去': 'Departing', '入': 'Entering' };
  const roundingMap = { '合口': 'Closed', '開口': 'Open', '開合中立': 'Neutral' };
  
  return `${toneMap[tone] || tone} tone, ${rime} rime, ${division} division, ${roundingMap[rounding] || rounding}`;
}

/**
 * Execute reconstruction script
 */
function executeScript(script, position) {
  if (!script || typeof script.判斷 !== 'function') {
    throw new Error('Script does not export 判斷 function');
  }
  return script.判斷(position);
}

/**
 * Compare reconstruction results
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
      const reconstruction = executeScript(script, position);
      results.push({
        system,
        reconstruction: reconstruction || 'No result',
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
 * Display results
 */
function displayResults(character, position, comparisonResults) {
  const resultsSection = document.getElementById('resultsSection');
  const characterDisplay = document.getElementById('characterDisplay');
  const phonologicalPosition = document.getElementById('phonologicalPosition');
  const comparisonBody = document.getElementById('comparisonBody');
  const citationList = document.getElementById('citationList');
  
  // Display phonological position
  characterDisplay.textContent = character;
  phonologicalPosition.textContent = position;
  
  // Fill comparison table
  comparisonBody.innerHTML = '';
  for (const result of comparisonResults) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="system-name">${result.system.name}</td>
      <td class="reconstruction ${result.error ? 'error' : ''}">${result.reconstruction}</td>
    `;
    comparisonBody.appendChild(row);
  }
  
  // Display citation information
  citationList.innerHTML = '';
  for (const result of comparisonResults) {
    if (!result.error && result.system.citation) {
      const citationDiv = document.createElement('div');
      citationDiv.className = 'citation';
      const citation = result.system.citation;
      let citationText = '';
      
      if (citation.type === 'book') {
        citationText = `${citation.author}. (${citation.year}). <em>${citation.title}</em>. ${citation.publisher}${citation.address ? ', ' + citation.address : ''}.`;
      } else if (citation.type === 'misc') {
        citationText = `${citation.author}. ${citation.title}.${citation.url ? ' ' + citation.url : ''}`;
      }
      
      citationDiv.innerHTML = `<strong>${result.system.name}:</strong> ${citationText}`;
      citationList.appendChild(citationDiv);
    }
  }
  
  // Display results section
  resultsSection.style.display = 'block';
}

/**
 * Handle search
 */
async function handleSearch() {
  const input = document.getElementById('characterInput');
  const character = input.value.trim();
  
  if (!character) {
    alert('Please enter a Chinese character.');
    return;
  }
  
  // Sample data for testing
  const samplePositions = {
    '東': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '幫' },
    '同': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '銅': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '童': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '桐': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '瞳': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '筒': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '彤': { tone: '平', rime: '東', division: '一', rounding: '合口', initial: '定' },
    '筍': { tone: '上', rime: '東', division: '一', rounding: '合口', initial: '心' },
    '中': { tone: '平', rime: '東', division: '三', rounding: '合口', initial: '知' },
    '衷': { tone: '平', rime: '東', division: '三', rounding: '合口', initial: '知' },
    '忠': { tone: '平', rime: '東', division: '三', rounding: '合口', initial: '知' },
    '衆': { tone: '去', rime: '東', division: '三', rounding: '合口', initial: '章' },
    '水': { tone: '上', rime: '脂', division: '三', rounding: '合口', initial: '書' },
    '山': { tone: '平', rime: '刪', division: '二', rounding: '開口', initial: '生' },
    '人': { tone: '平', rime: '真', division: '三', rounding: '開口', initial: '日' },
    '天': { tone: '平', rime: '先', division: '四', rounding: '開口', initial: '透' },
    '日': { tone: '入', rime: '質', division: '三', rounding: '開口', initial: '日' },
    '月': { tone: '入', rime: '月', division: '三', rounding: '合口', initial: '疑' },
    '風': { tone: '平', rime: '東', division: '三', rounding: '合口', initial: '非' },
    '雲': { tone: '平', rime: '文', division: '三', rounding: '合口', initial: '云' },
  };
  
  const positionData = samplePositions[character];
  if (!positionData) {
    alert(`No data found for "${character}". Try: 東, 同, 中, 山, 人, 天, 日, 月, 風, 雲`);
    return;
  }
  
  // Create phonological position
  const position = {
    母: positionData.initial,
    呼: positionData.rounding === '合口' ? '合' : positionData.rounding === '開口' ? '開' : null,
    等: positionData.division,
    類: null,
    韻: positionData.rime,
    聲: positionData.tone,
  };
  
  // Execute comparison
  const positionString = getPositionString(
    positionData.tone,
    positionData.rime,
    positionData.division,
    positionData.rounding
  );
  
  const comparisonResults = compareReconstruction(position, defaultSystems.map(s => s.id));
  
  // Display results
  displayResults(character, positionString, comparisonResults);
}

/**
 * Set up event listeners
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
 * Initialize application
 */
function init() {
  setupEventListeners();
  console.log('Middle Chinese Reconstruction Comparison initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

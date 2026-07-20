/**
 * 불일치 플래그 구조 정의
 * 
 * Pulleyblank 검증 스크립트에서 사용되는 플래그 구조를 정의합니다.
 * 
 * @module lib/flag-structure
 */

/**
 * 심각도 레벨 정의
 * @enum {string}
 */
const Severity = {
  HIGH: 'high',      // 초성 완전 불일치
  MEDIUM: 'medium',  // 중성/종성 부분 차이
  LOW: 'low',        // 표기법 차이 (동일 음가)
};

/**
 * 검증 상태 정의
 * @enum {string}
 */
const ReviewStatus = {
  PENDING: '수동 검토 필요',
  REVIEWED: '검토 완료',
  IGNORED: '무시됨',
};

/**
 * 불일치 플래그 구조
 * @typedef {Object} Flag
 * @property {string} id - 고유 식별자 (FLAG-XXX)
 * @property {string} position - 음운 위치 (예: "平聲 東韻 一等 合口")
 * @property {string} pulleyblank - Pulleyblank 재건 결과
 * @property {string} comparison - 비교 대상 학자 이름
 * @property {string} compareValue - 비교 대상 재건 결과
 * @property {string} difference - 차이 유형 (initial, medial, final, tone, notation)
 * @property {string} severity - 심각도 (high, medium, low)
 * @property {string} reviewStatus - 검토 상태
 * @property {boolean} flag - 플래그 여부
 * @property {string} note - 추가 설명
 */
class Flag {
  constructor({
    id,
    position,
    pulleyblank,
    comparison,
    compareValue,
    difference,
    severity,
    reviewStatus = ReviewStatus.PENDING,
    flag = true,
    note = '',
  }) {
    this.id = id;
    this.position = position;
    this.pulleyblank = pulleyblank;
    this.comparison = comparison;
    this.compareValue = compareValue;
    this.difference = difference;
    this.severity = severity;
    this.reviewStatus = reviewStatus;
    this.flag = flag;
    this.note = note;
  }

  /**
   * JSON 직렬화
   */
  toJSON() {
    return {
      id: this.id,
      position: this.position,
      pulleyblank: this.pulleyblank,
      comparison: this.comparison,
      compareValue: this.compareValue,
      difference: this.difference,
      severity: this.severity,
      reviewStatus: this.reviewStatus,
      flag: this.flag,
      note: this.note,
    };
  }

  /**
   * 마크다운 테이블 행 생성
   */
  toMarkdownRow() {
    return `| ${this.id} | ${this.position} | ${this.pulleyblank} | ${this.comparison}: ${this.compareValue} | ${this.difference} | ${this.severity} | ${this.reviewStatus} |`;
  }
}

/**
 * 검증 리포트 메타데이터 구조
 * @typedef {Object} ReportMetadata
 * @property {string} generatedAt - 생성 일시
 * @property {string} scriptVersion - 스크립트 버전
 * @property {number} totalPositions - 총 음운 위치 수
 */
class ReportMetadata {
  constructor({
    generatedAt = new Date().toISOString(),
    scriptVersion = '1.0.0',
    totalPositions = 0,
  }) {
    this.generatedAt = generatedAt;
    this.scriptVersion = scriptVersion;
    this.totalPositions = totalPositions;
  }

  toJSON() {
    return {
      generatedAt: this.generatedAt,
      scriptVersion: this.scriptVersion,
      totalPositions: this.totalPositions,
    };
  }
}

/**
 * 검증 요약 구조
 * @typedef {Object} ReportSummary
 * @property {number} highFlags - 높은 심각도 플래그 수
 * @property {number} mediumFlags - 중간 심각도 플래그 수
 * @property {number} lowFlags - 낮은 심각도 플래그 수
 * @property {Object} matchRate - 학자별 일치율
 */
class ReportSummary {
  constructor() {
    this.highFlags = 0;
    this.mediumFlags = 0;
    this.lowFlags = 0;
    this.matchRate = {};
  }

  addFlag(flag) {
    switch (flag.severity) {
      case Severity.HIGH:
        this.highFlags++;
        break;
      case Severity.MEDIUM:
        this.mediumFlags++;
        break;
      case Severity.LOW:
        this.lowFlags++;
        break;
    }
  }

  calculateMatchRate(scholar, total, matches) {
    this.matchRate[scholar] = total > 0 ? matches / total : 0;
  }

  toJSON() {
    return {
      highFlags: this.highFlags,
      mediumFlags: this.mediumFlags,
      lowFlags: this.lowFlags,
      matchRate: this.matchRate,
    };
  }
}

/**
 * 전체 검증 리포트 구조
 */
class ValidationReport {
  constructor() {
    this.metadata = new ReportMetadata({});
    this.summary = new ReportSummary();
    this.flags = [];
  }

  addFlag(flag) {
    this.flags.push(flag);
    this.summary.addFlag(flag);
  }

  toJSON() {
    return {
      metadata: this.metadata.toJSON(),
      summary: this.summary.toJSON(),
      flags: this.flags.map(f => f.toJSON()),
    };
  }

  /**
   * 마크다운 리포트 생성
   */
  toMarkdown() {
    const lines = [];
    lines.push('# Pulleyblank 검증 리포트\n');
    lines.push('## 요약\n');
    lines.push(`- 생성일: ${this.metadata.generatedAt}`);
    lines.push(`- 총 음운 위치: ${this.metadata.totalPositions.toLocaleString()}`);
    lines.push(`- 높은 심각도: ${this.summary.highFlags}건`);
    lines.push(`- 중간 심각도: ${this.summary.mediumFlags}건`);
    lines.push(`- 낮은 심각도: ${this.summary.lowFlags}건`);
    lines.push('');

    lines.push('## 일치율\n');
    lines.push('| 비교 대상 | 일치율 |');
    lines.push('|-----------|--------|');
    for (const [scholar, rate] of Object.entries(this.summary.matchRate)) {
      lines.push(`| ${scholar} | ${(rate * 100).toFixed(1)}% |`);
    }
    lines.push('');

    const highFlags = this.flags.filter(f => f.severity === Severity.HIGH);
    if (highFlags.length > 0) {
      lines.push('## 수동 검토 필요 항목 (심각도: 높음)\n');
      lines.push('| ID | 위치 | Pulleyblank | 비교 대상 | 차이 | 상태 |');
      lines.push('|----|------|-------------|-----------|------|------|');
      for (const flag of highFlags) {
        lines.push(flag.toMarkdownRow());
      }
      lines.push('');
    }

    const mediumFlags = this.flags.filter(f => f.severity === Severity.MEDIUM);
    if (mediumFlags.length > 0) {
      lines.push('## 수동 검토 필요 항목 (심각도: 중간)\n');
      lines.push('| ID | 위치 | Pulleyblank | 비교 대상 | 차이 | 상태 |');
      lines.push('|----|------|-------------|-----------|------|------|');
      for (const flag of mediumFlags) {
        lines.push(flag.toMarkdownRow());
      }
      lines.push('');
    }

    return lines.join('\n');
  }
}

module.exports = {
  Severity,
  ReviewStatus,
  Flag,
  ReportMetadata,
  ReportSummary,
  ValidationReport,
};

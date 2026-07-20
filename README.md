# 중고음 재건 비교 (qieyun-compare)

중고음(中古音) 재건 체계를 비교하는 웹 기반 도구

## 개요

이 프로젝트는 여러 학자들의 중고음 재건 체계를 비교하는 도구를 개발합니다.

### 주요 기능

1. **문자 기반 검색**: 한자를 입력하면 해당 음운 위치를 자동으로 찾아줍니다
2. **체계별 비교**: 여러 재건 체계의 결과를 한눈에 비교할 수 있습니다
3. **시각적 차이 강조**: 체계 간 차이점을 시각적으로 강조합니다
4. **인용 정보**: 각 재건 체계의 학술적 출처를 제공합니다

### 지원 재건 체계

| 체계 | 학자 | 연도 | 상태 |
|------|------|------|------|
| Karlgren | Bernhard Karlgren | 1915 | ✅ 완료 |
| Wang Li | 王力 | 1957 | ✅ 완료 |
| Pulleyblank | E. G. Pulleyblank | 1991 | ✅ 완료 |
| Baxter | William H. Baxter | 1992 | ✅ 완료 |
| Pan Wuyun | 潘悟雲 | 2000 | ✅ 완료 |
| Zhengzhang | 鄭張尚芳 | 2002 | ✅ 완료 |

## 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 복제
git clone https://github.com/tigermorning/qieyun-compare.git
cd qieyun-compare

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

기본적으로 http://localhost:3000 에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드 결과는 `dist/` 디렉토리에 생성됩니다.

## 프로젝트 구조

```
qieyun-compare/
├── docs/                          ← 문서화
│   ├── architecture.md
│   ├── decision-log.md
│   ├── mvp.md
│   └── ...
├── src/
│   ├── components/                ← UI 컴포넌트
│   ├── lib/
│   │   ├── comparison-engine.js   ← 핵심 비교 로직
│   │   └── ...
│   └── data/
│       └── systems.json           ← 체계 메타데이터
├── public/                        ← 정적 파일
├── index.html                     ← 메인 HTML
├── app.js                         ← 메인 애플리케이션
├── karlgren.js                    ← Karlgren 재건 스크립트
├── wangli.js                      ← Wang Li 재건 스크립트
├── pulleyblank.js                 ← Pulleyblank 재건 스크립트
├── baxter.js                      ← Baxter 재건 스크립트
├── panwuyun.js                    ← Pan Wuyun 재건 스크립트
├── zhengzhang.js                  ← Zhengzhang 재건 스크립트
├── validate-pulleyblank.js        ← 검증 스크립트
├── package.json
└── vite.config.js
```

## 데이터 소스

이 프로젝트는 다음 데이터에 의존합니다:

1. **tshet-uinh**: 한자 → 음운 위치 매핑
2. **학술 논문**: 각 재건 체계의 원본 데이터
3. **Wiktionary**: 비교 데이터

## 기여하기

기여는 환영합니다! 다음 단계를 따라주세요:

1. 이슈를 먼저 등록하세요
2. 브랜치를 만드세요
3. 변경사항을 커밋하세요
4. 풀 리퀘스트를 보내세요

## 라이선스

MIT License © 2026

## 인용

이 도구를 사용하는 논문에서 다음을 인용해주세요:

```
tigermorning. (2026). 중고음 재건 비교 (qieyun-compare) [소프트웨어]. GitHub. https://github.com/tigermorning/qieyun-compare
```

# Middle Chinese Open-Source Ecosystem Analysis

> **Date:** 2026-07-20
> **Purpose:** Comprehensive mapping of the entire Middle Chinese digital research ecosystem
> **Philosophy:** Reuse everything that exists. Only build what does not yet exist.

---

## Table of Contents

1. [Ecosystem Overview](#1-ecosystem-overview)
2. [Layer Map](#2-layer-map)
3. [Project-by-Project Analysis](#3-project-by-project-analysis)
4. [Dependency Map](#4-dependency-map)
5. [Reuse Recommendations](#5-reuse-recommendations)
6. [Components We Should Never Rebuild](#6-components-we-should-never-rebuild)
7. [Components We Should Build](#7-components-we-should-build)
8. [Gap Analysis](#8-gap-analysis)
9. [Recommended Architecture](#9-recommended-architecture)

---

## 1. Ecosystem Overview

The Middle Chinese digital research ecosystem is mature and surprisingly rich. It spans:

- **65+ repositories** under nk2028 alone
- **Major web databases**: ytenx.org, kaom.net, Fudan CCDC, CTEXT, 小學堂
- **Python packages**: sinopy, yunpy, dphon, tshet-uinh-encoder
- **JavaScript libraries**: tshet-uinh-js (53 stars, 47 releases), UinhKyaengh.js
- **Web applications**: tshet-uinh-deriver (61 stars), yindian, MCPDict (2850 languages)
- **Academic datasets**: PHONO-ML, WikiHan, Baxter-Sagart OC, Schuessler EDOC
- **Comparative tools**: Fudan CCDC (8 systems), Wiktionary MC appendix (8 systems)
- **ML/NLP projects**: ACP (EMNLP 2024), MIO optimization, DIRECT (Princeton)

**Key insight:** The ecosystem is NOT lacking data or basic tools. What it lacks is integration, comparison infrastructure, and research-grade analysis tools.

---

## 2. Layer Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: PRIMARY SOURCES                       │
│                                                                     │
│  切韻(601) → 廣韻(1008) → 集韻(1039)                               │
│  王三(manuscript) · 王一(manuscript)                                │
│  韻鏡 · 七音略 (rhyme tables)                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    LAYER 2: DATA PROJECTS                           │
│                                                                     │
│  nk2028/tshet-uinh-data  ←── CSV extraction from primary sources    │
│  ytenx.org (BYVoid)       ←── Comprehensive query (5 rhyme books)  │
│  kaom.net (Gu Guolin)     ←── Massive resource (39 rhyme books)    │
│  Fudan CCDC               ←── 8 reconstruction systems             │
│  PHONO-ML (CRLAO)         ←── 26,224 Baxter-Sagart pairs          │
│  Baxter-Sagart OC         ←── ~5,000 OC + 9,000 MC items           │
│  WikiHan (CMU)            ←── 9-dialect comparative dataset        │
│  Starling DB (Starostin)  ←── Sino-Tibetan comparative data        │
│  CTEXT DataWiki           ←── Structured phonological data         │
│  小學堂 (Academia Sinica) ←── Multi-period phonological DB         │
│  Schuessler EDOC/CLDF     ←── OC etymological dictionary           │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    LAYER 3: CORE LIBRARIES                          │
│                                                                     │
│  tshet-uinh-js (nk2028)   ←── THE core JS library (npm: tshet-uinh)│
│  tshet-uinh-encoder (Py)  ←── Python phonological encoder          │
│  sinopy (LingPy)          ←── Chinese historical linguistics       │
│  UinhKyaengh.js (nk2028)  ←── Rhyme table (韻鏡/七音略) library    │
│  CJKVO                    ←── Vietnamese/Japanese phonological parser│
│  opencc-js (nk2028)       ←── Simplified/Traditional conversion    │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    LAYER 4: APPLICATIONS                            │
│                                                                     │
│  tshet-uinh-deriver (nk2028) ←── Reconstruction generation tool   │
│  yindian (nk2028)            ←── Pronunciation dictionary (2500+) │
│  MCPDict (community)         ←── 2850 language dialect dictionary  │
│  unt's Transcriber           ←── 15+ romanization/reconstruction   │
│  tshet-uinh-fanqie (nk2028)  ←── Fanqie calculator                │
│  tshet-uinh-tools (nk2028)   ←── Character search by phonology    │
│  tshet-uinh-flashcard (nk2028)←── MC flashcards                    │
│  putonghua-ipa-converter     ←── Putonghua IPA annotation         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    LAYER 5: RESEARCH TOOLS                          │
│                                                                     │
│  LingPy + lingrex     ←── Computational historical linguistics     │
│  dphon                ←── Phonology-aware text reuse detection     │
│  yunpy                ←── MC annotation for NLP (PHONO-ML wrapper) │
│  DIRECT (Princeton)   ←── Phonological resonance in early texts    │
│  digling/rhymes       ←── Machine-readable rhyme evidence data     │
│  ACP (EMNLP 2024)     ←── Transformer-based OC/MC reconstruction  │
│  MIO (TACL 2025)      ←── Mixed-integer optimization for MC       │
│  cs221-proj (Stanford) ←── ML comparative reconstruction           │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                LAYER 6: qieyun-compare (OUR PROJECT)                │
│                                                                     │
│  Multi-reconstruction comparison platform                           │
│  Visual phonological difference highlighting                       │
│  Extensible system registry                                         │
│  Research-grade comparison UI                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Project-by-Project Analysis

### 3.1 nk2028 Ecosystem (Primary Dependency)

#### tshet-uinh-js (Core JS Library)
- **Purpose:** Computational framework for the Qieyun phonological system
- **Data model:** 音韻地位 (Phonological Position) — 6 components: 母(聲母), 呼(開合), 等, 類, 韻, 聲
- **API:** `音韻地位.from描述()`, `資料.iter音韻地位()`, `表達式`, `執行反切`
- **Status:** Active, v0.15.4, 47 releases, zero runtime dependencies
- **Can reuse:** YES — this is our foundation
- **npm:** `tshet-uinh`

#### tshet-uinh-data (Core Data)
- **Purpose:** CSV extraction of primary sources
- **Sources:** 廣韻.csv, 王三.csv, 王一.csv, 韻鏡.csv, fanqie tables
- **Status:** Active, CC0-1.0 license
- **Can reuse:** YES — direct dependency

#### tshet-uinh-examples (Derivation Scripts)
- **Purpose:** JS derivation scripts for various reconstructions
- **Contains:** karlgren.js, wangli.js, panwuyun.js, baxter.js, plus modern dialect derivations
- **Status:** Active, 21 releases
- **Can reuse:** YES — these are exactly the reconstruction implementations we need
- **Key insight:** These scripts implement the SAME FUNCTIONALITY we were trying to build from scratch

#### tshet-uinh-deriver (Web Application)
- **Purpose:** Online tool for generating phonological reconstructions
- **Features:** Custom derivation scripts, batch processing, simplified/traditional conversion
- **Status:** Active, 61 stars
- **Can reuse:** YES — as reference architecture; extend rather than rebuild

#### tshet-uinh-fanqie (Fanqie Calculator)
- **Purpose:** Automated fanqie computation
- **Status:** Active, 10 stars, client-side
- **Can reuse:** YES — direct reuse

#### UinhKyaengh.js (Rhyme Table Library)
- **Purpose:** Programmatic representation of 韻鏡/七音略 rhyme tables
- **API:** Bidirectional conversion between 韻鏡位置 and 音韻地位
- **Status:** Active
- **Can reuse:** YES — for rhyme table features

#### yindian (Pronunciation Dictionary)
- **Purpose:** 2500+ language variant pronunciation dictionary
- **Backend:** yindian-server (REST API)
- **Data source:** MCPDict
- **Can reuse:** YES — API calls for character lookup

#### opencc-js (Chinese Conversion)
- **Purpose:** Simplified/Traditional Chinese conversion
- **Status:** Active, 345 stars (most popular nk2028 project)
- **Can reuse:** YES — for character normalization

#### tshet-uinh-encoder-python (Python Encoder)
- **Purpose:** Python phonological position encoding
- **Status:** Active, CC0-1.0
- **Can reuse:** YES — if we need Python interop

### 3.2 External Databases

#### ytenx.org (韻典網) — BYVoid
- **Purpose:** Comprehensive rhyme book query (5 sources)
- **Sources:** 廣韻, 中原音韻, 洪武正韻牋, 分韻撮要, 上古音系
- **Tech:** Django + SQLite
- **API:** None (web only)
- **Can reuse:** Data extracted by nk2028 already; no direct API
- **Value:** Historical reference; data already in tshet-uinh-data

#### kaom.net (古音小鏡) — Gu Guolin
- **Purpose:** Massive historical linguistics resource
- **Coverage:** 16 OC systems, 39 rhyme books, 53 glossaries, 10 Buddhist dicts
- **Tech:** MySQL backend, no API
- **Can reuse:** NO direct API; data extraction difficult
- **Value:** Reference for completeness; MC-to-dialect tool unique

#### Fudan CCDC (復旦大學中華文明數據中心)
- **Purpose:** **Best existing multi-reconstruction comparison tool**
- **Systems:** Pan Wuyun, Karlgren, Li Fang-Kuei, Wang Li, Zhou Fagao, Li Rong, Shao Rongfen, Pulleyblank, Zhengzhang Shangfang
- **Tech:** Web-based query
- **API:** None
- **Can reuse:** NO direct API
- **Value:** This is exactly what we want to build, but programmable and extensible
- **Gap it leaves:** Not open-source, not extensible, no programmatic access, limited to 8 fixed systems

#### CTEXT (中國哲學書電子化計劃)
- **Purpose:** Digital library of Chinese texts
- **MC-relevant:** 韻鏡, 七音略 digitization
- **API:** CTP API for bulk data access
- **Can reuse:** YES — API available for text data

#### 小學堂 (Academia Sinica)
- **Purpose:** Multi-period phonological database
- **Coverage:** OC, MC, modern readings with IPA
- **Can reuse:** Web interface; limited API

### 3.3 Python Ecosystem

#### sinopy (LingPy)
- **Purpose:** Quantitative Chinese historical linguistics
- **Data model:** Baxter (1992) ASCII notation
- **API:** Pure Python functions, LingPy plugin
- **Can reuse:** YES — for Baxter notation conversion, phonological distance calculations
- **Depends on:** LingPy

#### yunpy (CRLAO/CNRS)
- **Purpose:** MC phonetic annotation for NLP
- **Data:** PHONO-ML (26,224 Baxter-Sagart pairs)
- **API:** `pip install yunpy`; CLI + Python
- **Can reuse:** YES — for MC annotation pipeline

#### dphon
- **Purpose:** Phonology-aware text reuse detection (Old Chinese)
- **API:** Python CLI and library
- **Can reuse:** Partially — methodology applicable to MC text analysis

#### pingshui-rhyme
- **Purpose:** 平水韻 tone/rhyme classification
- **API:** Python classes
- **Can reuse:** YES — for ping shui rhyme features

### 3.4 JavaScript Ecosystem

#### unt's Middle Chinese Transcriber
- **Purpose:** Transcribes 音韻地位 into 15+ romanization/reconstruction systems
- **Systems:** Baxter 1992, Baxter 2014, Polyhedron/Kyonh, Huang Xiaoshan, msoeg, unt's own (2016, 2019)
- **Status:** Active, v18.4
- **Can reuse:** YES — directly relevant; most comprehensive transcription converter
- **Key insight:** This already does multi-system conversion but is NOT a comparison tool

#### WikiHan (CMU L2Lab)
- **Purpose:** Comparative Sinitic dataset from Wiktionary
- **Data:** 9 dialects + MC (Baxter-Sagart)
- **Format:** TSV datasets
- **Can reuse:** YES — for comparative Sinitic data

### 3.5 ML/NLP Projects

#### ACP (Ancient Chinese Pronunciations) — EMNLP 2024
- **Purpose:** Transformer-based pronunciation reconstruction
- **Data:** 70,943 entries, 17,001 characters, 6 historical periods
- **Can reuse:** Dataset; model is research prototype

#### MIO Reconstruction — TACL 2025
- **Purpose:** Mixed-integer optimization for MC consonant system
- **Data:** Aligned Guangyun↔dialect data
- **Can reuse:** Dataset; methodology reference

#### DIRECT (Princeton)
- **Purpose:** Phonological resonance in early Chinese texts
- **Can reuse:** Methodology for rhyme/homophony analysis

### 3.6 Academic Datasets

#### Baxter-Sagart OC
- **URL:** sites.lsa.umich.edu/ocbaxtersagart
- **Format:** Excel (.xlsx), CC BY 4.0
- **Coverage:** ~5,000 OC items, ~9,000 MC readings
- **Can reuse:** YES — direct download

#### PHONO-ML (CRLAO)
- **Format:** CSV, Zenodo DOI
- **Coverage:** 26,224 character/transcription pairs
- **Can reuse:** YES — direct download

#### Schuessler EDOC (CLDF)
- **Format:** CLDF Wordlist format
- **Can reuse:** YES — standardized format

---

## 4. Dependency Map

```
qieyun-compare
│
├── DIRECT DEPENDENCIES (npm)
│   ├── tshet-uinh              ← Core phonological position model
│   ├── tshet-uinh-examples     ← Pre-built reconstruction scripts
│   ├── tshet-uinh-deriver-tools← Derivation utilities
│   ├── opencc-js               ← Simplified/Traditional conversion
│   └── uinh-kyaengh            ← Rhyme table support
│
├── API DEPENDENCIES (REST)
│   ├── yindian-server          ← Character pronunciation lookup
│   └── CTEXT API               ← Historical text data
│
├── DATA DEPENDENCIES (downloaded)
│   ├── tshet-uinh-data CSVs    ← Primary source data
│   ├── Baxter-Sagart xlsx      ← OC/MC reconstruction data
│   └── PHONO-ML CSVs           ← Baxter-Sagart character pairs
│
├── METHODOLOGY REFERENCES
│   ├── unt's Transcriber       ← Multi-system conversion patterns
│   ├── Fudan CCDC              ← Multi-reconstruction comparison model
│   ├── LingPy/sinopy           ← Computational distance metrics
│   └── kaom.net                ← Comprehensive resource model
│
└── NEVER REIMPLEMENT
    ├── Character-to-音韻地位 lookup  ← tshet-uinh does this
    ├── Derivation scripts           ← tshet-uinh-examples has them
    ├── Fanqie calculation           ← tshet-uinh-fanqie exists
    ├── Simplified/Traditional       ← opencc-js does this
    ├── Rhyme table structure         ← UinhKyaengh.js does this
    └── Basic phonological encoding  ← tshet-uinh-encoder does this
```

---

## 5. Reuse Recommendations

### A. Direct Reuse (npm install)

| Package | Purpose | Confidence |
|---------|---------|------------|
| `tshet-uinh` | Core 音韻地位 model, data access | 100% |
| `tshet-uinh-examples` | Reconstruction scripts (karlgren, wangli, panwuyun, baxter) | 100% |
| `tshet-uinh-deriver-tools` | Derivation framework utilities | 90% |
| `opencc-js` | Simplified/Traditional conversion | 100% |
| `uinh-kyaengh` | Rhyme table (韻鏡) support | 80% |

### B. API Calls (REST)

| API | Purpose | Notes |
|-----|---------|-------|
| yindian-server | Character pronunciation lookup | nk2028 backend, 2500+ languages |
| CTEXT API | Historical text access | For scholarly text context |

### C. Data Downloads

| Dataset | Format | Purpose |
|---------|--------|---------|
| tshet-uinh-data CSVs | CSV | 廣韻/王三/韻鏡 primary data |
| Baxter-Sagart OC | Excel (.xlsx) | OC reconstruction data |
| PHONO-ML | CSV | Baxter-Sagart character pairs |
| WikiHan | TSV | Comparative Sinitic data |

### D. Methodology Adoption

| Reference | What to adopt |
|-----------|---------------|
| unt's Transcriber | Multi-system conversion architecture pattern |
| Fudan CCDC | Comparison UI design (but make it open-source and extensible) |
| LingPy/sinopy | Phonological distance calculation methods |
| tshet-uinh-deriver | Script loading and execution architecture |

---

## 6. Components We Should NEVER Rebuild

| Component | Existing Implementation | Why not rebuild |
|-----------|------------------------|-----------------|
| Character → 音韻地位 lookup | tshet-uinh-js | Mature, tested, 47 releases |
| 音韻地位 → Reconstruction derivation | tshet-uinh-examples | Scripts for karlgren, wangli, panwuyun, baxter, etc. |
| Fanqie calculation | tshet-uinh-fanqie | Complete, client-side |
| Rhyme table structure | UinhKyaengh.js | Bidirectional 韻鏡↔音韻地位 |
| Simplified/Traditional | opencc-js | 345 stars, battle-tested |
| Basic phonological encoding | tshet-uinh-encoder | CC0, Python+JS |
| Character pronunciation database | MCPDict/yindian | 2850 languages |
| Baxter notation conversion | sinopy | LingPy integration |
| MC phonological data | tshet-uinh-data | CSV, CC0, primary sources |

---

## 7. Components We Should Build

### 7.1 Multi-Reconstruction Comparison Engine (NEW)

**What exists:** Fudan CCDC compares 8 fixed systems via web interface. unt's Transcriber converts between 15+ systems but doesn't compare them visually.

**What's missing:** A programmatic, extensible comparison engine that:
- Accepts any number of reconstruction systems (not just 8)
- Allows users to add/remove systems dynamically
- Computes phonological differences between systems
- Highlights specific points of divergence (initial, final, tone)
- Works as both CLI and web interface

**Why build:** No open-source, extensible, programmatic comparison tool exists.

### 7.2 Visual Phonological Difference Highlighting (NEW)

**What exists:** Static comparison tables (Fudan CCDC, Wiktionary appendix).

**What's missing:** Interactive visualization that:
- Colors/highlights differences between reconstruction systems
- Groups characters by degree of scholarly agreement/disagreement
- Shows which phonological components (initial, final, tone) differ
- Provides distance metrics between systems

**Why build:** Visual comparison is the core value proposition of qieyun-compare.

### 7.3 Extensible System Registry (NEW)

**What exists:** Fixed lists of 8-15 systems in various tools.

**What's missing:** A standardized, open registry format that:
- Defines reconstruction systems in a machine-readable format
- Allows third parties to add new systems
- Includes metadata (author, year, methodology, language)
- Supports versioning and provenance

**Why build:** Enables the ecosystem to grow beyond hardcoded system lists.

### 7.4 Reconstruction Comparison Data Format (NEW)

**What exists:** Each project uses its own format (CSV, Excel, JSON, web tables).

**What's missing:** A shared data format for encoding multiple scholars' reconstructions of the same phonological positions, with:
- Standardized fields for each system's IPA/notation
- Metadata about each system
- Diff/comparison annotations
- Import/export from existing formats

**Why build:** Enables interoperability between tools.

### 7.5 Research-Grade Comparison UI (NEW)

**What exists:** Fudan CCDC (web-only, not open-source), various static tables.

**What's missing:** A modern, open-source web UI that:
- Loads reconstruction systems dynamically
- Provides search by character or phonological position
- Shows comparison tables with visual highlighting
- Supports batch comparison (compare entire rhyme categories)
- Exports results for academic papers

**Why build:** This is the user-facing component that makes all the backend useful.

---

## 8. Gap Analysis

### 8.1 Unsolved Research Problems

| Problem | Current Status | Opportunity |
|---------|---------------|-------------|
| **Multi-reconstruction comparison** | Fudan CCDC (8 systems, web-only, not open) | Open-source, extensible comparison platform |
| **Reconstruction distance metrics** | No standardized metric exists | Phonological distance calculation between systems |
| **Agreement/disagreement quantification** | Researchers compare manually | Automated consensus scoring across systems |
| **Diachronic reconstruction comparison** | Limited to synchronic snapshots | Tools for comparing MC→OC→modern derivation paths |
| **Sino-Xenic systematic comparison** | MCPDict has data, no comparison tool | Systematic MC→Korean/Japanese/Vietnamese comparison |
| **Reconstruction validation** | Manual expert review | Automated cross-validation between systems |

### 8.2 Repetitive Manual Work Researchers Still Do

| Task | How it's done now | Automation opportunity |
|------|-------------------|----------------------|
| Compare reconstructions for a character | Look up in multiple papers/tools manually | Batch comparison with highlighting |
| Check if two systems agree on a phonological position | Manual IPA comparison | Automated agreement detection |
| Add a new reconstruction system to comparison | Recode entire comparison tool | Plugin/extension architecture |
| Export comparison results for papers | Screenshot or manual table creation | Export to LaTeX/CSV/Markdown |
| Find characters where scholars disagree | Read through comparison tables | Disagreement discovery tool |
| Validate a reconstruction against fanqie | Manual cross-checking | Automated fanqie validation |

### 8.3 Missing Functionality

| Feature | Why it's needed | Who would use it |
|---------|----------------|------------------|
| **Dynamic system loading** | Add new reconstruction without code changes | Researchers extending the tool |
| **Phonological diff algorithm** | Quantify how much systems differ | Computational linguists |
| **Batch comparison by rhyme/initial** | Systematic comparison across categories | Phonologists |
| **Consensus reconstruction** | Average/median across multiple systems | Researchers needing "default" MC |
| **Reconstruction change tracker** | See how a system evolved across publications | Historical linguists |
| **Citation-ready exports** | Generate tables for academic papers | All researchers |
| **API for programmatic access** | Integrate into NLP pipelines | Computational linguists |

---

## 9. Recommended Architecture

### 9.1 Core Principle

**qieyun-compare should be a THIN COMPARISON LAYER on top of the existing nk2028 ecosystem.**

It should NOT contain:
- Character lookup logic (tshet-uinh does this)
- Reconstruction implementations (tshet-uinh-examples has these)
- Fanqie calculation (tshet-uinh-fanqie does this)
- Primary source data (tshet-uinh-data has this)
- Character normalization (opencc-js does this)

It SHOULD contain:
- Multi-system comparison engine
- Visual difference highlighting
- Extensible system registry
- Research-grade comparison UI
- Export/citation tools

### 9.2 Proposed Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     qieyun-compare                          │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  System      │  │  Comparison  │  │  Research UI     │  │
│  │  Registry    │  │  Engine      │  │  (Web + CLI)     │  │
│  │  (JSON/TS)  │  │  (Core)      │  │                  │  │
│  └──────┬──────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                │                    │             │
│  ┌──────▼────────────────▼────────────────────▼─────────┐  │
│  │              Unified Comparison API                    │  │
│  └──────┬────────────────┬────────────────────┬─────────┘  │
│         │                │                    │             │
└─────────┼────────────────┼────────────────────┼─────────────┘
          │                │                    │
    ┌─────▼─────┐   ┌─────▼─────┐        ┌─────▼─────┐
    │ tshet-uinh│   │tshet-uinh │        │  opencc-js│
    │ (npm)     │   │-examples  │        │  (npm)    │
    │           │   │ (npm)     │        │           │
    └───────────┘   └───────────┘        └───────────┘
```

### 9.3 Subsystem Decisions

| Subsystem | Decision | Rationale |
|-----------|----------|-----------|
| **Character lookup** | REUSE tshet-uinh | Mature, tested, zero dependencies |
| **音韻地位 model** | REUSE tshet-uinh | Core library, 47 releases |
| **Reconstruction scripts** | REUSE tshet-uinh-examples | Already has karlgren, wangli, panwuyun, baxter |
| **Fanqie calculation** | REUSE tshet-uinh-fanqie | Complete, client-side |
| **Rhyme table support** | REUSE UinhKyaengh.js | Bidirectional conversion |
| **Char normalization** | REUSE opencc-js | 345 stars, battle-tested |
| **Primary data** | REUSE tshet-uinh-data CSVs | CC0, machine-readable |
| **System registry** | BUILD NEW | No existing format for this |
| **Comparison engine** | BUILD NEW | Core differentiator |
| **Visual highlighting** | BUILD NEW | Core value proposition |
| **Research UI** | BUILD NEW | Open-source alternative to Fudan CCDC |
| **Export tools** | BUILD NEW | Citation-ready outputs |
| **Distance metrics** | ADOPT from LingPy/sinopy | Existing methodology |
| **Multi-system conversion** | REFERENCE unt's Transcriber | Architecture patterns |

### 9.4 Implementation Priority

| Phase | What | Depends on |
|-------|------|------------|
| **Phase 1** | System Registry format + basic comparison engine | tshet-uinh |
| **Phase 2** | Visual difference highlighting UI | Phase 1 |
| **Phase 3** | Dynamic system loading (add new systems without code changes) | Phase 1 |
| **Phase 4** | Export/citation tools (LaTeX, CSV, Markdown) | Phase 2 |
| **Phase 5** | Batch comparison + disagreement discovery | Phase 1-2 |
| **Phase 6** | API for programmatic access | Phase 1-3 |
| **Phase 7** | Consensus reconstruction + distance metrics | Phase 1, LingPy methodology |

---

## Summary: The One-Line Answer

**qieyun-compare should be a thin, open-source comparison layer that calls tshet-uinh-js for data and reconstruction, and adds what no existing tool provides: dynamic multi-system comparison with visual highlighting, an extensible system registry, and research-grade export tools.**

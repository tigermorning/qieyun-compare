# qieyun-compare

Comparing Middle Chinese Phonological Reconstruction Systems — a tool for analyzing how different scholars have reconstructed the sound system of Middle Chinese (切韻音系, 約601 CE).

[![GitHub](https://img.shields.io/github/license/tigermorning/qieyun-compare)](https://github.com/tigermorning/qieyun-compare/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/tigermorning/qieyun-compare)](https://github.com/tigermorning/qieyun-compare/issues)

[![middle-chinese](https://img.shields.io/badge/Middle%20Chinese-blue)](https://github.com/topics/middle-chinese)
[![qieyun](https://img.shields.io/badge/Qieyun-red)](https://github.com/topics/qieyun)
[![historical-phonology](https://img.shields.io/badge/Historical%20Phonology-green)](https://github.com/topics/historical-phonology)
[![comparative-linguistics](https://img.shields.io/badge/Comparative%20Linguistics-purple)](https://github.com/topics/comparative-linguistics)
[![digital-humanities](https://img.shields.io/badge/Digital%20Humanities-orange)](https://github.com/topics/digital-humanities)
[![sino-korean](https://img.shields.io/badge/Sino--Korean-yellow)](https://github.com/topics/sino-korean)

## Overview

Middle Chinese (中古漢語) has been reconstructed by many scholars, each with different approaches. The same character may receive different IPA representations from different reconstruction systems:

- **Karlgren (1926)**: *Phonologie Chinoise*
- **Baxter (1992)**: *A Handbook of 'Phags-pa Chinese*
- **Pan (2000)**: 《漢語歷史音韻學》
- **Zhengzhang (2002)**: 《上古音系》
- **Baxter-Sagart (2014)**: "Old Chinese" (with William Sagart)
- **Wang Li (1957/1980)**: 《漢語史稿》
- **Pulleyblank (1991)**: *Lexicon of Reconstructed Pronunciation*
- **unt (~2018)**: Updated network transcription
- **msoeg (~2021)**: Middle Chinese reconstruction

This tool allows researchers to compare these systems interactively.

## Companion to [nk2028/tshet-uinh](https://github.com/nk2028)

This project complements the [tshet-uinh](https://github.com/nk2028/tshet-uinh-js) ecosystem:

| Tool | Focus |
|------|-------|
| [tshet-uinh-js](https://github.com/nk2028/tshet-uinh-js) | Qieyun system processing |
| [tshet-uinh-deriver](https://github.com/nk2028/tshet-uinh-deriver) | Generating phonological reconstructions |
| **qieyun-compare** | **Comparing different reconstruction systems** |

We use tshet-uinh-js for character-to-phonological-position mapping.

## Features

- [ ] Character search → phonological position display
- [ ] Multi-system IPA comparison table
- [ ] Visual highlighting of differences
- [ ] Source citations and BibTeX export
- [ ] Configurable default systems
- [ ] Collapsible "other characters in this position" section

## Documentation

Comprehensive design documentation is in the [`docs/`](docs/) directory:

- [Architecture](docs/architecture.md) — System design and rationale
- [Decision Log](docs/decision-log.md) — 15 design decisions with reasoning
- [Roadmap](docs/roadmap.md) — Project phases and timeline
- [MVP](docs/mvp.md) — MVP scope and features
- [Data Audit](docs/data-audit.md) — Data source investigation methodology
- [GitHub Strategy](docs/github-strategy.md) — Positioning and discoverability
- [tshet-uinh Integration](docs/tshet-uinh-integration.md) — Relationship with nk2028
- [UX Workflow](docs/ux-workflow.md) — User experience design
- [Research Notes](docs/research-notes.md) — Academic ideas and future possibilities
- [Korean Scholarship](docs/korean-scholarship.md) — Korean research investigation

## Project Status

**Phase: Documentation Complete**

Next step: Project 0 — Data Audit of reconstruction systems.

## Citation

When citing qieyun-compare, please also cite the tshet-uinh ecosystem:

```bibtex
@software{qieyun-compare,
  title = {qieyun-compare: Comparing Middle Chinese Phonological
           Reconstruction Systems},
  year = {2026},
  url = {https://github.com/tigermorning/qieyun-compare}
}

@software{tshet-uinh-js,
  title = {TshetUinh.js: A JavaScript Library for the Qieyun System},
  author = {{nk2028}},
  year = {2026},
  url = {https://github.com/nk2028/tshet-uinh-js}
}
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

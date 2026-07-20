# Data Audit

This document records the data audit process for all reconstruction systems planned for qieyun-compare.

---

## Summary

| System | Digital Data | Format | API/Script | Quality |
|--------|-------------|--------|------------|---------|
| Baxter 1992 | Yes | PDF + JS | tshet-uinh-examples | High |
| Pan 2000 | Yes | JS | tshet-uinh-examples | High |
| Zhengzhang 2002 | **No** | — | — | **High (source only)** |
| Baxter-Sagart 2014 | **No** | PDF + Excel | — | **High (source only)** |
| Wang Li 1957 | Yes | JS | tshet-uinh-examples | Medium |
| Pulleyblank 1991 | Yes | JS | tshet-uinh-examples | Medium |
| unt | Yes | JS | tshet-uinh-examples | High |
| msoeg | Yes | JS | tshet-uinh-examples | High |

---

## Key Finding

The `nk2028/tshet-uinh-examples` repository provides JavaScript derivation scripts for **some** reconstruction systems:

**Available derivation scripts:**
- `baxter.js` — Baxter's MC transcription (1992 and 2014 versions)
- `panwuyun.js` — Pan Wuyun's reconstruction
- `karlgren.js` — Karlgren's reconstruction
- `wangli.js` — Wang Li's reconstruction
- `unt.js` — unt's reconstruction
- `msoeg_v8.js` — msoeg's reconstruction

**NOT available as derivation scripts:**
- Zhengzhang 2002 — No `zhengzhang.js` exists
- Baxter-Sagart 2014 — No dedicated OC reconstruction script

**Implication for MVP:** The default systems should be reconsidered. Systems with derivation scripts can be used directly; systems without them require custom implementation or removal from defaults.

---

## System Audits

### Baxter 1992

**Source:** William H. Baxter, *A Handbook of Old Chinese Phonology*, Mouton de Gruyter, 1992.

**Digital Data:**
- PDF available from Baxter-Sagart website
- 9000 Guangyun characters in Baxter's notation (89-page PDF)
- Excel spreadsheet with 5000+ items

**tshet-uinh-examples:**
- `baxter.js` provides derivation script
- Supports both 1992 and 2014 versions
- Usage: `TshetUinhExamples.baxter({ 版本: "1992" })`

**Note:** Baxter's system is a **notation**, not a reconstruction. It records phonological information from medieval sources. The IPA is derived from this notation.

**Data Quality:** High. Well-documented, widely cited, extensively tested.

**Academic Citation:**
```bibtex
@book{baxter1992,
  author = {Baxter, William H.},
  title = {A Handbook of Old Chinese Phonology},
  publisher = {Mouton de Gruyter},
  address = {Berlin},
  year = {1992}
}
```

---

### Pan 2000

**Source:** Pan Wuyun (潘悟雲), *Hanyu Lishi Yunyunxue* (漢語歷史音韻學), 2000.

**Digital Data:**
- tshet-uinh-examples provides derivation script
- `panwuyun.js` derives IPA from phonological position

**tshet-uinh-examples:**
- `panwuyun.js` provides derivation script
- Usage: `TshetUinhExamples.panwuyun({})`

**Note:** Pan's system is a reconstruction, not just a notation. It produces IPA directly.

**Data Quality:** High. Well-documented, widely cited in Chinese-language scholarship.

**Academic Citation:**
```bibtex
@book{pan2000,
  author = {潘悟雲},
  title = {漢語歷史音韻學},
  publisher = {上海教育出版社},
  year = {2000}
}
```

---

### Zhengzhang 2002

**Source:** Zhengzhang Shangfang (鄭張尚芳), *Shanggu Yinxi* (上古音系), 2002.

**Digital Data:**
- **No dedicated derivation script found in tshet-uinh-examples**
- The repository contains: `baxter.js`, `panwuyun.js`, `karlgren.js`, `wangli.js`, `unt.js`, `msoeg_v8.js`

**tshet-uinh-examples:**
- No `zhengzhang.js` file exists
- Alternative: Use Pan Wuyun's reconstruction (which is related to Zhengzhang's work)

**Options:**
1. **Use Pan Wuyun instead** — Pan and Zhengzhang are closely related systems
2. **Create custom derivation script** — Implement Zhengzhang's system from the published data
3. **Remove from default systems** — Use only systems with existing derivation scripts

**Note:** The earlier documentation referenced "Zhengzhang (2002)" as a default system. This needs to be reconsidered given the data availability.

**Data Quality:** High (for the source publication). No digital derivation script available.

**Academic Citation:**
```bibtex
@book{zhengzhang2002,
  author = {鄭張尚芳},
  title = {上古音系},
  publisher = {上海教育出版社},
  year = {2002}
}
```

---

### Baxter-Sagart 2014

**Source:** William H. Baxter and Laurent Sagart, *Old Chinese: A New Reconstruction*, Oxford University Press, 2014.

**Digital Data:**
- PDF files with 5000+ reconstructed items
- Excel spreadsheet with 5000+ items
- Multiple sorting options (pinyin, GSR, radical+stroke)

**tshet-uinh-examples:**
- **No dedicated derivation script found**
- `baxter.js` provides Baxter's MC transcription (1992 and 2014 versions), but this is for Middle Chinese notation, not Old Chinese reconstruction

**Options:**
1. **Use Baxter 1992 instead** — Baxter's MC transcription is available as a derivation script
2. **Create custom derivation script** — Implement Baxter-Sagart's system from the PDF/Excel data
3. **Remove from default systems** — Use only systems with existing derivation scripts

**Note:** The earlier documentation referenced "Baxter-Sagart (2014)" as a default system. This needs to be reconsidered given the data availability.

**Data Quality:** High (for the source publication). No digital derivation script available.

**Academic Citation:**
```bibtex
@book{baxter2014,
  author = {Baxter, William H. and Sagart, Laurent},
  title = {Old Chinese: A New Reconstruction},
  publisher = {Oxford University Press},
  address = {New York},
  year = {2014}
}
```

---

### Wang Li 1957

**Source:** Wang Li (王力), *Hanyu Shi Gao* (漢語史稿), 1957/1980.

**Digital Data:**
- tshet-uinh-examples provides derivation script
- `wangli.js` derives IPA from phonological position

**tshet-uinh-examples:**
- `wangli.js` provides derivation script
- Usage: `TshetUinhExamples.wangli({})`

**Note:** Wang Li's system is one of the earliest modern reconstructions.

**Data Quality:** Medium. Older system, less detailed than later reconstructions.

**Academic Citation:**
```bibtex
@book{wangli1957,
  author = {王力},
  title = {漢語史稿},
  publisher = {科學出版社},
  year = {1957}
}
```

---

### Pulleyblank 1991

**Source:** Edwin G. Pulleyblank, *Lexicon of Reconstructed Pronunciation in Early Middle Chinese, Late Middle Chinese, and Early Mandarin*, University of British Columbia Press, 1991.

**Digital Data:**
- tshet-uinh-examples provides derivation script
- Available through the repository's JavaScript files

**tshet-uinh-examples:**
- Derivation script available
- Usage: See repository documentation

**Note:** Pulleyblank's system is important for comparative linguistics.

**Data Quality:** Medium. Well-documented but less widely used than Baxter's system.

**Academic Citation:**
```bibtex
@book{pulleyblank1991,
  author = {Pulleyblank, Edwin G.},
  title = {Lexicon of Reconstructed Pronunciation in Early Middle Chinese, Late Middle Chinese, and Early Mandarin},
  publisher = {University of British Columbia Press},
  year = {1991}
}
```

---

### unt

**Source:** unt (online scholar), various publications.

**Digital Data:**
- tshet-uinh-examples provides derivation script
- `unt.js` derives IPA from phonological position
- `unt_legacy.js` provides older versions

**tshet-uinh-examples:**
- `unt.js` provides derivation script
- `unt_legacy.js` provides legacy versions
- Usage: `TshetUinhExamples.unt({})`

**Note:** unt's system is one of the most detailed modern reconstructions.

**Data Quality:** High. Extensively tested, widely used in digital scholarship.

---

### msoeg

**Source:** msoeg (online scholar), various publications.

**Digital Data:**
- tshet-uinh-examples provides derivation script
- `msoeg_v8.js` derives IPA from phonological position

**tshet-uinh-examples:**
- `msoeg_v8.js` provides derivation script
- Usage: `TshetUinhExamples.msoeg_v8({})`

**Note:** msoeg's system is a recent reconstruction with detailed phonological analysis.

**Data Quality:** High. Extensively tested, widely used in digital scholarship.

---

## Additional Data Sources

### PHONO-ML

**Source:** Guillaume Jacques and Alexander Delaporte, 2025.

**Digital Data:**
- 26,224 character/transcription pairs
- Maps Chinese characters to Middle Chinese readings
- Uses Baxter-Sagart reconstruction

**Availability:** Zenodo (doi:10.5281/zenodo.17349142)

**Note:** This is a comprehensive dataset that could serve as a fallback or validation source.

### WikiHan

**Source:** Chang et al., 2022.

**Digital Data:**
- Comparative Sinitic dataset from Wiktionary
- 14,653 entries with Middle Chinese (Baxter-Sagart)
- Includes data from multiple dialects

**Availability:** GitHub (cmu-llab/wikihan)

**Note:** This dataset is useful for validation and for Sino-Korean data.

### sinopy

**Source:** lingpy/sinopy library.

**Digital Data:**
- Python library with `baxter2ipa()` function
- Converts Baxter's MC transcription to plain IPA

**Availability:** GitHub (lingpy/sinopy)

**Note:** This library is useful for converting between transcription systems.

---

## Implementation Strategy

### Phase 1: MVP

**Systems with derivation scripts (use directly):**
- Baxter 1992 — `TshetUinhExamples.baxter({ 版本: "1992" })`
- Pan 2000 — `TshetUinhExamples.panwuyun({})`
- unt — `TshetUinhExamples.unt({})`
- msoeg — `TshetUinhExamples.msoeg_v8({})`

**Systems without derivation scripts (options):**
- Zhengzhang 2002 — Use Pan Wuyun instead (related systems)
- Baxter-Sagart 2014 — Use Baxter 1992 instead (same author, different period)
- Wang Li 1957 — Use if available, otherwise defer
- Pulleyblank 1991 — Use if available, otherwise defer

### Phase 2: Future Enhancements

- Create custom derivation scripts for Zhengzhang 2002 and Baxter-Sagart 2014
- Add more reconstruction systems
- Support custom reconstruction scripts
- Integrate with PHONO-ML for validation
- Add export to various formats (BibTeX, CSV, etc.)

---

## Validation

The data should be validated against:

1. **tshet-uinh data** for phonological position mapping
2. **Published references** for IPA accuracy
3. **PHONO-ML** for cross-validation
4. **User feedback** for real-world accuracy

---

## Open Questions

1. **Default systems:** Should we change the default systems from [Baxter, Pan, Zhengzhang, Baxter-Sagart] to [Baxter, Pan, unt, msoeg] (systems with derivation scripts)?
2. **Zhengzhang 2002:** Should we use Pan Wuyun instead (related system) or create a custom derivation script?
3. **Baxter-Sagart 2014:** Should we use Baxter 1992 instead (same author) or create a custom derivation script?
4. **Custom systems:** How should custom reconstruction systems be supported?
5. **Version control:** How should different versions of the same system be handled (e.g., Baxter 1992 vs 2014)?

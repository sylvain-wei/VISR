# CMU Serif webfonts

These four unmodified WOFF2 files are self-hosted for the VISR project page.
They reproduce the CMU Serif family used by the layout reference,
[LE-WM](https://le-wm.github.io/), without depending on a third-party font server
at page-load time.

## Source and version

- Distribution: [`computer-modern@0.1.3`](https://www.npmjs.com/package/computer-modern/v/0.1.3)
- Package repository: <https://github.com/stevenpetryk/computer-modern>
- Original font project: <https://cm-unicode.sourceforge.io/>
- Download base: <https://cdn.jsdelivr.net/npm/computer-modern@0.1.3/fonts/>
- Retrieved: 2026-09-29
- Reference stylesheet: <https://cdn.jsdelivr.net/npm/computer-modern@0.1.3/cmu-serif.css>
- Package inventory: <https://data.jsdelivr.com/v1/package/npm/computer-modern@0.1.3>

| Included file | Face | SHA-256 |
|---|---|---|
| `cmu-serif-500-roman.woff2` | Regular roman | `1b875e541dc5c517cd11d244710d8639addbe91a0bb1ba55e7c4593225c7a970` |
| `cmu-serif-500-italic.woff2` | Regular italic | `dff13cb212b960c65ba36d0085863a2f2fb056aae7f859e37f07abeb82a71c25` |
| `cmu-serif-700-roman.woff2` | Bold roman | `70dc820db642a0a46d3b26d7aff39bb9a86aa450bc8ee528553e0b3e5a627c0a` |
| `cmu-serif-700-italic.woff2` | Bold italic | `a14ce7798a46d40e1639cfa98c593a089ac6cd813b5185e09a141bd1b19b0872` |

All four SHA-256 digests were checked against the versioned jsDelivr package
inventory. The font files were not subsetted, regenerated, or otherwise edited.

## License boundary

The font software is distributed under **SIL Open Font License 1.1**.
The upstream copyright notices, Reserved Font Family Name, and full license
are preserved verbatim in [`OFL.txt`](OFL.txt). These files remain under that
license and are not relicensed under the repository's Apache License 2.0.

The npm package declares **MIT** in its original [`package.json`](package.json),
which is retained here as provenance. The package's README explicitly assigns
the font files to the SIL Open Font License. Neither the published package nor
the checked upstream root includes a separate MIT license-text file; no MIT
copyright notice has been invented. Only the font binaries, the original OFL
notice, and package metadata are redistributed here; the package's build code
and stylesheet are not vendored.

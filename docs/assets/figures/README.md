# Scientific figure sources

The project-page figures come from the author-provided **VISR technical report**, corresponding to *Verifier-Induced Support Reshaping in On-Policy Optimization*, arXiv:2608.00220. They retain the paper’s [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

Each paper PDF is copied unchanged. Matching SVG files preserve the source vector geometry with glyphs outlined using PyMuPDF. Outlined text remains sharp at any scale but is not editable as text; the matching PDF is supplied for each figure. Plots are not screenshot reconstructions, and no generative model was used.

| Website files | Report figure source |
|---|---|
| `fig1-overview.svg` / `.pdf` | `fig1_intro.pdf` |
| `fig2-if-polarization.svg` / `.pdf` | `fig_4_1_support_shift_aaai_singlecol_times.pdf` |
| `fig3-math-searchability.svg` / `.pdf` | `fig_4_1_2_opening_routes_aaai_singlecol.pdf` |
| `fig4-sequential-training.svg` / `.pdf` | `fig_4_4_if2math_compact_v3_times.pdf` |
| `fig5-reference-kl.svg` / `.pdf` | `fig_4_5_kl_coef_mean32_aaai_1x3_independent_y_preview_times.pdf` |
| `fig6-opening-divergence.svg` / `.pdf` | `fig_5_1_js_position_lollipop_singlecol.pdf` |
| `fig7-first-token-probabilities.svg` / `.pdf` | `fig_5_3_first_token_probability_heatmaps_singlecol.pdf` |
| `fig8-opening-intervention-a.svg` / `.pdf` | `fig_5_4_six_intervention_dotlines.pdf` |
| `fig8-opening-intervention-b.svg` / `.pdf` | `fig_5_4_position_sweep.pdf` |
| `fig9-dri-prior.svg` / `.pdf` | `fig_6_1_cold_start_aaai_singlecol_stacked.pdf` |
| `fig10-converged-teacher.svg` / `.pdf` | `fig_6_2_opd_aaai_singlecol.pdf` |
| `fig11-teacher-state.svg` / `.pdf` | `fig_6_3_teacher_selection_scan.pdf` |

`joint-support.svg` and `joint-support.pdf` are a new visualization of the six rows in the report’s Table 3 (MathIF and ReasonIF), not a new experiment. `joint-support-data.json` preserves the reported C/F/J values and their source. The chart multiplies each reported probability by 100 to display percentages without adding precision or deriving deltas. All source-table values are retained.

The report version preserves the approved `%` notation for absolute performance changes. `../VISR-technical-report.pdf` supplies the surrounding definitions, protocols, and evidence boundaries. General figure-generation code and raw research logs remain outside this curated documentation release.

The social preview `../og-card.png` is retained from the earlier page and depicts the same paper overview and title.

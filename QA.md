# Verification record

Date: October 21, 2026.

## Automated

- All 45 daily facts carry a verified episode URL, independent historical URL, and verification date.
- Same UTC day produces the same entry; next UTC day advances exactly one entry.
- All 45 entries appear before repetition.
- Dates preceding the rotation epoch use a valid positive array index.
- UTC midnight, timezone offsets, February 29, and December 31 pass boundary checks.
- Invalid dates are rejected.
- Static build contains every local HTML/CSS asset and module dependency; source notebook includes each fact.

## Browser

Browser: Codex in-app browser. Mobile checks used viewport simulation, not physical devices.

| Viewport width | Page overflow | Result |
| --- | --- | --- |
| 320 px | None | Pass |
| 390 px | None | Pass |
| 768 px | None | Pass |
| 1280 px | None | Pass |

- Desktop and mobile full-page screenshots were visually inspected.
- All four displayed images loaded successfully.
- All same-page anchor targets exist.
- Mobile menu opens, closes after choosing a section, and closes with Escape.
- Field notebook disclosure expands and exposes the research-page link.
- Sources page shows the full collection and fits the mobile viewport.
- No JavaScript warning/error messages were reported during these checks.
- The built site was also checked under `/dist/` to verify project-subpath compatibility.

## Limits

No physical-device testing, Safari/Firefox run, or formal accessibility certification was performed. Historical content was checked against the cited sources; linked subscriber-only episodes were verified through public catalog listings. Artwork is credited, without a claim of licensing or endorsement.

## Live deployment

GitHub Pages deployment run [39642640137](https://github.com/HallucinatedIt/jack-mandaville-concept/actions/runs/39642640137) completed successfully. GitHub ran all five tests, built the static site, and deployed it. The [public site](https://hallucinatedit.github.io/jack-mandaville-concept/) was inspected after deployment: artwork loaded, the date-driven fact rendered, and desktop layout had no horizontal overflow.

## Visual revision — October 21, 2026

- Replaced the framed portrait with a full-width artwork masthead and overlaid navigation; mobile uses a separate crop with text beneath the portrait.
- Removed decorative arrows, plus signs, and unrelated section/show numbering. Daily fact numbering remains an actual position within the curated rotation.
- Replaced underlined watch links with platform-labelled buttons.
- Added a seamless looping text bar, a pause/resume control, hover/focus pause, and a static wrapped layout for reduced-motion preferences.
- Verified mobile navigation and scrolling-text pause/resume in the browser.

## Expanded daily collection — October 21, 2026

45 distinct entries across 13 verified episode topics. Added material covers moa, Gurkhas, Pictish Scotland, the 82nd Airborne, the Crusades, Stand Watie, the 1st Marine Division, toilet history, and Mary Walker. Episode titles and links were read from the public Pepperbox catalog. Historical sources are linked per entry. No subscriber-only viewing is claimed. Topic scope is the inclusion criterion; a fact is not represented as a statement made in a video.

The source notebook is generated from the same collection used by the daily card. Tests verify its completeness, unique entries, changing subjects across the cycle boundary, full-cycle rotation, UTC boundaries, and removal of collection-size wording from public copy. No annual uniqueness guarantee is made.

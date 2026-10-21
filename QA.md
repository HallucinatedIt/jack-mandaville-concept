# Verification record

Date: October 21, 2026.

## Automated

- All eight daily facts carry a verified episode URL, independent historical URL, and verification date.
- Same UTC day produces the same entry; next UTC day advances exactly one entry.
- All eight entries appear before repetition.
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
- Sources page shows eight complete entries and fits the mobile viewport.
- No JavaScript warning/error messages were reported during these checks.
- The built site was also checked under `/dist/` to verify project-subpath compatibility.

## Limits

No physical-device testing, Safari/Firefox run, or formal accessibility certification was performed. Historical content was checked against the cited sources; linked subscriber-only episodes were verified through public catalog listings. Artwork is credited, without a claim of licensing or endorsement.

## Live deployment

GitHub Pages deployment run [39642640137](https://github.com/HallucinatedIt/jack-mandaville-concept/actions/runs/39642640137) completed successfully. GitHub ran all five tests, built the static site, and deployed it. The [public site](https://hallucinatedit.github.io/jack-mandaville-concept/) was inspected after deployment: artwork loaded, the date-driven fact rendered, and desktop layout had no horizontal overflow.

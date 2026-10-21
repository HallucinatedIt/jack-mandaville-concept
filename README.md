# Jack Mandaville — independent website concept

A responsive, static website for Jack Mandaville’s history, comedy, and shows. Includes Jacked History, Palates of the Past, Battle in Najaf, social links, and 45 independently sourced daily history notes. The site clearly identifies itself as an unaffiliated mockup.

[Open the live website](https://hallucinatedit.github.io/jack-mandaville-concept/) · [Source repository](https://github.com/HallucinatedIt/jack-mandaville-concept)

## Preview locally

From this folder, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173 in your browser. Stop the server with Ctrl+C when finished. Use an HTTP server: double-clicking `index.html` uses `file://`, where browsers restrict JavaScript modules. The page still has a fixed history entry and working external links without JavaScript.

## Publish on GitHub Pages

### Publish a separate copy — website files only

1. Unzip the accompanying `jack-mandaville-site.zip`.
2. Sign in to GitHub and create a public repository with an unused name of your choice.
3. Upload the **contents** of the unzipped folder to the repository’s root. `index.html`, `styles.css`, `sources.html`, `app.mjs`, `facts.mjs`, and the `assets` folder must sit directly in the root. Do not upload the ZIP itself or nest everything under another folder.
4. Commit the files to `main`.
5. Open **Settings → Pages → Build and deployment → Source → Deploy from a branch**. Select **main** and **/(root)**, then Save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in Settings → Pages.

The deployed original is at `https://hallucinatedit.github.io/jack-mandaville-concept/`. A separate copy will use your selected account and repository name.

### Source repository route — automated checks and deployment

The full source package includes `.github/workflows/pages.yml`, tests, and a static build script. No npm dependencies or install step are required. Node 22 or newer is recommended.

The delivered local repository already tracks the remote `main` branch. To publish updates after editing:

```sh
npm test
npm run build
git add .
git commit -m "Describe the website update"
git push
```

For a fresh checkout:

```sh
git clone https://github.com/HallucinatedIt/jack-mandaville-concept.git
cd jack-mandaville-concept
```

Pages is already set to **GitHub Actions**. Future pushes to `main` run checks, build `dist/`, and deploy. Git authentication is required for pushing; no credentials are stored in this project. The separate source ZIP has no Git history, so clone the repository for continued development rather than initializing a competing history.

Official references: [publishing source settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Daily fact behavior

- `facts.mjs` contains 45 immutable, reviewed entries across 13 verified episode topics.
- Each entry includes a direct episode link and a separate historical source.
- Rotation uses the UTC calendar date. October 21, 2026 starts with entry 01; each subsequent UTC day advances one entry. The list repeats every 45 days.
- All visitors see the same entry for the same UTC day. The card refreshes at midnight while open and rechecks when a backgrounded page becomes visible.
- No API, scheduled job, server database, or daily deployment is needed. The site uses the visitor’s device clock.
- These are sourced facts about topics covered in Jack’s videos, not claimed transcripts, quotations, or “on this day” anniversaries.
- Add entries only after verifying the historical claim and an actual published episode covering its topic. Run `node generate-sources.mjs` and update the collection-size test whenever the collection changes. Appending entries changes the modulo rotation for future dates.

## Files

- `index.html`: page content and no-JavaScript fallback.
- `styles.css`: responsive design, locally served type, focus and reduced-motion behavior.
- `app.mjs`: mobile navigation, daily display, and midnight/visibility refresh.
- `facts.mjs`: fact data and pure date functions.
- `sources.html`: public research notebook, all fact citations, biography sources, artwork credits.
- `assets/`: official show artwork, favicon, self-hosted fonts and font licenses.
- `tests/facts.test.mjs`: date rotation and source-integrity checks.
- `build.mjs`: copies only public files into `dist/`; does not publish tests or repository files.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.

All asset paths are relative, so both a project URL (`/jack-mandaville-concept/`) and a root domain work without code changes.

## Checks

```sh
npm test
npm run build
```

Browser QA: desktop and mobile previews inspected at 1280 and 390 pixels; overflow checks also performed at 320 and 768 pixels. Images load, anchor navigation works, the mobile menu opens/closes (including Escape), and the source notebook expands and links correctly. The browser reported no JavaScript errors. Date tests cover UTC midnight, time-zone offsets, a complete cycle, pre-epoch dates, leap day, and year rollover. See `QA.md` for the delivered verification record.

## Editorial scope and credits

Research was performed October 21, 2026 using public Instagram/YouTube profiles, Pepperbox show catalogs, the publisher’s Black Rifle Coffee Podcast description, and historical institutions. The linked notebook distinguishes verified facts from original promotional copy. Subscriber-only video contents were not used or claimed to have been watched.

The project has no analytics, contact forms, invented contact details, fake testimonials, or embedded third-party players. Show links open their original platforms; Pepperbox exclusives may require a subscription.

Artwork belongs to its respective rights holders and is included for the requested independent mockup, with source credits. No artwork license or endorsement is claimed. Replace it with approved press assets before an official launch. The two bundled fonts include SIL Open Font License files.

## Publishing status

Published successfully on October 21, 2026:

- [Live website](https://hallucinatedit.github.io/jack-mandaville-concept/)
- [Repository](https://github.com/HallucinatedIt/jack-mandaville-concept)
- [Successful deployment run](https://github.com/HallucinatedIt/jack-mandaville-concept/actions/runs/39642640137)

GitHub’s tests, static build, artifact upload, and deployment all passed. The public site was opened in the browser and checked for loaded artwork, responsive layout, and the working daily fact. A local snapshot branch preserves the initial build before the GitHub history was synchronized.

## Field-note collection update

The current collection has 45 distinct facts across 13 verified episode topics. Topics are interleaved, with no adjacent repeat topic, and the UTC date selects the entry deterministically. The public interface intentionally shows no collection size or cycle counter. This is a repeating collection; it does not promise a full year of unique entries.

Edit `facts.mjs`, then run `node generate-sources.mjs` to regenerate the public source notebook. `npm run build` also regenerates it before packaging. Run `npm test` after updating the collection. Each entry needs a unique ID and title, a topic key, an episode title/link verified in the public catalog, an independent historical citation, and a verification date.

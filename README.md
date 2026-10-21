# Jack Mandaville — independent website concept

A responsive, static website for Jack Mandaville’s history, comedy, and shows. Includes Jacked History, Palates of the Past, Battle in Najaf, social links, and eight independently sourced daily history notes. The site clearly identifies itself as an unaffiliated mockup.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173 in your browser. Stop the server with Ctrl+C when finished. Use an HTTP server: double-clicking `index.html` uses `file://`, where browsers restrict JavaScript modules. The page still has a fixed history entry and working external links without JavaScript.

## Publish on GitHub Pages

### Simplest route — website files only

1. Unzip the accompanying `jack-mandaville-site.zip`.
2. Sign in to GitHub and create a public repository named `jack-mandaville-concept` (or another name you prefer).
3. Upload the **contents** of the unzipped folder to the repository’s root. `index.html`, `styles.css`, `sources.html`, `app.mjs`, `facts.mjs`, and the `assets` folder must sit directly in the root. Do not upload the ZIP itself or nest everything under another folder.
4. Commit the files to `main`.
5. Open **Settings → Pages → Build and deployment → Source → Deploy from a branch**. Select **main** and **/(root)**, then Save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in Settings → Pages.

For the connected account and suggested repository name, the expected address is `https://hallucinatedit.github.io/jack-mandaville-concept/`. The deployment status is recorded at the end of this document.

### Source repository route — automated checks and deployment

The full source package includes `.github/workflows/pages.yml`, tests, and a static build script. No npm dependencies or install step are required. Node 22 or newer is recommended.

Create an empty repository, then from this project folder run:

```sh
# The delivered folder is already a local Git repository.
# If using the source ZIP instead, initialize it first:
# git init -b main
# git add .
# git commit -m "Build Jack Mandaville concept website"

git remote add origin https://github.com/HallucinatedIt/jack-mandaville-concept.git
git push -u origin main
```

Under **Settings → Pages → Source**, select **GitHub Actions**. Then open **Actions → Deploy GitHub Pages → Run workflow**. The workflow checks the daily rotation, builds `dist/`, and deploys it. Future pushes to `main` repeat the process. Git authentication is required; this project contains no credentials.

Official references: [publishing source settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Daily fact behavior

- `facts.mjs` contains eight immutable, reviewed entries across four verified episode topics.
- Each entry includes a direct episode link and a separate historical source.
- Rotation uses the UTC calendar date. October 21, 2026 starts with entry 01; each subsequent UTC day advances one entry. The list repeats every eight days.
- All visitors see the same entry for the same UTC day. The card refreshes at midnight while open and rechecks when a backgrounded page becomes visible.
- No API, scheduled job, server database, or daily deployment is needed. The site uses the visitor’s device clock.
- These are sourced facts about topics covered in Jack’s videos, not claimed transcripts, quotations, or “on this day” anniversaries.
- Add entries only after verifying the historical claim and an actual published episode covering its topic. Update `sources.html` and the entry-count labels/tests whenever the collection changes. Appending entries changes the modulo rotation for future dates.

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

The dedicated public repository is [HallucinatedIt/jack-mandaville-concept](https://github.com/HallucinatedIt/jack-mandaville-concept). The site was prepared and verified locally. Initial publication to GitHub Pages is in progress; confirm its result in the repository’s Pages settings and Actions run.

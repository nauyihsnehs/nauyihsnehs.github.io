# Academic homepage

A bilingual, theme-switchable academic homepage built with Vite and plain HTML,
CSS, and JavaScript. Vite renders the complete default-language pages at build
time; the browser script only handles localization and interaction. The current
profile, education, links, publications, resources, and portrait are deliberate
placeholders.

The homepage is served from `/`. Its Related Resources cards open the matching
hash view on `/resources/`, where Datasets, Academic Tools, Reading & Blogs, and
Learning Materials share one secondary-page shell.

## Local preview

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The production build is created with:

```bash
npm run build
```

## Replace the draft content

`src/content.js` is the single editing entry point for profile information,
bilingual copy, links, SEO metadata, display defaults, homepage section order,
and the resource-page views. Each translated field has an `en` and `zh` value.
Section order follows the `sections` array; set a section or item `enabled`
value to `false` to hide it.

1. Edit the site, profile, and section records in `src/content.js`.
2. Store custom media below `public/content/` and reference it with a path
   relative to `public/`, such as `content/profile/portrait.svg`.
3. Set publication and project links, author URLs, logos, and teaser media. A
   teaser motion source accepts an image (`gif`, animated `webp`, or `svg`) or a
   muted `mp4`/`webm` video.
4. Add real URLs to contact and resource records. Empty URLs remain visible as
   draft slots but are not clickable.
5. Keep the IDs and order in the homepage `resources` section aligned with
   `resourcePage.views`; these IDs become the `/resources/#category` links.
6. Run `npm run content:check` before previewing or publishing. It validates the
   bilingual structure, IDs, dates, links, supported display values, and every
   referenced media file.

The initial experience is English with the white theme. Appearance defaults to `Auto`, which follows the visitor's system light or dark setting. Manual language, theme, and appearance selections are stored in the browser independently.

## Automated commit and deployment runbook

This runbook is specific to this repository. Codex or any other automation must
follow it when asked to commit, push, publish, or update the live homepage.

### Fixed project targets

| Item | Required value |
| --- | --- |
| Repository | `https://github.com/nauyihsnehs/nauyihsnehs.github.io.git` |
| GitHub repository | `nauyihsnehs/nauyihsnehs.github.io` |
| Source branch | `main` |
| Pages deployment source | GitHub Actions artifact |
| Pages environment | `github-pages` |
| Production URL | `https://nauyihsnehs.github.io/` |
| Pages workflow | `.github/workflows/pages.yml` |
| Node.js in CI | `22` |
| Package manager | `npm` with `package-lock.json` |
| Static check | `npm run check` |
| Production build | `npm run build` |
| Generated artifact | `dist/` |

The `main` branch stores the source project, not the generated site. `dist/`,
`node_modules/`, `.DS_Store`, credentials, and operating-system metadata such as
`*:Zone.Identifier` must never be added to a new commit.

### One-time repository configuration

Open
[`Settings → Pages`](https://github.com/nauyihsnehs/nauyihsnehs.github.io/settings/pages)
and set **Build and deployment → Source** to **GitHub Actions**. Deployment from
the root of `main` is not the supported production configuration because this
is a Vite project. Keep Actions enabled for the repository.

The generated Vite artifact is the only supported site. Opening the repository's
source `index.html` directly is not a deployment or preview path.

### Files that an update may intentionally change

- `src/content.js`: profile, bilingual copy, education, links, publications,
  projects, SEO, display defaults, section order, and asset references.
- `src/render.js`: build-time HTML rendering and the compact translation payload.
- `src/app.js`: client-side localization and interaction behavior.
- `src/styles.css`: layout, themes, responsive behavior, and visual states.
- `index.html` and `resources/index.html`: document metadata, application mount
  points, and source entry links.
- `public/`: portraits, logos, QR images, icons, and publication media.
- `scripts/check-content.js`: the content contract and static validation rules.
- `package.json` and `package-lock.json`: dependencies and scripts; update them
  together.
- `vite.config.js`, `eslint.config.js`, and `.github/workflows/pages.yml`: build,
  static-analysis, and deployment configuration.
- `README.md` and `.gitignore`: repository documentation and exclusions.

Any changed path outside this list requires explicit confirmation. Existing
unrelated work must be preserved and left unstaged.

### Exact automated procedure

#### 1. Confirm repository identity and a clean understanding of scope

Run these read-only commands from the repository root:

```bash
git remote get-url origin
git branch --show-current
git status -sb
git diff --name-status
git diff --check
```

Continue only when:

- `origin` is exactly
  `https://github.com/nauyihsnehs/nauyihsnehs.github.io.git`;
- the branch is `main`, unless the user explicitly requested another branch;
- every changed file belongs to the requested homepage update;
- `git diff --check` succeeds.

If the working tree contains unrelated changes, do not use `git add -A` and do
not ask Git to infer the intended scope.

#### 2. Perform the project checks

The project policy is static analysis only. When the local dependencies are
available, run the complete check:

```bash
npm run check
```

It runs ESLint and content validation. ESLint parses every JavaScript module, so
separate syntax-only checks are unnecessary in the normal workflow.
The minimum dependency-free checks for a documentation-only or constrained
environment are:

```bash
git diff --check
node scripts/check-content.js
node --check src/app.js
node --check src/content.js
node --check src/render.js
node --check scripts/check-content.js
node --check vite.config.js
```

Only run checks relevant to changed files. Do not install dependencies unless
the user has authorized installation. Never continue to a commit after a failed
check.

#### 3. Stage explicit paths and review the staged payload

List every intended path in `git add`. For example, a content and style update
must be staged as:

```bash
git add src/content.js src/styles.css
git diff --cached --check
git diff --cached --name-status
git diff --cached --stat
git diff --cached
```

Before committing, verify that the staged diff contains no secrets, generated
files, unrelated user changes, placeholder data unintentionally exposed as real
profile data, or Windows metadata files.

#### 4. Create one focused commit

Use a short imperative message that describes the actual homepage change:

```bash
git commit -m "Update academic profile content"
git log -1 --oneline
git status -sb
```

Examples used by this repository include `Fix direct GitHub Pages deployment`
and `Document homepage deployment workflow`. Do not create an empty commit and
do not combine independent changes merely to reduce the commit count.

#### 5. Require a fast-forward update before pushing

Refresh the exact target branch after the local commit:

```bash
git fetch origin main
git merge-base --is-ancestor origin/main HEAD
git rev-parse HEAD
git push origin HEAD:main
```

`git merge-base --is-ancestor` must exit successfully. If it does not, or if
GitHub rejects the push, stop. Inspect the remote commits and reconcile them
explicitly before trying again. Routine homepage publication must never use
`--force` or `--force-with-lease`.

Record the full local commit SHA before pushing. That SHA is the identifier used
for all deployment verification.

#### 6. Let the repository workflow build and deploy

A push to `main` triggers
[`pages.yml`](https://github.com/nauyihsnehs/nauyihsnehs.github.io/actions/workflows/pages.yml),
which performs this exact sequence:

```text
actions/checkout@v6
→ actions/setup-node@v6 with Node.js 22 and npm cache
→ npm ci
→ npm run check
→ npm run build
→ actions/configure-pages@v5
→ actions/upload-pages-artifact@v4 with path dist
→ actions/deploy-pages@v4
```

`npm run build` creates `dist/` only inside the workflow runner. The artifact is
uploaded directly to Pages; the automation must not commit `dist/` back to
`main` and must not create a second deployment commit.

#### 7. Verify the remote commit and deployment

The update is complete only when all checks below pass:

1. The expected full SHA is the head of remote `main`:

   ```bash
   git fetch origin main
   git rev-parse HEAD
   git rev-parse origin/main
   ```

   Both commands must print the same SHA.

2. The **Deploy to GitHub Pages** run for that exact SHA is visible in
   [GitHub Actions](https://github.com/nauyihsnehs/nauyihsnehs.github.io/actions)
   and both `build` and `deploy` jobs have succeeded.

3. The production endpoint responds successfully:

   ```bash
   curl -I https://nauyihsnehs.github.io/
   ```

   Expect HTTP 200 and a `Last-Modified` value no older than the deployment.

4. Open `https://nauyihsnehs.github.io/` in a browser and confirm that the full
   profile renders, the stylesheet is applied, language and theme controls work,
   and the pre-rendered profile is visible before interaction code runs.

5. Finish with a synchronized, clean local checkout:

   ```bash
   git status -sb
   ```

   It must show `main` tracking `origin/main` with no uncommitted files.

GitHub Pages and its CDN may cache content for up to several minutes. When the
workflow and SHA are correct but a browser still shows an older page, wait and
perform a hard refresh before changing or republishing the code.

### Project-specific failure diagnosis

If the page is empty or unstyled, check these causes in order:

1. **Pages source is wrong.** Confirm that repository Pages uses GitHub Actions,
   not the root of `main`.
2. **The workflow failed.** Open the workflow run for the deployed SHA and find
   the first failed step among `npm ci`, `npm run check`, `npm run build`, upload,
   or deploy.
3. **The build renderer failed.** Run `npm run build`; `dist/index.html` must
   contain the profile, sections, translation payload, and generated asset links.
4. **The interaction module failed to load.** The page remains readable, but
   language, theme, and media controls stop working. Inspect Console and Network
   for the generated JavaScript asset and MIME-type or 404 errors.
5. **An asset path is wrong.** Content stores paths relative to `public/`; Vite
   copies them to the artifact root. Run `npm run content:check` to find missing
   files.

### Required completion report

After an automated publication, report all of the following instead of saying
only “push succeeded”:

- files included in the commit;
- static checks run and their results;
- branch, full commit SHA, and commit message;
- remote update range and confirmation that it was fast-forward only;
- Pages workflow URL and final `build`/`deploy` status;
- production URL and HTTP result;
- final local tracking and working-tree status;
- any remaining cache delay, manual setting, or user action.

This project intentionally has no runtime API, database, analytics, or external publication sync.

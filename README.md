# Academic homepage

A bilingual, theme-switchable academic homepage built with Vite and plain HTML, CSS, and JavaScript. The current profile, education, links, publications, and portrait are deliberate placeholders.

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

1. Edit `src/content.js`. Each translated field has an `en` and `zh` value.
2. Replace the two portrait files referenced by `profile.portrait.primary` and `profile.portrait.alternate`.
3. Add each education logo through `education[].logo` and, optionally, link the institution with `institutionUrl`.
4. Set each publication's `titleUrl`, author `href` values, and teaser poster. The optional teaser motion source accepts an image (`gif`, animated `webp`, or `svg`) or a muted `mp4`/`webm` video.
5. Add real URLs to personal and publication links. Empty URLs remain visible as draft slots but are not clickable.
6. Replace the title and description values before publishing.

The initial experience is English with the white theme. Appearance defaults to `Auto`, which follows the visitor's system light or dark setting. Manual language, theme, and appearance selections are stored in the browser independently.

## Publish on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The included workflow builds and deploys the site after every push to `main`.

The Vite base path is relative, so the generated site works both at `username.github.io` and `username.github.io/repository/`.

## Static checks

```bash
npm run check
```

This project intentionally has no runtime API, database, analytics, or external publication sync.

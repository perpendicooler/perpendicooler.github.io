# Md Arif Hossain — Research & Analytics Portfolio

An academic portfolio for **Md Arif Hossain**, a Mathematics graduate of Shahjalal University of Science and Technology (SUST) and Business Intelligence Analyst at INDESORE Group, Bangladesh.

**Website:** https://perpendicooler.github.io/

The site covers operations research, mathematical optimization, computational combinatorics, facility location and routing, manufacturing systems analytics, and technical writing.

## What is included

- Responsive homepage with original mathematical network illustration and clear research introduction
- About page with verified education, experience, thesis, talks, and achievements
- Research page that accurately distinguishes talks from a submitted manuscript
- Four project case-study pages and a project index
- Five mathematical/industrial analytics essays (group theory, Tic-Tac-Toe, minimax, symmetry, and manufacturing)
- Contact page with links extracted from the attached CV
- Downloadable CV at `public/Md_Arif_Hossain_CV.pdf`
- Automatically deployed GitHub Pages workflow

## Technology

Astro 7, Tailwind CSS 4, KaTeX, Shiki, and GitHub Actions. Mathematical blog notation uses remark-math and rehype-katex.

## Get started

Requires **Node.js >= 22.22.0** and npm.

```bash
npm ci
npm run dev
```

Visit http://localhost:4321, then build with `npm run build` and preview with `npm run preview`. Production files are generated in `dist/`.

## Content map

| Purpose | Location |
|---|---|
| Homepage | `src/pages/index.astro` |
| About / research / projects / contact | `src/pages/*.astro` |
| Project data and details | `src/data/projects.ts`, `src/pages/projects/[slug].astro` |
| Blog articles | `src/content/blog/*.md` |
| Blog diagrams | `public/images/blog/` |
| CV PDF | `public/Md_Arif_Hossain_CV.pdf` |
| Branding and navigation | `src/components/Header.astro`, `src/components/Footer.astro` |
| Colors, typography, layouts | `src/styles/global.css` |
| Domain and Markdown settings | `astro.config.mjs` |

The supplied Rubik's Cube article displays `public/images/blog/Rubiks_Cube.svg`. You may upload your own image as `public/images/blog/Rubiks_Cube.png` and update the article's image reference to `.png`.

## Publication and privacy note

Descriptions of manufacturing projects are generalized to avoid including internal datasets or confidential process records. The 2026 manuscript is explicitly marked as **submitted**, not accepted or published. Contributions are drawn from the supplied CV, not from the previous template owner's profile.

## Deployment

Push to `main`. The workflow `.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages. Under **Settings → Pages**, select **GitHub Actions** as the source. If using the username repository `perpendicooler.github.io`, the root site URL is https://perpendicooler.github.io/.

## License

The template and dependencies remain under their respective licenses. Original writing and personal material belong to their respective authors; no additional license is granted here.

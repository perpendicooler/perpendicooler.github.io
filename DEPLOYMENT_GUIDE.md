# Publish the completed Md Arif Hossain portfolio

## What this ZIP is

A **full replacement Astro source project**, not just a README or a visual mockup. It includes the updated pages, project case studies, five long-form blog posts, original SVG diagrams, and the PDF CV supplied with this request.

Website address after publishing: **https://perpendicooler.github.io/**

## Recommended: replace the code in your existing GitHub repository

1. Download and extract `Md_Arif_Hossain_Complete_Portfolio_Astro.zip` on your computer. The extracted folder is `perpendicooler.github.io`.
2. On your computer, use **Git** or **GitHub Desktop** to clone `https://github.com/perpendicooler/perpendicooler.github.io.git`.
3. Create a backup of the cloned site if desired. It is important to remove the old template-owner files, not just overwrite matching filenames.
4. With a fresh, clean clone, run `git rm -r .` **from inside the cloned repository directory**. This removes tracked site files while keeping `.git` and the Git history. Confirm you are in the correct clone first.
5. Copy the **contents** of the extracted ZIP's `perpendicooler.github.io` folder into the clone's root, preserving `.github`, `src`, and `public` directories. Do not create an extra nested portfolio directory in the repository.
6. Run:

```bash
git add -A
git commit -m "Personalize academic research portfolio for Md Arif Hossain"
git push origin main
```

7. Under **Repository → Settings → Pages**, select **GitHub Actions** as the build and deployment source (if it is not selected already).
8. Check **Actions → Deploy portfolio to GitHub Pages**. Open the deployment log for any errors.
9. Open https://perpendicooler.github.io/ and check Home, About, Research, Projects, Writing, Contact, the individual project case studies, and the downloadable CV.

## Local development

The source requires Node.js **22.22.0 or newer** and npm.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Astro writes the built static site to `dist/`. The included `.github/workflows/deploy.yml` runs `npm ci` and `npm run build` on GitHub Actions and deploys `dist/` to GitHub Pages.

## Where to change specific content

- `src/pages/index.astro` — introduction, hero, evidence figures, and skill summary
- `src/pages/about.astro` — education, work, thesis, speedcubing
- `src/pages/research.astro` — research interests and presentations
- `src/data/projects.ts` — project names, tools, case studies, links
- `src/pages/projects/[slug].astro` — common project detail page template
- `src/pages/contact.astro` — links and contact details
- `src/content/blog/*.md` — complete academic articles, each over 2,000 words
- `public/images/blog/` — diagrams used by the articles
- `public/Md_Arif_Hossain_CV.pdf` — attached CV as a public PDF
- `src/styles/global.css` — overall colors, typography, mobile styling
- `src/components/Header.astro`, `src/components/Footer.astro` — site navigation and branding
- `astro.config.mjs` — domain and Markdown math rendering

## Uploading your own Rubik's Cube picture

Your cube blog uses an included native illustration:

`public/images/blog/Rubiks_Cube.svg`

To replace it with a photo, upload your own file named `Rubiks_Cube.png` to **`public/images/blog/`**, then edit the first image in `src/content/blog/rubiks-cube-group-theory-combinatorics.md` from:

```md
![A Rubik's Cube illustrating a finite permutation puzzle](/images/blog/Rubiks_Cube.svg)
```

to:

```md
![A Rubik's Cube illustrating a finite permutation puzzle](/images/blog/Rubiks_Cube.png)
```

The main domain is a **username-level GitHub Pages site**; image links start at `/images/` and should **not** use Jekyll's `/assets/img/` path.

## Academic and confidentiality safeguards

The website uses the supplied CV for its factual claims. The 2026 ICCIT item is described as **submitted**, not accepted or published. The measured industrial efficiency change and estimated revenue opportunity are labeled as CV-based analysis rather than independently validated causal outcomes. Internal factory datasets, personal information about colleagues, and unpublished operating tables are not included.

The portfolio intentionally removes the prior owner's unrelated publications, CV, projects, and social accounts. Verify any new details before publishing, especially conference status, links, and employer-sensitive outcomes.

## Build verification note

File structure, YAML front matter, linked images, package-lock consistency, and absence of stale template identity were checked in the creation environment. **The full Astro production build could not be executed** here because the environment cannot reach npm's registry. GitHub Actions should run that build as soon as you push the source. If a build error appears, use its exact Action log for debugging.

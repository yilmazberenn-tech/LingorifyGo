# Lingorify

Lingorify is a responsive English vocabulary-learning dashboard built with Next.js, React, and TypeScript. Learners can explore A1–B2 levels, work through short vocabulary quizzes, and track their daily goals and weekly progress.

## Requirements

- Node.js 24 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Validate and build

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub

The repository includes a GitHub Actions workflow that runs linting, TypeScript checks, and a production build on pushes and pull requests to `main`.

To publish this project, create an empty repository on GitHub, then connect it and push:

```bash
git add .
git commit -m "Initial project setup"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example URL with your GitHub repository URL. GitHub Actions will run automatically after the push.

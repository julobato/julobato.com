# julobato.com

Live at [julobato.com](https://julobato.com), deployed on Vercel.

## Running it

Needs Node 24 (see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:3000
```

## Checks

```sh
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Playwright, desktop and mobile (uses your installed Chrome)
```

The same checks run on GitHub Actions on every push.

## Deploying

Pushing to `master` deploys to Vercel.

## Where things live

- `app/`: pages, including `blog/` posts and `notes/` case studies
- `components/`: shared pieces like the top bar and the post layout
- `lib/i18n.ts`: every text on the site, in English and Portuguese
- `lib/posts.ts`: the list of posts shown on the home page and in the sitemap
- `tests/`: Playwright tests

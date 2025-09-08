# Showcase your Open Source Contributions 🤍

Create a website with an RSS feed of your recent GitHub pull requests across the Open Source projects you contribute to.

![atinux-pull-requests](https://github.com/user-attachments/assets/cfa82cc2-51af-4fd4-9012-1f8517dd370f)

Demo: https://prs.atinux.com

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fatinux%2Fmy-pull-requests)

## Features

- List the 50 most recent pull requests you've contributed to.
- RSS feed
- Only add your GitHub token to get started

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in your GitHub token:

```bash
cp .env.example .env
```

Create a GitHub token with no special scope on [GitHub](https://github.com/settings/personal-access-tokens/new) and set it in the `.env` file:

```bash
NUXT_GITHUB_TOKEN=your-github-token
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Credits

This project is inspired by [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me) project.

## License

[MIT](./LICENSE)

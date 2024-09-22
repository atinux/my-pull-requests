# Showcase your Open Source Contributions 🤍

Create a website with an RSS feed of your recent GitHub pull requests across the Open Source projects you contribute to.

![aksharahegde-pull-requests](https://github.com/aksharahegde/user-attachment/blob/main/pr-demo.png?raw=true)

Demo: https://prs.aksharahegde.xyz

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?template=aksharahegde/my-pull-requests)

## Features

- List the 50 most recent pull requests you've contributed to.
- RSS feed
- Only add your GitHub token to get started
- One click deploy on 275+ locations for free

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

## Deploy

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server cache, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).

## Credits

- Forked from [atinux/my-pull-requests](https://github.com/atinux/my-pull-requests)

## License

[MIT](./LICENSE)

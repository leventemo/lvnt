[![Netlify Status](https://api.netlify.com/api/v1/badges/b7a0fd37-c377-48ee-83ca-e601b70f2b09/deploy-status)](https://app.netlify.com/projects/leventemo/deploys)

# AstroPaper 📄

![AstroPaper](public/astropaper-og.jpg)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1356898632249991861)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white&style=for-the-badge)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)

AstroPaper is a minimal, responsive, accessible and SEO-friendly Astro blog theme. This theme is designed and crafted based on [my personal blog](https://satnaing.dev/blog).

Read [the blog posts](https://astro-paper.pages.dev/posts/) or check [the README Documentation Section](#-documentation) for more info.

## 🔥 Features

- [x] type-safe markdown
- [x] super fast performance
- [x] accessible (Keyboard/VoiceOver)
- [x] responsive (mobile ~ desktops)
- [x] SEO-friendly
- [x] light & dark mode
- [x] fuzzy search
- [x] draft posts & pagination
- [x] sitemap & rss feed
- [x] followed best practices
- [x] highly customizable
- [x] dynamic OG image generation for blog posts [#15](https://github.com/satnaing/astro-paper/pull/15) ([Blog Post](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/))

_Note: I've tested screen-reader accessibility of AstroPaper using **VoiceOver** on Mac and **TalkBack** on Android. I couldn't test all other screen-readers out there. However, accessibility enhancements in AstroPaper should be working fine on others as well._

## ✅ Lighthouse Score

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fastro-paper.pages.dev%2F&form_factor=desktop">
    <img width="710" alt="AstroPaper Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## 🚀 Project Structure

Inside of AstroPaper, you'll see the following folders and files:

```bash
/
├── public/
│   ├── assets/
|   ├── pagefind/ # auto-generated when build
│   └── favicon.svg
│   └── astropaper-og.jpg
│   └── favicon.svg
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── icons/
│   │   └── images/
│   ├── components/
│   ├── data/
│   │   └── blog/
│   │       └── some-blog-posts.md
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── constants.ts
│   └── content.config.ts
└── astro.config.ts
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

All blog posts are stored in `src/data/blog` directory.

## 📖 Documentation

Documentation can be read in two formats\_ _markdown_ & _blog post_.

- Configuration - [markdown](src/data/blog/how-to-configure-astropaper-theme.md) | [blog post](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/)
- Add Posts - [markdown](src/data/blog/adding-new-post.md) | [blog post](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)
- Customize Color Schemes - [markdown](src/data/blog/customizing-astropaper-theme-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)
- Predefined Color Schemes - [markdown](src/data/blog/predefined-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/predefined-color-schemes/)

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)
**Styling** - [TailwindCSS](https://tailwindcss.com/)
**UI/UX** - [Figma Design File](https://www.figma.com/community/file/1356898632249991861)
**Static Search** - [FuseJS](https://pagefind.app/)
**Icons** - [Tablers](https://tabler-icons.io/)
**Code Formatting** - [Prettier](https://prettier.io/)
**Deployment** - [Cloudflare Pages](https://pages.cloudflare.com/)
**Illustration in About Page** - [https://freesvgillustration.com](https://freesvgillustration.com/)
**Linting** - [ESLint](https://eslint.org)

## 👨🏻‍💻 Running Locally

You can start using this project locally by running the following command in your desired directory:

```bash
# pnpm
pnpm create astro@latest --template satnaing/astro-paper

# npm
npm create astro@latest -- --template satnaing/astro-paper

# yarn
yarn create astro --template satnaing/astro-paper
```

Then start the project by running the following commands:

```bash
# install dependencies if you haven't done so in the previous step.
pnpm install

# start running the project
pnpm run dev
```

As an alternative approach, if you have Docker installed, you can use Docker to run this project locally. Here's how:

```bash
# Build the Docker image
docker build -t astropaper .

# Run the Docker container
docker run -p 4321:80 astropaper
```

## Google Site Verification (optional)

You can easily add your [Google Site Verification HTML tag](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag) in AstroPaper using an environment variable. This step is optional. If you don't add the following environment variable, the google-site-verification tag won't appear in the HTML `<head>` section.

```bash
# in your environment variable file (.env)
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

> See [this discussion](https://github.com/satnaing/astro-paper/discussions/334#discussioncomment-10139247) for adding AstroPaper to the Google Search Console.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

> **_Note!_** For `Docker` commands we must have it [installed](https://docs.docker.com/engine/install/) in your machine.

| Command                              | Action                                                                                                                           |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                       | Installs dependencies                                                                                                            |
| `pnpm run dev`                       | Starts local dev server at `localhost:4321`                                                                                      |
| `pnpm run build`                     | Build your production site to `./dist/`                                                                                          |
| `pnpm run preview`                   | Preview your build locally, before deploying                                                                                     |
| `pnpm run format:check`              | Check code format with Prettier                                                                                                  |
| `pnpm run format`                    | Format codes with Prettier                                                                                                       |
| `pnpm run sync`                      | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `pnpm run lint`                      | Lint with ESLint                                                                                                                 |
| `docker compose up -d`               | Run AstroPaper on docker, You can access with the same hostname and port informed on `dev` command.                              |
| `docker compose run app npm install` | You can run any command above into the docker container.                                                                         |
| `docker build -t astropaper .`       | Build Docker image for AstroPaper.                                                                                               |
| `docker run -p 4321:80 astropaper`   | Run AstroPaper on Docker. The website will be accessible at `http://localhost:4321`.                                             |

> **_Warning!_** Windows PowerShell users may need to install the [concurrently package](https://www.npmjs.com/package/concurrently) if they want to [run diagnostics](https://docs.astro.build/en/reference/cli-reference/#astro-check) during development (`astro check --watch & astro dev`). For more info, see [this issue](https://github.com/satnaing/astro-paper/issues/113).

## ✨ Feedback & Suggestions

If you have any suggestions/feedback, you can contact me via [my email](mailto:contact@satnaing.dev). Alternatively, feel free to open an issue if you find bugs or want to request new features.

## 📜 License

Licensed under the MIT License, Copyright © 2025

---

Made with 🤍 by [Sat Naing](https://satnaing.dev) 👨🏻‍💻 and [contributors](https://github.com/satnaing/astro-paper/graphs/contributors).

## todo

- [ ] `projects/index.png.ts` necessary to duplicate?
- [ ] `getSortedProjects.ts` necessary to duplicate?

In an Astro project, a folder named `[...slug]` is a special type of route that enables dynamic routing. The `[...slug]` syntax is called a "catch-all" route.

When a folder is named `[...slug]`, Astro will capture any URL segments that match the folder's path and pass them as an array of values to the page component. This allows you to create dynamic routes that can handle multiple URL segments.

For example, if you have a folder structure like this:
```
src/pages/posts/[...slug]/index.astro
```
Astro will match any URL that starts with /posts/ and capture the remaining URL segments as an array of values. The `index.astro` page component will receive these values as a prop called `params.slug`.

You can then use these values to fetch data, render content, or perform other actions in your page component.

In your case, since you most recently edited the file at
src/pages/projects/index.astro, I'm assuming you might be looking to create a dynamic route for projects. If you rename the projects folder to [...slug], you'll be able to capture URL segments and pass them to the index.astro page component as a prop.


You
1:59 pm, Jul 6, 2025
And how about a file called `[...page].astro`?

Windsurf
1:59 pm, Jul 6, 2025
In an Astro project, a file named `[...page].astro` is another example of a catch-all route.

When a file is named `[...page].astro`, Astro will capture any URL segments that match the file's path and pass them as an array of values to the page component.

In this case, the `[...page]` syntax will capture one or more URL segments, and pass them to the page component as a prop called `params.page`.

For example, if you have a file named `[...page].astro` in the src/pages directory, Astro will match URLs like:

/
/about
/about/team
/about/team/john
And pass the captured URL segments as an array to the `[...page].astro` page component.

This allows you to create a single page component that can handle multiple URL segments and render different content based on the captured values.

Note that the `[...page]` syntax is similar to the `[...slug]` syntax I mentioned earlier, but it's used for a single file instead of a folder.

------

It looks like you've made good progress!

Since you've mirrored the contents of
src/pages/posts
 and rewritten "blog" to "projects", the issue is likely due to the fact that the getCollection function is not returning any data for the "projects" collection.

Here are a few things you can check:

Make sure the .md files in
src/data/projects
 are correctly formatted: Ensure that the frontmatter in each .md file is correct and contains the necessary fields (e.g., title, description, etc.).
Check the getCollection function: Verify that the getCollection function is correctly configured to fetch data from the "projects" collection. You can try logging the result of getCollection to see if it's returning any data.
Verify the getSortedPosts function: If you're using the getSortedPosts function to sort and filter the posts, make sure it's correctly configured to handle the "projects" collection.
Check the page.data prop: In your [...page].astro file, log the page.data prop to see if it's receiving any data. If it's empty, it could indicate that the issue is with the data fetching or processing.
To help you debug, you can try adding some console logs or using the Astro debugger to inspect the data being passed to your components.

Here's an example of how you can log the page.data prop in your [...page].astro file:

astro
---
// ...
---

<Layout title={`Posts | ${SITE.title}`}>
  <Header />
  <Main pageTitle="Projects" pageDesc="Some of my personal projects.">
    <ul>
      {console.log(page.data)} // Add this line to log the page.data prop
      {page.data.map(data => <Card {...data} />)}
    </ul>
  </Main>
  <!-- ... -->
</Layout>
This should give you a better idea of what's going on with the data.



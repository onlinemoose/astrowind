# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AstroWind is a production-ready template built with Astro 5.0 and Tailwind CSS. This is a static site generator focused on performance, SEO, and includes a full-featured blog system.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev
# or
npm start

# Build production site to ./dist/
npm run build

# Preview production build locally
npm run preview

# Run all checks (Astro + ESLint + Prettier)
npm run check

# Fix linting and formatting issues
npm run fix
```

Individual check commands:
- `npm run check:astro` - Check Astro syntax and types
- `npm run check:eslint` - Run ESLint
- `npm run check:prettier` - Check code formatting
- `npm run fix:eslint` - Auto-fix ESLint issues
- `npm run fix:prettier` - Auto-format code with Prettier

Test commands:
- `npm run test` - Run all tests in headless mode
- `npm run test:ui` - Run tests with interactive UI
- `npm run test:headed` - Run tests with visible browser
- `npm run test:debug` - Run tests in debug mode with inspector

## Architecture

### Configuration System

**Central configuration**: `src/config.yaml` controls site-wide settings including:
- Site metadata (name, URL, SEO)
- Blog behavior (pagination, permalinks, categories/tags)
- Analytics integration
- UI theme settings

**Custom Astro Integration**: The `vendor/integration` directory contains a custom Astro integration that:
- Loads `src/config.yaml` at build time
- Exposes configuration via virtual module `astrowind:config`
- Automatically updates `robots.txt` with sitemap URL after build
- Provides typed access to SITE, I18N, METADATA, APP_BLOG, UI, and ANALYTICS configs

Import config anywhere using: `import { SITE, APP_BLOG, METADATA } from 'astrowind:config'`

### Component Architecture

**Widgets** (`src/components/widgets/`): Large, self-contained sections like Hero, Features, Footer, Header. These are the main building blocks for pages.

**UI Components** (`src/components/ui/`): Reusable smaller components like Button, Headline, ItemGrid, Form, Timeline.

**Blog Components** (`src/components/blog/`): Specialized components for blog functionality (Grid, List, Pagination, Tags, RelatedPosts).

**Common Components** (`src/components/common/`): Cross-cutting utilities like Metadata, Analytics, ToggleTheme, Image optimization wrapper.

### Layout System

Three main layouts in `src/layouts/`:
- `Layout.astro` - Base layout with HTML structure, metadata, scripts
- `PageLayout.astro` - Standard page wrapper with Header/Footer
- `LandingLayout.astro` - Landing page variant
- `MarkdownLayout.astro` - For markdown/MDX content

### Blog System

**Content Collection**: Blog posts live in `src/data/post/` as `.md` or `.mdx` files.

**Content Schema**: Defined in `src/content/config.ts` using Astro's content collections with Zod validation. Posts include:
- Metadata (title, excerpt, publishDate, updateDate, draft)
- Taxonomy (category, tags)
- SEO overrides (metadata object)
- Automatically calculated reading time (via remark plugin)

**Blog Utilities** (`src/utils/blog.ts`):
- `fetchPosts()` - Loads and caches all published posts
- `findLatestPosts()` - Get most recent posts
- `getRelatedPosts()` - Score-based related posts by category/tags
- `getStaticPaths*()` - Functions for generating static routes for blog list, posts, categories, and tags

**Permalink System** (`src/utils/permalinks.ts`):
- Configurable URL patterns via `POST_PERMALINK_PATTERN` in config.yaml
- Supports variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
- `cleanSlug()` uses limax for URL-safe slugs
- Helper functions: `getPermalink()`, `getBlogPermalink()`, `getCanonical()`

**Dynamic Routes**: Blog uses Astro's dynamic routing in `src/pages/[...blog]/`:
- `[...page].astro` - Paginated post listing
- `[category]/[...page].astro` - Category archives
- `[tag]/[...page].astro` - Tag archives
- `index.astro` - Blog home

### Markdown Processing

Custom remark/rehype plugins in `src/utils/frontmatter.ts`:
- `readingTimeRemarkPlugin` - Calculates reading time and adds to frontmatter
- `responsiveTablesRehypePlugin` - Wraps tables in scrollable divs
- `lazyImagesRehypePlugin` - Adds lazy loading to images

### Navigation

Site navigation defined in `src/navigation.ts` with `headerData` and `footerData` objects. Uses permalink helper functions to generate URLs.

### Path Aliasing

The `~` alias resolves to `./src` (configured in astro.config.ts vite.resolve.alias).
Example: `import { getPermalink } from '~/utils/permalinks'`

### Image Optimization

- Static images in `public/` are served as-is
- Source images in `src/assets/images/` can use Astro's image optimization
- Custom `Image.astro` component wraps optimization logic
- External domains allowed: `cdn.pixabay.com`

### Styling

- Tailwind CSS with custom configuration in `tailwind.config.js`
- Base styles disabled (`applyBaseStyles: false`) to allow full customization
- Custom styles in `src/assets/styles/tailwind.css`
- Component-specific styles in `src/components/CustomStyles.astro`
- Dark mode support via theme toggle (system/light/dark)

## Testing

This project uses **Playwright** for end-to-end (E2E) testing with Chrome DevTools support.

### Test Setup

**Configuration**: `playwright.config.ts` configures:
- Test directory: `tests/e2e/`
- Base URL: `http://localhost:4321` (dev server)
- Multiple browser targets: Chromium, Firefox, WebKit
- Auto-launch dev server before tests
- HTML reporter for test results

**Test Structure**:
- E2E tests in `tests/e2e/*.spec.ts`
- Shared fixtures in `tests/e2e/fixtures.ts`
- Tests run against running dev server

### Running Tests

Common test commands:
- `npm run test` - Run all tests (headless, CI-friendly)
- `npm run test:ui` - Interactive UI mode (best for development)
- `npm run test:headed` - Run tests with visible browser windows
- `npm run test:debug` - Debug mode with inspector

### Writing Tests

Tests should follow the TDD workflow pattern:
1. Define test scenarios describing desired behavior
2. Write assertions that verify outcomes
3. Use page locators for reliable element selection
4. Test user interactions and page navigation

Example test structure:
```typescript
import { test, expect } from './fixtures';

test.describe('Feature Name', () => {
  test('should display correctly', async ({ page }) => {
    await page.goto('/page-path');
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## Test-Driven Development Workflow

When implementing new features or fixes, follow this TDD workflow:

1. **Planning Phase** - Clarifying Questions
   - Define the feature scope and acceptance criteria
   - Identify affected components and data flows
   - Determine edge cases and error scenarios
   - Specify browser/device compatibility requirements

2. **Red Phase** - Confirm Tests Fail
   - Write test cases that describe desired behavior
   - Run tests to confirm they all fail: `npm run test`
   - Verify test output clearly shows what's missing

3. **Checklist Phase** - Plan Implementation
   - Document the minimal changes needed to pass tests
   - Break down changes by component/file
   - Flag any refactoring or cleanup that may be needed
   - Consider performance and accessibility implications

4. **Green Phase** - Implement Changes
   - Write the minimal code to pass each test
   - Run tests frequently to verify progress
   - Commit working changes incrementally
   - Ensure no existing tests regress

5. **Refactor Phase** - Improve Code Quality
   - Clean up implementation while keeping tests passing
   - Extract reusable logic into utilities or components
   - Improve type safety and documentation
   - Run full check suite: `npm run check`

## Important Notes

- **Output mode**: Currently set to `static` in `astro.config.ts`. Blog requires `prerender = true` to work properly.
- **Node version**: Requires Node.js ^18.17.1 || ^20.3.0 || >= 21.0.0
- **RSS feed**: Generated at `/rss.xml` via `src/pages/rss.xml.ts`
- **Sitemap**: Auto-generated by `@astrojs/sitemap` integration
- **Icons**: Uses `astro-icon` with Tabler and Flat Color Icons sets
- **Analytics**: Supports Google Analytics (configure in config.yaml)

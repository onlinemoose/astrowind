import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        // Components across the template hardcode `dark:*-slate-*` as their
        // dark-mode neutral (text, borders, card backgrounds). Rather than
        // patch every occurrence, alias the slate scale itself to Tailwind's
        // warm `stone` scale so every existing `slate-*` class renders in
        // the brand's warm dark palette instead of cool blue-gray.
        slate: colors.stone,
      },
      fontFamily: {
        heading: ['var(--aw-font-heading, ui-serif)', ...defaultTheme.fontFamily.serif],
        // Body copy typeface — see --aw-font-body in CustomStyles.astro.
        // Kept distinct from Tailwind's default `sans`/`serif` keys (unused
        // in this template) so `font-body` reads as what it actually sets.
        body: ['var(--aw-font-body, ui-serif)', ...defaultTheme.fontFamily.serif],
        // UI chrome — nav links and buttons. See --aw-font-ui in CustomStyles.astro.
        ui: ['var(--aw-font-ui, ui-monospace)', ...defaultTheme.fontFamily.mono],
      },

      // Newsreader runs optically small, so the whole type scale is bumped
      // up a step from Tailwind's defaults for a larger editorial reading
      // size. Values are [font-size, line-height]. Headings (text-3xl+) are
      // left near their defaults so the hierarchy stays intact.
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.5' }], // 13px
        sm: ['0.9375rem', { lineHeight: '1.6' }], // 15px
        base: ['1.1875rem', { lineHeight: '1.66' }], // 19px — matches the body rule
        lg: ['1.375rem', { lineHeight: '1.66' }], // 22px
        xl: ['1.625rem', { lineHeight: '1.6' }], // 26px — hero subtitle, lead body
        '2xl': ['2rem', { lineHeight: '1.5' }], // 32px
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};

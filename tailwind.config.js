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

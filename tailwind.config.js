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
        // Design-system palette (§02) — warm paper / near-black ink / one accent.
        paper: 'var(--aw-color-paper)',
        'paper-2': 'var(--aw-color-paper-2)',
        'paper-3': 'var(--aw-color-paper-3)',
        ink: 'var(--aw-color-ink)',
        'ink-deep': 'var(--aw-color-ink-deep)',
        'ink-soft': 'var(--aw-color-ink-soft)',
        clay: 'var(--aw-color-clay)',
        olive: 'var(--aw-color-olive)',
        terracotta: 'var(--aw-color-terracotta)',
        'terracotta-deep': 'var(--aw-color-terracotta-deep)',
        line: 'var(--aw-line)',
        'line-strong': 'var(--aw-line-strong)',
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

      // Design system §04: body 18px / 1.66. Small UI text (mono labels,
      // nav, buttons, folios) clusters at 11–13px with wide tracking.
      fontSize: {
        xs: ['0.71875rem', { lineHeight: '1.4' }], // 11.5px — eyebrow / label / folio
        sm: ['0.8125rem', { lineHeight: '1.5' }], // 13px
        base: ['1.1875rem', { lineHeight: '1.66' }], // 19px — body (doc says 18px; a notch up for Newsreader's small x-height)
        lg: ['1.25rem', { lineHeight: '1.6' }], // 20px
        xl: ['1.5rem', { lineHeight: '1.5' }], // 24px — hero subtitle / lead
        '2xl': ['1.875rem', { lineHeight: '1.4' }], // 30px
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

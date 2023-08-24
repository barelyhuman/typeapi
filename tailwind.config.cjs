/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      maxWidth: {
        shell: '72rem',
      },
      colors: {
        'zinc-50': 'hsl(var(--zinc-50) / <alpha-value>)',
        'zinc-100': 'hsl(var(--zinc-100) / <alpha-value>)',
        'zinc-200': 'hsl(var(--zinc-200) / <alpha-value>)',
        'zinc-300': 'hsl(var(--zinc-300) / <alpha-value>)',
        'zinc-400': 'hsl(var(--zinc-400) / <alpha-value>)',
        'zinc-500': 'hsl(var(--zinc-500) / <alpha-value>)',
        'zinc-600': 'hsl(var(--zinc-600) / <alpha-value>)',
        'zinc-700': 'hsl(var(--zinc-700) / <alpha-value>)',
        'zinc-800': 'hsl(var(--zinc-800) / <alpha-value>)',
        'zinc-900': 'hsl(var(--zinc-900) / <alpha-value>)',
        'zinc-950': 'hsl(var(--zinc-950) / <alpha-value>)',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--zinc-800))',
      },
    },
  },
  plugins: [],
}

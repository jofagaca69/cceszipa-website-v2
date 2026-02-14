import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
    theme: {
        extend: {
          colors: {
            'ccesz-primary': '#F2730C',
          }
        }
    },
    plugins: [typography]
}
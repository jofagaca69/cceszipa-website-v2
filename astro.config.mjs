// @ts-check
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://colexploradoresdelsaber.com/',
    vite: {
        plugins: [
            tailwindcss(),
            sitemap()
        ]
    },

    integrations: [sitemap(), mdx(), icon()]
});
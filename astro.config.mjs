// @ts-check
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
    site: 'https://colexploradoresdelsaber.com/',
    vite: {
        plugins: [
            tailwindcss()
        ]
    },

    integrations: [
        sitemap({
            serialize(item) {
                // Homepage: máxima prioridad, revisión frecuente
                if (item.url === 'https://colexploradoresdelsaber.com/') {
                    return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date() }
                }
                // Resto de páginas
                return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() }
            }
        }),
        robotsTxt({
            policy: [
                {
                    userAgent: '*',
                    allow: '/',
                    disallow: ['/api/', '/admin/']
                },
                // Bloquear scrapers de IA más comunes
                { userAgent: 'GPTBot', disallow: '/' },
                { userAgent: 'CCBot', disallow: '/' },
                { userAgent: 'anthropic-ai', disallow: '/' },
                { userAgent: 'Claude-Web', disallow: '/' }
            ],
            sitemap: 'https://colexploradoresdelsaber.com/sitemap-index.xml'
        }),
        mdx(),
        icon()
    ]
});
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
            filter: (page) => !page.includes('/404'),
            serialize(item) {
                // Homepage: máxima prioridad, revisión frecuente
                if (item.url === 'https://colexploradoresdelsaber.com/') {
                    return { ...item, changefreq: 'weekly', priority: 1.0 }
                }
                // Páginas de conversión
                if (
                    item.url.includes('/inscripciones') ||
                    item.url.includes('/cursos')
                ) {
                    return { ...item, changefreq: 'monthly', priority: 0.9 }
                }
                // Conócenos
                if (item.url.includes('/conocenos')) {
                    return { ...item, changefreq: 'monthly', priority: 0.8 }
                }
                // Galería
                if (item.url.includes('/galeria')) {
                    return { ...item, changefreq: 'monthly', priority: 0.7 }
                }
                return { ...item, changefreq: 'monthly', priority: 0.6 }
            }
        }),
        robotsTxt({
            policy: [
                {
                    userAgent: '*',
                    allow: '/',
                    disallow: ['/api/', '/admin/', '/404']
                },
                // Scrapers de IA
                { userAgent: 'GPTBot',        disallow: '/' },
                { userAgent: 'CCBot',         disallow: '/' },
                { userAgent: 'anthropic-ai',  disallow: '/' },
                { userAgent: 'Claude-Web',    disallow: '/' },
                { userAgent: 'Google-Extended', disallow: '/' },
                { userAgent: 'PerplexityBot', disallow: '/' },
                { userAgent: 'Bytespider',    disallow: '/' },
                { userAgent: 'Amazonbot',     disallow: '/' },
            ],
            sitemap: 'https://colexploradoresdelsaber.com/sitemap-index.xml'
        }),
        mdx(),
        icon()
    ]
});
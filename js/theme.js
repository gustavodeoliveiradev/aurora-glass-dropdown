/**
 * AURORA GLASS — THEME v2
 * Toggle Dark/Light com persistência em localStorage
 * Sincroniza botão desktop (navbar) e mobile (dentro do menu)
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle       = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIcon         = document.getElementById('themeIcon');
    const themeIconMobile   = document.getElementById('themeIconMobile');
    const html              = document.documentElement;

    const ICON_SUN  = 'ph-sun';
    const ICON_MOON = 'ph-moon';

    const savedTheme  = localStorage.getItem('aurora-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    // Botão desktop
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Botão mobile (dentro do menu)
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('aurora-theme', theme);

        const iconClass = theme === 'dark' ? ICON_SUN : ICON_MOON;

        if (themeIcon) {
            themeIcon.classList.remove(ICON_SUN, ICON_MOON);
            themeIcon.classList.add(iconClass);
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove(ICON_SUN, ICON_MOON);
            themeIconMobile.classList.add(iconClass);
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('aurora-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});

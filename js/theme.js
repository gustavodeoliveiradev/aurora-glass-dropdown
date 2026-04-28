/**
 * AURORA GLASS — THEME
 * Toggle Dark/Light com persistência em localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Ícones Phosphor
    const ICON_SUN = 'ph-sun';
    const ICON_MOON = 'ph-moon';

    // Recupera tema salvo ou usa preferência do sistema
    const savedTheme = localStorage.getItem('aurora-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('aurora-theme', theme);

        // Atualiza ícone
        themeIcon.classList.remove(ICON_SUN, ICON_MOON);
        themeIcon.classList.add(theme === 'dark' ? ICON_SUN : ICON_MOON);
    }

    // Escuta mudança de preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('aurora-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
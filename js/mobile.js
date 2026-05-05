/**
 * AURORA GLASS — MOBILE v3
 * Simples. O stacking context foi resolvido no CSS (::before no navbar).
 */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha o menu apenas ao clicar em Home (primeiro item simples)
    // Portfólio, Blog e Contato ficam selecionados mas mantêm o menu aberto
    const allPlainLinks = navMenu.querySelectorAll('.nav-item:not(.has-dropdown) .nav-link');

    allPlainLinks.forEach(link => {
        const parentItem = link.closest('.nav-item');

        link.addEventListener('click', () => {
            // Marca como ativo
            navMenu.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            parentItem.classList.add('active');

            // Só fecha o menu se for o Home (tem ícone ph-house)
            const icon = link.querySelector('i');
            const isHome = icon && icon.classList.contains('ph-house');

            if (isHome) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
});

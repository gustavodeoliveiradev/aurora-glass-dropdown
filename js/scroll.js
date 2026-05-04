/**
 * AURORA GLASS — SCROLL BEHAVIOR (Dia 6)
 *
 * 1. Navbar compacta: adiciona .scrolled ao rolar > 80px
 * 2. Progress bar: avança conforme % de rolagem da página
 *
 * Usa requestAnimationFrame para performance máxima.
 * Respeita prefers-reduced-motion.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar   = document.getElementById('navbar');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!navbar) return;

    // ── Cria a progress bar ─────────────────────────────────────────────
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress hidden';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Progresso de leitura');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    navbar.appendChild(progressBar);

    // ── Scroll handler ─────────────────────────────────────────────────
    const SCROLL_THRESHOLD = 80; // px antes de compactar a navbar
    let ticking = false;
    let lastScroll = 0;

    function onScroll() {
        lastScroll = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update() {
        const scrollY = lastScroll;

        // ── 1. Navbar compacta ──────────────────────────────────────────
        if (scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ── 2. Progress bar ─────────────────────────────────────────────
        const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        const pct = Math.min(100, Math.max(0, scrollPercent));

        if (prefersReduced) {
            // Sem animação: apenas mostra/esconde
            progressBar.style.width = pct > 0 ? '100%' : '0%';
        } else {
            progressBar.style.width = pct + '%';
        }

        // Mostra só quando rolou pelo menos 1%
        if (pct > 1) {
            progressBar.classList.remove('hidden');
        } else {
            progressBar.classList.add('hidden');
        }

        // Glow ao chegar no fim
        if (pct >= 99.5) {
            progressBar.classList.add('complete');
        } else {
            progressBar.classList.remove('complete');
        }

        // Atualiza ARIA
        progressBar.setAttribute('aria-valuenow', Math.round(pct));

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Roda uma vez ao carregar (caso a página já esteja rolada)
    update();
});

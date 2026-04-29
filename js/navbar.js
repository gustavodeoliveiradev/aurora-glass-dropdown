/**
 * AURORA GLASS — NAVBAR v2 (Dia 3)
 * 1. Spotlight: brilho que segue o cursor dentro da navbar
 * 2. Ripple: onda que expande do ponto de clique em cada link
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar   = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // ── 1. SPOTLIGHT na navbar ──────────────────────────────────────────
    // Move uma variável CSS com a posição exata do mouse dentro do navbar.
    // O CSS usa isso num radial-gradient no ::before da navbar.
    if (navbar) {
        navbar.addEventListener('mousemove', (e) => {
            const rect = navbar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            navbar.style.setProperty('--spotlight-x', `${x}px`);
            navbar.style.setProperty('--spotlight-y', `${y}px`);
            navbar.style.setProperty('--spotlight-opacity', '1');
        });

        navbar.addEventListener('mouseleave', () => {
            navbar.style.setProperty('--spotlight-opacity', '0');
        });
    }

    // ── 2. SPOTLIGHT local nos nav-links (já existia, mantido) ──────────
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            link.style.setProperty('--mouse-x', `${x}%`);
            link.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // ── 3. RIPPLE nos nav-links ─────────────────────────────────────────
    // Cria um elemento <span class="ripple"> no ponto exato do clique,
    // anima com scale 0→1 + fade out e remove do DOM ao terminar.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Não cria ripple em links que abrem dropdown (já têm feedback visual)
            // mas mantém o efeito em links simples de navegação
            const existingRipple = link.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();

            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            const rect   = link.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height) * 1.8;
            const x      = e.clientX - rect.left - size / 2;
            const y      = e.clientY - rect.top  - size / 2;

            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;

            link.appendChild(ripple);

            // Remove após a animação terminar
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
});

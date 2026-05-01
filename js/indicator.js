/**
 * AURORA GLASS — MAGIC LINE INDICATOR (Dia 5)
 *
 * Pill animada que desliza entre os nav-items.
 * Usa getBoundingClientRect() para calcular posição exata
 * e anima via left + width com cubic-bezier elástico no CSS.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navMenu  = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item:not(.nav-item--footer):not(.nav-item--search-row)');

    if (!navMenu || window.innerWidth <= 768) return;

    // ── Cria a pill indicator ───────────────────────────────────────────
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    navMenu.prepend(indicator); // insere antes dos itens

    // ── Posiciona a pill em cima de um nav-item ─────────────────────────
    function moveTo(item) {
        const menuRect = navMenu.getBoundingClientRect();
        const itemLink = item.querySelector('.nav-link');
        if (!itemLink) return;

        const linkRect = itemLink.getBoundingClientRect();

        indicator.style.left  = (linkRect.left - menuRect.left) + 'px';
        indicator.style.width = linkRect.width + 'px';
        indicator.classList.add('visible');
    }

    // ── Posiciona no item ativo inicial ─────────────────────────────────
    const initialActive = document.querySelector('.nav-item.active');
    if (initialActive) {
        // Pequeno delay para garantir que o layout está calculado
        requestAnimationFrame(() => {
            // Desativa transição na primeira posição (sem animação inicial)
            indicator.style.transition = 'none';
            moveTo(initialActive);
            requestAnimationFrame(() => {
                indicator.style.transition = '';
            });
        });
    }

    // ── Move ao clicar em qualquer nav-link ─────────────────────────────
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (!link) return;

        link.addEventListener('click', () => {
            moveTo(item);
        });

        // Hover preview — pill segue o mouse levemente
        link.addEventListener('mouseenter', () => {
            moveTo(item);
        });

        // Ao sair do hover, volta pro item ativo
        link.addEventListener('mouseleave', () => {
            const active = document.querySelector('.nav-item.active');
            if (active) {
                moveTo(active);
            } else {
                indicator.classList.remove('visible');
            }
        });
    });

    // ── Reposiciona ao redimensionar ────────────────────────────────────
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                indicator.classList.remove('visible');
                return;
            }
            const active = document.querySelector('.nav-item.active');
            if (active) {
                indicator.style.transition = 'none';
                moveTo(active);
                requestAnimationFrame(() => { indicator.style.transition = ''; });
            }
        }, 150);
    });
});

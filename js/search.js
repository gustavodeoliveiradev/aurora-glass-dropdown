/**
 * AURORA GLASS — SEARCH BAR (Dia 4)
 *
 * Comportamento:
 * - Clique na lupa: expande o campo + foca o input
 * - Clique no X ou Escape: fecha e limpa
 * - Clique fora: fecha
 * - Fecha dropdowns abertos ao abrir a busca
 */

document.addEventListener('DOMContentLoaded', () => {
    const wrapper  = document.getElementById('searchWrapper');
    const trigger  = document.getElementById('searchTrigger');
    const field    = document.getElementById('searchField');
    const input    = document.getElementById('searchInput');
    const closeBtn = document.getElementById('searchClose');

    if (!wrapper || !trigger || !input) return;

    function openSearch() {
        // Fecha dropdowns abertos
        document.querySelectorAll('.nav-item.has-dropdown.open')
            .forEach(item => item.classList.remove('open'));

        wrapper.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');

        // Foca após a transição de largura terminar
        setTimeout(() => input.focus(), 420);
    }

    function closeSearch() {
        wrapper.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        input.value = '';
        input.blur();
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.contains('active') ? closeSearch() : openSearch();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearch();
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            closeSearch();
        }
    });

    // Fecha com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wrapper.classList.contains('active')) {
            closeSearch();
        }
    });
});

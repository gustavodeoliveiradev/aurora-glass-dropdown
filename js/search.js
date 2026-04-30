/**
 * AURORA GLASS — SEARCH v4 (Funcional)
 *
 * Desktop: campo expansível + resultados em dropdown
 * Mobile:  overlay flutuante com resultados
 *
 * Indexa automaticamente todos os links do menu:
 * nav-links, dropdown-list items e nested items.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── Indexação dos itens do menu ─────────────────────────────────────
    function buildIndex() {
        const items = [];
        document.querySelectorAll('.nav-menu a, .dropdown-list a, .nested-dropdown a').forEach(a => {
            const span = a.querySelector('span');
            const text = span ? span.textContent.trim() : a.textContent.trim();
            if (text && !items.find(i => i.text === text)) {
                items.push({ text, el: a });
            }
        });
        return items;
    }

    function search(query, index) {
        if (!query.trim()) return [];
        const q = query.toLowerCase().trim();
        return index.filter(item => item.text.toLowerCase().includes(q));
    }

    function renderResults(results, container) {
        container.innerHTML = '';
        if (!results.length) {
            container.innerHTML = `
                <div class="search-no-results">
                    <i class="ph ph-magnifying-glass-minus"></i>
                    Nenhum resultado encontrado
                </div>`;
            return;
        }
        results.forEach(({ text, el }) => {
            const btn = document.createElement('button');
            btn.className = 'search-result-item';
            btn.innerHTML = `<i class="ph ph-arrow-right"></i><span>${text}</span>`;
            btn.addEventListener('click', () => {
                el.click();           // Simula clique no item original
                closeAll();
            });
            container.appendChild(btn);
        });
    }

    const menuIndex = buildIndex();

    // ── Desktop ─────────────────────────────────────────────────────────
    const wrapper   = document.getElementById('searchWrapper');
    const trigger   = document.getElementById('searchTrigger');
    const input     = document.getElementById('searchInput');
    const closeBtn  = document.getElementById('searchClose');

    // Cria dropdown de resultados desktop
    const desktopResults = document.createElement('div');
    desktopResults.className = 'search-results-dropdown';
    desktopResults.setAttribute('role', 'listbox');
    if (wrapper) wrapper.appendChild(desktopResults);

    function openDesktop() {
        document.querySelectorAll('.nav-item.has-dropdown.open')
            .forEach(i => i.classList.remove('open'));
        wrapper.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        setTimeout(() => input && input.focus(), 420);
    }

    function closeDesktop() {
        wrapper && wrapper.classList.remove('active');
        trigger && trigger.setAttribute('aria-expanded', 'false');
        if (input) input.value = '';
        desktopResults.classList.remove('visible');
        desktopResults.innerHTML = '';
    }

    if (trigger) {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            wrapper.classList.contains('active') ? closeDesktop() : openDesktop();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', e => {
            e.stopPropagation();
            closeDesktop();
        });
    }

    if (input) {
        input.addEventListener('input', () => {
            const results = search(input.value, menuIndex);
            if (input.value.trim()) {
                renderResults(results, desktopResults);
                desktopResults.classList.add('visible');
            } else {
                desktopResults.classList.remove('visible');
                desktopResults.innerHTML = '';
            }
        });
    }

    // ── Mobile overlay ──────────────────────────────────────────────────
    const overlay       = document.getElementById('searchOverlayMobile');
    const overlayInput  = document.getElementById('searchInputMobile');
    const overlayClose  = document.getElementById('searchOverlayClose');
    const triggerMobile = document.getElementById('searchTriggerMobile');

    // Cria dropdown de resultados mobile
    const mobileResults = document.createElement('div');
    mobileResults.className = 'search-results-dropdown search-results-mobile';
    mobileResults.setAttribute('role', 'listbox');
    if (overlay) overlay.appendChild(mobileResults);

    function openMobile() {
        if (!overlay) return;
        overlay.style.display = 'block';
        requestAnimationFrame(() => {
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            setTimeout(() => overlayInput && overlayInput.focus(), 280);
        });
    }

    function closeMobile() {
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        if (overlayInput) overlayInput.value = '';
        mobileResults.classList.remove('visible');
        mobileResults.innerHTML = '';
        setTimeout(() => { overlay.style.display = 'none'; }, 280);
    }

    function closeAll() {
        closeDesktop();
        closeMobile();
    }

    if (triggerMobile) {
        triggerMobile.addEventListener('click', e => {
            e.stopPropagation();
            const hamburger = document.getElementById('hamburger');
            const navMenu   = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            setTimeout(() => openMobile(), 420);
        });
    }

    if (overlayClose) {
        overlayClose.addEventListener('click', e => {
            e.stopPropagation();
            closeMobile();
        });
    }

    if (overlayInput) {
        overlayInput.addEventListener('input', () => {
            const results = search(overlayInput.value, menuIndex);
            if (overlayInput.value.trim()) {
                renderResults(results, mobileResults);
                mobileResults.classList.add('visible');
            } else {
                mobileResults.classList.remove('visible');
                mobileResults.innerHTML = '';
            }
        });
    }

    // ── Fecha ao clicar fora ─────────────────────────────────────────────
    document.addEventListener('click', e => {
        if (wrapper && !wrapper.contains(e.target)) closeDesktop();
        if (overlay && !overlay.contains(e.target) && e.target !== triggerMobile) closeMobile();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAll();
    });
});

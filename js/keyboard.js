/**
 * AURORA GLASS — KEYBOARD NAVIGATION (Dia 7)
 *
 * Implementa navegação por teclado conforme ARIA Authoring Practices:
 * https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
 *
 * - Tab / Shift+Tab: navega entre itens do menubar
 * - Enter / Space: abre dropdown
 * - ArrowDown: entra no dropdown aberto, navega itens
 * - ArrowUp: navega itens para cima
 * - ArrowRight: abre nested dropdown
 * - ArrowLeft / Escape: fecha dropdown, volta ao trigger
 * - Home / End: primeiro / último item do dropdown
 */

document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    // ── Atualiza aria-expanded nos triggers ─────────────────────────────
    // Observa mudanças de classe .open nos nav-items e sincroniza o ARIA
    dropdownItems.forEach(item => {
        const trigger = item.querySelector('.nav-link[aria-haspopup]');
        if (!trigger) return;

        const observer = new MutationObserver(() => {
            const isOpen = item.classList.contains('open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });

        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ── Atualiza aria-expanded nos nested triggers ───────────────────────
    document.querySelectorAll('.has-nested').forEach(item => {
        const trigger = item.querySelector('a[aria-haspopup]');
        if (!trigger) return;

        const observer = new MutationObserver(() => {
            const isOpen = item.classList.contains('open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });

        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ── Helpers ──────────────────────────────────────────────────────────
    function getMenuItems(dropdown) {
        // Retorna apenas itens diretos visíveis (não nested)
        return Array.from(
            dropdown.querySelectorAll(':scope > ul > li > a, :scope > .dropdown-grid .dropdown-list > li > a')
        ).filter(el => !el.closest('.nested-dropdown'));
    }

    function openDropdown(item) {
        document.querySelectorAll('.nav-item.has-dropdown.open').forEach(i => {
            if (i !== item) i.classList.remove('open');
        });
        item.classList.add('open');
    }

    function closeDropdown(item) {
        item.classList.remove('open');
        const trigger = item.querySelector('.nav-link');
        if (trigger) trigger.focus();
    }

    function closeAll() {
        document.querySelectorAll('.nav-item.has-dropdown.open').forEach(i => i.classList.remove('open'));
        document.querySelectorAll('.has-nested.open').forEach(i => i.classList.remove('open'));
    }

    // ── Navegação no menubar (nível 1) ───────────────────────────────────
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('keydown', (e) => {
            const item      = link.closest('.nav-item');
            const hasDropdown = item.classList.contains('has-dropdown');
            const isOpen    = item.classList.contains('open');
            const dropdown  = item.querySelector('.dropdown');

            switch (e.key) {
                case 'Enter':
                case ' ':
                    if (hasDropdown) {
                        e.preventDefault();
                        isOpen ? closeDropdown(item) : openDropdown(item);
                        if (!isOpen && dropdown) {
                            // Foca primeiro item do dropdown
                            const first = dropdown.querySelector('[role="menuitem"]');
                            if (first) setTimeout(() => first.focus(), 50);
                        }
                    }
                    break;

                case 'ArrowDown':
                    if (hasDropdown) {
                        e.preventDefault();
                        openDropdown(item);
                        if (dropdown) {
                            const first = dropdown.querySelector('[role="menuitem"]');
                            if (first) setTimeout(() => first.focus(), 50);
                        }
                    }
                    break;

                case 'Escape':
                    closeAll();
                    link.focus();
                    break;
            }
        });
    });

    // ── Navegação dentro dos dropdowns (nível 2) ─────────────────────────
    document.querySelectorAll('.dropdown [role="menuitem"]').forEach(item => {
        item.addEventListener('keydown', (e) => {
            const dropdown      = item.closest('.dropdown');
            const parentNavItem = dropdown ? dropdown.closest('.nav-item') : null;
            const items         = dropdown ? getMenuItems(dropdown) : [];
            const index         = items.indexOf(item);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const next = items[index + 1];
                    if (next) next.focus();
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    const prev = items[index - 1];
                    if (prev) {
                        prev.focus();
                    } else {
                        // Volta ao trigger do menubar
                        const trigger = parentNavItem && parentNavItem.querySelector('.nav-link');
                        if (trigger) trigger.focus();
                    }
                    break;

                case 'Home':
                    e.preventDefault();
                    if (items[0]) items[0].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    if (items.length) items[items.length - 1].focus();
                    break;

                case 'Escape':
                    e.preventDefault();
                    if (parentNavItem) closeDropdown(parentNavItem);
                    break;

                case 'ArrowRight':
                    // Abre nested se existir
                    const nestedParent = item.closest('.has-nested');
                    if (nestedParent) {
                        e.preventDefault();
                        nestedParent.classList.add('open');
                        const firstNested = nestedParent.querySelector('.nested-dropdown [role="menuitem"]');
                        if (firstNested) setTimeout(() => firstNested.focus(), 50);
                    }
                    break;

                case 'ArrowLeft':
                    // Fecha nested, volta ao trigger
                    const nested = item.closest('.nested-dropdown');
                    if (nested) {
                        e.preventDefault();
                        const nestedItem = nested.closest('.has-nested');
                        if (nestedItem) {
                            nestedItem.classList.remove('open');
                            const trigger = nestedItem.querySelector('a');
                            if (trigger) trigger.focus();
                        }
                    }
                    break;

                case 'Tab':
                    // Tab fecha o dropdown
                    closeAll();
                    break;
            }
        });
    });
});

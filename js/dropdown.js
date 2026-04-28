/**
 * AURORA GLASS — DROPDOWN v5
 * Simples e direto. O stacking context foi resolvido no CSS
 * movendo o backdrop-filter do .navbar para um ::before.
 */

document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    const nestedItems   = document.querySelectorAll('.has-nested');
    const navLinks      = document.querySelectorAll('.nav-link');

    // Active state
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const parentItem = link.closest('.nav-item');
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            parentItem.classList.add('active');
            if (!parentItem.classList.contains('has-dropdown')) {
                const hamburger = document.getElementById('hamburger');
                const navMenu   = document.getElementById('navMenu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Dropdown principal
    dropdownItems.forEach(item => {
        item.querySelector('.nav-link').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = item.classList.contains('open');
            dropdownItems.forEach(other => {
                other.classList.remove('open');
                other.querySelectorAll('.has-nested').forEach(n => n.classList.remove('open'));
            });
            if (!isOpen) item.classList.add('open');
        });
    });

    // Nested dropdown
    nestedItems.forEach(item => {
        item.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const siblings = item.parentElement.querySelectorAll('.has-nested');
            siblings.forEach(s => { if (s !== item) s.classList.remove('open'); });
            item.classList.toggle('open');
        });
    });

    // Fecha fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item.has-dropdown')) {
            dropdownItems.forEach(i => {
                i.classList.remove('open');
                i.querySelectorAll('.has-nested').forEach(n => n.classList.remove('open'));
            });
        }
    });

    // Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdownItems.forEach(i => {
                i.classList.remove('open');
                i.querySelectorAll('.has-nested').forEach(n => n.classList.remove('open'));
            });
        }
    });
});

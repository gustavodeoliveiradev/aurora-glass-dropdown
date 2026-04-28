/**
 * AURORA GLASS — NAVBAR
 * Efeito de spotlight no hover dos links
 */

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            link.style.setProperty('--mouse-x', `${x}%`);
            link.style.setProperty('--mouse-y', `${y}%`);
        });
    });
});
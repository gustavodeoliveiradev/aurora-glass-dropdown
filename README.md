# 🌌 Aurora Glass — Tech Dropdown Menu

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-00f5c4?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-a855f7?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-puro-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zero Deps](https://img.shields.io/badge/dependências-zero-00f5c4?style=for-the-badge)
![ARIA](https://img.shields.io/badge/WCAG-2.1_AA-38bdf8?style=for-the-badge)
![Status](https://img.shields.io/badge/status-concluído-00f5c4?style=for-the-badge)

**Dropdown menu moderno com glassmorphism, animações fluidas e totalmente acessível.**  
Construído com CSS puro + JavaScript vanilla — zero dependências.

[🔗 Demo ao vivo](https://gustavodeoliveiradev.github.io/aurora-glass-dropdown/) · [📁 Repositório](https://github.com/gustavodeoliveiradev/aurora-glass-dropdown)

</div>

---

## ✨ Features

- 🎨 **Glassmorphism** real com `backdrop-filter` via pseudo-elemento `::before`
- 🌈 **Fundo Aurora** animado com CSS puro (3 blobs em loop contínuo)
- 🌙 **Dark / Light mode** com toggle e persistência via `localStorage`
- 📱 **Totalmente responsivo** — hamburger menu fullscreen no mobile
- ♿ **WCAG 2.1 AA** — skip link, ARIA completo, navegação por teclado com setas
- 🚀 **Mega dropdown** com grid de 3 colunas e sub-dropdowns aninhados
- ✨ **Magic line indicator** que desliza entre os itens com animação elástica
- 🔍 **Search funcional** que indexa e filtra todos os itens do menu em tempo real
- 📊 **Progress bar de leitura** com glow ao completar
- 📦 **Navbar compacta** ao rolar — encolhe suavemente com scroll
- 💥 **Ripple no clique** e **spotlight cursor** na navbar
- ⚡ **Zero dependências** — apenas Phosphor Icons via CDN

---

## 🗓️ Changelog — 7 Commits

| Dia | Commit | Destaques |
|-----|--------|-----------|
| **1** | `fix: z-index, tap-highlight e menu mobile` | Stacking context via `::before`, `backdrop-filter` isolado |
| **2** | `feat: animações escalonadas no mobile` | Cascade delay, linha aurora, `prefers-reduced-motion` |
| **3** | `feat: spotlight cursor + ripple` | `getBoundingClientRect()`, `radial-gradient` dinâmico |
| **4** | `feat: search bar expansível` | Busca funcional, overlay mobile, índice automático |
| **5** | `feat: magic line indicator` | Pill elástica, hover preview, resize handler |
| **6** | `feat: scroll behavior + progress bar` | `requestAnimationFrame`, glow no fim, navbar compacta |
| **7** | `refactor: auditoria ARIA + navegação por teclado` | Skip link, `role="menubar"`, setas de teclado, `focus-visible` |

---

## 🗂️ Estrutura

```
aurora-glass-dropdown/
├── index.html
├── LICENSE
├── README.md
├── css/
│   ├── base.css          # Reset, variáveis CSS, fundo aurora, skip link
│   ├── navbar.css        # Navbar flutuante, scroll behavior, search, indicator
│   ├── dropdown.css      # Submenus, mega dropdown e nested
│   ├── animations.css    # Keyframes e prefers-reduced-motion
│   ├── themes.css        # Dark / Light mode
│   └── responsive.css    # Breakpoints mobile-first
└── js/
    ├── navbar.js         # Spotlight cursor + ripple nos links
    ├── dropdown.js       # Click para abrir dropdowns
    ├── mobile.js         # Hamburger menu com focus trap
    ├── search.js         # Search bar com índice automático
    ├── indicator.js      # Magic line indicator animada
    ├── scroll.js         # Navbar compacta + progress bar
    ├── keyboard.js       # Navegação por teclado (ARIA APG)
    └── theme.js          # Toggle de tema com persistência
```

---

## 🚀 Como usar

```bash
# Clone o repositório
git clone https://github.com/gustavodeoliveiradev/aurora-glass-dropdown.git

# Entre na pasta
cd aurora-glass-dropdown

# Abra no navegador — sem build, sem servidor!
open index.html
```

---

## ♿ Acessibilidade

O projeto implementa as diretrizes **WCAG 2.1 nível AA** e o padrão **ARIA Menubar**:

- **Skip link** — "Pular para o conteúdo principal" visível ao focar via teclado
- **`role="menubar"`** no `<ul>` principal com `role="menuitem"` em cada link
- **`aria-haspopup`** e **`aria-expanded`** sincronizados em tempo real via `MutationObserver`
- **`aria-label`** em todos os botões, inputs e regiões de navegação
- **`aria-hidden="true"`** em todos os ícones decorativos
- **Navegação por teclado completa:**
  - `Enter` / `Space` — abre/fecha dropdown
  - `↓` `↑` — navega entre itens do dropdown
  - `→` — abre nested dropdown
  - `←` / `Escape` — fecha e volta ao trigger
  - `Home` / `End` — primeiro/último item
  - `Tab` — fecha dropdown e segue fluxo natural
- **`focus-visible`** com outline verde nítido (sem afetar usuários de mouse)
- **`prefers-reduced-motion`** — desativa todas as animações quando solicitado

---

## 🔧 Decisões técnicas

### Glassmorphism sem stacking context

```css
/* ❌ Antes — criava stacking context, prendia dropdowns */
.navbar { backdrop-filter: blur(30px); }

/* ✅ Depois — efeito idêntico, sem stacking context */
.navbar::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(30px);
    z-index: -1;
}
```

### Magic Line com getBoundingClientRect

```js
function moveTo(item) {
    const menuRect = navMenu.getBoundingClientRect();
    const linkRect = item.querySelector('.nav-link').getBoundingClientRect();
    indicator.style.left  = (linkRect.left - menuRect.left) + 'px';
    indicator.style.width = linkRect.width + 'px';
}
```

### Progress bar com requestAnimationFrame

```js
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(update); // máximo 1 frame por ciclo
        ticking = true;
    }
}, { passive: true });
```

---

## 📱 Breakpoints

| Breakpoint | Comportamento |
|------------|---------------|
| `> 1024px` | Menu horizontal completo, mega dropdown 3 colunas |
| `768–1024px` | Mega dropdown 2 colunas |
| `< 768px` | Hamburger + overlay fullscreen, busca e tema no menu |
| `< 480px` | Layout compacto, search overlay fixed |

---

## 🎨 Personalização

```css
:root {
    --aurora-1: #00f5c4;  /* Verde-água  */
    --aurora-2: #a855f7;  /* Roxo        */
    --aurora-3: #38bdf8;  /* Azul        */
    --aurora-4: #fb7185;  /* Rosa        */
    --navbar-height: 72px;
}
```

---

## 📝 Licença

MIT © 2026 — [Gustavo de Oliveira](https://github.com/gustavodeoliveiradev)

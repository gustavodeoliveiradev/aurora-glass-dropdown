# 🌌 Aurora Glass — Tech Dropdown Menu

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-00f5c4?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-a855f7?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-puro-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zero Deps](https://img.shields.io/badge/dependências-zero-00f5c4?style=for-the-badge)
![ARIA](https://img.shields.io/badge/acessível-ARIA-38bdf8?style=for-the-badge)
![Responsive](https://img.shields.io/badge/responsivo-mobile--first-fb7185?style=for-the-badge)

**Dropdown menu moderno com glassmorphism, animações fluidas e totalmente acessível.**  
Construído com CSS puro + JavaScript vanilla — zero dependências.

</div>

---

## ✨ Features

- 🎨 **Glassmorphism** real com `backdrop-filter` via pseudo-elemento
- 🌈 **Fundo Aurora** animado com CSS puro (3 blobs em loop)
- 🌙 **Dark / Light mode** com toggle e persistência via `localStorage`
- 📱 **Totalmente responsivo** — hamburger menu fullscreen no mobile
- ♿ **Acessível** — ARIA labels, `aria-expanded`, navegação por teclado (Escape)
- 🚀 **Mega dropdown** com grid de 3 colunas
- 🎯 **Sub-dropdowns aninhados** com animações suaves
- ⚡ **Zero dependências** — apenas Phosphor Icons via CDN

---

## 🗓️ Roadmap — 7 Commits

| Dia | Commit | Status |
|-----|--------|--------|
| **Dia 1** | `fix: resolve bugs de z-index, tap-highlight e menu mobile` | ✅ Concluído |
| **Dia 2** | `feat: animações escalonadas + linha aurora + prefers-reduced-motion` | ✅ Concluído |
| **Dia 3** | `feat: spotlight cursor effect na navbar + ripple nos links` | 🔜 |
| **Dia 4** | `feat: search bar expansível integrada à navbar` | 🔜 |
| **Dia 5** | `feat: active indicator animado com underline que desliza entre itens` | 🔜 |
| **Dia 6** | `feat: modo reduzido de movimento (prefers-reduced-motion)` | 🔜 |
| **Dia 7** | `refactor: audit de acessibilidade completo + documentação final` | 🔜 |

---

## 🗂️ Estrutura

```
aurora-glass-dropdown/
├── index.html
├── LICENSE
├── README.md
└── css/
│   ├── base.css          # Reset, variáveis CSS, fundo aurora animado
│   ├── navbar.css        # Barra principal flutuante (glassmorphism via ::before)
│   ├── dropdown.css      # Submenus, mega dropdown e nested
│   ├── animations.css    # Keyframes e transições
│   ├── themes.css        # Dark / Light mode
│   └── responsive.css    # Breakpoints mobile-first
└── js/
    ├── navbar.js         # Efeito spotlight no cursor
    ├── dropdown.js       # Click para abrir dropdowns
    ├── mobile.js         # Hamburger menu
    └── theme.js          # Toggle de tema com persistência
```

---

## 🚀 Como usar

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/aurora-glass-dropdown.git

# 2. Entre na pasta
cd aurora-glass-dropdown

# 3. Abra no navegador — sem build, sem servidor!
open index.html
```

---

## 🎨 Personalização

Edite as variáveis CSS em `css/base.css`:

```css
:root {
    --aurora-1: #00f5c4;  /* Verde-água  */
    --aurora-2: #a855f7;  /* Roxo        */
    --aurora-3: #38bdf8;  /* Azul        */
    --aurora-4: #fb7185;  /* Rosa        */
}
```

---

## 📱 Breakpoints

| Breakpoint | Comportamento |
|------------|---------------|
| `> 1024px` | Menu horizontal completo, mega dropdown 3 colunas |
| `768–1024px` | Mega dropdown 2 colunas |
| `< 768px` | Hamburger + overlay fullscreen |
| `< 480px` | Layout compacto, badges empilhadas |

---

## 🔧 Decisões técnicas

### Glassmorphism sem stacking context

O `backdrop-filter` foi movido do `.navbar` para um `::before` pseudo-elemento. Isso evita que o navbar crie um stacking context isolado que aprisionaria os dropdowns.

```css
/* ❌ Antes — criava stacking context */
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

---

## 📝 Licença

MIT © 2026 — Gustavo de Oliveira

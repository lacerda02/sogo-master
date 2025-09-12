// js/lang.js
(function () {
  const btn = document.getElementById('lang-toggle');
  const DEFAULT_LANG = 'pt';
  let currentLang = localStorage.getItem('lang') || DEFAULT_LANG;

  function applyTranslations() {
    document.querySelectorAll('[data-pt]').forEach(el => {
      const pt = el.getAttribute('data-pt');
      const en = el.getAttribute('data-en');
      if (pt === null || en === null) return; // exige os dois atributos

      const value = (currentLang === 'pt') ? pt : en;
      const tag = el.tagName.toLowerCase();

      if (tag === 'img') {
        // traduz o ALT
        el.setAttribute('alt', value);
      } else if (tag === 'input' || tag === 'textarea') {
        // se tiver data-pt-placeholder/data-en-placeholder usa isso
        if (el.hasAttribute('data-pt-placeholder') && el.hasAttribute('data-en-placeholder')) {
          el.setAttribute('placeholder', currentLang === 'pt' ? el.getAttribute('data-pt-placeholder') : el.getAttribute('data-en-placeholder'));
        } else {
          // se for um input tipo button/value, tenta setar value; senão placeholder
          const type = (el.getAttribute('type') || '').toLowerCase();
          if (type === 'button' || type === 'submit') el.value = value;
          else el.placeholder = value;
        }
      } else {
        // para a maioria dos elementos: texto simples
        el.textContent = value;
      }
    });

    if (btn) btn.textContent = (currentLang === 'pt') ? 'EN' : 'PT';
  }

  function toggleLang() {
    currentLang = (currentLang === 'pt') ? 'en' : 'pt';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  }

  // inicia ao carregar a página
  document.addEventListener('DOMContentLoaded', applyTranslations);

  // listeners
  if (btn) {
    btn.addEventListener('click', toggleLang);
  } else {
    console.warn('lang-toggle button not found. Verifica o ID no header.');
  }

  // observa nodes adicionados (útil se menu for gerado dinamicamente)
  const observer = new MutationObserver(muts => {
    let dirty = false;
    for (const m of muts) {
      if (m.addedNodes && m.addedNodes.length) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1 && (n.hasAttribute('data-pt') || n.querySelector && n.querySelector('[data-pt]'))) {
            dirty = true; break;
          }
        }
      }
      if (dirty) break;
    }
    if (dirty) applyTranslations();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();

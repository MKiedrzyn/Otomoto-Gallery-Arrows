(() => {
  'use strict';

  // Powiększony podgląd zdjęć istnieje w DOM tylko wtedy, gdy jest otwarty.
  // Zwykła galeria na stronie aukcji ma własne strzałki, więc przyciski
  // zawsze szukamy WEWNĄTRZ podglądu, żeby nie reagować poza nim.
  const GALLERY = '[data-testid="expanded-gallery"]';

  const BUTTONS = {
    ArrowRight: [
      '[data-testid="arrow-right-background"]',
      '[aria-label="Następny obraz"]',
    ],
    ArrowLeft: [
      '[data-testid="arrow-left-background"]',
      '[aria-label="Poprzedni obraz"]',
    ],
  };

  function isTyping(el) {
    if (!el || !el.tagName) return false;
    const tag = el.tagName;
    return (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      el.isContentEditable
    );
  }

  function findButton(gallery, key) {
    for (const selector of BUTTONS[key]) {
      const btn = gallery.querySelector(selector);
      if (btn) return btn;
    }
    return null;
  }

  function onKeyDown(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (isTyping(event.target)) return;

    const gallery = document.querySelector(GALLERY);
    if (!gallery) return; // podgląd zamknięty, nic nie robimy

    const button = findButton(gallery, event.key);
    if (!button) return;

    // Strzałki nie mają w podglądzie własnej funkcji, ale na wszelki wypadek
    // przechwytujemy zdarzenie, żeby nie przewinąć zdjęcia dwa razy,
    // gdyby serwis kiedyś dodał natywną obsługę klawiatury.
    event.preventDefault();
    event.stopImmediatePropagation();
    button.click();
  }

  window.addEventListener('keydown', onKeyDown, true);
})();

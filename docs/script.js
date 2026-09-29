(() => {
  'use strict';
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const activate = (tab, focus = false) => {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        panel.hidden = !selected;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) {
          event.preventDefault();
          activate(tabs[target], true);
        }
      });
    });
  });

  const dialog = document.querySelector('.figure-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogTitle = document.getElementById('dialog-title');
  let returnFocus;
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      if (!dialog || typeof dialog.showModal !== 'function') return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      const original = link.querySelector('img');
      dialogImage.src = link.href;
      dialogImage.alt = original.alt;
      dialogTitle.textContent = link.closest('figure').querySelector('figcaption > span').textContent;
      dialog.showModal();
      dialog.querySelector('.dialog-media').scrollTo(0, 0);
    });
  });
  document.getElementById('close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { if (returnFocus) returnFocus.focus({preventScroll:true}); });

  const copy = document.getElementById('copy-citation');
  const status = document.getElementById('copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
      status.textContent = 'BibTeX copied.';
      copy.textContent = 'Copied';
      window.setTimeout(() => {copy.textContent = 'Copy BibTeX';}, 2000);
    } catch (_) {
      status.textContent = 'Copy was unavailable. Select the citation above to copy it manually.';
    }
  });
})();

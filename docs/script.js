(() => {
  'use strict';
  const toc = document.querySelector('.page-toc');
  if (toc) {
    const compact = window.matchMedia('(max-width: 1279px)');
    const summary = toc.querySelector('summary');
    const links = Array.from(toc.querySelectorAll('a'));
    const sections = links.map(link => document.getElementById(link.hash.slice(1)));
    const setLayout = () => { toc.open = !compact.matches; };
    setLayout();
    compact.addEventListener('change', setLayout);

    links.forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (compact.matches) {
        toc.open = false;
        summary.focus({preventScroll:true});
      }
    }));
    document.addEventListener('click', event => {
      if (compact.matches && !toc.contains(event.target)) toc.open = false;
    });
    toc.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        toc.open = false;
        summary.focus({preventScroll:true});
      }
    });

    let pending = false;
    const updateCurrent = () => {
      pending = false;
      let current = 0;
      const threshold = Math.min(120, window.innerHeight * .2);
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= threshold) current = index;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = links.length - 1;
      links.forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const scheduleUpdate = () => {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(updateCurrent);
      }
    };
    window.addEventListener('scroll', scheduleUpdate, {passive:true});
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    updateCurrent();
  }

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
      dialogImage.alt = original ? original.alt : (link.dataset.figureAlt || 'Paper figure');
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

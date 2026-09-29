(() => {
  'use strict';

  const figure = document.querySelector('[data-overview-animation]');
  if (!figure) return;

  const frame = figure.querySelector('.overview-animation-frame');
  const object = figure.querySelector('.overview-animation-object');
  const fallback = figure.querySelector('.overview-static-fallback');
  const controls = figure.querySelector('.overview-animation-controls');
  const status = figure.querySelector('.overview-animation-status');
  const toggle = document.getElementById('overview-toggle');
  const replay = document.getElementById('overview-replay');
  const showAll = document.getElementById('overview-show-all');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let animations = [];
  let svgDocument;
  let timeline;
  let initialized = false;
  let initializing = false;
  let failed = false;
  let manuallyPaused = false;
  let fullFigure = false;
  let inView = false;
  let observer;

  const setStatic = enabled => {
    frame.classList.toggle('is-ready', !enabled);
    fallback.hidden = !enabled;
    object.setAttribute('aria-hidden', String(enabled));
    controls.hidden = enabled;
    frame.setAttribute('aria-busy', 'false');
  };

  const setTime = time => {
    animations.forEach(animation => {
      animation.pause();
      animation.currentTime = time;
    });
  };

  const updatePlayback = () => {
    if (!initialized || failed || reducedMotion.matches) return;
    const playing = !manuallyPaused && !fullFigure && inView && !document.hidden;
    animations.forEach(animation => {
      if (playing) animation.play();
      else animation.pause();
    });
    toggle.textContent = playing ? 'Pause' : 'Play';
    toggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} overview animation`);
  };

  const showFallback = () => {
    if (failed) return;
    failed = true;
    window.clearTimeout(loadTimeout);
    animations.forEach(animation => animation.pause());
    if (observer) observer.disconnect();
    setStatic(true);
  };

  // Visibility:hidden keeps the SVG renderable while its clocks are synchronized.
  const loadTimeout = window.setTimeout(showFallback, 12000);
  frame.setAttribute('aria-busy', 'true');
  if (reducedMotion.matches) setStatic(true);

  const timelineReady = fetch(figure.dataset.timeline)
    .then(response => {
      if (!response.ok) throw new Error('Timeline unavailable');
      return response.json();
    })
    .then(value => {
      if (!Number.isFinite(value.durationMs) || !Number.isFinite(value.completeAtMs)
          || value.completeAtMs < 0 || value.completeAtMs + 100 >= value.durationMs) {
        throw new Error('Invalid overview timeline');
      }
      return value;
    })
    .catch(() => {
      showFallback();
      return null;
    });

  const prepareAnimations = () => {
    // A media-query change can recreate CSSAnimation objects in the SVG document.
    animations = svgDocument.getAnimations();
    if (!animations.length) throw new Error('Overview animation unavailable');
    setTime(0);
    fullFigure = false;
    setStatic(false);
    updatePlayback();
  };

  const initialize = async () => {
    if (initializing || initialized || failed) return;
    initializing = true;
    try {
      svgDocument = object.contentDocument;
      if (!svgDocument || svgDocument.documentElement.localName !== 'svg'
          || typeof svgDocument.getAnimations !== 'function') {
        throw new Error('SVG animation control unavailable');
      }
      animations = svgDocument.getAnimations();
      setTime(0);
      timeline = await timelineReady;
      if (!timeline || failed) return;
      initialized = true;
      window.clearTimeout(loadTimeout);
      if (reducedMotion.matches) setStatic(true);
      else prepareAnimations();
    } catch (_) {
      showFallback();
    } finally {
      initializing = false;
    }
  };

  const restart = () => {
    setTime(0);
    fullFigure = false;
    manuallyPaused = false;
    updatePlayback();
  };

  toggle.addEventListener('click', () => {
    if (!initialized || failed) return;
    if (fullFigure) restart();
    else {
      manuallyPaused = toggle.textContent === 'Pause';
      updatePlayback();
    }
    status.textContent = manuallyPaused ? 'Overview animation paused.'
      : inView && !document.hidden ? 'Overview animation playing.' : 'Overview animation will play when visible.';
  });

  replay.addEventListener('click', () => {
    if (!initialized || failed) return;
    restart();
    status.textContent = 'Overview animation restarted.';
  });

  showAll.addEventListener('click', () => {
    if (!initialized || failed) return;
    fullFigure = true;
    manuallyPaused = true;
    setTime(timeline.completeAtMs + 100);
    updatePlayback();
    status.textContent = 'Full overview shown. Animation paused.';
  });

  const checkViewport = () => {
    const bounds = frame.getBoundingClientRect();
    inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
    updatePlayback();
  };
  checkViewport();
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      updatePlayback();
    });
    observer.observe(frame);
  } else {
    window.addEventListener('scroll', checkViewport, {passive: true});
    window.addEventListener('resize', checkViewport);
  }
  document.addEventListener('visibilitychange', updatePlayback);

  const handleMotionPreference = () => {
    if (failed) return;
    if (reducedMotion.matches) {
      animations.forEach(animation => animation.pause());
      setStatic(true);
    } else if (initialized) {
      window.requestAnimationFrame(() => {
        try { prepareAnimations(); }
        catch (_) { showFallback(); }
      });
    }
  };
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', handleMotionPreference);
  } else {
    reducedMotion.addListener(handleMotionPreference);
  }

  object.addEventListener('load', initialize);
  object.addEventListener('error', showFallback);
  // A cached SVG can finish loading before this deferred controller runs.
  try {
    if (object.contentDocument?.documentElement.localName === 'svg'
        && object.contentDocument.readyState === 'complete') initialize();
  } catch (_) {
    showFallback();
  }
})();

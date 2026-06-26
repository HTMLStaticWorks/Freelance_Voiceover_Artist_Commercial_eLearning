/* 
  =========================================
  MAIN APPLICATION ENTRY (js/app.js)
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Audio Engine & SPA Router
  const audioEngine = new AudioEngine();
  const router = new Router(audioEngine);

  // Set initial global tracks list
  audioEngine.setTracksList(VO_DATA.demos);

  // Trigger routing lifecycle (renders current hash or defaults to #home)
  router.handleRouting();

  // 2. Custom Cursor coordinates tracker
  initCustomCursor();

  // 3. Mobile Navigation Hamburger logic
  initMobileMenu();

  // 4. Dark & Light Mode theme switcher
  initThemeSwitcher();

  // 5. Global Scroll listener for header blur adjustments
  initHeaderScroll();

  // 6. Fade out preloader screen
  initPreloader();

  // 7. Keyboard Accessibility listener (Global key triggers)
  initAccessibilityKeys(audioEngine);

  // 8. RTL Switcher logic
  initRtlSwitcher();

  // 9. Floating Scroll to Top button
  initScrollTopButton();
});

// --- Custom Cursor ---
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const glow = document.getElementById('custom-cursor-glow');
  if (!cursor || !glow) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation ticks for smooth lag-following effect
  const tickCursor = () => {
    // Quick trace for dot
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Slower trace for outer ring
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(tickCursor);
  };
  tickCursor();

  // Highlight classes on hover
  const updateHoverElements = () => {
    const hoverTargets = 'a, button, select, input, textarea, .faq-trigger, [role="button"], .player-timeline';
    document.body.addEventListener('mouseenter', (e) => {
      if (e.target.matches && e.target.matches(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    }, true);

    document.body.addEventListener('mouseleave', (e) => {
      if (e.target.matches && e.target.matches(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    }, true);
  };
  updateHoverElements();
}

// --- Mobile Navigation ---
function initMobileMenu() {
  const burger = document.getElementById('hamburger-menu');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');
  
  if (!burger || !drawer) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
    }
  };

  burger.addEventListener('click', toggleDrawer);
  
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleDrawer);
  }

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
      toggleDrawer();
    }
  });

  // Support ESC keyboard exit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer();
    }
  });
}

// --- Theme Switcher ---
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  // Retrieve cached user preference
  const cachedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', cachedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Alert components that colors changed (e.g. redraw waveform states)
    window.dispatchEvent(new Event('themechange'));
  });

  // Redraw waveforms on theme toggle to maintain aesthetic contrast
  window.addEventListener('themechange', () => {
    document.querySelectorAll('.canvas-waveform').forEach((canvas, idx) => {
      const bars = JSON.parse(canvas.dataset.bars || '[]');
      const progress = 0; // Reset progress color draw
      
      const activeCtx = canvas.getContext('2d');
      if (bars.length > 0) {
        // Redraw waveform bars with new theme background contrasts
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        activeCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < bars.length; i++) {
          const barHeight = bars[i];
          const x = i * (4 + 3);
          const y = (canvas.height - barHeight) / 2;
          
          activeCtx.fillStyle = isDark ? 'rgba(248, 250, 252, 0.15)' : 'rgba(15, 23, 42, 0.15)';
          activeCtx.beginPath();
          activeCtx.roundRect(x, y, 4, barHeight, 2);
          activeCtx.fill();
        }
      }
    });
  });
}

// --- Header Scroll Blur ---
function initHeaderScroll() {
  const header = document.getElementById('global-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// --- Preloader screen ---
function initPreloader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 800); // Give enough visual cue to the waveform animation
  });

  // Fallback if load event doesn't trigger
  setTimeout(() => {
    if (!loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 2000);
}

// --- Accessibility Keys (Global Keyboard Shortcuts) ---
function initAccessibilityKeys(audioEngine) {
  document.addEventListener('keydown', (e) => {
    // Avoid interrupting forms typing
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
      return;
    }

    switch (e.code) {
      case 'Space':
        e.preventDefault(); // prevent page scroll
        audioEngine.togglePlay();
        break;
      case 'ArrowRight':
        if (e.ctrlKey) {
          audioEngine.playNext();
        }
        break;
      case 'ArrowLeft':
        if (e.ctrlKey) {
          audioEngine.playPrevious();
        }
        break;
      case 'KeyM':
        audioEngine.toggleMute();
        break;
    }
  });
}

// --- RTL Switcher ---
function initRtlSwitcher() {
  const toggleBtn = document.getElementById('rtl-toggle-btn');
  if (!toggleBtn) return;

  // Retrieve cached user preference
  const cachedDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', cachedDir);

  toggleBtn.addEventListener('click', () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
  });
}

// --- Floating Scroll to Top ---
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const audioPlayer = document.getElementById('global-audio-player');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Shift up if the global audio player is currently active
    if (audioPlayer && audioPlayer.classList.contains('active')) {
      scrollTopBtn.style.bottom = '120px';
    } else {
      scrollTopBtn.style.bottom = '30px';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 
  =========================================
  SPA CLIENT ROUTER (js/router.js)
  =========================================
*/

class Router {
  constructor(audioEngine) {
    this.appView = document.getElementById('app-view');
    this.audioEngine = audioEngine;
    
    // Testimonials slider timer reference
    this.sliderInterval = null;

    // Listen to hash changes
    window.addEventListener('hashchange', () => this.handleRouting());
    
    // Initialize navigation clicks
    this.initNavigation();
  }

  initNavigation() {
    // Intercept clicks on links that are relative (hash links)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        // Close mobile drawer if open
        const drawer = document.getElementById('mobile-drawer');
        const burger = document.getElementById('hamburger-menu');
        if (drawer && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Handle routing by parsing hash
  handleRouting() {
    let defaultHash = 'home';
    if (window.location.pathname.endsWith('home-2.html')) {
      defaultHash = 'home2';
    }
    let hash = window.location.hash.slice(1) || defaultHash;

    
    // Parse query params (e.g. #audition?pkg=eLearning)
    let params = {};
    if (hash.includes('?')) {
      const parts = hash.split('?');
      hash = parts[0];
      const queryStr = parts[1];
      queryStr.split('&').forEach(pair => {
        const item = pair.split('=');
        params[decodeURIComponent(item[0])] = decodeURIComponent(item[1] || '');
      });
    }

    // Match hash with view template
    const renderer = VO_VIEWS[hash];
    if (renderer) {
      this.transitionView(renderer, hash, params);
    } else {
      // Fallback
      window.location.hash = '#home';
    }
  }

  // Animate page transitions
  transitionView(renderer, hash, params) {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Inject compiled view string
    this.appView.innerHTML = renderer(params);

    // Sync active nav links
    this.updateActiveLinks(hash);

    // Initialize scripts for this view
    this.initViewScripts(hash, params);
  }

  updateActiveLinks(hash) {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const dataLink = link.dataset.link;
      if (dataLink === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initViewScripts(hash, params) {
    // 1. Always check and render any card waveforms in the view
    this.initWaveformsForView(hash);

    // 2. Initialize specific widgets
    switch (hash) {
      case 'home':
        this.initTestimonialsSlider();
        break;
      case 'home2':
        this.initHome2Scroller();
        break;
      case 'about':
        this.initFaqAccordion();
        break;
      case 'demos':
        this.initDemosFilterAndSearch();
        break;
      case 'audition':
        this.initAuditionForm(params);
        break;
      case 'contact':
        this.initContactForm();
        this.initStudioMapCanvas();
        break;
    }
    
    // Sync current audio player highlights for playing tracks
    this.audioEngine.updateCardUIActiveStates();
  }

  // Find all canvas waveform containers in current template and populate them
  initWaveformsForView(hash) {
    const canvases = this.appView.querySelectorAll('.canvas-waveform');
    
    // Feed data elements
    canvases.forEach((canvas, idx) => {
      const trackId = canvas.dataset.trackId;
      const demoTrack = VO_DATA.demos.find(d => d.id === trackId);
      
      if (demoTrack) {
        // Set properties first so the audio engine can identify it in the DOM
        canvas.id = canvas.id || `canvas-wave-${idx}`;
        // Render and draw
        this.audioEngine.renderStaticWaveform(canvas.id, idx + 3);
      }
    });

    // Wire up inline demo card triggers
    this.appView.querySelectorAll('.btn-demo-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const trackId = btn.dataset.trackId;
        const track = VO_DATA.demos.find(d => d.id === trackId);
        
        if (track) {
          // Pass the contextual track list to the audio engine so "Next/Prev" keys work in that scope
          if (hash === 'demos') {
            // Demos view list (potentially filtered)
            const filteredCards = Array.from(document.querySelectorAll('.demo-list-card:not(.hidden) .btn-demo-trigger'));
            const filteredTracks = filteredCards.map(c => VO_DATA.demos.find(t => t.id === c.dataset.trackId)).filter(Boolean);
            this.audioEngine.setTracksList(filteredTracks);
          } else {
            // Default global tracklist
            this.audioEngine.setTracksList(VO_DATA.demos);
          }
          
          this.audioEngine.loadTrack(track);
        }
      });
    });
  }

  // --- Widget: Testimonials Slider ---
  initTestimonialsSlider() {
    const slider = document.getElementById('testimonials-slider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    if (!slider || dots.length === 0) return;

    let currentIndex = 0;
    const slidesCount = dots.length;

    // Clear previous timer if running
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }

    const goToSlide = (idx) => {
      currentIndex = idx;
      // Scroll slider horizontally
      const slideWidth = slider.querySelector('.testimonial-slide').clientWidth;
      slider.scrollTo({
        left: slideWidth * idx,
        behavior: 'smooth'
      });

      // Update dots active class
      dots.forEach((dot, dIdx) => {
        if (dIdx === idx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    // Auto rotate every 6s
    this.sliderInterval = setInterval(() => {
      let nextIdx = (currentIndex + 1) % slidesCount;
      goToSlide(nextIdx);
    }, 6000);

    // Dot clicks
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.dataset.index);
        goToSlide(targetIdx);
      });
    });
  }

  // --- Widget: Home2 Recent Campaigns Horizontal Scroller ---
  initHome2Scroller() {
    const leftBtn = document.getElementById('slide-left-btn');
    const rightBtn = document.getElementById('slide-right-btn');
    const container = document.getElementById('campaigns-scroll-container');
    
    if (!leftBtn || !rightBtn || !container) return;
    
    leftBtn.addEventListener('click', () => {
      container.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    });
    
    rightBtn.addEventListener('click', () => {
      container.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    });
  }

  // --- Widget: FAQ Accordion ---
  initFaqAccordion() {
    const faqItems = this.appView.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
          otherItem.querySelector('.faq-icon').textContent = '+';
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          item.querySelector('.faq-icon').textContent = '−';
        }
      });
    });
  }

  // --- Widget: Voice Demos View filtering and search ---
  initDemosFilterAndSearch() {
    const listContainer = document.getElementById('demos-list-grid');
    if (!listContainer) return;

    // Load initial HTML demo list cards
    listContainer.innerHTML = VO_DATA.demos.map(demo => VO_VIEWS.renderDemoCard(demo)).join('');
    
    // Bind waveforms
    this.initWaveformsForView('demos');

    const searchInput = document.getElementById('demo-search-input');
    const filterButtons = document.querySelectorAll('.category-filters-wrapper .filter-btn');

    let activeCategory = 'all';
    let searchQuery = '';

    const filterDemos = () => {
      const cards = listContainer.querySelectorAll('.demo-list-card');
      
      cards.forEach(card => {
        const cat = card.dataset.category;
        const textContent = card.innerText.toLowerCase();
        
        const matchesCategory = (activeCategory === 'all' || cat === activeCategory);
        const matchesSearch = textContent.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    // Filter Buttons binding
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        filterDemos();
      });
    });

    // Search bar binding
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterDemos();
    });
  }

  // --- Widget: Audition Request Form validations & alerts ---
  initAuditionForm(params) {
    const form = document.getElementById('audition-request-form');
    if (!form) return;

    // Preset values if landing from package CTA links (e.g. #audition?pkg=Corporate)
    if (params.pkg) {
      const select = document.getElementById('aud-project');
      if (select) {
        if (params.pkg.toLowerCase().includes('corporate')) {
          select.value = 'corporate';
        } else if (params.pkg.toLowerCase().includes('elearning')) {
          select.value = 'elearning';
        } else if (params.pkg.toLowerCase().includes('commercial')) {
          select.value = 'commercial';
        } else if (params.pkg.toLowerCase().includes('audiobook')) {
          select.value = 'audiobook';
        }
      }
    }

    // Set minimal date selector limit to today
    const dateInput = document.getElementById('aud-deadline');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    // File upload label update logic
    const fileInput = document.getElementById('aud-file');
    const fileLabel = document.getElementById('file-upload-label');
    if (fileInput && fileLabel) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          fileLabel.innerHTML = `File selected: <strong>${fileInput.files[0].name}</strong>`;
        }
      });
    }

    // Form submission validation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let hasError = false;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        const grp = input.closest('.form-group');
        if (!input.value.trim()) {
          grp.classList.add('error');
          hasError = true;
        } else {
          grp.classList.remove('error');
          grp.classList.add('success');
        }

        // Standard Email formatting verification
        if (input.type === 'email' && input.value) {
          const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailReg.test(input.value)) {
            grp.classList.add('error');
            grp.querySelector('.validation-message').textContent = 'Please enter a valid email format';
            hasError = true;
          }
        }
      });

      if (!hasError) {
        this.triggerFormSuccessAnimation('Audition Request Received! We will review your script and send the demo file shortly.');
        form.reset();
        fileLabel.innerHTML = `Drag & drop your script here or <span>browse</span>`;
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
      }
    });

    // Remove error class on keypress
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const grp = input.closest('.form-group');
        grp.classList.remove('error');
      });
    });
  }

  // --- Widget: Contact Form ---
  initContactForm() {
    const form = document.getElementById('contact-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let hasError = false;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        const grp = input.closest('.form-group');
        if (!input.value.trim()) {
          grp.classList.add('error');
          hasError = true;
        } else {
          grp.classList.remove('error');
          grp.classList.add('success');
        }

        if (input.type === 'email' && input.value) {
          const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailReg.test(input.value)) {
            grp.classList.add('error');
            grp.querySelector('.validation-message').textContent = 'Please enter a valid email format';
            hasError = true;
          }
        }
      });

      if (!hasError) {
        this.triggerFormSuccessAnimation('Inquiry Sent! Aura Studio will respond within 4 business hours.');
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
      }
    });

    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const grp = input.closest('.form-group');
        grp.classList.remove('error');
      });
    });
  }

  triggerFormSuccessAnimation(msg) {
    const toast = document.getElementById('notification-toast');
    if (!toast) return;

    toast.querySelector('.toast-message').textContent = msg;
    toast.classList.add('show');

    // Trigger floating sparkles or sounds if desired
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // --- Widget: Contact Map vector grid drawing ---
  initStudioMapCanvas() {
    const canvas = document.getElementById('studio-vector-map');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;

    // Draw high tech sci-fi layout representing New York studio grid
    ctx.clearRect(0, 0, width, height);
    
    const drawGrid = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      ctx.fillStyle = isDark ? '#090a0f' : '#f1f5f9';
      ctx.fillRect(0, 0, width, height);

      // Grid points
      ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)';
      const step = 20;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw abstract radar scanning circles from studio node (center)
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.7;
      
      // Scanning wave animation timer ticks
      const t = (Date.now() / 1500) % 1;
      
      ctx.strokeStyle = isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      
      // Draw 3 concentric ripples
      for (let r = 0; r < 3; r++) {
        const radiusVal = ((t + r / 3) % 1) * maxRadius;
        const opacityVal = 1 - (radiusVal / maxRadius);
        
        ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${opacityVal * 0.4})` : `rgba(59, 130, 246, ${opacityVal * 0.4})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radiusVal, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw glowing central node (studio)
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 15);
      glowGrad.addColorStop(0, '#06b6d4'); // Cyan center
      glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)'); // Fades out
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Loop map scan animation if contact view is active
      if (document.getElementById('studio-vector-map')) {
        requestAnimationFrame(drawGrid);
      }
    };

    drawGrid();
  }
}

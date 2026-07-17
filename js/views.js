/* 
  =========================================
  SPA VIEW TEMPLATES (js/views.js)
  =========================================
*/

const VO_VIEWS = {
  // Helper to generate a premium unique glass SVG cover image for cards
  getCardSvgCover(type, title, primaryColor = '#06b6d4', secondaryColor = '#8b5cf6') {
    let iconPath = '';
    
    // Choose icon based on type
    switch (type) {
      case 'commercial': // shopping cart or price tag
        iconPath = `<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`;
        break;
      case 'elearning': // graduation cap
        iconPath = `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>`;
        break;
      case 'corporate': // brief case or office
        iconPath = `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`;
        break;
      case 'ivr': // telephone or nodes
        iconPath = `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`;
        break;
      case 'explainer': // video camera
        iconPath = `<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>`;
        break;
      case 'audiobooks': // open book
        iconPath = `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`;
        break;
      case 'characters': // game shield / mask
        iconPath = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`;
        break;
      case 'promos': // megaphone
        iconPath = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
        break;
      case 'services': // sliders or gear
        iconPath = `<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>`;
        break;
      default: // soundwave icon
        iconPath = `<path d="M12 2v20M17 5v14M22 9v6M7 7v10M2 10v4"/>`;
    }

    return `
      <svg class="card-img" width="100%" height="100%" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.15" />
            <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.05" />
          </linearGradient>
          <linearGradient id="glow-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
          <pattern id="noise-${type}" width="100" height="100" patternUnits="userSpaceOnUse">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
          </pattern>
        </defs>
        <!-- Background base -->
        <rect width="100%" height="100%" fill="#0a0b10" />
        <rect width="100%" height="100%" fill="url(#grad-${type})" />
        
        <!-- Tech grid lines -->
        <g stroke="#ffffff" stroke-opacity="0.02" stroke-width="1">
          <line x1="0" y1="50" x2="400" y2="50" />
          <line x1="0" y1="100" x2="400" y2="100" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="200" x2="400" y2="200" />
          <line x1="80" y1="0" x2="80" y2="250" />
          <line x1="160" y1="0" x2="160" y2="250" />
          <line x1="240" y1="0" x2="240" y2="250" />
          <line x1="320" y1="0" x2="320" y2="250" />
        </g>
        
        <!-- Noise Texture Overlay -->
        <rect width="100%" height="100%" fill="url(#noise-${type})" opacity="0.3"/>
        
        <!-- Glowing center circle -->
        <circle cx="200" cy="125" r="70" fill="url(#grad-${type})" filter="blur(20px)" />
        <circle cx="200" cy="125" r="50" fill="none" stroke="url(#glow-${type})" stroke-width="1" stroke-opacity="0.3" />
        <circle cx="200" cy="125" r="60" fill="none" stroke="url(#glow-${type})" stroke-dasharray="5,10" stroke-width="1" stroke-opacity="0.2" />

        <!-- Floating audio waves background -->
        <path d="M 50 125 Q 125 75 200 125 T 350 125" fill="none" stroke="url(#glow-${type})" stroke-width="1.5" stroke-opacity="0.2"/>
        <path d="M 50 125 Q 125 175 200 125 T 350 125" fill="none" stroke="url(#glow-${type})" stroke-width="1" stroke-dasharray="2,4" stroke-opacity="0.15"/>

        <!-- Graphic Icon -->
        <g transform="translate(176, 101)" stroke="url(#glow-${type})" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <g transform="scale(2)">
            ${iconPath}
          </g>
        </g>
        
        <!-- Typography tag inside vector -->
        <text x="200" y="210" fill="#ffffff" fill-opacity="0.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="2" text-anchor="middle">${title.toUpperCase()}</text>
      </svg>
    `;
  },

  // 1. HOME VIEW
  home() {
    return `
      <section class="page-view home-view">
        <!-- Hero Section -->
        <div class="hero-banner">
          <div class="hero-container">
            <div class="hero-text-content">
              <span class="hero-badge">Studio-Quality Voiceover</span>
              <h1>The Premium Sound Your Brand Demands</h1>
              <p class="hero-lead">I voice high-impact commercials, engaging eLearning courses, and professional corporate narration that connects, converts, and builds deep audience trust.</p>
              
              <div class="hero-ctas">
                <a href="#demos" class="btn btn-primary">Listen to Demos</a>
                <a href="#audition" class="btn btn-secondary">Request Free Audition</a>
              </div>
            </div>
            
            <div class="hero-visual-wrapper">
              <div class="hero-glow-card frosted">
                <img src="assets/images/studio_mic.png" alt="High-end Neumann studio microphone" class="hero-studio-img">
                <div class="waveform-float-graphic">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <!-- Featured Quick Demo card -->
                <div class="hero-mini-player frosted">
                  <button class="btn-hero-play btn-demo-trigger" data-track-id="demo-commercial-1" aria-label="Play commercial reel">
                    <svg class="play-icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg class="pause-icon-svg hidden" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  </button>
                  <div>
                    <h5>Featured Reel</h5>
                    <p>Commercial VO • 0:30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trusted By Section -->
        <div class="trusted-by">
          <div class="container-width">
            <h4 class="section-sub">Trusted by Elite Brands</h4>
            <div class="logo-marquee">
              <div class="logo-track">
                <span>VOLVO</span>
                <span>MICROSOFT</span>
                <span>AUDIBLE</span>
                <span>SPOTIFY</span>
                <span>SIEMENS</span>
                <span>AIRBNB</span>
                <!-- Duplicate for infinite loop effect -->
                <span>VOLVO</span>
                <span>MICROSOFT</span>
                <span>AUDIBLE</span>
                <span>SPOTIFY</span>
                <span>SIEMENS</span>
                <span>AIRBNB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Voice Demos Section -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header" style="max-width: 800px;">
              <div class="accent-badge-premium" style="margin: 0 auto 20px;">
                <span class="pulse-dot"></span>
                <span class="badge-text">Featured Work</span>
              </div>
              <h2 class="gradient-title-featured" style="text-align: center; margin-bottom: 20px;">Listen to the Range</h2>
              <p class="featured-header-desc" style="text-align: center; max-width: 700px; margin: 0 auto 32px;">Hear why top global brands and producers trust Aura for high-end audio delivery. Filter our standard-setting reels to find the perfect tone for your project.</p>
              
              <div class="featured-stats-row" style="justify-content: center; max-width: 600px; margin: 0 auto;">
                <div class="stat-pill">
                  <span class="stat-value">100+</span>
                  <span class="stat-label">Reels</span>
                </div>
                <div class="stat-pill">
                  <span class="stat-value">-60dB</span>
                  <span class="stat-label">Noise Floor</span>
                </div>
                <div class="stat-pill">
                  <span class="stat-value">99.8%</span>
                  <span class="stat-label">On-Time</span>
                </div>
              </div>
            </div>
            
            <div class="card-grid-featured">
              <!-- Demo 1 -->
              <div class="card home-demo-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/next_gen_automotive.png" alt="Next-Gen Automotive" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <span class="card-category">Commercial</span>
                  <h3 class="card-title-fixed">Next-Gen Automotive</h3>
                  <p class="card-desc">Gritty commercial campaign voicing next-gen electric SUV slots.</p>
                  
                  <div class="inline-audio-wave">
                    <canvas class="canvas-waveform" data-track-id="demo-commercial-1"></canvas>
                  </div>
                  
                  <div class="card-action">
                    <button class="btn btn-primary btn-demo-trigger" data-track-id="demo-commercial-1">
                      <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>Play Sample</span>
                    </button>
                    <span class="demo-duration-badge">0:30</span>
                  </div>
                </div>
              </div>

              <!-- Demo 2 -->
              <div class="card home-demo-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/elearning_robotics.png" alt="Advanced Robotics Lecture" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <span class="card-category">eLearning</span>
                  <h3 class="card-title-fixed">Advanced Robotics Lecture</h3>
                  <p class="card-desc">Warm, highly engaging, and clear pedagogical tone for professional training.</p>
                  
                  <div class="inline-audio-wave">
                    <canvas class="canvas-waveform" data-track-id="demo-elearning-1"></canvas>
                  </div>
                  
                  <div class="card-action">
                    <button class="btn btn-primary btn-demo-trigger" data-track-id="demo-elearning-1">
                      <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>Play Sample</span>
                    </button>
                    <span class="demo-duration-badge">2:15</span>
                  </div>
                </div>
              </div>

              <!-- Demo 3 -->
              <div class="card home-demo-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/global_tech_keynote.jpg" alt="Global Tech Keynote" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <span class="card-category">Corporate</span>
                  <h3 class="card-title-fixed">Global Tech Keynote</h3>
                  <p class="card-desc">Inspiring corporate narration briefing for major summit introductions.</p>
                  
                  <div class="inline-audio-wave">
                    <canvas class="canvas-waveform" data-track-id="demo-corporate-1"></canvas>
                  </div>
                  
                  <div class="card-action">
                    <button class="btn btn-primary btn-demo-trigger" data-track-id="demo-corporate-1">
                      <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>Play Sample</span>
                    </button>
                    <span class="demo-duration-badge">1:15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Voice Categories Section -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Voice Capabilities</span>
              <h2>Professional Services Coverage</h2>
              <p>Delivering high-end studio narration customized for diverse modern content distribution networks.</p>
            </div>
            
            <div class="card-grid">
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/commercial_luxury.png" alt="Commercial" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>Commercial</h3>
                  <p>Command attention in web promos, television commercials, and broadcast radio campaigns.</p>
                </div>
              </div>
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/elearning_onboarding.png" alt="eLearning" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>eLearning</h3>
                  <p>Facilitate understanding in corporate tutorials, compliance seminars, and language courses.</p>
                </div>
              </div>
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/corporate_keynote.png" alt="Corporate" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>Corporate</h3>
                  <p>Represent your brand mission in keynote briefings, internal audits, and promotional campaigns.</p>
                </div>
              </div>
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/ivr_telecom.png" alt="IVR & Systems" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>IVR & Systems</h3>
                  <p>Welcome callers with elegant prompts, hold narratives, and automated navigation pathways.</p>
                </div>
              </div>
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/explainer_saas.png" alt="Explainer Videos" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>Explainer Videos</h3>
                  <p>Engage viewers with clear, friendly narration for product walk-throughs and SaaS demos.</p>
                </div>
              </div>
              <div class="card cap-card">
                <div class="card-img-wrapper">
                  <img src="assets/images/audiobook_art.png" alt="Audiobooks & Narration" class="card-img" loading="lazy">
                </div>
                <div class="card-body">
                  <h3>Audiobooks & Narration</h3>
                  <p>Bring long-form stories and literary characters to life with rich, immersive vocal performances.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Why Hire Me Section -->
        <div class="section-padding">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-image-wrapper">
                <img src="assets/images/voice_artist_acting.png" alt="Professional voice artist speaking passionately in booth" class="split-photo">
              </div>
              <div class="split-text-content">
                <span class="accent-title">Elite Partnership</span>
                <h2>Why Collaborate with Aura Voice?</h2>
                <p>Bringing a script to life requires more than just reading lines. It requires understanding brand intent, target audience demographics, and precise emotional inflection.</p>
                
                <ul class="check-list">
                  <li><strong>Broadcast-Ready Master</strong>: Clean, pre-edited sound files recorded in a double-walled acoustic booth.</li>
                  <li><strong>24-Hour Delivery</strong>: Prompt turnaround on scripts up to 1,000 words.</li>
                  <li><strong>Source-Connect Directed</strong>: Direct me live via digital links for real-time collaboration.</li>
                  <li><strong>Flexible Buyout Rights</strong>: Clear, straightforward licensing packages without hidden renewals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Studio Quality Section -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-text-content">
                <span class="accent-title">Acoustic Specs</span>
                <h2>Pristine Recording Environment</h2>
                <p>Equipped with industry-standard studio hardware and sound isolating booths to ensure a crystal clear noise floor of -60dB.</p>
                
                <table class="studio-table">
                  <tr>
                    <th>Microphones</th>
                    <td>Neumann U87 Ai, Sennheiser MKH416</td>
                  </tr>
                  <tr>
                    <th>Audio Interface</th>
                    <td>Universal Audio Apollo Twin MkII</td>
                  </tr>
                  <tr>
                    <th>Booth Specs</th>
                    <td>Double-walled acoustic isolation booth (-60dB floor)</td>
                  </tr>
                  <tr>
                    <th>Remote Link</th>
                    <td>Source-Connect Standard, Zoom, ipDTL</td>
                  </tr>
                  <tr>
                    <th>DAW Software</th>
                    <td>Pro Tools Ultimate, Adobe Audition</td>
                  </tr>
                </table>
              </div>
              <div class="split-image-wrapper">
                <img src="assets/images/recording_booth.png" alt="Soundproof vocal recording studio booth" class="split-photo">
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Projects & Awards -->
        <div class="section-padding">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-image-wrapper">
                <img src="assets/images/audio_workstation.png" alt="Audio editor workstation DAW screens" class="split-photo">
              </div>
              <div class="split-text-content">
                <span class="accent-title">Track Record</span>
                <h2>Recent Bookings & Industry Accolades</h2>
                <p>Proud partner to global agencies and indie developers alike. Consistently striving for acoustic excellence across every booking.</p>
                
                <div class="awards-grid">
                  <div class="award-item frosted">
                    <h4>🏆 Sovas Nominee</h4>
                    <p>Outstanding Commercial VO (2025)</p>
                  </div>
                  <div class="award-item frosted">
                    <h4>🎓 ACX Approved</h4>
                    <p>Narrator & Engineer Seal of Quality</p>
                  </div>
                  <div class="award-item frosted">
                    <h4>🎤 One Voice Finalist</h4>
                    <p>Best Corporate Narration (2024)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Testimonials Slider -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Reviews</span>
              <h2>Client Endorsements</h2>
            </div>
            
            <div class="testimonials-slider-wrapper">
              <div class="testimonials-slider" id="testimonials-slider">
                <!-- Testimonials will be injected or slid by slider JS -->
                ${VO_DATA.testimonials.map((t, idx) => `
                  <div class="testimonial-slide frosted ${idx === 0 ? 'active' : ''}">
                    <div class="rating-stars">${'★'.repeat(t.rating)}</div>
                    <p class="quote">"${t.quote}"</p>
                    <div class="author-info">
                      <strong>${t.author}</strong>
                      <span>${t.role}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="slider-dots" id="slider-dots">
                ${VO_DATA.testimonials.map((_, idx) => `
                  <span class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Banner -->
        <div class="section-padding">
          <div class="container-width">
            <div class="cta-banner-card frosted">
              <h2>Need a Custom Audition for Your Script?</h2>
              <p>Send me a 100-word excerpt of your script, and I will record a custom audition sample in my studio for free within 24 hours.</p>
              <a href="#audition" class="btn btn-accent">Request Free Audition</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 1b. HOME 2 VIEW (EDITORIAL BENTO LAYOUT)
  home2() {
    return `
      <section class="page-view home2-view">
        <!-- Section 1: Bento Hero Banner -->
        <div class="hero-banner" style="min-height: 85vh; padding-top: 40px;">
          <div class="hero-container" style="gap:40px; align-items:center;">
            <div class="hero-text-content">
              <span class="hero-badge" style="background:rgba(139, 92, 246, 0.08); border-color:rgba(139, 92, 246, 0.2); color:var(--primary-purple);">Volume II / Editorial Portfolio</span>
              <h1 style="font-size: clamp(2.3rem, 5vw, 3.8rem); line-height: 1.1; margin-bottom: 24px;">Where Voice Speaks & Sound Lingers.</h1>
              <p class="hero-lead" style="font-size: 1.15rem; max-width: 500px; color: var(--text-secondary); margin-bottom: 32px;">A premium auditory showcase presenting clean commercial narration, engaging eLearning tutorials, and remote directed acoustic studio specs.</p>
              <div class="hero-ctas">
                <a href="#demos" class="btn btn-primary">Begin Journey</a>
                <a href="#contact" class="btn btn-secondary">Book Studio</a>
              </div>
              <div class="hero-stats-mini" style="display:flex; gap:32px; margin-top:40px; border-top:1px solid var(--border-color); padding-top:24px;">
                <div>
                  <strong style="display:block; font-size:1.5rem; color:var(--text-primary); font-family:var(--font-secondary);">24h</strong>
                  <span style="font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">Turnaround</span>
                </div>
                <div>
                  <strong style="display:block; font-size:1.5rem; color:var(--text-primary); font-family:var(--font-secondary);">100%</strong>
                  <span style="font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">Studio Direct</span>
                </div>
                <div>
                  <strong style="display:block; font-size:1.5rem; color:var(--text-primary); font-family:var(--font-secondary);">-60dB</strong>
                  <span style="font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">Noise Floor</span>
                </div>
              </div>
            </div>
            <div class="hero-visual-wrapper">
              <div class="hero-glow-card frosted" style="aspect-ratio: 4 / 5; max-width:480px; width: 100%;">
                <img src="assets/images/headphones_desk.png" alt="Aesthetic studio headphone capture" class="hero-studio-img" style="height: 100%; border-radius: var(--radius-md);">
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Trusted By brand marquee -->
        <div class="trusted-by">
          <div class="container-width">
            <h4 class="section-sub">Corporate Collaborations</h4>
            <div class="logo-marquee">
              <div class="logo-track">
                <span>VOLVO</span>
                <span>MICROSOFT</span>
                <span>AUDIBLE</span>
                <span>SPOTIFY</span>
                <span>SIEMENS</span>
                <span>AIRBNB</span>
                <span>VOLVO</span>
                <span>MICROSOFT</span>
                <span>AUDIBLE</span>
                <span>SPOTIFY</span>
                <span>SIEMENS</span>
                <span>AIRBNB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Signature Directions categories interactive show rows -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Signature Directions</span>
              <h2>Voice Categories Index</h2>
              <p>Explore specialized voice directions tailored for commercial, training, and brand storytelling channels.</p>
            </div>
            
            <div style="display:flex; flex-direction:column; border-top: 1px solid var(--border-color); margin-top:40px;">
              <a href="#demos" class="nav-link" style="display:flex; justify-content:space-between; align-items:center; padding: 24px 0; border-bottom: 1px solid var(--border-color); font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight:var(--weight-h2); text-decoration:none; color:var(--text-primary);">
                <span>Commercial Plating</span>
                <span style="font-size:0.9rem; color:var(--accent-cyan); font-family:var(--font-secondary);">01 / 18 Campaigns</span>
              </a>
              <a href="#demos" class="nav-link" style="display:flex; justify-content:space-between; align-items:center; padding: 24px 0; border-bottom: 1px solid var(--border-color); font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight:var(--weight-h2); text-decoration:none; color:var(--text-primary);">
                <span>eLearning & Education</span>
                <span style="font-size:0.9rem; color:var(--accent-cyan); font-family:var(--font-secondary);">02 / 35 Courses</span>
              </a>
              <a href="#demos" class="nav-link" style="display:flex; justify-content:space-between; align-items:center; padding: 24px 0; border-bottom: 1px solid var(--border-color); font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight:var(--weight-h2); text-decoration:none; color:var(--text-primary);">
                <span>Corporate Keynotes</span>
                <span style="font-size:0.9rem; color:var(--accent-cyan); font-family:var(--font-secondary);">03 / 14 Speeches</span>
              </a>
              <a href="#demos" class="nav-link" style="display:flex; justify-content:space-between; align-items:center; padding: 24px 0; border-bottom: 1px solid var(--border-color); font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight:var(--weight-h2); text-decoration:none; color:var(--text-primary);">
                <span>Audiobook & Narration</span>
                <span style="font-size:0.9rem; color:var(--accent-cyan); font-family:var(--font-secondary);">04 / 22 Books</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Section 4: Pure Sound Spec Spotlight -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-text-content" style="background:var(--card-bg); padding:40px; border-radius:var(--radius-lg); border:1px solid var(--glass-border);">
                <span class="accent-title">Core Ethos</span>
                <h3 style="font-size: 2.2rem; margin:16px 0 20px 0; font-weight:var(--weight-h2); line-height:1.2;">Pure Sound. No Distortion.</h3>
                <p style="font-size:1.05rem; color:var(--text-secondary); line-height:1.7;">Acoustic fidelity is our obsession. We record scripts inside a custom double-walled acoustic isolation booth that blocks external hums and resonances, measuring a clean -60dB noise floor. Every take is preserved in high-resolution, uncompressed audio, providing clean headroom for mixing engineers.</p>
              </div>
              <div class="split-text-content">
                <span class="accent-title">Mastering Specs</span>
                <h3 style="font-size: 1.8rem; margin:16px 0 20px 0; font-weight:var(--weight-h2);">Engineering Clean Dynamics</h3>
                <p style="color:var(--text-secondary);">We provide pre-cleaned vocal stems matching industry-standard EBU R128 (-23 LUFS) levels, removing mouth-clicks, pops, and sibilance so files can be dropped directly into editing workflows without delay.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 5: Interactive Audio Before / After comparison slider -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Audio Post-Processing</span>
              <h2>Raw Capture vs. Studio Master</h2>
              <p>Hear the difference of professional studio engineering. Click play and toggle between raw vocal track and mastered audio.</p>
            </div>
            
            <div class="card-grid" style="max-width: 800px; margin: 40px auto 0;">
              <!-- Raw card -->
              <div class="card home-demo-card">
                <div class="card-body">
                  <span class="card-category">Audio Track A</span>
                  <h3>Raw Microphone Intake</h3>
                  <p class="card-desc">Direct recording from capsule. Contains natural room hum, breaths, and volume spikes.</p>
                  <div class="inline-audio-wave">
                    <canvas class="canvas-waveform" data-track-id="demo-elearning-2"></canvas>
                  </div>
                  <div class="card-action">
                    <button class="btn btn-primary btn-demo-trigger" data-track-id="demo-elearning-2" style="background:var(--grad-electric); color:#0b0f19;">
                      <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>Play Raw</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Mastered card -->
              <div class="card home-demo-card active-glow" style="border-color:var(--primary-purple);">
                <div class="card-body">
                  <span class="card-category" style="color:var(--primary-purple);">Audio Track B</span>
                  <h3>Studio Master Output</h3>
                  <p class="card-desc">Fully mastered track. Equalized, gated for breath removal, normalized, and compressed.</p>
                  <div class="inline-audio-wave">
                    <canvas class="canvas-waveform" data-track-id="demo-commercial-2"></canvas>
                  </div>
                  <div class="card-action">
                    <button class="btn btn-primary btn-demo-trigger" data-track-id="demo-commercial-2" style="background:var(--grad-royal);">
                      <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      <span>Play Mastered</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Recent Brand Bookings (Horizontal scroll grid) -->
        <div class="section-padding section-alt" style="position: relative; overflow: hidden;">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Recent Campaigns</span>
              <h2>Horizontal Brand Showcases</h2>
              <p>Drag or scroll to explore our latest campaigns recorded in-studio.</p>
            </div>
            
            <div class="scroll-wrapper" style="position: relative;">
              <button class="scroll-btn scroll-btn-left" id="slide-left-btn" aria-label="Scroll left">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <div class="horizontal-scroll-container-flex" id="campaigns-scroll-container">
                <div class="horizontal-slide-item" style="flex:0 0 350px; background:var(--card-bg); padding:24px; border-radius:var(--radius-md); border:1px solid var(--glass-border); display:flex; flex-direction:column; align-items:center; text-align:center;">
                  <img src="assets/images/next_gen_automotive.png" alt="Commercial" style="width:100%; aspect-ratio:16/10; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:16px;">
                  <h4>Next-Gen Automotive</h4>
                  <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">Gritty commercial campaign voicing next-gen electric SUV slots.</p>
                </div>
                <div class="horizontal-slide-item" style="flex:0 0 350px; background:var(--card-bg); padding:24px; border-radius:var(--radius-md); border:1px solid var(--glass-border); display:flex; flex-direction:column; align-items:center; text-align:center;">
                  <img src="assets/images/elearning_art.png" alt="eLearning" style="width:100%; aspect-ratio:16/10; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:16px;">
                  <h4>University AI Course</h4>
                  <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">ENGAGING technical eLearning course detailing AI neural patterns.</p>
                </div>
                <div class="horizontal-slide-item" style="flex:0 0 350px; background:var(--card-bg); padding:24px; border-radius:var(--radius-md); border:1px solid var(--glass-border); display:flex; flex-direction:column; align-items:center; text-align:center;">
                  <img src="assets/images/global_tech_keynote.jpg" alt="Corporate" style="width:100%; aspect-ratio:16/10; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:16px;">
                  <h4>Global Tech Keynote</h4>
                  <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">Inspiring corporate narration briefing for major summit introductions.</p>
                </div>
              </div>
              
              <button class="scroll-btn scroll-btn-right" id="slide-right-btn" aria-label="Scroll right">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Section 7: Table of Awards & Certifications -->
        <div class="section-padding">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-text-content">
                <span class="accent-title">Achievements</span>
                <h3>Industry Endorsements</h3>
                <p>Awarded for excellence in acoustic fidelity, script delivery, and remote directed coaching.</p>
              </div>
              <div class="split-text-content" style="padding: 0; overflow-x: auto;">
                <table class="studio-table">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-color);">
                      <th style="padding: 12px; font-weight:var(--weight-bold);">Award / Event</th>
                      <th style="padding: 12px; font-weight:var(--weight-bold); color: var(--accent-cyan);">Year / Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 12px;">SOVAS Nominee - Commercial VO</td>
                      <td style="padding: 12px; color: var(--accent-cyan);">2025 - Elite</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 12px;">ACX Approved Narrator Seal</td>
                      <td style="padding: 12px; color: var(--accent-cyan);">2024 - Gold</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px;">One Voice Finalist - Keynote VO</td>
                      <td style="padding: 12px; color: var(--accent-cyan);">2023 - Master</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 8: Testimonials Columns -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Critique Columns</span>
              <h2>Client Testimonials</h2>
            </div>
            
            <div class="card-grid-center">
              ${VO_DATA.testimonials.slice(0, 3).map(t => `
                <div class="card testimonial-col-card">
                  <div class="card-body">
                    <span style="font-size:2.5rem; color:var(--accent-cyan); line-height:1; font-family:serif;">“</span>
                    <p style="font-style:italic; font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">${t.quote}</p>
                    <div style="margin-top:auto;">
                      <strong>${t.author}</strong>
                      <span style="display:block; font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; margin-top:4px;">${t.role}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Section 9: Bottom CTA -->
        <div class="section-padding">
          <div class="container-width">
            <div class="cta-banner-card frosted" style="background:var(--grad-aurora);">
              <h2 style="color:#ffffff;">Connect with Aura Studio Today</h2>
              <p style="color:rgba(255,255,255,0.8);">Schedule a live remote session or request a custom rate card tailored to your distribution buyout metrics.</p>
              <div class="hero-ctas" style="justify-content:center;">
                <a href="#audition" class="btn btn-white">Request Audition</a>
                <a href="#contact" class="btn btn-secondary" style="color:var(--text-primary);">Studio Inquiries</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 2. ABOUT VIEW
  about() {

    return `
      <section class="page-view about-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">The Voice Behind the Mic</span>
            <h1>Aura's Story</h1>
            <p class="hero-lead-center">A decade of theatrical training, professional audio engineering, and standard-setting vocal delivery.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-text-content">
                <h2>A Decade of Script Interpretation</h2>
                <p class="lead">My mission is simple: to make every listener lean in, absorb your content, and trust your brand's authority.</p>
                <p>With an educational foundation in classic theatrical performance and professional audio mastering, I bring a unique combination of dramatic script interpretation and pristine sound engineering to every microphone session.</p>
                <p>Whether voicing high-energy commercial campaigns or highly technical 20-hour compliance training courses, I deliver consistent pacing, immaculate pronunciation, and broadcast-ready audio directly from my custom acoustic booth.</p>
              </div>
              <div class="split-image-wrapper">
                <img src="assets/images/about_voice_artist.png" alt="Aura voicing script" class="split-photo">
              </div>
            </div>
          </div>
        </div>

        <!-- Journey Timeline -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Evolution</span>
              <h2>Professional Journey</h2>
            </div>
            
            <div class="timeline-container">
              <div class="timeline-line"></div>
              ${VO_DATA.timeline.map((item, idx) => `
                <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content frosted">
                    <span class="timeline-year">${item.year}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Studio & Equipment Detail -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Hardware</span>
              <h2>My Premium Studio Setup</h2>
              <p>Top-tier components ensuring maximum clarity, zero signal distortion, and prompt delivery options.</p>
            </div>
            
            <div class="card-grid-center">
              <div class="card eq-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </div>
                  <h3>Neumann U87 Ai</h3>
                  <p>The gold-standard vocal recording microphone. Delivers unparalleled presence and detail in the mid-range.</p>
                </div>
              </div>
              <div class="card eq-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                    </svg>
                  </div>
                  <h3>Apollo Twin Interface</h3>
                  <p>Universal Audio conversion with analog preamp simulation. Clean, noise-free gain modeling.</p>
                </div>
              </div>
              <div class="card eq-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 10a3 3 0 0 1 6 0" />
                      <path d="M12 13v3" />
                    </svg>
                  </div>
                  <h3>Acoustic Isolation</h3>
                  <p>Double-walled acoustic studio construction. Measures a -60dB noise floor, excluding all external room resonances.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recording Workflow -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Execution</span>
              <h2>Acoustic Workflow</h2>
              <p>Ensuring transparent communication and pristine deliveries from receiving scripts to finalized project masters.</p>
            </div>
            
            <div class="workflow-steps">
              <div class="wf-step">
                <div class="wf-num">1</div>
                <h3>Script Review</h3>
                <p>Analyzing text cues, target pacing, pronunciation guidelines, and accent nuances.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">2</div>
                <h3>Remote Direction</h3>
                <p>Optional real-time coaching via Source-Connect or ipDTL connection feeds.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">3</div>
                <h3>Precision Mastering</h3>
                <p>Comprehensive edit sweep: removing mouth noise, equalization, and leveling.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">4</div>
                <h3>File Delivery</h3>
                <p>Organized, high-resolution WAV/MP3 delivery in under 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQS Accordion -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">FAQ</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            
            <div class="faq-accordion-wrapper">
              ${VO_DATA.faqs.map(faq => `
                <div class="faq-item frosted">
                  <button class="faq-trigger">
                    <span>${faq.q}</span>
                    <span class="faq-icon">+</span>
                  </button>
                  <div class="faq-content">
                    <p>${faq.a}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="cta-banner-card frosted">
              <h2>Let's Voice Your Project Together</h2>
              <p>Ready to start? Send me script details and pricing packages or request a custom audit demo.</p>
              <a href="#audition" class="btn btn-primary">Book Audition</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 3. VOICE DEMOS VIEW
  demos() {
    return `
      <section class="page-view demos-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Acoustic Showreel</span>
            <h1>Voice Demos</h1>
            <p class="hero-lead-center">Listen, seek, and download my commercial and corporate narration reels.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            
            <!-- Category Filtering & Search Bar -->
            <div class="filter-search-container frosted">
              <div class="search-box-wrapper">
                <input type="text" id="demo-search-input" placeholder="Search demos by style, accent, keyword..." aria-label="Search Demos">
                <span class="search-icon">🔍</span>
              </div>
              
              <div class="category-filters-wrapper">
                <button class="filter-btn active" data-category="all">All Demos</button>
                <button class="filter-btn" data-category="commercial">Commercial</button>
                <button class="filter-btn" data-category="elearning">eLearning</button>
                <button class="filter-btn" data-category="corporate">Corporate</button>
                <button class="filter-btn" data-category="ivr">IVR</button>
                <button class="filter-btn" data-category="explainer">Explainer</button>
                <button class="filter-btn" data-category="audiobooks">Audiobooks</button>
                <button class="filter-btn" data-category="characters">Characters</button>
                <button class="filter-btn" data-category="promos">Promos</button>
              </div>
            </div>

            <!-- Demo Cards Grid -->
            <div class="demos-list-grid" id="demos-list-grid">
              <!-- Rendered programmatically in router/app controller -->
            </div>

          </div>
        </div>

        <!-- Section 1: Campaign Case Study -->
        <div class="section-padding section-alt" style="border-top: 1px solid var(--border-color);">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-image-wrapper">
                <img src="assets/images/next_gen_automotive.png" alt="Sleek premium electric SUV campaign visual" class="split-photo">
              </div>
              <div class="split-text-content">
                <span class="accent-title">Featured Campaign Study</span>
                <h2>Voicing the Horizon EV Launch</h2>
                <p>We partnered with Horizon Automotive to deliver a commanding, warm Transatlantic narration for their flagship electric SUV global launch. The campaign spanned digital platforms and television commercials, requiring absolute vocal consistency.</p>
                <ul class="check-list">
                  <li><strong>Target Audience</strong>: Luxury tech consumers</li>
                  <li><strong>Vocal Profile</strong>: Gritty, confident, inspirational</li>
                  <li><strong>Post-Production</strong>: Dynamic EBU R128 loudness matching</li>
                  <li><strong>Result</strong>: Distributed across 14 global markets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Acoustic Standards -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Studio Standards</span>
              <h2>Engineering Quality Specifications</h2>
              <p>Every delivered sound block undergoes comprehensive master-chain processing to guarantee broadcast-ready specifications.</p>
            </div>
            <div class="card-grid-center">
              <div class="card spec-details-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                  </div>
                  <h3>Breath Gating & Cleanup</h3>
                  <p>Meticulous editing to remove mouth clicks, pops, and excessive breaths while preserving natural dialogue rhythm.</p>
                </div>
              </div>
              <div class="card spec-details-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  </div>
                  <h3>Loudness Normalization</h3>
                  <p>Mastered precisely to EBU R128 (-23 LUFS) or digital streaming peaks (-14 to -16 LUFS) according to project needs.</p>
                </div>
              </div>
              <div class="card spec-details-card">
                <div class="card-body">
                  <div class="cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px; color: var(--accent-cyan); margin: 0 auto 20px; display: block;">
                      <path d="M3 10v4M6 6v12M9 12v0M12 4v16M15 8v8M18 11v2M21 9v6" />
                      <line x1="2" y1="20" x2="22" y2="20" />
                    </svg>
                  </div>
                  <h3>Ultra-Low Noise Floor</h3>
                  <p>Recorded at -60dB noise floor or lower inside a custom acoustic booth, preventing room echoes or hardware hum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Directed Session Guide -->
        <div class="section-padding section-alt" style="border-bottom: 1px solid var(--border-color);">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Live Direction</span>
              <h2>Remote Session Hook Guide</h2>
              <p>Direct the recording live from any production facility globally. We support all major digital feeds.</p>
            </div>
            <div class="workflow-steps steps-3-cols" style="margin-top:40px;">
              <div class="wf-step">
                <div class="wf-num">A</div>
                <h3>Live Feed Connection</h3>
                <p>Launch Source-Connect, ipDTL, Zoom, or clean-feed audio loopbacks.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">B</div>
                <h3>Script Coaching</h3>
                <p>Read lines together, adjust pacing, inflections, and emotional accents in real time.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">C</div>
                <h3>Immediate File Split</h3>
                <p>We split, label, clean, and deliver audio takes instantly post-session.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },


  // Helper template for single Demo Card
  renderDemoCard(demo) {
    return `
      <div class="card demo-list-card" data-category="${demo.category}">
        <div class="card-img-wrapper">
          <img src="${demo.coverImage}" class="card-img" alt="${demo.title}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-category">${demo.categoryLabel} • ${demo.accentLabel}</span>
          <h3 class="card-title-fixed">${demo.title}</h3>
          <p class="card-desc">${demo.description}</p>
          
          <!-- Waveform container canvas -->
          <div class="inline-audio-wave">
            <canvas class="canvas-waveform" data-track-id="${demo.id}"></canvas>
          </div>
          
          <div class="card-action">
            <button class="btn btn-primary btn-demo-trigger" data-track-id="${demo.id}">
              <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              <span>Play Demo</span>
            </button>
            
            <a href="${demo.audioPath}" class="btn btn-secondary btn-icon" download aria-label="Download ${demo.title} demo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // 4. SERVICES VIEW
  services() {
    return `
      <section class="page-view services-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Professional Solutions</span>
            <h1>Voiceover Services</h1>
            <p class="hero-lead-center">From local campaigns to global training interfaces. Clean, structured, and customized sound deliveries.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Offerings</span>
              <h2>Professional Services Grid</h2>
            </div>
            
            <div class="card-grid">
              ${VO_DATA.services.map((svc, idx) => `
                <div class="card service-card">
                  <div class="card-img-wrapper">
                    <img src="${svc.coverImage}" class="card-img" alt="${svc.title}" loading="lazy">
                  </div>
                  <div class="card-body">
                    <span class="card-category">Service ${idx + 1}</span>
                    <h3 class="card-title-fixed">${svc.title}</h3>
                    <p class="card-desc">${svc.desc}</p>
                    <div class="card-action">
                      <a href="#audition" class="btn btn-outline">Enquire Service</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Industries Served -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Market Areas</span>
              <h2>Industries Served</h2>
            </div>
            <div class="industries-grid">
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6M10 22h4" />
                </svg>
                <span>Technology & SaaS</span>
              </div>
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2 11.1 2 11.3 2 11.5V16c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
                <span>Automotive Brands</span>
              </div>
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span>Healthcare & MedTech</span>
              </div>
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <line x1="3" y1="22" x2="21" y2="22" />
                  <line x1="6" y1="18" x2="6" y2="11" />
                  <line x1="10" y1="18" x2="10" y2="11" />
                  <line x1="14" y1="18" x2="14" y2="11" />
                  <line x1="18" y1="18" x2="18" y2="11" />
                  <polygon points="12 2 20 7 4 7" />
                </svg>
                <span>Finance & Banking</span>
              </div>
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <rect x="2" y="6" width="20" height="12" rx="3" />
                  <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
                </svg>
                <span>Gaming & Interactive</span>
              </div>
              <div class="ind-item frosted" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>eLearning Publishers</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Process Timeline -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Workflow</span>
              <h2>Project Execution Timeline</h2>
            </div>
            <div class="process-timeline-flex">
              <div class="proc-step">
                <div class="proc-circle">1</div>
                <h4>Quote & Script Approval</h4>
                <p>Aligning on copy metrics, licensing scopes, and pacing specs.</p>
              </div>
              <div class="proc-step">
                <div class="proc-circle">2</div>
                <h4>Vocal Recording Session</h4>
                <p>Executing clean recording takes in a fully soundproof booth.</p>
              </div>
              <div class="proc-step">
                <div class="proc-circle">3</div>
                <h4>Engineering Post-Production</h4>
                <p>Mastering voice files to meet strict EBU R128 loudness requirements.</p>
              </div>
              <div class="proc-step">
                <div class="proc-circle">4</div>
                <h4>Final File Delivery</h4>
                <p>Sending high-resolution files in under 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="cta-banner-card frosted">
              <h2>Ready to Voice Your Brand?</h2>
              <p>Browse packages or submit a script fragment for a personalized acoustic demo.</p>
              <a href="#pricing" class="btn btn-primary">View Packages</a>
            </div>
          </div>
        </div>

        <!-- Section 1: Usage Licensing Scopes -->
        <div class="section-padding section-alt" style="border-top: 1px solid var(--border-color); background: var(--bg-primary);">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Licensing</span>
              <h2>Usage Licensing Buyout Scopes</h2>
              <p>Simple, transparent usage categories designed to fit your marketing and distribution networks.</p>
            </div>
            <div class="card-grid-center">
              <div class="card license-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Corporate / Internal</h3>
                  <p class="card-desc">Covers employee training, compliance modules, internal presentations, and non-paid website placements.</p>
                  <span class="demo-duration-badge" style="align-self:center;">Included by Default</span>
                </div>
              </div>
              <div class="card license-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Commercial (Non-Broadcast)</h3>
                  <p class="card-desc">For organic social media (YouTube, Instagram), company landing pages, and unpaid online distribution.</p>
                  <span class="demo-duration-badge" style="align-self:center;">Web Buyout</span>
                </div>
              </div>
              <div class="card license-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Full Broadcast</h3>
                  <p class="card-desc">Required for paid ad campaigns (Google/meta ads, local or national TV, radio spots, movie theater spots).</p>
                  <span class="demo-duration-badge" style="align-self:center;">Campaign Rights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Turnaround Calculator -->
        <div class="section-padding">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-text-content">
                <span class="accent-title">Scheduling</span>
                <h2>Delivery Windows & Rush Upgrades</h2>
                <p>Standard scripts under 1,000 words are recorded, engineered, and delivered within 24 hours. For urgent projects, we offer premium rush options to accommodate tight production slots.</p>
                <table class="studio-table">
                  <tr>
                    <th>Standard Script</th>
                    <td>24-Hour Delivery</td>
                  </tr>
                  <tr>
                    <th>Under 100 Words</th>
                    <td>Same-Day Delivery (under 12 hrs)</td>
                  </tr>
                  <tr>
                    <th>Rush Booking Upgrade</th>
                    <td>Guaranteed delivery in 12 hours</td>
                  </tr>
                  <tr>
                    <th>Splitting & Naming</th>
                    <td>Pre-split WAV files included</td>
                  </tr>
                </table>
              </div>
              <div class="split-image-wrapper">
                <img src="assets/images/service_turnaround.png" alt="Studio calendar and project planner" class="split-photo">
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Remote Coaching Methods -->
        <div class="section-padding section-alt" style="border-bottom: 1px solid var(--border-color);">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Remote Directed Session</span>
              <h2>Coaching Connection Methods</h2>
              <p>Direct the vocal performance live using professional studio connection links.</p>
            </div>
            <div class="card-grid-center">
              <div class="accent-detail-card frosted">
                <h3>Source-Connect Standard</h3>
                <p>High-quality audio streaming sync directly to your DAW, supporting remote broadcast direction.</p>
              </div>
              <div class="accent-detail-card frosted">
                <h3>ipDTL & Zoom feeds</h3>
                <p>Clean, low-latency audio sync with screen-share capability to direct pacing matching visual tracks.</p>
              </div>
              <div class="accent-detail-card frosted">
                <h3>Phone Patch / Session link</h3>
                <p>Call the studio line directly, coaching the vocal artist take-by-take during recording.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },


  // 5. LANGUAGES VIEW
  languages() {
    return `
      <section class="page-view languages-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Global Delivery</span>
            <h1>Languages & Accents</h1>
            <p class="hero-lead-center">Adapting phonetic structures to fit global and regional demographics.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Supported</span>
              <h2>Languages & Dialects Preview</h2>
            </div>
            
            <div class="card-grid">
              ${VO_DATA.languages.map(lang => `
                <div class="card language-card">
                  <div class="card-img-wrapper">
                    <img src="${lang.coverImage}" class="card-img" alt="${lang.language}" loading="lazy">
                  </div>
                  <div class="card-body">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                      <span class="card-category">${lang.flag} Language Specs</span>
                      <span class="lang-badge ${lang.badge === 'Native' ? 'badge-native' : 'badge-fluent'}">${lang.badge}</span>
                    </div>
                    <h3 class="card-title-fixed">${lang.language}</h3>
                    <p class="card-desc"><strong>Accents:</strong> ${lang.accent}<br><br>${lang.description}</p>
                    
                    <div class="card-action">
                      <button class="btn btn-primary btn-demo-trigger" data-track-id="${lang.sampleId}">
                        <svg class="play-icon-svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        <svg class="pause-icon-svg hidden" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        <span>Listen Sample</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Accents Showcase Map / Table details -->
        <div class="section-padding section-alt">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Dialect Nuances</span>
              <h2>Regional Accent Breakdown</h2>
            </div>
            <div class="accents-showcase-grid">
              <div class="accent-detail-card frosted">
                <h3>Standard American</h3>
                <p>Corporate, professional, warm. The standard neutral voiceover accent for North American software explaining.</p>
              </div>
              <div class="accent-detail-card frosted">
                <h3>British RP</h3>
                <p>Sophisticated, articulate, premium. Suited for luxury automotive ads, historical books, and premium branding.</p>
              </div>
              <div class="accent-detail-card frosted">
                <h3>Mid-Atlantic</h3>
                <p>An international transatlantic blend that sounds warm and recognizable globally. Perfect for airport systems and keynotes.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 1: Localization & Proofing -->
        <div class="section-padding section-alt" style="border-top: 1px solid var(--border-color); background: var(--bg-primary);">
          <div class="container-width">
            <div class="grid-split-2">
              <div class="split-image-wrapper">
                <img src="assets/images/audio_workstation.png" alt="Audio recording editor screen showing waveforms" class="split-photo">
              </div>
              <div class="split-text-content">
                <span class="accent-title">Proofing</span>
                <h2>Regional Localization Proofing</h2>
                <p>We review your copy for natural speech indicators, adjusting vocabulary, phrasing, and punctuation flow to ensure authentic regional accent delivery.</p>
                <ul class="check-list">
                  <li><strong>US vs UK Adaptations</strong>: Spelling, vocabulary, and phonetic matching adjustments.</li>
                  <li><strong>Tone Optimization</strong>: Adapting scripts for North American or European market pacing.</li>
                  <li><strong>Academic Accuracy</strong>: Precise phrasing check for technical eLearning modules.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Phonetic Matrix -->
        <div class="section-padding">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Phonetics</span>
              <h2>Phonetic Flexibility Matrix</h2>
              <p>Authentic accent delivery is built on precise phonetic adjustments. We map vowel lengths, consonant weights, and sentence rhythms.</p>
            </div>
            <div class="card-grid">
              <div class="card matrix-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Vowel Elongation</h3>
                  <p class="card-desc">Adjusting vowels between standard flat North American and rounded British RP shapes.</p>
                </div>
              </div>
              <div class="card matrix-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Rhoticity Calibration</h3>
                  <p class="card-desc">Crisp rhotic 'r' pronunciations in US VO vs non-rhotic, sophisticated UK RP articulation.</p>
                </div>
              </div>
              <div class="card matrix-card">
                <div class="card-body">
                  <h3 style="margin-bottom:12px;">Cadence & Melody</h3>
                  <p class="card-desc">Controlling sentence rhythm to suit local ears, maximizing brand engagement metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Multi-Regional Directing -->
        <div class="section-padding section-alt" style="border-bottom: 1px solid var(--border-color);">
          <div class="container-width">
            <div class="section-header">
              <span class="accent-title">Localization Campaign</span>
              <h2>Multi-Regional Directing Guidance</h2>
              <p>Directing voice overs for international campaigns requires aligning regional dialects with brand tone.</p>
            </div>
            <div class="workflow-steps steps-3-cols" style="margin-top:40px;">
              <div class="wf-step">
                <div class="wf-num">I</div>
                <h3>Vocal Rhythm Matching</h3>
                <p>Maintaining exact length matching across regional translations.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">II</div>
                <h3>Accent Intensity Scales</h3>
                <p>Coaching the dialect level from light regional flavors to native local speakers.</p>
              </div>
              <div class="wf-step">
                <div class="wf-num">III</div>
                <h3>Consistent Mic Staging</h3>
                <p>Ensuring identical acoustic spacing and volume levels across all language takes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },


  // 6. PRICING VIEW
  pricing() {
    return `
      <section class="page-view pricing-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Transparent Rates</span>
            <h1>Project Pricing</h1>
            <p class="hero-lead-center">Standard-setting rates aligned with voiceover buyout rights and industry parameters.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="pricing-cards-grid">
              ${VO_DATA.pricing.map(pkg => `
                <div class="card pricing-card ${pkg.popular ? 'popular' : ''}">
                  ${pkg.popular ? '<div class="popular-tag">MOST POPULAR</div>' : ''}
                  <div class="card-body">
                    <span class="card-category">${pkg.desc}</span>
                    <h3 class="pricing-pkg-title">${pkg.title}</h3>
                    <div class="price-value-wrapper">
                      <span class="price-amount">${pkg.price}</span>
                      <span class="price-period">${pkg.period}</span>
                    </div>
                    
                    <ul class="pricing-features-list">
                      ${pkg.features.map(feat => `<li><span>✓</span> ${feat}</li>`).join('')}
                    </ul>
                    
                    <div class="card-action" style="margin-top: 24px;">
                      <a href="#audition?pkg=${encodeURIComponent(pkg.title)}" class="btn ${pkg.popular ? 'btn-accent' : 'btn-outline'} w-full text-center">Select Package</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Comparison Table -->
            <div class="pricing-comparison-section">
              <div class="section-header">
                <h2>Compare Deliverable Specs</h2>
              </div>
              <div class="comparison-table-wrapper frosted">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>Parameters</th>
                      <th>Commercial</th>
                      <th>eLearning</th>
                      <th>Corporate</th>
                      <th>Audiobook</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Delivery Window</td>
                      <td>24 Hours</td>
                      <td>48 Hours</td>
                      <td>48 Hours</td>
                      <td>Milestone Based</td>
                    </tr>
                    <tr>
                      <td>Included Revisions</td>
                      <td>2 Rounds</td>
                      <td>Unlimited Pronunciation</td>
                      <td>2 Rounds</td>
                      <td>Full ACX Proof</td>
                    </tr>
                    <tr>
                      <td>Noise Floor Standard</td>
                      <td>-60dB Studio</td>
                      <td>-60dB Studio</td>
                      <td>-60dB Studio</td>
                      <td>ACX Conform</td>
                    </tr>
                    <tr>
                      <td>Buyout Licenses</td>
                      <td>Web/Organic</td>
                      <td>Instructional</td>
                      <td>Internal/Promo</td>
                      <td>ACX Retail</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  },

  // 7. AUDITION REQUEST VIEW
  audition() {
    return `
      <section class="page-view audition-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Interactive Quote</span>
            <h1>Audition Request</h1>
            <p class="hero-lead-center">Request a custom demo voice snippet based on your script extract. Delivered in 24 hours.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="form-container">
              <h2 style="text-align: center; margin-bottom: 8px;">Project Description</h2>
              <p style="text-align: center; margin-bottom: 32px; color: var(--text-secondary); font-size: 0.95rem;">Provide your script excerpt, delivery deadline, and voice profile specs to receive a complimentary audio file.</p>
              
              <form id="audition-request-form" novalidate>
                <div class="form-grid">
                  <!-- Name -->
                  <div class="form-group">
                    <label class="form-label" for="aud-name">Full Name</label>
                    <input type="text" id="aud-name" class="form-input" placeholder="e.g. John Doe" required>
                    <span class="validation-message">Please enter your name</span>
                  </div>
                  
                  <!-- Company -->
                  <div class="form-group">
                    <label class="form-label" for="aud-company">Company</label>
                    <input type="text" id="aud-company" class="form-input" placeholder="e.g. Acme Corp">
                    <span class="validation-message"></span>
                  </div>

                  <!-- Email -->
                  <div class="form-group">
                    <label class="form-label" for="aud-email">Email Address</label>
                    <input type="email" id="aud-email" class="form-input" placeholder="e.g. john@company.com" required>
                    <span class="validation-message">Please enter a valid email</span>
                  </div>

                  <!-- Phone -->
                  <div class="form-group">
                    <label class="form-label" for="aud-phone">Phone Number</label>
                    <input type="tel" id="aud-phone" class="form-input" placeholder="e.g. +1 555-0199">
                    <span class="validation-message"></span>
                  </div>

                  <!-- Project Type -->
                  <div class="form-group">
                    <label class="form-label" for="aud-project">Project Type</label>
                    <select id="aud-project" class="form-select">
                      <option value="commercial">Commercial Ads</option>
                      <option value="elearning" selected>eLearning Narration</option>
                      <option value="corporate">Corporate Training</option>
                      <option value="ivr">IVR & Automated Prompt</option>
                      <option value="explainer">Explainer Video</option>
                      <option value="audiobook">Audiobook Project</option>
                    </select>
                  </div>

                  <!-- Voice Style -->
                  <div class="form-group">
                    <label class="form-label" for="aud-style">Voice Style / Tone</label>
                    <select id="aud-style" class="form-select">
                      <option value="warm">Warm & Conversational</option>
                      <option value="energetic">High-Energy & Upbeat</option>
                      <option value="authoritative">Corporate & Authoritative</option>
                      <option value="dramatic">Dramatic & Deep</option>
                    </select>
                  </div>

                  <!-- Script Length -->
                  <div class="form-group">
                    <label class="form-label" for="aud-length">Script Length (words / seconds)</label>
                    <input type="text" id="aud-length" class="form-input" placeholder="e.g. 500 words or 30s">
                    <span class="validation-message"></span>
                  </div>

                  <!-- Deadline -->
                  <div class="form-group">
                    <label class="form-label" for="aud-deadline">Delivery Deadline</label>
                    <input type="date" id="aud-deadline" class="form-input" required>
                    <span class="validation-message">Please choose a deadline</span>
                  </div>

                  <!-- Budget -->
                  <div class="form-group">
                    <label class="form-label" for="aud-budget">Estimated Budget ($)</label>
                    <input type="number" id="aud-budget" class="form-input" placeholder="e.g. 500">
                    <span class="validation-message"></span>
                  </div>

                  <!-- Accents -->
                  <div class="form-group">
                    <label class="form-label" for="aud-accent">Preferred Accent</label>
                    <select id="aud-accent" class="form-select">
                      <option value="us">Standard North American</option>
                      <option value="uk">British RP</option>
                      <option value="transatlantic">Transatlantic</option>
                    </select>
                  </div>

                  <!-- Script text -->
                  <div class="form-group col-span-2">
                    <label class="form-label" for="aud-script">Script Extract (Paste text for audition)</label>
                    <textarea id="aud-script" class="form-textarea" placeholder="Paste up to 100 words of your script here..." required></textarea>
                    <span class="validation-message">Please paste your script snippet</span>
                  </div>

                  <!-- Script Upload -->
                  <div class="form-group col-span-2">
                    <label class="form-label">Upload Full Script File (optional)</label>
                    <div class="file-upload-wrapper">
                      <input type="file" id="aud-file" class="file-upload-input" accept=".txt,.pdf,.doc,.docx">
                      <div class="file-upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <p class="file-upload-text" id="file-upload-label">Drag & drop your script here or <span>browse</span></p>
                    </div>
                  </div>
                </div>

                <div class="form-submit-wrapper">
                  <button type="submit" class="btn btn-primary" id="aud-submit-btn">Send Audition Request</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 8. CONTACT VIEW
  contact() {
    return `
      <section class="page-view contact-view">
        <div class="view-hero">
          <div class="container-width">
            <span class="hero-badge">Direct Line</span>
            <h1>Contact Studio</h1>
            <p class="hero-lead-center">Book remote directed sessions or send inquiries directly to my sound booth desk.</p>
          </div>
        </div>

        <div class="section-padding">
          <div class="container-width">
            <div class="contact-grid-split">
              <!-- Contact Info details -->
              <div class="contact-details-panel frosted">
                <h2>Studio Connections</h2>
                <p>Feel free to reach out via email, phone, or coordinate remote link hooks using the handles below.</p>
                
                <div class="contact-info-list">
                  <div class="contact-info-item">
                    <div class="ci-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <h4>Direct Email</h4>
                      <p><a href="mailto:studio@auravoice.com">studio@auravoice.com</a></p>
                    </div>
                  </div>
                  <div class="contact-info-item">
                    <div class="ci-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h4>Direct Phone</h4>
                      <p><a href="tel:+15550189">+1 (555) 018-9334</a></p>
                    </div>
                  </div>
                  <div class="contact-info-item">
                    <div class="ci-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.59 16.11a6 6 0 0 1 6.8 0"/><circle cx="12" cy="20" r="2"/></svg>
                    </div>
                    <div>
                      <h4>Source-Connect User</h4>
                      <p><code>auravoicestudio</code> (Standard Node)</p>
                    </div>
                  </div>
                  <div class="contact-info-item">
                    <div class="ci-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <h4>Business Hours</h4>
                      <p>Mon - Fri: 9:00 AM - 6:00 PM EST<br>Available for urgent bookings on weekends.</p>
                    </div>
                  </div>
                </div>

                <!-- Custom Styled Canvas Vector Map (Representing location) -->
                <div class="studio-map-container">
                  <div class="map-overlay-card frosted">
                    <h4>Recording Desk Location</h4>
                    <p>Acoustic Booth, Brooklyn, New York</p>
                  </div>
                  <canvas id="studio-vector-map" class="studio-vector-map"></canvas>
                </div>
              </div>

              <!-- Contact Form -->
              <div class="form-container" style="margin: 0;">
                <h2 style="text-align: center; margin-bottom: 8px;">Send a Message</h2>
                <p style="text-align: center; margin-bottom: 24px; color: var(--text-secondary); font-size: 0.95rem;">Have questions about pricing, buyout rights, or project scheduling? Fill in your details below.</p>
                
                <form id="contact-inquiry-form" novalidate>
                  <div class="form-group">
                    <label class="form-label" for="con-name">Full Name</label>
                    <input type="text" id="con-name" class="form-input" placeholder="e.g. Jane Smith" required>
                    <span class="validation-message">Please enter your name</span>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="con-email">Email Address</label>
                    <input type="email" id="con-email" class="form-input" placeholder="e.g. jane@company.com" required>
                    <span class="validation-message">Please enter a valid email</span>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="con-subject">Subject</label>
                    <input type="text" id="con-subject" class="form-input" placeholder="e.g. Budget buyout inquiry" required>
                    <span class="validation-message">Please specify a subject</span>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="con-message">Your Message</label>
                    <textarea id="con-message" class="form-textarea" placeholder="Tell me about your project needs..." required></textarea>
                    <span class="validation-message">Please write a message</span>
                  </div>

                  <div class="form-submit-wrapper">
                    <button type="submit" class="btn btn-primary" id="contact-submit-btn">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
};

/* 
  =========================================
  AUDIO ENGINE & VISUALIZATION (js/audio.js)
  =========================================
*/

class AudioEngine {
  constructor() {
    this.audioElement = document.getElementById('global-html5-audio');
    this.currentTrack = null;
    this.isPlaying = false;
    this.tracksList = [];
    this.speed = 1.0;
    this.volume = 0.8;
    this.isMuted = false;

    // Web Audio API Nodes
    this.audioCtx = null;
    this.analyser = null;
    this.sourceNode = null;
    this.gainNode = null;
    
    // Vocal Synthesizer Nodes (Fallback for mock assets)
    this.synthOsc = null;
    this.synthLfo = null;
    this.synthFilter = null;
    this.synthGain = null;
    this.isSynthesizing = false;
    this.synthInterval = null;

    // Canvas elements
    this.globalCanvas = document.getElementById('player-analyzer-canvas');
    this.globalCtx = this.globalCanvas ? this.globalCanvas.getContext('2d') : null;
    this.animationFrameId = null;

    this.initAudioElement();
    this.initPlayerDOM();
  }

  // Set up standard HTML5 audio listeners
  initAudioElement() {
    this.audioElement.volume = this.volume;

    this.audioElement.addEventListener('timeupdate', () => {
      if (!this.isSynthesizing) {
        this.updateProgressBar();
      }
    });

    this.audioElement.addEventListener('durationchange', () => {
      this.updateDurationDisplay();
    });

    this.audioElement.addEventListener('ended', () => {
      this.handleTrackEnded();
    });

    this.audioElement.addEventListener('error', (e) => {
      // If audio file doesn't exist, we fallback to our custom Web Audio Speech Vocal Synthesizer!
      console.warn("Audio file failed to load, switching to local Web Audio synthesis simulation.", e);
      this.startVocalSynthesis();
    });
  }

  // Set up global player click handlers
  initPlayerDOM() {
    const playBtn = document.getElementById('player-btn-play');
    const prevBtn = document.getElementById('player-btn-prev');
    const nextBtn = document.getElementById('player-btn-next');
    const speedBtn = document.getElementById('player-speed-btn');
    const speedDropdown = document.getElementById('player-speed-dropdown');
    const volumeBtn = document.getElementById('player-volume-btn');
    const volumeSlider = document.getElementById('player-volume-slider');
    const timeline = document.getElementById('player-timeline');

    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.playPrevious());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.playNext());
    }

    if (speedBtn && speedDropdown) {
      speedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speedDropdown.classList.toggle('hidden');
      });

      // Close dropdown when clicking elsewhere
      document.addEventListener('click', () => {
        speedDropdown.classList.add('hidden');
      });

      // Speed options click
      speedDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const speedVal = parseFloat(e.target.dataset.speed);
          this.setPlaybackSpeed(speedVal);
          speedDropdown.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        });
      });
    }

    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => this.toggleMute());
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        this.setVolume(parseFloat(e.target.value));
      });
    }

    if (timeline) {
      timeline.addEventListener('click', (e) => {
        const rect = timeline.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        this.seekTo(percentage);
      });
    }
  }

  // Load a tracks list (usually all search-filtered/category-filtered items)
  setTracksList(tracks) {
    this.tracksList = tracks;
  }

  // Load and play a specific track
  loadTrack(track, autoPlay = true) {
    if (this.currentTrack && this.currentTrack.id === track.id) {
      this.togglePlay();
      return;
    }

    // Stop current synthesizer if active
    this.stopVocalSynthesis();

    this.currentTrack = track;
    this.audioElement.src = track.audioPath;
    this.audioElement.playbackRate = this.speed;

    // Update Player UI
    document.getElementById('player-track-title').textContent = track.title;
    document.getElementById('player-track-category').textContent = track.categoryLabel;
    document.getElementById('player-track-image').src = track.coverImage;
    document.getElementById('player-download-btn').href = track.audioPath;
    document.getElementById('player-time-current').textContent = '0:00';
    document.getElementById('player-time-duration').textContent = track.duration;
    document.getElementById('player-progress-bar').style.width = '0%';

    // Slide up player if not already showing
    document.getElementById('global-audio-player').classList.add('active');

    // Trigger visual highlights on page cards
    this.updateCardUIActiveStates();

    if (autoPlay) {
      this.play();
    }
  }

  // Start Web Audio API context
  lazyInitAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      // Analyser Node for drawing frequencies
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128; // Keep it low for high performance rendering

      // Connect HTML5 Element to Analyser & Output
      this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.volume;

      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      // Start draw loop
      this.startFrequencyDrawing();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play() {
    this.lazyInitAudioContext();
    this.isPlaying = true;

    // Attempt HTML5 native play
    const playPromise = this.audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Safe check for block policy, if it fails we can rely on our synth on the next user action
        console.log("Audio play deferred or failed, waiting for synth fallback if needed.");
      });
    }

    this.updatePlayStateUI();
  }

  pause() {
    this.isPlaying = false;
    if (this.isSynthesizing) {
      this.pauseVocalSynthesis();
    } else {
      this.audioElement.pause();
    }
    this.updatePlayStateUI();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      if (this.currentTrack) {
        this.play();
      } else if (this.tracksList.length > 0) {
        this.loadTrack(this.tracksList[0]);
      }
    }
  }

  playNext() {
    if (this.tracksList.length === 0 || !this.currentTrack) return;
    const currentIndex = this.tracksList.findIndex(t => t.id === this.currentTrack.id);
    const nextIndex = (currentIndex + 1) % this.tracksList.length;
    this.loadTrack(this.tracksList[nextIndex]);
  }

  playPrevious() {
    if (this.tracksList.length === 0 || !this.currentTrack) return;
    const currentIndex = this.tracksList.findIndex(t => t.id === this.currentTrack.id);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = this.tracksList.length - 1;
    this.loadTrack(this.tracksList[prevIndex]);
  }

  setPlaybackSpeed(speedVal) {
    this.speed = speedVal;
    document.getElementById('player-speed-btn').textContent = speedVal + 'x';
    if (!this.isSynthesizing) {
      this.audioElement.playbackRate = speedVal;
    }
  }

  setVolume(volumeVal) {
    this.volume = volumeVal;
    if (this.gainNode) {
      this.gainNode.gain.value = this.isMuted ? 0 : volumeVal;
    }
    this.audioElement.volume = this.isMuted ? 0 : volumeVal;
    
    // Update volume slider and icon UI
    const slider = document.getElementById('player-volume-slider');
    if (slider) slider.value = volumeVal;

    const muteIcon = document.querySelector('.vol-icon-mute');
    const highIcon = document.querySelector('.vol-icon-high');
    if (volumeVal === 0 || this.isMuted) {
      muteIcon?.classList.remove('hidden');
      highIcon?.classList.add('hidden');
    } else {
      muteIcon?.classList.add('hidden');
      highIcon?.classList.remove('hidden');
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
  }

  seekTo(percentage) {
    if (this.isSynthesizing) {
      // Seek simulated play duration
      const totalSec = this.currentTrack ? this.currentTrack.durationSeconds : 60;
      this.synthCurrentTime = totalSec * percentage;
      this.updateProgressBar();
    } else if (this.audioElement.duration) {
      this.audioElement.currentTime = this.audioElement.duration * percentage;
    }
  }

  updateProgressBar() {
    let percentage = 0;
    let currentText = '0:00';
    let durationText = '0:00';

    if (this.isSynthesizing) {
      const totalSec = this.currentTrack ? this.currentTrack.durationSeconds : 60;
      percentage = (this.synthCurrentTime / totalSec) * 100;
      currentText = this.formatTime(this.synthCurrentTime);
      durationText = this.formatTime(totalSec);
    } else if (this.audioElement.duration) {
      percentage = (this.audioElement.currentTime / this.audioElement.duration) * 100;
      currentText = this.formatTime(this.audioElement.currentTime);
      durationText = this.formatTime(this.audioElement.duration);
    }

    document.getElementById('player-progress-bar').style.width = percentage + '%';
    document.getElementById('player-time-current').textContent = currentText;
    document.getElementById('player-time-duration').textContent = durationText;

    // Draw active filler in card waveforms
    this.drawCardWaveformProgress(percentage / 100);
  }

  updateDurationDisplay() {
    if (this.audioElement.duration && !this.isSynthesizing) {
      document.getElementById('player-time-duration').textContent = this.formatTime(this.audioElement.duration);
    }
  }

  handleTrackEnded() {
    this.playNext();
  }

  // --- Premium Web Audio Vocal Synthesizer (Interactivity Fallback) ---
  startVocalSynthesis() {
    if (this.isSynthesizing) return;
    
    this.lazyInitAudioContext();
    this.isSynthesizing = true;
    this.synthCurrentTime = this.synthCurrentTime || 0;

    // Create a speech-like synth channel
    // Oscillator (simulating voice fundamental freq)
    this.synthOsc = this.audioCtx.createOscillator();
    this.synthOsc.type = 'sawtooth';
    this.synthOsc.frequency.setValueAtTime(110, this.audioCtx.currentTime); // Deep male/neutral pitch

    // LFO to modulate frequency gently (vibrato)
    this.synthLfo = this.audioCtx.createOscillator();
    this.synthLfo.frequency.setValueAtTime(6, this.audioCtx.currentTime); // 6 Hz vibrato
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 4; // subtle frequency swing

    // Voice Formant simulation via low pass filters
    this.synthFilter = this.audioCtx.createBiquadFilter();
    this.synthFilter.type = 'lowpass';
    this.synthFilter.frequency.setValueAtTime(450, this.audioCtx.currentTime); // Muffled vocal tone
    this.synthFilter.Q.setValueAtTime(8, this.audioCtx.currentTime); // Accentuate vocals

    // Amplifier node
    this.synthGain = this.audioCtx.createGain();
    this.synthGain.gain.setValueAtTime(0, this.audioCtx.currentTime); // Start silent

    // Wire up LFO
    this.synthLfo.connect(lfoGain);
    lfoGain.connect(this.synthOsc.frequency);

    // Wire up Synth Route
    this.synthOsc.connect(this.synthFilter);
    this.synthFilter.connect(this.synthGain);
    
    // Connect to global analyser node so the analyzer visualizer moves!
    this.synthGain.connect(this.analyser);

    // Start Oscillators
    this.synthOsc.start();
    this.synthLfo.start();

    // Start envelope simulation loop
    this.resumeVocalSynthesis();
  }

  resumeVocalSynthesis() {
    if (!this.isSynthesizing) return;

    this.audioCtx.resume();
    this.isPlaying = true;
    this.updatePlayStateUI();

    // Random Speech envelope modulation interval
    let timeTick = 0;
    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;

      const now = this.audioCtx.currentTime;
      // Increment play time based on speed scale
      this.synthCurrentTime += 0.1 * this.speed;
      timeTick += 0.1;

      // Update progress bar
      this.updateProgressBar();

      // Check track finish
      const totalSec = this.currentTrack ? this.currentTrack.durationSeconds : 60;
      if (this.synthCurrentTime >= totalSec) {
        this.synthCurrentTime = 0;
        this.stopVocalSynthesis();
        this.handleTrackEnded();
        return;
      }

      // Simulate voice syllable envelopes (pulses of amplitude + pitch sweeps)
      const syllableRand = Math.random();
      if (syllableRand > 0.45) {
        // Vocal sound: swell amplitude and open filter frequency
        this.synthGain.gain.setValueAtTime(this.volume * 0.12, now);
        this.synthGain.gain.exponentialRampToValueAtTime(this.volume * 0.18, now + 0.08);
        
        // Open vocal format filter
        this.synthFilter.frequency.setValueAtTime(350 + Math.random() * 500, now);
        this.synthOsc.frequency.setValueAtTime(90 + Math.random() * 50, now);
      } else {
        // Silent pause or consonant (drop volume and lower filter)
        this.synthGain.gain.setValueAtTime(this.volume * 0.01, now);
        this.synthFilter.frequency.setValueAtTime(200, now);
      }
    }, 100);
  }

  pauseVocalSynthesis() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthGain) {
      this.synthGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
  }

  stopVocalSynthesis() {
    this.pauseVocalSynthesis();
    this.isSynthesizing = false;
    this.synthCurrentTime = 0;

    if (this.synthOsc) {
      try {
        this.synthOsc.stop();
      } catch(e){}
      this.synthOsc = null;
    }
    if (this.synthLfo) {
      try {
        this.synthLfo.stop();
      } catch(e){}
      this.synthLfo = null;
    }
    this.synthFilter = null;
    this.synthGain = null;
  }

  // --- Real-time Canvas Spectrum Visualizer ---
  startFrequencyDrawing() {
    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      
      if (!this.globalCtx || !this.analyser || !this.globalCanvas) return;

      const width = this.globalCanvas.width = this.globalCanvas.clientWidth;
      const height = this.globalCanvas.height = this.globalCanvas.clientHeight;
      
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Get frequency data
      if (this.isPlaying) {
        this.analyser.getByteFrequencyData(dataArray);
      }

      this.globalCtx.clearRect(0, 0, width, height);

      // Draw beautiful modern glass equalizer bars
      const barWidth = (width / bufferLength) * 1.6;
      let barHeight;
      let x = 0;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.95;
        
        if (barHeight < 2) barHeight = 2; // Flat lines glow when quiet

        // Create sleek gradients matching color tokens
        const gradient = this.globalCtx.createLinearGradient(0, height, 0, height - barHeight);
        if (isDark) {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)'); // Translucent purple base
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)'); // Electric blue
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.85)'); // Glowing cyan peak
        } else {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.65)');
        }

        this.globalCtx.fillStyle = gradient;
        
        // Draw rounded top bars
        this.globalCtx.beginPath();
        this.globalCtx.roundRect(x, height - barHeight, barWidth - 2, barHeight, 2);
        this.globalCtx.fill();

        x += barWidth + 1;
      }
    };

    draw();
  }

  // --- Static Waveform Pre-calculations & Dynamic Rendering ---
  // Renders a canvas waveform representing a mock sound block
  renderStaticWaveform(canvasId, seed = 1) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    // Seeded random number generator
    const random = (s) => {
      let x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Calculate bar points
    const barWidth = 4;
    const gap = 3;
    const numBars = Math.floor(width / (barWidth + gap));
    const barsData = [];

    let seedVal = seed;
    for (let i = 0; i < numBars; i++) {
      // Create sound envelope shape (rhythm highs and lows)
      const multiplier = Math.sin((i / numBars) * Math.PI);
      const randomVal = 0.2 + 0.8 * random(seedVal++);
      const barHeight = multiplier * randomVal * height * 0.8;
      barsData.push(Math.max(4, barHeight));
    }

    // Cache the waveform on the canvas element for progress filling
    canvas.dataset.bars = JSON.stringify(barsData);
    canvas.dataset.seed = seed;

    this.drawWaveformOnCanvas(canvas, ctx, barsData, 0);
  }

  drawWaveformOnCanvas(canvas, ctx, barsData, progress) {
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 4;
    const gap = 3;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.clearRect(0, 0, width, height);

    const activeIndex = Math.floor(barsData.length * progress);

    for (let i = 0; i < barsData.length; i++) {
      const barHeight = barsData[i];
      const x = i * (barWidth + gap);
      const y = (height - barHeight) / 2;

      // Color scheme selector
      if (i <= activeIndex) {
        // Active Played State gradient fill
        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#06b6d4'); // neon cyan
        grad.addColorStop(1, '#8b5cf6'); // royal purple
        ctx.fillStyle = grad;
      } else {
        // Unplayed state color
        ctx.fillStyle = isDark ? 'rgba(248, 250, 252, 0.15)' : 'rgba(15, 23, 42, 0.15)';
      }

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }
  }

  drawCardWaveformProgress(progress) {
    if (!this.currentTrack) return;

    // Search for active card waveform element on screen matching current playing track
    const activeCanvas = document.querySelector(`.canvas-waveform[data-track-id="${this.currentTrack.id}"]`);
    if (!activeCanvas) return;

    const ctx = activeCanvas.getContext('2d');
    const barsData = JSON.parse(activeCanvas.dataset.bars || '[]');
    if (barsData.length === 0) return;

    this.drawWaveformOnCanvas(activeCanvas, ctx, barsData, progress);
  }

  // --- UI Lifecycle state synchronizations ---
  updatePlayStateUI() {
    const playBtn = document.getElementById('player-btn-play');
    if (!playBtn) return;

    const playSvg = playBtn.querySelector('.play-svg');
    const pauseSvg = playBtn.querySelector('.pause-svg');
    const miniWave = document.getElementById('player-mini-wave');

    if (this.isPlaying) {
      playSvg.classList.add('hidden');
      pauseSvg.classList.remove('hidden');
      miniWave?.classList.add('playing');
    } else {
      playSvg.classList.remove('hidden');
      pauseSvg.classList.add('hidden');
      miniWave?.classList.remove('playing');
    }

    this.updateCardUIActiveStates();
  }

  // Highlights active card lists elements (adds pause icon and neon outlines)
  updateCardUIActiveStates() {
    // Select all page trigger buttons
    document.querySelectorAll('.btn-demo-trigger').forEach(btn => {
      const trackId = btn.dataset.trackId;
      const isCurrentTrack = this.currentTrack && this.currentTrack.id === trackId;
      const playIcon = btn.querySelector('.play-icon-svg');
      const pauseIcon = btn.querySelector('.pause-icon-svg');
      const card = btn.closest('.card');

      if (isCurrentTrack && this.isPlaying) {
        playIcon?.classList.add('hidden');
        pauseIcon?.classList.remove('hidden');
        card?.classList.add('active-glow');
      } else {
        playIcon?.classList.remove('hidden');
        pauseIcon?.classList.add('hidden');
        card?.classList.remove('active-glow');
      }
    });
  }

  formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }
}

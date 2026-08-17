(function() {
  // Rabto Skill Engine: interactive-audio-direction
  let audioCtx = null;
  let isSoundEnabled = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Synthesized Futuristic Soft Click / Pop Sound Effect
  function playClickSFX(pitch = 800, type = 'sine', duration = 0.08) {
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, audioCtx.currentTime + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore web audio errors
    }
  }

  // Synthesized Soft Chime for Success / Open
  function playChimeSFX() {
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.06);
        osc.stop(audioCtx.currentTime + idx * 0.06 + 0.3);
      });
    } catch (e) {
      // Ignore
    }
  }

  // Add Audio Toggle Button to Navbar
  function addAudioNavToggle() {
    let contactLink = null;
    document.querySelectorAll('nav a, [data-framer-name="nav links"] a').forEach(a => {
      if (a.textContent.trim().toLowerCase().includes('contact') || a.textContent.trim().toLowerCase().includes('admin')) {
        contactLink = a;
      }
    });

    if (!contactLink) {
      setTimeout(addAudioNavToggle, 800);
      return;
    }

    if (document.getElementById('rabtoAudioToggle')) return;

    const navContainer = contactLink.closest('nav') || contactLink.closest('[data-framer-name="nav links"]') || contactLink.parentElement;

    const btn = document.createElement('button');
    btn.id = 'rabtoAudioToggle';
    btn.className = 'glb-admin-nav-btn';
    btn.style.cssText = 'cursor:pointer; margin-left:12px; font-size:13px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:rgba(255,255,255,0.6); padding:8px 14px; border-radius:6px; transition:all 0.2s; white-space:nowrap;';
    btn.textContent = '🔇 Sound: OFF';
    btn.title = 'Toggle Interactive Sound FX (Rabto Audio Engine)';

    btn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        initAudioContext();
        btn.textContent = '🔊 Sound: ON';
        btn.style.color = '#4ade80';
        btn.style.borderColor = 'rgba(74,222,128,0.4)';
        playChimeSFX();
      } else {
        btn.textContent = '🔇 Sound: OFF';
        btn.style.color = 'rgba(255,255,255,0.6)';
        btn.style.borderColor = 'rgba(255,255,255,0.15)';
      }
    });

    const parent = contactLink.closest('li') || contactLink.parentElement;
    if (parent && parent.parentNode) {
      parent.parentNode.insertBefore(btn, parent.nextSibling);
    } else {
      navContainer.appendChild(btn);
    }
  }

  // Attach sound triggers to global clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, input[type="submit"], .glb-admin-tab, .glb-review-card-premium, .glb-home-blog-card');
    if (target) {
      playClickSFX(650, 'sine', 0.08);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAudioNavToggle);
  } else {
    addAudioNavToggle();
  }

  window.rabtoPlayClickSFX = playClickSFX;
  window.rabtoPlayChimeSFX = playChimeSFX;
})();

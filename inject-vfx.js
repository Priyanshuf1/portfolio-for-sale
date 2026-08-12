const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove old glow patch if exists
html = html.replace(/<style id="priyanshu-vfx-glow">[\s\S]*?<\/style>/, '');

const vfxCSS = `<style id="priyanshu-vfx-glow">
/* ── Silver Glow + VFX on the hero description section ── */

/* Wrap the description with a glowing border */
.framer-14oc2jn {
  position: relative !important;
  padding: 28px 32px !important;
  border-radius: 16px !important;
  border: 1px solid rgba(224, 224, 224, 0.12) !important;
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  box-shadow:
    0 0 30px rgba(224, 224, 224, 0.06),
    0 0 80px rgba(224, 224, 224, 0.03),
    inset 0 0 30px rgba(224, 224, 224, 0.03) !important;
  overflow: hidden !important;
}

/* Animated silver shimmer line sweeping across */
.framer-14oc2jn::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 60% !important;
  height: 100% !important;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(224, 224, 224, 0.08) 50%,
    transparent 100%
  ) !important;
  animation: shimmer-sweep 4s ease-in-out infinite !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

/* Soft pulsing glow border */
.framer-14oc2jn::after {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: 16px !important;
  border: 1px solid rgba(224, 224, 224, 0) !important;
  animation: pulse-border 3s ease-in-out infinite !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

@keyframes shimmer-sweep {
  0%   { left: -100%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 160%; opacity: 0; }
}

@keyframes pulse-border {
  0%, 100% { border-color: rgba(224, 224, 224, 0.08); box-shadow: 0 0 20px rgba(224,224,224,0.05); }
  50%       { border-color: rgba(224, 224, 224, 0.22); box-shadow: 0 0 40px rgba(224,224,224,0.12); }
}

/* Make the text itself glow softly */
.framer-14oc2jn p.framer-text {
  position: relative !important;
  z-index: 3 !important;
  text-shadow: 0 0 20px rgba(224, 224, 224, 0.25) !important;
}

/* Floating particles effect using pseudo-elements on parent */
.framer-1tw6hmz {
  position: relative !important;
}
</style>`;

html = html.replace('</head>', vfxCSS + '\n</head>');
fs.writeFileSync('index.html', html);
console.log('VFX glow injected successfully!');

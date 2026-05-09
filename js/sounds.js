/* ============================================================
   sounds.js
   All sound effects for Code Quest — built with Web Audio API.
   No external sound files needed — everything generated in browser.
   ============================================================ */

const SFX = (() => {
  // Create audio context lazily on first user interaction
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  // ── Core tone player ──────────────────────────────────────
  function playTone({
    freq = 440,
    type = "sine",
    gain = 0.4,
    duration = 0.3,
    delay = 0,
  }) {
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const vol = ac.createGain();

      osc.connect(vol);
      vol.connect(ac.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime + delay);

      vol.gain.setValueAtTime(0, ac.currentTime + delay);
      vol.gain.linearRampToValueAtTime(gain, ac.currentTime + delay + 0.01);
      vol.gain.exponentialRampToValueAtTime(
        0.001,
        ac.currentTime + delay + duration,
      );

      osc.start(ac.currentTime + delay);
      osc.stop(ac.currentTime + delay + duration);
    } catch (e) {
      // silently ignore if audio not supported
    }
  }

  // ── Play multiple tones in sequence ──────────────────────
  function playSequence(notes) {
    notes.forEach((n) => playTone(n));
  }

  // ── PUBLIC SOUNDS ─────────────────────────────────────────

  /**
   * ✨ Correct answer — magic chime ascending
   */
  function correct() {
    playSequence([
      { freq: 523, type: "sine", gain: 0.35, duration: 0.15, delay: 0.0 },
      { freq: 659, type: "sine", gain: 0.35, duration: 0.15, delay: 0.1 },
      { freq: 784, type: "sine", gain: 0.35, duration: 0.15, delay: 0.2 },
      { freq: 1047, type: "sine", gain: 0.3, duration: 0.35, delay: 0.3 },
      { freq: 1319, type: "triangle", gain: 0.2, duration: 0.4, delay: 0.35 },
    ]);
  }

  /**
   * 💥 Wrong answer — crystal shatter
   */
  function wrong() {
    playSequence([
      { freq: 300, type: "sawtooth", gain: 0.25, duration: 0.1, delay: 0.0 },
      { freq: 200, type: "sawtooth", gain: 0.25, duration: 0.1, delay: 0.08 },
      { freq: 150, type: "square", gain: 0.2, duration: 0.2, delay: 0.15 },
      { freq: 100, type: "sawtooth", gain: 0.15, duration: 0.3, delay: 0.25 },
    ]);
  }

  /**
   * 🖱️ Button click — soft tap
   */
  function click() {
    playTone({ freq: 800, type: "sine", gain: 0.15, duration: 0.08 });
  }

  /**
   * 📜 Story continue — page turn whoosh
   */
  function pageTurn() {
    playSequence([
      { freq: 600, type: "sine", gain: 0.12, duration: 0.08, delay: 0.0 },
      { freq: 700, type: "sine", gain: 0.1, duration: 0.1, delay: 0.06 },
      { freq: 500, type: "sine", gain: 0.08, duration: 0.12, delay: 0.12 },
    ]);
  }

  /**
   * ⚔️ Trial appears — sword clash dramatic sting
   */
  function trialStart() {
    playSequence([
      { freq: 200, type: "square", gain: 0.3, duration: 0.12, delay: 0.0 },
      { freq: 400, type: "sawtooth", gain: 0.2, duration: 0.15, delay: 0.1 },
      { freq: 600, type: "sine", gain: 0.25, duration: 0.25, delay: 0.2 },
    ]);
  }

  /**
   * 🏆 Victory fanfare — triumphant ascending melody
   */
  function victory() {
    playSequence([
      { freq: 523, type: "sine", gain: 0.35, duration: 0.18, delay: 0.0 },
      { freq: 659, type: "sine", gain: 0.35, duration: 0.18, delay: 0.18 },
      { freq: 784, type: "sine", gain: 0.35, duration: 0.18, delay: 0.36 },
      { freq: 1047, type: "sine", gain: 0.4, duration: 0.3, delay: 0.54 },
      { freq: 784, type: "sine", gain: 0.3, duration: 0.18, delay: 0.86 },
      { freq: 1047, type: "sine", gain: 0.35, duration: 0.18, delay: 1.04 },
      { freq: 1319, type: "sine", gain: 0.45, duration: 0.55, delay: 1.22 },
    ]);
  }

  /**
   * 🔮 Hint revealed — mystical shimmer
   */
  function hint() {
    playSequence([
      { freq: 900, type: "sine", gain: 0.18, duration: 0.12, delay: 0.0 },
      { freq: 1100, type: "sine", gain: 0.15, duration: 0.12, delay: 0.1 },
      { freq: 1300, type: "triangle", gain: 0.12, duration: 0.2, delay: 0.2 },
    ]);
  }

  /**
   * 🎮 Game start — adventure begin fanfare
   */
  function gameStart() {
    playSequence([
      { freq: 392, type: "sine", gain: 0.3, duration: 0.15, delay: 0.0 },
      { freq: 523, type: "sine", gain: 0.3, duration: 0.15, delay: 0.15 },
      { freq: 659, type: "sine", gain: 0.35, duration: 0.3, delay: 0.3 },
    ]);
  }

  // Expose public API
  return {
    correct,
    wrong,
    click,
    pageTurn,
    trialStart,
    victory,
    hint,
    gameStart,
  };
})();

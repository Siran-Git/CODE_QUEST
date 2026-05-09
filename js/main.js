/* ============================================================
   main.js
   Game engine — all functions that power Code Quest.

   Depends on (must load first):
     translations.js  →  T object
     steps.js         →  STEPS object
     sounds.js        →  SFX object
   ============================================================ */

/* ── GAME STATE ─────────────────────────────────────────── */
let lang = "en"; // active language: 'en' | 'ta'
let ageMode = "young"; // hint level:      'young' | 'older'
let currentStep = 0; // index into STEPS[lang]
let xp = 0; // accumulated XP
let answered = false; // has the player answered the current challenge?
let challengeIdx = 0; // which progress dot we're on
let playerName = ""; // player's entered name

/* ============================================================
   LANGUAGE & AGE SELECTORS
   ============================================================ */
function setLang(l) {
  lang = l;
  SFX.click();
  document.getElementById("btn-lang-en").classList.toggle("active", l === "en");
  document.getElementById("btn-lang-ta").classList.toggle("active", l === "ta");
  document.body.classList.toggle("tamil-mode", l === "ta");
  document.documentElement.lang = l === "ta" ? "ta" : "en";
  applyUI();
}

function setAge(a) {
  SFX.click();
  ageMode = a;
  document
    .getElementById("age-young")
    .classList.toggle("active", a === "young");
  document
    .getElementById("age-older")
    .classList.toggle("active", a === "older");
}

function applyUI() {
  const t = T[lang];
  document.getElementById("title-subtitle").textContent = t.subtitle;
  document.getElementById("title-lore").innerHTML = t.lore;
  document.getElementById("btn-start").textContent = t.btnStart;
  document.getElementById("badge1").textContent = t.badge1;
  document.getElementById("badge2").textContent = t.badge2;
  document.getElementById("badge3").textContent = t.badge3;
  document.getElementById("hud-chapter").textContent = t.hudChapter;
  document.getElementById("codex-label").textContent = t.codexLabel;
  document.getElementById("challenge-label").textContent = t.challengeLabel;
  document.getElementById("hint-btn-text").textContent = t.hintBtn;
  document.getElementById("young-label").textContent = t.youngLabel;
  document.getElementById("older-label").textContent = t.mageLabel;

  // Update name input placeholder & label when language changes
  const nameInput = document.getElementById("player-name-input");
  if (nameInput) nameInput.placeholder = t.namePlaceholder;

  const nameLabel = document.getElementById("name-label");
  if (nameLabel) nameLabel.textContent = t.nameLabel;
}

/* ============================================================
   PLAYER NAME + GAME START
   ============================================================ */
function startGame() {
  // Read player name
  const nameInput = document.getElementById("player-name-input");
  if (nameInput) playerName = nameInput.value.trim();

  SFX.gameStart();

  document.getElementById("screen-title").style.display = "none";
  const gameScreen = document.getElementById("screen-game");
  gameScreen.style.display = "flex";

  // Build progress dots
  const dotsContainer = document.getElementById("progress-dots");
  dotsContainer.innerHTML = "";
  STEPS[lang]
    .filter((s) => s.type === "challenge")
    .forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "progress-dot";
      dot.id = `dot-${i}`;
      dotsContainer.appendChild(dot);
    });

  // Show player name in HUD
  const hudName = document.getElementById("hud-player-name");
  if (hudName) {
    hudName.textContent = playerName ? `⚔️ ${playerName}` : "";
    hudName.style.display = playerName ? "block" : "none";
  }

  // Reset state
  currentStep = 0;
  xp = 0;
  challengeIdx = 0;
  updateXP(0);
  renderStep();
}

/* ============================================================
   GAME FLOW
   ============================================================ */
function renderStep() {
  const steps = STEPS[lang];
  if (currentStep >= steps.length) {
    showVictory();
    return;
  }

  const step = steps[currentStep];
  const t = T[lang];

  answered = false;
  document.getElementById("concept-scroll").style.display = "none";
  document.getElementById("challenge-panel").style.display = "none";
  document.getElementById("btn-continue").style.display = "none";

  const feedbackBox = document.getElementById("feedback-box");
  feedbackBox.className = "feedback-box";
  feedbackBox.innerHTML = "";

  const hintBubble = document.getElementById("hint-bubble");
  hintBubble.className = "hint-bubble";
  hintBubble.innerHTML = "";

  document.getElementById("hint-row").style.display = "none";
  const hintBtn = document.getElementById("btn-hint");
  hintBtn.disabled = false;
  document.getElementById("hint-btn-text").textContent = t.hintBtn;

  document.getElementById("scene-icon").textContent = step.icon;
  document.getElementById("scene-title").textContent = step.title;

  if (step.type === "story") {
    // Personalise story with player name
    let storyText = step.text;
    if (playerName) {
      storyText = storyText.replace(
        /You arrive/g,
        `<strong>${playerName}</strong> arrives`,
      );
      storyText = storyText.replace(/^You /, `<strong>${playerName}</strong> `);
    }
    document.getElementById("story-text").innerHTML = storyText;
    showChallengePanel(false);
    document.getElementById("btn-continue").style.display = "block";
    document.getElementById("btn-continue").textContent = t.continueStory;
  } else if (step.type === "concept") {
    document.getElementById("story-text").innerHTML = step.text;
    document.getElementById("concept-scroll").style.display = "block";
    document.getElementById("concept-title").textContent = step.conceptTitle;
    document.getElementById("concept-explanation").textContent =
      step.conceptExplanation;
    document.getElementById("code-block").innerHTML = step.codeHtml;
    showChallengePanel(false);
    document.getElementById("btn-continue").style.display = "block";
    document.getElementById("btn-continue").textContent = t.gotIt;
  } else if (step.type === "challenge") {
    SFX.trialStart();
    document.getElementById("story-text").innerHTML = t.trialAppear;
    showChallengePanel(true);
    document.getElementById("challenge-question").innerHTML = step.text;
    document.getElementById("hint-row").style.display = "flex";
    renderChoices(step);
  }

  const storyPanel = document.getElementById("story-panel");
  storyPanel.style.animation = "none";
  requestAnimationFrame(() => {
    storyPanel.style.animation = "popIn 0.4s ease";
  });
}

function showChallengePanel(withQuestion) {
  document.getElementById("challenge-panel").style.display = "block";
  document.getElementById("challenge-label").style.display = withQuestion
    ? "block"
    : "none";
  document.getElementById("challenge-question").style.display = withQuestion
    ? "block"
    : "none";
  document.getElementById("choice-grid").style.display = withQuestion
    ? "grid"
    : "none";
}

function nextStep() {
  SFX.pageTurn();
  currentStep++;
  renderStep();
}

/* ============================================================
   HINT SYSTEM
   ============================================================ */
function showHint() {
  SFX.hint();
  const step = STEPS[lang][currentStep];
  const hintText =
    ageMode === "young" && step.hintYoung ? step.hintYoung : step.hint;
  const bubble = document.getElementById("hint-bubble");
  bubble.innerHTML = hintText;
  bubble.classList.add("shown");
  document.getElementById("btn-hint").disabled = true;
  document.getElementById("hint-btn-text").textContent = T[lang].hintUsed;
}

/* ============================================================
   ANSWER CHOICES
   ============================================================ */
function renderChoices(step) {
  const grid = document.getElementById("choice-grid");
  grid.innerHTML = "";
  [...step.choices]
    .sort(() => Math.random() - 0.5)
    .forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.label;
      btn.onclick = () =>
        handleChoice(btn, choice, step, grid.querySelectorAll(".choice-btn"));
      grid.appendChild(btn);
    });
}

function handleChoice(btn, choice, step, allBtns) {
  if (answered) return;
  answered = true;

  allBtns.forEach((b) => (b.disabled = true));
  document.getElementById("btn-hint").disabled = true;

  const feedbackBox = document.getElementById("feedback-box");

  if (choice.correct) {
    SFX.correct();
    btn.classList.add("correct");
    feedbackBox.className = "feedback-box correct";
    feedbackBox.innerHTML = step.feedbackCorrect;
    updateXP(step.xp);
    setDot(challengeIdx, true);
  } else {
    SFX.wrong();
    btn.classList.add("wrong");
    feedbackBox.className = "feedback-box wrong";
    feedbackBox.innerHTML = step.feedbackWrong;
    allBtns.forEach((b) => {
      const match = STEPS[lang][currentStep].choices.find(
        (c) => c.label === b.textContent,
      );
      if (match && match.correct) b.classList.add("correct");
    });
    setDot(challengeIdx, false);
  }

  challengeIdx++;
  const isLastStep = currentStep >= STEPS[lang].length - 1;
  document.getElementById("btn-continue").style.display = "block";
  document.getElementById("btn-continue").textContent = isLastStep
    ? T[lang].finalContinue
    : T[lang].continueQuest;
}

/* ============================================================
   PROGRESS DOTS & XP
   ============================================================ */
function setDot(index, correct) {
  const dot = document.getElementById(`dot-${index}`);
  if (!dot) return;
  dot.className = "progress-dot " + (correct ? "done" : "wrong-dot");
}

function updateXP(gained) {
  xp += gained;
  document.getElementById("xp-counter").textContent = `✨ ${xp} XP`;
}

/* ============================================================
   VICTORY SCREEN
   ============================================================ */
function showVictory() {
  SFX.victory();
  document.getElementById("screen-game").style.display = "none";
  const victoryScreen = document.getElementById("screen-victory");
  victoryScreen.style.display = "flex";

  const t = T[lang];
  const title = playerName
    ? `🏆 ${playerName}, ${t.victoryTitle}`
    : t.victoryTitle;

  document.getElementById("victory-title").textContent = title;
  document.getElementById("victory-sub").textContent = t.victorySub;
  document.getElementById("final-xp").textContent = `✨ ${xp} XP`;
  document.getElementById("btn-replay").textContent = t.replayBtn;

  document.getElementById("victory-concepts").innerHTML =
    `<h3>${t.spellsMastered}</h3>` +
    t.learned
      .map(
        (item) =>
          `<div class="learned-item"><span class="check">✓</span>${item}</div>`,
      )
      .join("");
}

function restartGame() {
  SFX.click();
  document.getElementById("screen-victory").style.display = "none";
  xp = 0;
  currentStep = 0;
  challengeIdx = 0;
  playerName = "";
  const nameInput = document.getElementById("player-name-input");
  if (nameInput) nameInput.value = "";
  document.getElementById("screen-title").style.display = "flex";
  applyUI();
}

/* ============================================================
   BACK BUTTON
   ============================================================ */
function goBack() {
  SFX.click();
  const confirmMsg =
    lang === "ta"
      ? "விளையாட்டை விட்டு வெளியேற விரும்புகிறீர்களா? முன்னேற்றம் தொலைந்துவிடும்."
      : "Exit the quest? Your progress will be lost.";
  if (window.confirm(confirmMsg)) {
    document.getElementById("screen-game").style.display = "none";
    document.getElementById("screen-title").style.display = "flex";
    xp = 0;
    currentStep = 0;
    challengeIdx = 0;
    playerName = "";
    const nameInput = document.getElementById("player-name-input");
    if (nameInput) nameInput.value = "";
    applyUI();
  }
}

/* ============================================================
   INIT
   ============================================================ */
applyUI();

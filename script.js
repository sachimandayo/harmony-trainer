"use strict";

const STORAGE_KEY = "diatonicFlashcards.v1";

const MAJOR_KEYS = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
const MINOR_KEYS = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
const MAJOR_CIRCLE = ["C", "F", "B♭", "E♭", "A♭", "D♭", "G♭", "B", "E", "A", "D", "G"];
const MINOR_CIRCLE = ["A", "D", "G", "C", "F", "B♭", "E♭", "G♯", "C♯", "F♯", "B", "E"];

const MAJOR_SCALES = {
  "C": ["C", "D", "E", "F", "G", "A", "B"],
  "D♭": ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"],
  "D": ["D", "E", "F♯", "G", "A", "B", "C♯"],
  "E♭": ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
  "E": ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
  "F": ["F", "G", "A", "B♭", "C", "D", "E"],
  "G♭": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"],
  "G": ["G", "A", "B", "C", "D", "E", "F♯"],
  "A♭": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
  "A": ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
  "B♭": ["B♭", "C", "D", "E♭", "F", "G", "A"],
  "B": ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"]
};

const NATURAL_MINOR_SCALES = {
  "C": ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  "C♯": ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  "D": ["D", "E", "F", "G", "A", "B♭", "C"],
  "E♭": ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
  "E": ["E", "F♯", "G", "A", "B", "C", "D"],
  "F": ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"],
  "F♯": ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  "G": ["G", "A", "B♭", "C", "D", "E♭", "F"],
  "G♯": ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"],
  "A": ["A", "B", "C", "D", "E", "F", "G"],
  "B♭": ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  "B": ["B", "C♯", "D", "E", "F♯", "G", "A"]
};

const HARMONIC_MINOR_SCALES = {
  "C": ["C", "D", "E♭", "F", "G", "A♭", "B"],
  "C♯": ["C♯", "D♯", "E", "F♯", "G♯", "A", "B♯"],
  "D": ["D", "E", "F", "G", "A", "B♭", "C♯"],
  "E♭": ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D"],
  "E": ["E", "F♯", "G", "A", "B", "C", "D♯"],
  "F": ["F", "G", "A♭", "B♭", "C", "D♭", "E"],
  "F♯": ["F♯", "G♯", "A", "B", "C♯", "D", "E♯"],
  "G": ["G", "A", "B♭", "C", "D", "E♭", "F♯"],
  "G♯": ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯♯"],
  "A": ["A", "B", "C", "D", "E", "F", "G♯"],
  "B♭": ["B♭", "C", "D♭", "E♭", "F", "G♭", "A"],
  "B": ["B", "C♯", "D", "E", "F♯", "G", "A♯"]
};

const MELODIC_MINOR_SCALES = {
  "C": ["C", "D", "E♭", "F", "G", "A", "B"],
  "C♯": ["C♯", "D♯", "E", "F♯", "G♯", "A♯", "B♯"],
  "D": ["D", "E", "F", "G", "A", "B", "C♯"],
  "E♭": ["E♭", "F", "G♭", "A♭", "B♭", "C", "D"],
  "E": ["E", "F♯", "G", "A", "B", "C♯", "D♯"],
  "F": ["F", "G", "A♭", "B♭", "C", "D", "E"],
  "F♯": ["F♯", "G♯", "A", "B", "C♯", "D♯", "E♯"],
  "G": ["G", "A", "B♭", "C", "D", "E", "F♯"],
  "G♯": ["G♯", "A♯", "B", "C♯", "D♯", "E♯", "F♯♯"],
  "A": ["A", "B", "C", "D", "E", "F♯", "G♯"],
  "B♭": ["B♭", "C", "D♭", "E♭", "F", "G", "A"],
  "B": ["B", "C♯", "D", "E", "F♯", "G♯", "A♯"]
};

const QUALITY = {
  major: { suffix: "", name: "メジャー" },
  minor: { suffix: "m", name: "マイナー" },
  diminished: { suffix: "dim", name: "ディミニッシュ" },
  augmented: { suffix: "aug", name: "オーギュメント" }
};

const MODES = {
  majorDiatonic: {
    label: "メジャーダイアトニック",
    keyType: "major",
    scaleName: "メジャー",
    scales: MAJOR_SCALES,
    degrees: ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"],
    qualityPattern: ["major", "minor", "minor", "major", "major", "minor", "diminished"]
  },
  naturalMinor: {
    label: "ナチュラルマイナー",
    keyType: "minor",
    scaleName: "ナチュラルマイナー",
    scales: NATURAL_MINOR_SCALES,
    degrees: ["Ⅰ", "Ⅱ", "♭Ⅲ", "Ⅳ", "Ⅴ", "♭Ⅵ", "♭Ⅶ"],
    qualityPattern: ["minor", "diminished", "major", "minor", "minor", "major", "major"]
  },
  harmonicMinor: {
    label: "ハーモニックマイナー",
    keyType: "minor",
    scaleName: "ハーモニックマイナー",
    scales: HARMONIC_MINOR_SCALES,
    degrees: ["Ⅰ", "Ⅱ", "♭Ⅲ", "Ⅳ", "Ⅴ", "♭Ⅵ", "Ⅶ"],
    qualityPattern: ["minor", "diminished", "augmented", "minor", "major", "major", "diminished"]
  },
  melodicMinor: {
    label: "メロディックマイナー",
    keyType: "minor",
    scaleName: "メロディックマイナー",
    scales: MELODIC_MINOR_SCALES,
    degrees: ["Ⅰ", "Ⅱ", "♭Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"],
    qualityPattern: ["minor", "minor", "augmented", "major", "major", "diminished", "diminished"],
    note: "このモードでは、ジャズで一般的な上行形メロディックマイナーを使用しています。"
  },
  major251: {
    label: "メジャーⅡ–Ⅴ–Ⅰ",
    keyType: "major",
    scaleName: "メジャー",
    scales: MAJOR_SCALES,
    progressionLabel: "Ⅱ–Ⅴ–Ⅰ",
    progressionDegrees: ["Ⅱm7", "Ⅴ7", "Ⅰmaj7"],
    progressionPattern: [
      { degreeIndex: 1, suffix: "m7" },
      { degreeIndex: 4, suffix: "7" },
      { degreeIndex: 0, suffix: "maj7" }
    ]
  },
  minor251: {
    label: "マイナーⅡ–Ⅴ–Ⅰ",
    keyType: "minor",
    scaleName: "マイナー",
    scales: HARMONIC_MINOR_SCALES,
    progressionLabel: "Ⅱ–Ⅴ–Ⅰ",
    progressionDegrees: ["Ⅱm7♭5", "Ⅴ7", "Ⅰm"],
    progressionPattern: [
      { degreeIndex: 1, suffix: "m7♭5" },
      { degreeIndex: 4, suffix: "7" },
      { degreeIndex: 0, suffix: "m" }
    ]
  },
  majorCadence: {
    label: "メジャーカデンツ",
    keyType: "major",
    scaleName: "メジャー",
    scales: MAJOR_SCALES,
    progressionLabel: "カデンツ",
    progressionDegrees: ["Ⅵm7", "Ⅱm7", "Ⅴ7", "Ⅰmaj7"],
    progressionPattern: [
      { degreeIndex: 5, suffix: "m7" },
      { degreeIndex: 1, suffix: "m7" },
      { degreeIndex: 4, suffix: "7" },
      { degreeIndex: 0, suffix: "maj7" }
    ],
    note: "このモードでは、メジャーキーの基本カデンツとして Ⅵ–Ⅱ–Ⅴ–Ⅰ を使用しています。"
  },
  minorCadence: {
    label: "マイナーカデンツ",
    keyType: "minor",
    scaleName: "マイナー",
    scales: HARMONIC_MINOR_SCALES,
    progressionLabel: "カデンツ",
    progressionDegrees: ["Ⅳm7", "Ⅱm7♭5", "Ⅴ7", "Ⅰm"],
    progressionPattern: [
      { degreeIndex: 3, suffix: "m7" },
      { degreeIndex: 1, suffix: "m7♭5" },
      { degreeIndex: 4, suffix: "7" },
      { degreeIndex: 0, suffix: "m" }
    ],
    note: "このモードでは、マイナーキーの基本カデンツとして Ⅳm–Ⅱm7♭5–Ⅴ7–Ⅰm を使用しています。"
  }
};

const MODE_OPTIONS = [
  ["majorDiatonic", "メジャーダイアトニック"],
  ["naturalMinor", "ナチュラルマイナー"],
  ["harmonicMinor", "ハーモニックマイナー"],
  ["melodicMinor", "メロディックマイナー"],
  ["major251", "メジャーⅡ–Ⅴ–Ⅰ"],
  ["minor251", "マイナーⅡ–Ⅴ–Ⅰ"],
  ["majorCadence", "メジャーカデンツ"],
  ["minorCadence", "マイナーカデンツ"],
  ["mixed", "すべて混合"]
];

const TARGET_OPTIONS = [
  ["all", "全12キー"],
  ["single", "1つのキーを集中練習"],
  ["multiple", "複数のキーを選択"],
  ["circle", "五度圏順"],
  ["weak", "苦手カードのみ"]
];

const COUNT_OPTIONS = [
  ["10", "10枚"],
  ["20", "20枚"],
  ["30", "30枚"],
  ["50", "50枚"],
  ["all", "全カード"]
];

const state = {
  selectedMode: "majorDiatonic",
  target: "all",
  count: "20",
  keyMode: "major",
  selectedKeys: new Set(["C"]),
  deck: [],
  currentIndex: 0,
  currentCard: null,
  isFlipped: false,
  lastSettings: null,
  session: null
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  renderSetupOptions();
  updateKeyPicker();
  addEventListeners();
  runValidationChecks();
});

function bindElements() {
  [
    "setupScreen", "practiceScreen", "summaryScreen", "statsScreen", "settingsForm",
    "modeOptions", "targetOptions", "countOptions", "melodicNote", "keyPicker",
    "keyModeSelect", "keyList", "practiceModeLabel", "practiceTitle", "progressText",
    "flashcard", "frontKey", "frontQuestion", "backAnswer", "backDetails", "reviewActions",
    "knownButton", "unsureButton", "summaryStats", "sessionWeakList", "retryButton",
    "weakOnlyButton", "backHomeButton", "homeButton", "statsButton", "statsHomeButton",
    "statsOverview", "modeStats", "keyStats", "degreeStats", "weakCardStats", "resetStatsButton"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function renderSetupOptions() {
  els.modeOptions.innerHTML = MODE_OPTIONS.map(([value, label], index) => optionMarkup("mode", value, label, index === 0)).join("");
  els.targetOptions.innerHTML = TARGET_OPTIONS.map(([value, label], index) => optionMarkup("target", value, label, index === 0)).join("");
  els.countOptions.innerHTML = COUNT_OPTIONS.map(([value, label], index) => optionMarkup("count", value, label, index === 1)).join("");
  els.keyModeSelect.innerHTML = [
    ["major", "メジャーキー"],
    ["minor", "マイナーキー"]
  ].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function optionMarkup(name, value, label, checked) {
  return `
    <label class="option-tile">
      <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}>
      <span>${label}</span>
    </label>
  `;
}

function addEventListeners() {
  els.settingsForm.addEventListener("change", handleSettingsChange);
  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startPractice(readSettings());
  });
  els.keyModeSelect.addEventListener("change", () => {
    state.keyMode = els.keyModeSelect.value;
    const keys = getKeysForKeyMode(state.keyMode);
    state.selectedKeys = new Set([keys[0]]);
    renderKeyChips();
  });
  els.flashcard.addEventListener("click", flipCurrentCard);
  els.knownButton.addEventListener("click", () => answerCurrentCard(true));
  els.unsureButton.addEventListener("click", () => answerCurrentCard(false));
  els.retryButton.addEventListener("click", () => startPractice(state.lastSettings));
  els.weakOnlyButton.addEventListener("click", () => startPractice({ ...state.lastSettings, target: "weak" }));
  els.backHomeButton.addEventListener("click", () => showScreen("setupScreen"));
  els.homeButton.addEventListener("click", () => showScreen("setupScreen"));
  els.statsHomeButton.addEventListener("click", () => showScreen("setupScreen"));
  els.statsButton.addEventListener("click", showStats);
  els.resetStatsButton.addEventListener("click", resetStats);
  document.addEventListener("keydown", handleKeyboard);
}

function handleSettingsChange(event) {
  if (event.target.name === "mode" || event.target.name === "target" || event.target.name === "count") {
    state.selectedMode = getCheckedValue("mode");
    state.target = getCheckedValue("target");
    state.count = getCheckedValue("count");
    syncKeyModeWithMode();
    updateKeyPicker();
  }
}

function syncKeyModeWithMode() {
  const mode = MODES[state.selectedMode];
  if (mode && mode.keyType !== state.keyMode) {
    state.keyMode = mode.keyType;
    state.selectedKeys = new Set([getKeysForKeyMode(state.keyMode)[0]]);
  }
}

function updateKeyPicker() {
  const needsKeys = state.target === "single" || state.target === "multiple";
  els.keyPicker.classList.toggle("hidden", !needsKeys);
  const mode = MODES[state.selectedMode];
  els.melodicNote.classList.toggle("hidden", !mode?.note && state.selectedMode !== "mixed");
  els.melodicNote.textContent = mode?.note || "混合モードでは、メロディックマイナーはジャズで一般的な上行形を、カデンツは各モードの基本形を使用しています。";
  els.keyModeSelect.value = state.keyMode;
  els.keyModeSelect.disabled = state.selectedMode !== "mixed";
  renderKeyChips();
}

function renderKeyChips() {
  const keys = getKeysForKeyMode(state.keyMode);
  els.keyList.innerHTML = "";
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `key-chip${state.selectedKeys.has(key) ? " selected" : ""}`;
    button.textContent = key;
    button.addEventListener("click", () => toggleKey(key));
    els.keyList.appendChild(button);
  });
}

function toggleKey(key) {
  if (state.target === "single") {
    state.selectedKeys = new Set([key]);
  } else if (state.selectedKeys.has(key)) {
    if (state.selectedKeys.size > 1) state.selectedKeys.delete(key);
  } else {
    state.selectedKeys.add(key);
  }
  renderKeyChips();
}

function getCheckedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

function readSettings() {
  state.selectedMode = getCheckedValue("mode");
  state.target = getCheckedValue("target");
  state.count = getCheckedValue("count");
  return {
    mode: state.selectedMode,
    target: state.target,
    count: state.count,
    keyMode: state.keyMode,
    selectedKeys: Array.from(state.selectedKeys)
  };
}

function startPractice(settings) {
  const baseDeck = buildDeck(settings);
  if (baseDeck.length === 0) {
    alert("条件に合うカードがまだありません。別の条件を選んでください。");
    return;
  }

  state.lastSettings = structuredCloneSafe(settings);
  state.deck = makeSessionDeck(baseDeck, settings);
  state.currentIndex = 0;
  state.session = {
    practiced: 0,
    known: 0,
    unsure: 0,
    weakCards: [],
    seenIds: new Map()
  };
  showScreen("practiceScreen");
  showCurrentCard();
}

function buildDeck(settings) {
  let cards = [];
  const modeIds = settings.mode === "mixed" ? Object.keys(MODES) : [settings.mode];
  modeIds.forEach((modeId) => {
    cards = cards.concat(buildModeCards(modeId, settings));
  });

  if (settings.target === "weak") {
    const stats = loadStats();
    cards = cards.filter((card) => isWeakCard(stats[card.id]));
  }

  return sortCards(cards, settings);
}

function buildModeCards(modeId, settings) {
  const mode = MODES[modeId];
  const keys = selectKeysForMode(mode, settings);
  if (mode.progressionPattern) {
    return keys.map((key) => buildProgressionCard(modeId, key));
  }
  return keys.flatMap((key) => mode.degrees.map((degree, degreeIndex) => buildDiatonicCard(modeId, key, degreeIndex)));
}

function selectKeysForMode(mode, settings) {
  const defaultKeys = getKeysForKeyMode(mode.keyType);
  if (settings.target === "single" || settings.target === "multiple") {
    const chosen = settings.selectedKeys.filter((key) => defaultKeys.includes(key));
    return chosen.length ? chosen : [defaultKeys[0]];
  }
  if (settings.target === "circle") {
    return mode.keyType === "major" ? MAJOR_CIRCLE : MINOR_CIRCLE;
  }
  return defaultKeys;
}

function getKeysForKeyMode(keyMode) {
  return keyMode === "major" ? MAJOR_KEYS : MINOR_KEYS;
}

function buildDiatonicCard(modeId, key, degreeIndex) {
  const mode = MODES[modeId];
  const scale = mode.scales[key];
  const qualityId = mode.qualityPattern[degreeIndex];
  const root = scale[degreeIndex];
  const chord = makeTriadName(root, qualityId);
  const notes = [scale[degreeIndex], scale[(degreeIndex + 2) % 7], scale[(degreeIndex + 4) % 7]];
  const fullList = buildDiatonicList(modeId, key);
  const degree = mode.degrees[degreeIndex];

  return {
    id: `${modeId}|${key}|${degree}`,
    modeId,
    modeLabel: mode.label,
    key,
    keyLabel: `${key}${mode.scaleName}`,
    degree,
    question: `${degree}は？`,
    answer: chord,
    details: [
      `構成音：${notes.join("・")}`,
      `種類：${QUALITY[qualityId].name}`,
      `${key}${mode.scaleName}：${fullList.join("・")}`
    ],
    searchable: `${key}${mode.scaleName} ${degree} ${chord}`
  };
}

function buildProgressionCard(modeId, key) {
  const mode = MODES[modeId];
  const scale = mode.scales[key];
  const progressionText = mode.progressionDegrees.join(" → ");
  const answer = mode.progressionPattern
    .map((step) => `${scale[step.degreeIndex]}${step.suffix}`)
    .join(" → ");

  return {
    id: `${modeId}|${key}|${mode.progressionLabel}`,
    modeId,
    modeLabel: mode.label,
    key,
    keyLabel: `${key}${mode.scaleName}`,
    degree: mode.progressionLabel,
    question: modeId.endsWith("Cadence") ? `${mode.label}\n${progressionText}は？` : `${mode.progressionLabel}は？`,
    isLongQuestion: modeId.endsWith("Cadence"),
    answer,
    details: [progressionText],
    searchable: `${key}${mode.scaleName} ${mode.progressionLabel} ${progressionText} ${answer}`
  };
}

function buildDiatonicList(modeId, key) {
  const mode = MODES[modeId];
  return mode.scales[key].map((note, index) => makeTriadName(note, mode.qualityPattern[index]));
}

function makeTriadName(root, qualityId) {
  return `${root}${QUALITY[qualityId].suffix}`;
}

function sortCards(cards, settings) {
  if (settings.target === "circle") return cards;
  return shuffle(cards);
}

function makeSessionDeck(cards, settings) {
  const limit = settings.count === "all" ? cards.length : Number(settings.count);
  const deck = [];

  // 1キー集中などで候補が設定枚数より少ない場合も、選択した枚数まで出題する。
  while (deck.length < limit) {
    const batch = settings.target === "circle" ? cards.slice() : shuffle(cards);
    deck.push(...batch.slice(0, limit - deck.length));
  }

  return deck;
}

function showCurrentCard() {
  state.currentCard = state.deck[state.currentIndex];
  state.isFlipped = false;
  els.flashcard.classList.remove("flipped");
  els.reviewActions.classList.add("hidden");
  els.practiceModeLabel.textContent = state.currentCard.modeLabel;
  els.practiceTitle.textContent = state.currentCard.keyLabel;
  els.progressText.textContent = `${state.currentIndex + 1} / ${state.deck.length}`;
  els.frontKey.textContent = state.currentCard.keyLabel;
  els.frontQuestion.textContent = state.currentCard.question;
  els.frontQuestion.classList.toggle("long-question", Boolean(state.currentCard.isLongQuestion));
  els.backAnswer.textContent = state.currentCard.answer;
  els.backDetails.innerHTML = state.currentCard.details.map((line) => `<span>${line}</span>`).join("<br>");
}

function flipCurrentCard() {
  if (!state.currentCard || state.isFlipped) return;
  state.isFlipped = true;
  els.flashcard.classList.add("flipped");
  els.reviewActions.classList.remove("hidden");
}

function answerCurrentCard(remembered) {
  if (!state.currentCard || !state.isFlipped) return;
  updateCardStats(state.currentCard, remembered);
  state.session.practiced += 1;
  state.session.known += remembered ? 1 : 0;
  state.session.unsure += remembered ? 0 : 1;
  state.session.seenIds.set(state.currentCard.id, true);

  if (!remembered) {
    state.session.weakCards.push(state.currentCard);
    maybeRequeueUnsureCard(state.currentCard);
  }

  state.currentIndex += 1;
  if (state.currentIndex >= state.deck.length) {
    showSummary();
  } else {
    showCurrentCard();
  }
}

function maybeRequeueUnsureCard(card) {
  // 「全カード」は各カードを1回ずつ出題する。枚数指定時だけ後半の枠と入れ替える。
  if (state.lastSettings.count === "all") return;

  const repeatsForCard = state.deck.filter((item) => item.id === card.id).length;
  const earliestRepeatIndex = state.currentIndex + 4;
  if (repeatsForCard >= 2 || earliestRepeatIndex >= state.deck.length) return;

  const remainingSlots = state.deck.length - earliestRepeatIndex;
  const replaceAt = earliestRepeatIndex + Math.floor(Math.random() * remainingSlots);
  state.deck[replaceAt] = card;
}

function updateCardStats(card, remembered) {
  const stats = loadStats();
  const record = stats[card.id] || {
    id: card.id,
    modeId: card.modeId,
    modeLabel: card.modeLabel,
    key: card.key,
    keyLabel: card.keyLabel,
    degree: card.degree,
    searchable: card.searchable,
    shown: 0,
    remembered: 0,
    unsure: 0,
    streak: 0,
    lastStudiedAt: ""
  };
  record.shown += 1;
  record.remembered += remembered ? 1 : 0;
  record.unsure += remembered ? 0 : 1;
  record.streak = remembered ? record.streak + 1 : 0;
  record.lastStudiedAt = new Date().toISOString();
  record.rate = record.shown ? Math.round((record.remembered / record.shown) * 100) : 0;
  stats[card.id] = record;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function showSummary() {
  const uniqueWeak = uniqueCards(state.session.weakCards);
  els.summaryStats.innerHTML = [
    metricMarkup("練習した枚数", state.session.practiced),
    metricMarkup("覚えていた枚数", state.session.known),
    metricMarkup("まだ不安だった枚数", state.session.unsure)
  ].join("");
  els.sessionWeakList.innerHTML = uniqueWeak.length
    ? uniqueWeak.map(cardListMarkup).join("")
    : `<p class="empty-text">今回はありません。</p>`;
  showScreen("summaryScreen");
}

function showStats() {
  const stats = loadStats();
  const records = Object.values(stats);
  const total = records.reduce((sum, record) => sum + record.shown, 0);
  const latest = records.map((record) => record.lastStudiedAt).sort().at(-1);
  els.statsOverview.innerHTML = [
    metricMarkup("総学習枚数", total),
    metricMarkup("最近学習した日時", latest ? formatDateTime(latest) : "未学習")
  ].join("");
  renderBarStats(els.modeStats, groupRecords(records, "modeLabel"));
  renderBarStats(els.keyStats, groupRecords(records, "key"));
  renderBarStats(els.degreeStats, groupRecords(records, "degree"));
  renderWeakCardStats(records);
  showScreen("statsScreen");
}

function renderBarStats(container, groups) {
  const entries = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0], "ja"));
  if (!entries.length) {
    container.innerHTML = `<p class="empty-text">まだ記録がありません。</p>`;
    return;
  }
  container.innerHTML = entries.map(([label, data]) => {
    const rate = data.shown ? Math.round((data.remembered / data.shown) * 100) : 0;
    return `
      <div class="bar-row">
        <div class="bar-top"><span>${label}</span><span>${rate}% / ${data.shown}枚</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${rate}%"></div></div>
      </div>
    `;
  }).join("");
}

function renderWeakCardStats(records) {
  const weak = records
    .filter((record) => record.shown > 0)
    .sort((a, b) => (a.rate - b.rate) || (b.unsure - a.unsure))
    .slice(0, 10);
  els.weakCardStats.innerHTML = weak.length
    ? weak.map((record) => `
      <div class="weak-item">
        <strong>${record.searchable}</strong>
        <span>自己評価率 ${record.rate}% / 表示 ${record.shown}回 / まだ不安 ${record.unsure}回</span>
      </div>
    `).join("")
    : `<p class="empty-text">まだ記録がありません。</p>`;
}

function groupRecords(records, field) {
  return records.reduce((groups, record) => {
    const key = record[field] || "未分類";
    groups[key] ||= { shown: 0, remembered: 0 };
    groups[key].shown += record.shown;
    groups[key].remembered += record.remembered;
    return groups;
  }, {});
}

function resetStats() {
  if (!confirm("学習記録をリセットしますか？")) return;
  localStorage.removeItem(STORAGE_KEY);
  showStats();
}

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function isWeakCard(record) {
  if (!record) return false;
  return record.unsure > 0 && (record.rate < 75 || record.streak < 2);
}

function handleKeyboard(event) {
  if (!els.practiceScreen.classList.contains("active")) return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    flipCurrentCard();
  }
  if (event.key === "ArrowRight" && state.isFlipped) {
    answerCurrentCard(true);
  }
  if (event.key === "ArrowLeft" && state.isFlipped) {
    answerCurrentCard(false);
  }
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  els[id].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function metricMarkup(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function cardListMarkup(card) {
  return `
    <div class="weak-item">
      <strong>${card.keyLabel} ${card.degree}</strong>
      <span>${card.answer}</span>
    </div>
  `;
}

function uniqueCards(cards) {
  const map = new Map();
  cards.forEach((card) => map.set(card.id, card));
  return Array.from(map.values());
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatDateTime(isoString) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

function runValidationChecks() {
  const expected = {
    "majorDiatonic|A": "A・Bm・C♯m・D・E・F♯m・G♯dim",
    "majorDiatonic|G♭": "G♭・A♭m・B♭m・C♭・D♭・E♭m・Fdim",
    "naturalMinor|A": "Am・Bdim・C・Dm・Em・F・G",
    "naturalMinor|C": "Cm・Ddim・E♭・Fm・Gm・A♭・B♭",
    "harmonicMinor|A": "Am・Bdim・Caug・Dm・E・F・G♯dim",
    "harmonicMinor|C": "Cm・Ddim・E♭aug・Fm・G・A♭・Bdim",
    "harmonicMinor|F♯": "F♯m・G♯dim・Aaug・Bm・C♯・D・E♯dim",
    "melodicMinor|A": "Am・Bm・Caug・D・E・F♯dim・G♯dim",
    "melodicMinor|C": "Cm・Dm・E♭aug・F・G・Adim・Bdim"
  };

  Object.entries(expected).forEach(([key, value]) => {
    const [modeId, tonic] = key.split("|");
    const actual = buildDiatonicList(modeId, tonic).join("・");
    console.assert(actual === value, `${key}: ${actual} !== ${value}`);
  });

  const progressions = {
    "major251|C": "Dm7 → G7 → Cmaj7",
    "major251|E♭": "Fm7 → B♭7 → E♭maj7",
    "minor251|A": "Bm7♭5 → E7 → Am",
    "minor251|C": "Dm7♭5 → G7 → Cm",
    "majorCadence|C": "Am7 → Dm7 → G7 → Cmaj7",
    "majorCadence|E♭": "Cm7 → Fm7 → B♭7 → E♭maj7",
    "minorCadence|A": "Dm7 → Bm7♭5 → E7 → Am",
    "minorCadence|C": "Fm7 → Dm7♭5 → G7 → Cm"
  };

  Object.entries(progressions).forEach(([key, value]) => {
    const [modeId, tonic] = key.split("|");
    const actual = buildProgressionCard(modeId, tonic).answer;
    console.assert(actual === value, `${key}: ${actual} !== ${value}`);
  });
}

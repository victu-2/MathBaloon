'use strict';

const STORAGE_KEY = 'mathBalloon';

const LEVELS = [
  { id:1, name:'Primeiro Voo', icon:'🎈', difficulty:1, operations:['add'], maxNumber:10, questionCount:6, timePerQuestion:20, obstacleRate:0, obstacleSpeed:60, drainRate:1.4, cloudDensity:1 },
  { id:2, name:'Céu Azul', icon:'☀️', difficulty:1, operations:['add','sub'], maxNumber:12, questionCount:6, timePerQuestion:18, obstacleRate:8, obstacleSpeed:70, drainRate:1.7, cloudDensity:1 },
  { id:3, name:'Montanhas', icon:'⛰️', difficulty:2, operations:['add','sub'], maxNumber:20, questionCount:7, timePerQuestion:17, obstacleRate:7, obstacleSpeed:75, drainRate:1.8, cloudDensity:1 },
  { id:4, name:'Floresta', icon:'🌲', difficulty:2, operations:['add','sub','mul'], maxNumber:20, maxMul:4, questionCount:8, timePerQuestion:16, obstacleRate:6.5, obstacleSpeed:80, drainRate:2.0, cloudDensity:1 },
  { id:5, name:'Vale Verde', icon:'🌻', difficulty:2, operations:['add','sub','mul'], maxNumber:30, maxMul:5, questionCount:8, timePerQuestion:15, obstacleRate:6, obstacleSpeed:85, drainRate:2.2, cloudDensity:1 },
  { id:6, name:'Desafio das Nuvens', icon:'⛈️', difficulty:3, operations:['add','sub','mul','div'], maxNumber:40, maxMul:7, maxDiv:5, questionCount:9, timePerQuestion:14, obstacleRate:5.5, obstacleSpeed:90, drainRate:2.4, cloudDensity:1.1 },
  { id:7, name:'Alto das Montanhas', icon:'🦅', difficulty:3, operations:['add','sub','mul','div'], maxNumber:50, maxMul:8, maxDiv:6, questionCount:9, timePerQuestion:13, obstacleRate:5, obstacleSpeed:95, drainRate:2.5, cloudDensity:1.1 },
  { id:8, name:'Floresta Sustentável', icon:'🌍', difficulty:3, operations:['add','sub','mul','div'], maxNumber:60, maxMul:9, maxDiv:7, questionCount:10, timePerQuestion:12, obstacleRate:4.5, obstacleSpeed:100, drainRate:2.8, cloudDensity:1.2 },
  { id:9, name:'Céu dos Campeões', icon:'🏆', difficulty:4, operations:['add','sub','mul','div'], maxNumber:80, maxMul:10, maxDiv:8, questionCount:10, timePerQuestion:11, obstacleRate:4, obstacleSpeed:105, drainRate:2.9, cloudDensity:1.2 },
  { id:10, name:'Grande Voo', icon:'🚀', difficulty:4, operations:['add','sub','mul','div'], maxNumber:100, maxMul:12, maxDiv:9, questionCount:12, timePerQuestion:10, obstacleRate:3.5, obstacleSpeed:110, drainRate:3.2, cloudDensity:1.3 }
];

const DIFF_LABELS = { 1:'Fácil', 2:'Médio', 3:'Difícil', 4:'Expert' };

const OP_SYMBOLS = { add:'+', sub:'-', mul:'×', div:'÷' };

const MESSAGES_CORRECT = ['MUITO BEM! 🎉', 'ISSO AÍ! ⭐', 'EXCELENTE! 🏅', 'MANDOU BEM! 💪', 'PERFEITO! 🌟', 'INCRÍVEL! 🚀'];
const MESSAGES_ENV_HIGH = '🌍 O céu está lindo! Cada escolha faz diferença. Continue cuidando do nosso planeta!';
const MESSAGES_ENV_MID = '🌿 Que bom ver o ambiente se recuperando. Cada escolha faz diferença!';
const MESSAGES_ENV_LOW = '💨 Vamos cuidar melhor do nosso planeta? Cada escolha faz diferença!';

const SKINS = [
  { id:'classic', name:'Clássico', cost:0, base:'#E53935', rim:'#C62828', vent:'#C62828', stripes:[{x:-31,w:15,c:'#FF7043'},{x:-8,w:16,c:'#FFD54F'},{x:20,w:12,c:'#66BB6A'},{x:24,w:8,c:'#4FC3F7'}] },
  { id:'rainbow', name:'Arco-Íris', cost:6, base:'#E53935', rim:'#B71C1C', vent:'#AB47BC', stripes:[{x:-31,w:10.4,c:'#E53935'},{x:-20.6,w:10.4,c:'#FF9800'},{x:-10.2,w:10.4,c:'#FFEB3B'},{x:0.2,w:10.4,c:'#66BB6A'},{x:10.6,w:10.4,c:'#29B6F6'},{x:21,w:10.4,c:'#AB47BC'}] },
  { id:'bee', name:'Abelha', cost:12, base:'#FFD54F', rim:'#F9A825', vent:'#F9A825', stripes:[{x:-24,w:9,c:'#37474F'},{x:-2,w:9,c:'#37474F'},{x:20,w:9,c:'#37474F'}] },
  { id:'melon', name:'Melancia', cost:18, base:'#8BC34A', rim:'#558B2F', vent:'#33691E', stripes:[{x:-28,w:8,c:'#33691E'},{x:-10,w:7,c:'#2E7D32'},{x:8,w:8,c:'#33691E'},{x:24,w:7,c:'#2E7D32'}], deco:'seeds' },
  { id:'galaxy', name:'Galáxia', cost:24, base:'#4527A0', rim:'#311B92', vent:'#1A237E', stripes:[{x:-22,w:12,c:'#5E35B1'},{x:10,w:12,c:'#311B92'}], bg:['#7B1FA2','#1A237E'], deco:'stars' },
  { id:'gold', name:'Ouro', cost:30, base:'#FFC107', rim:'#FF8F00', vent:'#FF8F00', stripes:[{x:-26,w:10,c:'#FFE082'},{x:0,w:10,c:'#FFB300'},{x:24,w:8,c:'#FFE082'}], bg:['#FFF59D','#FF8F00'], deco:'sparkle' }
];

const LEVEL_THEMES = {
  1: { skyTop:0x3FA9F5, skyLow:0xCDEBFB, mtnFar:0xFFFFFF, mtnNear:0xFFFFFF, hills:0xFFFFFF, cloud:0xFFFFFF },
  2: { skyTop:0x1E88E5, skyLow:0xB3E5FC, mtnFar:0xF3FAFF, mtnNear:0xE8F4FF, hills:0xF1FFF1, cloud:0xFFFFFF },
  3: { skyTop:0x5C9CE6, skyLow:0xD5E5F7, mtnFar:0xF2F2F7, mtnNear:0xE2E6F0, hills:0xDCEFE0, cloud:0xF5F9FF },
  4: { skyTop:0x3E9BD6, skyLow:0xC9EDDF, mtnFar:0xE9F6EC, mtnNear:0xD8EFDF, hills:0xCFF0B8, cloud:0xF2FFF4 },
  5: { skyTop:0x59B7E8, skyLow:0xE4F6D8, mtnFar:0xF0F9E8, mtnNear:0xE2F2D8, hills:0xC8EC9F, cloud:0xFDFFF0 },
  6: { skyTop:0x7986CB, skyLow:0xFFE0B2, mtnFar:0xE8D5F0, mtnNear:0xD8C2E8, hills:0xB8CCA8, cloud:0xFFD9B3 },
  7: { skyTop:0x5E35B1, skyLow:0xD1C4E9, mtnFar:0xEDE8F8, mtnNear:0xDCD4F0, hills:0xC5D6C8, tree:0xD8E2F0, cloud:0xE8E0F8 },
  8: { skyTop:0x26A69A, skyLow:0xE0F2F1, mtnFar:0xECF9F0, mtnNear:0xDFF2E4, hills:0xBFE8A0, cloud:0xF2FFF9 },
  9: { skyTop:0xF9A825, skyLow:0xFFECB3, mtnFar:0xFFE8C4, mtnNear:0xF8D9A8, hills:0xD2E6A8, cloud:0xFFF3D6 },
  10: { skyTop:0x0D1B4C, skyLow:0x54639B, mtnFar:0x9FA8DA, mtnNear:0x7986CB, hills:0x8FAF8F, tree:0xAAB8CC, cloud:0x9FA8DA, night:true }
};

function totalStars() {
  return Object.values(state.progress.stars).reduce((a, b) => a + (b || 0), 0);
}

const MUSIC_TRACKS = {
  menu: 'music/carefree.mp3',
  gameEasy: 'music/monkeys.mp3',
  gameHard: 'music/riley.mp3',
  endless: 'music/sneaky.mp3'
};

const musicPlayer = {
  el: null,
  current: null,
  play(key) {
    if (!state.settings.music) return;
    if (this.current === key && this.el && !this.el.paused) return;
    this.stop();
    const a = new Audio(MUSIC_TRACKS[key] || MUSIC_TRACKS.menu);
    a.loop = true;
    a.volume = 0.28;
    a.addEventListener('error', () => {
      if (this.el === a) { this.el = null; this.current = null; audio.startMusic(); }
    });
    this.el = a;
    this.current = key;
    a.play().catch(() => {
      if (this.el === a) { this.el = null; this.current = null; audio.startMusic(); }
    });
  },
  stop() {
    audio.stopMusic();
    if (this.el) { this.el.pause(); this.el.currentTime = 0; this.el = null; }
    this.current = null;
  },
  pause() {
    if (this.el) { this.el.pause(); return; }
    audio.stopMusic();
  },
  resume() {
    if (this.el) { this.el.play().catch(() => {}); return; }
    if (state.settings.music) audio.startMusic();
  }
};

function musicForContext() {
  const inGame = state.screen === 'game' || state.screen === 'pause' || state.screen === 'gameover' || state.screen === 'complete';
  if (inGame && game.level) {
    if (game.level.id === 'endless') return 'endless';
    return game.level.difficulty >= 3 ? 'gameHard' : 'gameEasy';
  }
  return 'menu';
}

const defaultProgress = () => ({
  unlockedLevels: 1,
  stars: {},
  highScores: {},
  skin: 'classic',
  endlessHigh: 0,
  settings: { sound: true, music: true, animations: true }
});

const state = {
  screen: 'menu',
  progress: defaultProgress(),
  settings: { sound: true, music: true, animations: true }
};

const game = {
  level: null,
  running: false,
  paused: false,
  ended: false,
  score: 0,
  combo: 0,
  comboMax: 0,
  correctCount: 0,
  wrongCount: 0,
  questionIndex: 0,
  current: null,
  timeLeft: 0,
  answered: false,
  nextDelay: 0,
  altitude: 100,
  environment: 100,
  invuln: 0,
  obstacleTimer: 0,
  elapsed: 0,
  bobPhase: 0,
  W: 0,
  H: 0,
  balloonX() {
    const s = GameFX.scene();
    return s ? s.balloon.x : this.W * 0.2;
  },
  balloonY() {
    const s = GameFX.scene();
    return s ? s.balloon.y : this.H * 0.55;
  }
};

const audio = {
  ctx: null,
  musicTimer: null,
  musicStep: 0,
  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },
  raw(freq, dur, type, vol, when, slide) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + (when || 0);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol || 0.2, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },
  tone(freq, dur, type, vol, when, slide) {
    if (!state.settings.sound) return;
    this.raw(freq, dur, type, vol, when, slide);
  },
  click() { this.tone(620, 0.08, 'square', 0.12); },
  correct() {
    this.tone(523, 0.12, 'triangle', 0.22);
    this.tone(659, 0.12, 'triangle', 0.22, 0.1);
    this.tone(784, 0.2, 'triangle', 0.22, 0.2);
  },
  wrong() {
    this.tone(330, 0.18, 'sawtooth', 0.16, 0, 220);
    this.tone(220, 0.24, 'sawtooth', 0.14, 0.15, 150);
  },
  star() { this.tone(1200, 0.08, 'sine', 0.16, 0, 1800); },
  hit() { this.tone(150, 0.2, 'sawtooth', 0.2, 0, 70); this.tone(90, 0.25, 'square', 0.15, 0.02, 50); },
  complete() {
    const seq = [523, 659, 784, 1046];
    seq.forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.24, i * 0.16));
    this.tone(1046, 0.4, 'triangle', 0.22, 0.64);
  },
  gameover() {
    const seq = [392, 330, 262, 196];
    seq.forEach((f, i) => this.tone(f, 0.26, 'triangle', 0.2, i * 0.2));
  },
  startMusic() {
    this.stopMusic();
    if (!this.ctx || !state.settings.music) return;
    const notes = [262, 294, 330, 392, 440, 523];
    const pattern = [0, 1, 2, 4, 0, 2, 3, 4, 3, 2, 1, 2, 4, 5, 4, 2];
    this.musicStep = 0;
    this.musicTimer = setInterval(() => {
      if (!state.settings.music) return;
      const f = notes[pattern[this.musicStep % pattern.length]];
      this.raw(f, 0.38, 'triangle', 0.07);
      this.musicStep++;
    }, 420);
  },
  stopMusic() {
    if (this.musicTimer) { clearInterval(this.musicTimer); this.musicTimer = null; }
  }
};

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        state.progress = {
          unlockedLevels: Math.max(1, Math.min(10, data.unlockedLevels || 1)),
          stars: data.stars || {},
          highScores: data.highScores || {},
          skin: SKINS.some(s => s.id === data.skin) ? data.skin : 'classic',
          endlessHigh: Math.max(0, +data.endlessHigh || 0),
          settings: Object.assign({}, defaultProgress().settings, data.settings || {})
        };
        state.settings = state.progress.settings;
      }
    } catch (e) {
      state.progress = defaultProgress();
      state.settings = state.progress.settings;
    }
  },
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        unlockedLevels: state.progress.unlockedLevels,
        stars: state.progress.stars,
        highScores: state.progress.highScores,
        skin: state.progress.skin,
        endlessHigh: state.progress.endlessHigh,
        settings: state.settings
      }));
    } catch (e) {}
  },
  reset() {
    state.progress = defaultProgress();
    state.settings = state.progress.settings;
    this.save();
  }
};

const Utils = {
  clamp(v, min, max) { return v < min ? min : (v > max ? max : v); },
  randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
  rand(min, max) { return Math.random() * (max - min) + min; },
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Utils.randInt(0, i);
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },
  pick(arr) { return arr[Utils.randInt(0, arr.length - 1)]; },
  fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
  swapDigits(n) {
    if (n < 10) return -1;
    const s = String(n);
    const swapped = parseInt(s[s.length - 1] + s.slice(0, s.length - 1), 10);
    return swapped !== n ? swapped : -1;
  }
};

function generateQuestion(level) {
  const ops = level.operations;
  const op = Utils.pick(ops);
  let a, b, answer;
  if (op === 'add') {
    a = Utils.randInt(1, level.maxNumber);
    b = Utils.randInt(1, level.maxNumber);
    answer = a + b;
  } else if (op === 'sub') {
    a = Utils.randInt(2, level.maxNumber);
    b = Utils.randInt(1, a - 1);
    answer = a - b;
  } else if (op === 'mul') {
    a = Utils.randInt(2, level.maxMul || 6);
    b = Utils.randInt(2, level.maxMul || 6);
    answer = a * b;
  } else {
    b = Utils.randInt(2, level.maxDiv || 9);
    const q = Utils.randInt(2, level.maxDiv || 9);
    a = b * q;
    answer = q;
  }
  return { op, a, b, answer };
}

function generateAnswers(q, level) {
  const correct = q.answer;
  const candidates = new Set();
  const addD = (v) => {
    if (v > 0 && v !== correct && candidates.size < 8) candidates.add(v);
  };
  const swaps = Utils.swapDigits(correct);
  if (q.op === 'add') {
    addD(correct + 1); addD(correct - 1); addD(correct + 10); addD(correct - 10); addD(correct + 2); addD(correct + 5);
  } else if (q.op === 'sub') {
    addD(correct + 1); addD(correct - 1); addD(correct + 10); addD(correct + 2); addD(correct + 5); addD(swaps);
  } else if (q.op === 'mul') {
    addD(q.a * q.b - q.a); addD(q.a * q.b + q.a);
    addD(q.a * q.b - q.b); addD(q.a * q.b + q.b);
    addD((q.a + 1) * q.b); addD(q.a * (q.b + 1));
    addD((q.a - 1) * q.b); addD(q.a * (q.b - 1));
    addD(swaps); addD(correct + 1); addD(correct - 1);
  } else {
    addD(correct + 1); addD(correct - 1); addD(correct + q.b); addD(correct + q.a); addD(swaps); addD(correct + 10);
  }
  if (candidates.size < 3) {
    let off = 2;
    while (candidates.size < 3) {
      addD(correct + off);
      addD(correct - off);
      off++;
    }
  }
  let distractors = Utils.shuffle([...candidates]).slice(0, 3);
  while (distractors.length < 3) {
    const r = Math.max(1, correct + Utils.randInt(2, 8));
    if (r !== correct && !distractors.includes(r)) distractors.push(r);
  }
  const answers = Utils.shuffle(distractors.concat([correct]));
  return {
    text: `${q.a} ${OP_SYMBOLS[q.op]} ${q.b} = ?`,
    answers,
    correctIndex: answers.indexOf(correct),
    q
  };
}

const $ = (id) => document.getElementById(id);

const els = {
  levelsGrid: $('levelsGrid'),
  totalStarsEl: $('totalStars'),
  skinsGrid: $('skinsGrid'),
  skinsStars: $('skinsStars'),
  countdown: $('countdown'),
  qpQuestion: $('qpQuestion'),
  qpFeedback: $('qpFeedback'),
  qpAnswers: $('qpAnswers'),
  timerBarFill: $('timerBarFill'),
  altBarFill: $('altBarFill'),
  envBarFill: $('envBarFill'),
  hudScore: $('hudScore'),
  hudCombo: $('hudCombo'),
  hudAltitude: $('hudAltitude'),
  hudPhaseText: $('hudPhaseText'),
  goScore: $('goScore'),
  goTotal: $('goTotal'),
  goCorrect: $('goCorrect'),
  goCombo: $('goCombo'),
  goRecord: $('goRecord'),
  goMsg: $('goMsg'),
  cpScore: $('cpScore'),
  cpCorrect: $('cpCorrect'),
  cpCombo: $('cpCombo'),
  cpEnvMsg: $('cpEnvMsg'),
  starsRow: $('starsRow'),
  btnNext: $('btnNext'),
  btnPause: $('btnPause'),
  rotateHint: $('rotateHint'),
  modal: $('modal'),
  modalTitle: $('modalTitle'),
  modalText: $('modalText'),
  toggleSound: $('toggleSound'),
  toggleMusic: $('toggleMusic'),
  toggleAnim: $('toggleAnim')
};

const FONT_UI = () => getComputedStyle(document.body).fontFamily;

let phaserGame = null;
let modalYesCallback = null;

function openModal(title, text, onYes) {
  els.modalTitle.textContent = title;
  els.modalText.textContent = text;
  els.modal.classList.remove('hidden');
  modalYesCallback = onYes;
  uiCardPop(els.modal.querySelector('.modal-card'));
}

function closeModal() {
  els.modal.classList.add('hidden');
  modalYesCallback = null;
}

function renderLevels() {
  els.totalStarsEl.textContent = totalStars();
  els.levelsGrid.innerHTML = '';
  LEVELS.forEach((level, i) => {
    const unlocked = level.id <= state.progress.unlockedLevels;
    const stars = state.progress.stars[level.id] || 0;
    const high = state.progress.highScores[level.id] || 0;
    const card = document.createElement('div');
    card.className = 'level-card ' + (unlocked ? 'unlocked' : 'locked');
    card.style.animationDelay = (i * 0.04) + 's';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', unlocked ? '0' : '-1');
    card.setAttribute('aria-label', unlocked ? ('Fase ' + level.id + ' ' + level.name + ' desbloqueada, ' + stars + ' estrelas') : ('Fase ' + level.id + ' bloqueada'));
    card.innerHTML =
      '<span class="lv-num">FASE ' + level.id + '</span>' +
      '<span class="lv-icon">' + level.icon + '</span>' +
      '<span class="lv-name">' + level.name + '</span>' +
      '<span class="lv-diff diff-' + level.difficulty + '">' + DIFF_LABELS[level.difficulty] + '</span>' +
      '<span class="lv-stars">' + (unlocked ? ('⭐'.repeat(stars) + '☆'.repeat(3 - stars)) : '🔒') + '</span>' +
      (unlocked && high > 0 ? '<span class="lv-high">🏆 ' + Utils.fmt(high) + '</span>' : '') +
      (unlocked ? '' : '<span class="lv-lock">🔒</span>');
    if (unlocked) {
      card.addEventListener('click', () => startLevel(level.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startLevel(level.id); }
      });
    } else {
      card.addEventListener('click', () => {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 450);
        audio.click();
      });
    }
    els.levelsGrid.appendChild(card);
  });
}

function renderSkins() {
  const total = totalStars();
  els.skinsStars.textContent = total;
  els.skinsGrid.innerHTML = '';
  SKINS.forEach(skin => {
    const unlocked = total >= skin.cost;
    const selected = state.progress.skin === skin.id;
    const card = document.createElement('div');
    card.className = 'skin-card ' + (unlocked ? 'unlocked' : 'locked') + (selected ? ' selected' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', unlocked ? '0' : '-1');
    const cv = document.createElement('canvas');
    cv.width = 84;
    cv.height = 152;
    paintBalloon(cv.getContext('2d'), skin);
    card.appendChild(cv);
    const nm = document.createElement('span');
    nm.className = 'skin-name';
    nm.textContent = skin.name;
    const st = document.createElement('span');
    st.className = 'skin-status';
    st.textContent = selected ? '✓ EM USO' : (unlocked ? 'USAR' : '🔒 ' + skin.cost + ' ⭐');
    card.appendChild(nm);
    card.appendChild(st);
    if (unlocked && !selected) {
      card.addEventListener('click', () => {
        state.progress.skin = skin.id;
        Storage.save();
        audio.click();
        if (state.settings.animations) gsap.fromTo(card, { scale: 0.92 }, { scale: 1, duration: 0.35, ease: 'elastic.out(1,0.5)' });
        renderSkins();
      });
    } else if (!unlocked) {
      card.addEventListener('click', () => {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 450);
        audio.click();
      });
    }
    els.skinsGrid.appendChild(card);
  });
}

function renderQuestion() {
  const q = game.current;
  els.qpQuestion.textContent = q.text;
  els.qpAnswers.innerHTML = '';
  q.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'ans-btn';
    btn.textContent = String(ans);
    btn.addEventListener('click', () => onAnswerClick(i));
    els.qpAnswers.appendChild(btn);
  });
  if (state.settings.animations) {
    gsap.fromTo(els.qpAnswers.children, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.8)', clearProps: 'all' });
  }
  els.qpFeedback.textContent = '';
  els.qpFeedback.className = 'qp-feedback';
  game.timeLeft = game.level.timePerQuestion;
  game.answered = false;
  updateTimerBar();
}

function updateTimerBar() {
  if (!game.current) return;
  const total = game.level.timePerQuestion;
  const frac = Utils.clamp(game.timeLeft / total, 0, 1);
  const pct = (frac * 100) + '%';
  els.timerBarFill.style.width = pct;
  els.timerBarFill.classList.remove('warn', 'danger');
  if (frac <= 0.25) els.timerBarFill.classList.add('danger');
  else if (frac <= 0.5) els.timerBarFill.classList.add('warn');
}

function updateHUD() {
  els.hudScore.textContent = Utils.fmt(game.score);
  els.altBarFill.style.width = game.altitude + '%';
  els.hudAltitude.textContent = Math.round(game.altitude) + '%';
  els.envBarFill.style.width = game.environment + '%';
  els.hudPhaseText.textContent = game.level.id === 'endless' ? '♾️ INFINITO' : 'FASE ' + game.level.id;
  if (game.combo >= 2) els.hudCombo.textContent = 'COMBO x' + game.combo;
  else els.hudCombo.classList.remove('pop');
}

function updateComboPop() {
  if (game.combo >= 2) {
    els.hudCombo.textContent = 'COMBO x' + game.combo;
    els.hudCombo.classList.add('pop');
    if (state.settings.animations) {
      gsap.fromTo(els.hudCombo, { scale: 1 }, { scale: 1.28, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', clearProps: 'scale' });
    }
  }
}

function showScreen(name) {
  closeOverlays();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = $('screen-' + name);
  if (target) {
    target.classList.add('active');
    if (state.settings.animations && !target.classList.contains('overlay')) {
      gsap.fromTo(target, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'transform,opacity' });
    }
  }
  state.screen = name;
  if (name !== 'game') musicPlayer.play('menu');
}

function showOverlay(name) {
  document.querySelectorAll('.screen.overlay').forEach(s => s.classList.remove('active'));
  const target = $('screen-' + name);
  if (target) {
    target.classList.add('active');
    state.screen = name;
    uiCardPop(target.querySelector('.overlay-card'));
  }
}

function uiCardPop(card) {
  if (card && state.settings.animations) {
    gsap.fromTo(card, { scale: 0.75, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.55)', clearProps: 'transform,opacity' });
  }
}

function closeOverlays() {
  document.querySelectorAll('.screen.overlay').forEach(s => s.classList.remove('active'));
}

function endlessLevel() {
  return { id:'endless', name:'Infinito', icon:'♾️', difficulty:4, operations:['add'], maxNumber:10, questionCount:Infinity, timePerQuestion:20, obstacleRate:7, obstacleSpeed:70, drainRate:1.5, cloudDensity:1 };
}

function isEndless() {
  return !!game.level && game.level.id === 'endless';
}

function endlessRamp() {
  const n = game.questionIndex;
  const L = game.level;
  L.timePerQuestion = Math.max(6, Math.round((20 - n * 0.5) * 10) / 10);
  L.drainRate = Math.min(3.4, 1.5 + n * 0.06);
  L.obstacleRate = Math.max(2.2, 7 - n * 0.16);
  L.obstacleSpeed = Math.min(130, 70 + n * 1.5);
  L.maxNumber = Math.min(60, 10 + n);
  L.operations = ['add'];
  if (n >= 5) L.operations.push('sub');
  if (n >= 10) L.operations.push('mul');
  if (n >= 16) L.operations.push('div');
}

let countdownTl = null;

function runCountdown() {
  game.running = false;
  const el = els.countdown;
  if (countdownTl) countdownTl.kill();
  const showNum = (txt, snd) => {
    el.innerHTML = '<span>' + txt + '</span>';
    if (state.settings.animations) {
      gsap.fromTo(el.firstChild, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
    }
    snd();
  };
  el.classList.add('show');
  countdownTl = gsap.timeline({
    onComplete: () => {
      el.classList.remove('show');
      el.innerHTML = '';
      showQuestion();
      game.running = true;
    }
  });
  const steps = [
    ['3', () => audio.tone(600, 0.12, 'square', 0.15)],
    ['2', () => audio.tone(600, 0.12, 'square', 0.15)],
    ['1', () => audio.tone(600, 0.12, 'square', 0.15)],
    ['VAI! 🎈', () => { audio.tone(900, 0.2, 'square', 0.18); audio.tone(1200, 0.25, 'triangle', 0.18, 0.05); }]
  ];
  steps.forEach((s, i) => countdownTl.call(() => showNum(s[0], s[1]), null, i * 0.6));
}

function beginLevel(level) {
  game.level = level;
  game.running = false;
  game.paused = false;
  game.ended = false;
  game.score = 0;
  game.combo = 0;
  game.comboMax = 0;
  game.correctCount = 0;
  game.wrongCount = 0;
  game.questionIndex = 0;
  game.current = null;
  game.answered = false;
  game.nextDelay = 0;
  game.environment = 100;
  game.invuln = 0;
  game.altitude = 100;
  game.elapsed = 0;
  game.bobPhase = 0;
  game.obstacleTimer = 3;
  game.W = phaserGame ? phaserGame.scale.width : window.innerWidth;
  game.H = phaserGame ? phaserGame.scale.height : window.innerHeight;
  launchGameScene();
  showScreen('game');
  musicPlayer.play(level.id === 'endless' ? 'endless' : (level.difficulty >= 3 ? 'gameHard' : 'gameEasy'));
  els.hudPhaseText.textContent = level.id === 'endless' ? '♾️ INFINITO' : 'FASE ' + level.id;
  updateHUD();
  runCountdown();
}

function startLevel(id) {
  const level = LEVELS.find(l => l.id === id);
  if (!level) return;
  if (level.id > state.progress.unlockedLevels) return;
  beginLevel(level);
}

function startEndless() {
  beginLevel(endlessLevel());
}

function launchGameScene() {
  if (!phaserGame) return;
  const mgr = phaserGame.scene;
  mgr.stop('ambient');
  if (mgr.isActive('game') || mgr.isPaused('game') || mgr.isSleeping('game')) mgr.stop('game');
  mgr.start('game');
}

function ensureAmbient() {
  if (!phaserGame) return;
  const mgr = phaserGame.scene;
  if (mgr.isActive('ambient')) return;
  if (mgr.isPaused('ambient')) { mgr.resume('ambient'); return; }
  mgr.start('ambient');
}

function exitGameScene() {
  if (!phaserGame) return;
  const mgr = phaserGame.scene;
  if (mgr.isActive('game') || mgr.isPaused('game')) mgr.stop('game');
  ensureAmbient();
}

function showQuestion() {
  const q = generateQuestion(game.level);
  game.current = generateAnswers(q, game.level);
  renderQuestion();
}

function onAnswerClick(index) {
  if (!game.running || game.paused || game.answered || game.ended) return;
  if (!game.current) return;
  game.answered = true;
  const isCorrect = index === game.current.correctIndex;
  if (isCorrect) handleCorrectAnswer(index);
  else handleWrongAnswer(index);
  scheduleNext();
}

function feedbackPop() {
  if (state.settings.animations) {
    gsap.fromTo(els.qpFeedback, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)', clearProps: 'all' });
  }
}

function panelShake() {
  if (state.settings.animations) {
    gsap.fromTo('#questionPanel', { x: 0 }, { x: -9, duration: 0.055, repeat: 5, yoyo: true, ease: 'power1.inOut', clearProps: 'x' });
  }
}

function handleCorrectAnswer(index) {
  game.correctCount++;
  game.combo++;
  game.comboMax = Math.max(game.comboMax, game.combo);
  const timeFrac = Utils.clamp(game.timeLeft / game.level.timePerQuestion, 0, 1);
  const timeBonus = Math.round(50 * timeFrac);
  const comboBonus = (game.combo - 1) * 10;
  const gained = 100 + timeBonus + comboBonus;
  game.score += gained;
  game.environment = Utils.clamp(game.environment + 6, 0, 100);
  game.altitude = Utils.clamp(game.altitude + 14, 0, 100);
  els.qpFeedback.textContent = Utils.pick(MESSAGES_CORRECT);
  els.qpFeedback.className = 'qp-feedback correct';
  feedbackPop();
  const buttons = els.qpAnswers.children;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    if (i !== game.current.correctIndex) buttons[i].classList.add('dim');
  }
  buttons[game.current.correctIndex].classList.add('correct-ans');
  GameFX.correctBurst();
  GameFX.float('+' + Utils.fmt(gained), game.balloonX(), game.balloonY() - 60, '#FFA726');
  GameFX.float('COMBO x' + game.combo, game.balloonX(), game.balloonY() - 30, '#FFD54F');
  updateComboPop();
  audio.correct();
  if (game.combo % 3 === 0) audio.star();
  if (game.combo > 0 && game.combo % 5 === 0) GameFX.comboShower();
  updateHUD();
  GameFX.envUpdate();
}

function handleWrongAnswer(index) {
  game.wrongCount++;
  game.combo = 0;
  game.environment = Utils.clamp(game.environment - 9, 0, 100);
  game.altitude = Utils.clamp(game.altitude - 12, 0, 100);
  const correctVal = game.current.answers[game.current.correctIndex];
  els.qpFeedback.textContent = 'OPS! A resposta correta era ' + correctVal + '.';
  els.qpFeedback.className = 'qp-feedback wrong';
  feedbackPop();
  panelShake();
  const buttons = els.qpAnswers.children;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    if (i !== index) buttons[i].classList.add('dim');
  }
  if (index >= 0 && index < buttons.length) buttons[index].classList.add('wrong-ans');
  buttons[game.current.correctIndex].classList.add('correct-ans');
  GameFX.wrongPuff();
  GameFX.float('-ALTITUDE', game.balloonX(), game.balloonY() + 40, '#EF5350');
  els.hudCombo.classList.remove('pop');
  audio.wrong();
  updateHUD();
  GameFX.envUpdate();
}

function handleTimeout() {
  if (!game.current || game.answered) return;
  game.answered = true;
  game.wrongCount++;
  game.combo = 0;
  game.environment = Utils.clamp(game.environment - 7, 0, 100);
  game.altitude = Utils.clamp(game.altitude - 10, 0, 100);
  const correctVal = game.current.answers[game.current.correctIndex];
  els.qpFeedback.textContent = '⏰ Tempo esgotado! Era ' + correctVal + '.';
  els.qpFeedback.className = 'qp-feedback wrong';
  feedbackPop();
  panelShake();
  const buttons = els.qpAnswers.children;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    buttons[i].classList.add('dim');
  }
  if (game.current.correctIndex < buttons.length) buttons[game.current.correctIndex].classList.add('correct-ans');
  GameFX.wrongPuff();
  GameFX.float('-ALTITUDE', game.balloonX(), game.balloonY() + 40, '#EF5350');
  els.hudCombo.classList.remove('pop');
  audio.wrong();
  updateHUD();
  GameFX.envUpdate();
  scheduleNext();
}

function scheduleNext() {
  game.nextDelay = 1.15;
}

function advanceQuestion() {
  game.questionIndex++;
  if (isEndless()) {
    endlessRamp();
    const thId = (Math.floor(game.questionIndex / 8) % 10) + 1;
    const s = GameFX.scene();
    if (s && s.themeId !== thId) {
      s.themeId = thId;
      s.applyTheme(LEVEL_THEMES[thId]);
      s.cameras.main.flash(240, 255, 255, 255, false);
    }
    showQuestion();
  } else if (game.questionIndex >= game.level.questionCount) {
    finishLevel();
  } else {
    showQuestion();
  }
}

function pauseGame() {
  if (!game.running || game.ended) return;
  game.paused = true;
  musicPlayer.pause();
  if (phaserGame && phaserGame.scene.isActive('game')) phaserGame.scene.pause('game');
  showOverlay('pause');
}

function resumeGame() {
  game.paused = false;
  musicPlayer.resume();
  if (phaserGame && phaserGame.scene.isPaused('game')) phaserGame.scene.resume('game');
  showScreen('game');
}

function togglePause() {
  if (!game.running || game.ended) return;
  if (game.paused) resumeGame();
  else pauseGame();
}

function restartLevel() {
  if (!game.level) return;
  if (game.level.id === 'endless') startEndless();
  else startLevel(game.level.id);
}

function endGame() {
  if (game.ended) return;
  game.ended = true;
  game.running = false;
  countUp(els.goScore, game.score);
  els.goTotal.textContent = game.questionIndex + 1;
  els.goCorrect.textContent = game.correctCount;
  els.goCombo.textContent = 'x' + Math.max(1, game.comboMax);
  if (isEndless()) {
    const prev = state.progress.endlessHigh || 0;
    if (game.score > prev) {
      state.progress.endlessHigh = game.score;
      Storage.save();
      els.goRecord.classList.remove('hidden');
    } else {
      els.goRecord.classList.add('hidden');
    }
    els.goMsg.textContent = '🏆 Recorde do Infinito: ' + Utils.fmt(Math.max(prev, game.score)) + ' 💪';
  } else {
    els.goRecord.classList.add('hidden');
    els.goMsg.textContent = 'Não desista! Tente novamente e aprenda com seus erros. 💪';
  }
  musicPlayer.stop();
  audio.gameover();
  setTimeout(() => {
    if (state.screen === 'game' || state.screen === 'pause') {
      showOverlay('gameover');
      freezeGameScene();
    }
  }, 900);
}

function finishLevel() {
  if (game.ended) return;
  game.ended = true;
  game.running = false;
  const total = game.level.questionCount;
  const accuracy = total ? game.correctCount / total : 0;
  const alt = game.altitude;
  let stars = 1;
  if (accuracy >= 0.6 && alt >= 50) stars = 2;
  if (accuracy >= 0.85 && alt >= 70) stars = 3;
  const prevStars = state.progress.stars[game.level.id] || 0;
  const prevScore = state.progress.highScores[game.level.id] || 0;
  state.progress.stars[game.level.id] = Math.max(prevStars, stars);
  state.progress.highScores[game.level.id] = Math.max(prevScore, game.score);
  if (game.level.id < LEVELS.length && state.progress.unlockedLevels <= game.level.id) {
    state.progress.unlockedLevels = Math.max(state.progress.unlockedLevels, game.level.id + 1);
  }
  Storage.save();
  countUp(els.cpScore, game.score);
  els.cpCorrect.textContent = game.correctCount + '/' + total;
  els.cpCombo.textContent = 'x' + Math.max(1, game.comboMax);
  const envMsg = game.environment >= 70 ? MESSAGES_ENV_HIGH : (game.environment >= 40 ? MESSAGES_ENV_MID : MESSAGES_ENV_LOW);
  els.cpEnvMsg.textContent = envMsg;
  musicPlayer.stop();
  audio.complete();
  GameFX.finishBurst(stars);
  setTimeout(() => {
    if (state.screen === 'game' || state.screen === 'pause') {
      showOverlay('complete');
      freezeGameScene();
      playStarsTimeline(stars);
      const hasNext = game.level.id < LEVELS.length;
      els.btnNext.style.display = hasNext ? '' : 'none';
      if (hasNext) els.btnNext.textContent = '▶ PRÓXIMA FASE';
    }
  }, 900);
}

function freezeGameScene() {
  if (phaserGame && phaserGame.scene.isActive('game')) phaserGame.scene.pause('game');
}

function playStarsTimeline(count) {
  const starsEls = els.starsRow.querySelectorAll('.star-star');
  starsEls.forEach(s => {
    gsap.killTweensOf(s);
    gsap.set(s, { scale: 0.8, rotation: 0, opacity: 0.45, filter: 'grayscale(1) brightness(0.85)' });
  });
  if (!state.settings.animations) {
    for (let i = 0; i < count; i++) gsap.set(starsEls[i], { scale: 1, opacity: 1, filter: 'none' });
    return;
  }
  const tl = gsap.timeline();
  for (let i = 0; i < count; i++) {
    tl.call(() => audio.star(), null, i * 0.42)
      .to(starsEls[i], { filter: 'grayscale(0) brightness(1)', opacity: 1, duration: 0.05 }, i * 0.42)
      .to(starsEls[i], { scale: 1.45, rotation: 14, duration: 0.22, ease: 'back.out(2.2)' }, i * 0.42 + 0.03)
      .to(starsEls[i], { scale: 1, rotation: 0, duration: 0.22, ease: 'power2.out' }, i * 0.42 + 0.25);
  }
}

function countUp(el, target) {
  if (!state.settings.animations) { el.textContent = Utils.fmt(target); return; }
  const proxy = { v: 0 };
  gsap.to(proxy, {
    v: target,
    duration: 0.9,
    ease: 'power1.out',
    onUpdate: () => { el.textContent = Utils.fmt(Math.round(proxy.v)); }
  });
}

function startNextLevel() {
  if (game.level && game.level.id < LEVELS.length) startLevel(game.level.id + 1);
}

function goToMenu() {
  game.running = false;
  exitGameScene();
  showScreen('menu');
  renderLevels();
}

function goToLevels() {
  game.running = false;
  exitGameScene();
  renderLevels();
  showScreen('levels');
}

function initInput() {
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'p' || e.key === 'P' || e.key === 'Escape') && (state.screen === 'game' || state.screen === 'pause')) {
      togglePause();
    }
  });
  window.addEventListener('blur', () => {
    if (state.screen === 'game' && game.running && !game.paused && !game.ended) pauseGame();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.screen === 'game' && game.running && !game.paused && !game.ended) pauseGame();
  });
}

function pressable(el) {
  el.addEventListener('pointerdown', () => {
    if (!state.settings.animations) return;
    gsap.to(el, { scale: 0.93, duration: 0.08, overwrite: 'auto' });
  });
  el.addEventListener('pointerup', () => {
    if (!state.settings.animations) return;
    gsap.to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)', clearProps: 'scale', overwrite: 'auto' });
  });
  el.addEventListener('pointerleave', () => {
    gsap.to(el, { scale: 1, duration: 0.2, clearProps: 'scale', overwrite: 'auto' });
  });
}

function initButtons() {
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      audio.init();
      if (state.settings.sound) audio.click();
      if (action === 'menu') goToMenu();
      else if (action === 'levels') goToLevels();
      else if (action === 'howto') showScreen('howto');
      else if (action === 'settings') showScreen('settings');
      else if (action === 'skins') { renderSkins(); showScreen('skins'); }
      else if (action === 'endless') startEndless();
      else if (action === 'play') startLevel(Math.min(state.progress.unlockedLevels, LEVELS.length));
    });
  });

  els.btnPause.addEventListener('click', () => { audio.click(); pauseGame(); });
  $('btnResume').addEventListener('click', () => { audio.click(); resumeGame(); });
  $('btnRestart').addEventListener('click', () => { audio.click(); restartLevel(); });
  $('btnRetry').addEventListener('click', () => { audio.click(); restartLevel(); });
  $('btnGoLevels').addEventListener('click', () => { audio.click(); goToLevels(); });
  els.btnNext.addEventListener('click', () => { audio.click(); startNextLevel(); });
  $('btnReplay').addEventListener('click', () => { audio.click(); restartLevel(); });
  $('btnCompleteLevels').addEventListener('click', () => { audio.click(); goToLevels(); });

  $('btnResetProgress').addEventListener('click', () => {
    audio.init();
    audio.click();
    openModal('Tem certeza?', 'Isso vai apagar todo o seu progresso e estrelas. Não tem como voltar!', () => {
      Storage.reset();
      renderLevels();
      closeModal();
      audio.click();
    });
  });
  $('btnResetSettings').addEventListener('click', () => {
    audio.click();
    openModal('Tem certeza?', 'Isso vai apagar todo o progresso e as configurações.', () => {
      Storage.reset();
      syncSettingsUI();
      renderLevels();
      closeModal();
      audio.click();
    });
  });
  els.modal.addEventListener('click', (e) => {
    if (e.target === els.modal) closeModal();
  });
  $('modalYes').addEventListener('click', () => {
    if (modalYesCallback) modalYesCallback();
  });
  $('modalNo').addEventListener('click', () => { audio.click(); closeModal(); });

  els.toggleSound.addEventListener('click', () => {
    state.settings.sound = !state.settings.sound;
    syncSettingsUI();
    Storage.save();
    audio.init();
    if (state.settings.sound) audio.click();
  });
  els.toggleMusic.addEventListener('click', () => {
    state.settings.music = !state.settings.music;
    syncSettingsUI();
    Storage.save();
    audio.init();
    if (state.settings.music) musicPlayer.play(musicForContext());
    else musicPlayer.stop();
  });
  els.toggleAnim.addEventListener('click', () => {
    state.settings.animations = !state.settings.animations;
    syncSettingsUI();
    Storage.save();
    audio.click();
  });

  document.querySelectorAll('.btn').forEach(pressable);
}

function syncSettingsUI() {
  els.toggleSound.classList.toggle('on', state.settings.sound);
  els.toggleSound.setAttribute('aria-checked', String(state.settings.sound));
  els.toggleMusic.classList.toggle('on', state.settings.music);
  els.toggleMusic.setAttribute('aria-checked', String(state.settings.music));
  els.toggleAnim.classList.toggle('on', state.settings.animations);
  els.toggleAnim.setAttribute('aria-checked', String(state.settings.animations));
}

function buildSun(scene, W, H) {
  const c = scene.add.container(W * 0.88, H * 0.13).setDepth(1);
  const glow = scene.add.image(0, 0, 'glow').setScale(1.1).setAlpha(0.95);
  const rays = scene.make.graphics({ add: false }, []);
  rays.fillStyle(0xFFD600, 0.6);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    rays.save();
    rays.translateCanvas(Math.cos(a) * 46, Math.sin(a) * 46);
    rays.rotateCanvas(a + Math.PI / 2);
    rays.fillRect(-4, -14, 8, 18);
    rays.restore();
  }
  scene.tweens.add({ targets: rays, angle: 360, duration: 40000, repeat: -1 });
  const core = scene.add.image(0, 0, 'dot').setScale(4.6).setTint(0xFFD54F);
  const shine = scene.add.image(-9, -9, 'dot').setScale(1.5).setTint(0xFFF59D);
  c.add([glow, rays, core, shine]);
  return c;
}

function buildMoon(scene, W, H) {
  const c = scene.add.container(W * 0.88, H * 0.13).setDepth(1).setVisible(false);
  const glow = scene.add.image(0, 0, 'glow').setScale(1.0).setAlpha(0.55).setTint(0xB3C7F0);
  const core = scene.add.image(0, 0, 'dot').setScale(3.4).setTint(0xFFF9C4);
  const craterA = scene.add.image(-8, 6, 'dot').setScale(0.55).setTint(0xE8E4C9);
  const craterB = scene.add.image(9, -7, 'dot').setScale(0.4).setTint(0xE8E4C9);
  c.add([glow, core, craterA, craterB]);
  return c;
}

function skyGradient(scene, depth, cTop, cLow) {
  const g = scene.add.graphics().setDepth(depth);
  g._ct = cTop;
  g._cl = cLow;
  g.redraw = () => {
    g.clear();
    g.fillGradientStyle(g._ct, g._ct, g._cl, g._cl, 1);
    g.fillRect(0, 0, scene.scale.width, scene.scale.height);
  };
  g.setColors = (t, l) => { g._ct = t; g._cl = l; g.redraw(); };
  g.redraw();
  return g;
}

function makeScrollLayer(scene, texKey, y, depth, alpha) {
  const tw = scene.textures.get(texKey).source[0].width;
  const count = Math.ceil(scene.scale.width / tw) + 2;
  const arr = [];
  for (let i = 0; i < count; i++) {
    const img = scene.add.image(i * tw + tw / 2, y, texKey).setOrigin(0.5, 1).setDepth(depth);
    if (alpha !== undefined) img.setAlpha(alpha);
    arr.push(img);
  }
  arr.texW = tw;
  return arr;
}

function scrollLayer(arr, speed, dt) {
  const tw = arr.texW;
  arr.forEach(img => {
    img.x -= speed * dt;
    if (img.x < -tw / 2) img.x += tw * arr.length;
  });
}

function rebuildLayer(scene, arr, texKey, y, depth, alpha) {
  arr.forEach(img => img.destroy());
  return makeScrollLayer(scene, texKey, y, depth, alpha);
}

function paintBalloon(ctx, skin) {
  ctx.clearRect(0, 0, 84, 152);
  ctx.save();
  ctx.translate(42, 50);
  ctx.fillStyle = skin.base;
  ctx.beginPath();
  ctx.ellipse(0, 0, 31, 41, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, 31, 41, 0, 0, Math.PI * 2);
  ctx.clip();
  (skin.stripes || []).forEach(st => {
    ctx.fillStyle = st.c;
    ctx.fillRect(st.x, -42, st.w, 84);
  });
  if (skin.bg) {
    const g = ctx.createLinearGradient(0, -41, 0, 41);
    g.addColorStop(0, skin.bg[0]);
    g.addColorStop(1, skin.bg[1]);
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = g;
    ctx.fillRect(-31, -42, 62, 84);
    ctx.globalAlpha = 1;
  }
  if (skin.deco === 'stars') {
    const pts = [[-18,-20,1.6],[2,-28,1.2],[16,-12,2],[-8,-2,1.4],[20,8,1.3],[-22,10,1.8],[6,18,1.5],[-14,24,1.2],[12,-2,1],[24,-22,1.4],[-2,6,1.1]];
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], p[2], 0, Math.PI * 2); ctx.fill(); });
  }
  if (skin.deco === 'seeds') {
    const pts = [[-16,-14,0.4],[0,-24,0.9],[14,-8,0.2],[-6,4,1.2],[18,14,0.6],[-20,18,0.8],[6,26,0.3]];
    ctx.fillStyle = 'rgba(30,40,30,0.85)';
    pts.forEach(p => { ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(p[2]); ctx.beginPath(); ctx.ellipse(0, 0, 1.4, 2.4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });
  }
  if (skin.deco === 'sparkle') {
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 1.6;
    [[-16,-18],[10,-26],[20,2],[-8,10],[2,28]].forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p[0] - 4, p[1]); ctx.lineTo(p[0] + 4, p[1]);
      ctx.moveTo(p[0], p[1] - 4); ctx.lineTo(p[0], p[1] + 4);
      ctx.stroke();
    });
  }
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(-11, -12, 7, 11, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = skin.rim;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 30.5, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.fillStyle = skin.vent;
  ctx.beginPath();
  ctx.moveTo(0, 38);
  ctx.lineTo(-8, 47);
  ctx.lineTo(8, 47);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = '#8D6E63';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-7, 45);
  ctx.lineTo(-11, 118);
  ctx.moveTo(7, 45);
  ctx.lineTo(11, 118);
  ctx.stroke();
  ctx.fillStyle = '#8D6E63';
  ctx.fillRect(-14, 116, 28, 20);
  ctx.fillStyle = '#A1887F';
  ctx.fillRect(-14, 116, 28, 5);
}

class BootScene extends Phaser.Scene {
  constructor() { super('boot'); }
  create() {
    const mkTex = (key, w, h, fn) => {
      if (this.textures.exists(key)) return;
      const gr = this.make.graphics({ add: false });
      fn(gr);
      gr.generateTexture(key, w, h);
      gr.destroy();
    };
    mkTex('dot', 16, 16, g => {
      g.fillStyle(0xffffff, 1);
      g.fillCircle(8, 8, 8);
    });
    mkTex('softdot', 64, 64, g => {
      g.fillStyle(0xffffff, 0.35);
      g.fillCircle(32, 32, 30);
      g.fillStyle(0xffffff, 0.5);
      g.fillCircle(32, 32, 20);
    });
    mkTex('star', 40, 40, g => {
      g.fillStyle(0xffffff, 1);
      g.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 8 : 19;
        const a = -Math.PI / 2 + i * Math.PI / 5;
        const px = 20 + Math.cos(a) * r;
        const py = 20 + Math.sin(a) * r;
        if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.closePath();
      g.fillPath();
    });
    mkTex('cloud', 200, 96, g => {
      g.fillStyle(0xffffff, 1);
      g.fillCircle(42, 62, 26);
      g.fillCircle(84, 44, 33);
      g.fillCircle(128, 52, 29);
      g.fillCircle(162, 64, 23);
      g.fillEllipse(100, 74, 130, 34);
    });
    mkTex('rain', 3, 14, g => {
      g.fillStyle(0x81D4FA, 0.9);
      g.fillRoundedRect(0, 0, 3, 14, 1.5);
    });
    mkTex('leaf', 16, 12, g => {
      g.fillStyle(0x81C784, 1);
      g.fillRoundedRect(0, 0, 16, 12, 5);
    });
    mkTex('butterfly', 20, 16, g => {
      g.fillStyle(0xFF8A80, 1);
      g.fillEllipse(6, 8, 11, 13);
      g.fillEllipse(14, 8, 11, 13);
      g.fillStyle(0x37474F, 1);
      g.fillRect(9, 3, 2, 10);
    });
    mkTex('birdA', 46, 26, g => {
      g.fillStyle(0x37474F, 1);
      g.fillEllipse(24, 15, 21, 12);
      g.fillTriangle(33, 14, 40, 12, 33, 17);
      g.fillStyle(0xFFFFFF, 1);
      g.fillCircle(29, 12, 1.6);
      g.beginPath();
      g.moveTo(19, 12);
      g.lineTo(3, 1);
      g.lineTo(12, 15);
      g.closePath();
      g.fillPath();
    });
    mkTex('birdB', 46, 26, g => {
      g.fillStyle(0x37474F, 1);
      g.fillEllipse(24, 13, 21, 12);
      g.fillTriangle(33, 12, 40, 10, 33, 15);
      g.fillStyle(0xFFFFFF, 1);
      g.fillCircle(29, 10, 1.6);
      g.beginPath();
      g.moveTo(19, 14);
      g.lineTo(3, 24);
      g.lineTo(12, 15);
      g.closePath();
      g.fillPath();
    });
    mkTex('miniBalloon', 36, 66, g => {
      g.fillStyle(0xffffff, 1);
      g.fillEllipse(18, 20, 29, 37);
      g.fillStyle(0xffffff, 0.45);
      g.fillEllipse(11, 13, 8, 12);
      g.lineStyle(2, 0x5d4037, 0.7);
      g.beginPath();
      g.moveTo(14, 36);
      g.lineTo(12, 50);
      g.moveTo(22, 36);
      g.lineTo(24, 50);
      g.strokePath();
      g.fillStyle(0x8D6E63, 1);
      g.fillRoundedRect(10, 49, 16, 11, 3);
    });
    mkTex('treeGreen', 76, 108, g => {
      g.fillStyle(0x6D4C41, 1);
      g.fillRect(33, 62, 11, 44);
      g.fillStyle(0x388E3C, 1);
      g.fillCircle(38, 48, 27);
      g.fillCircle(18, 62, 18);
      g.fillCircle(58, 60, 18);
      g.fillStyle(0x66BB6A, 1);
      g.fillCircle(30, 40, 14);
      g.fillCircle(48, 50, 11);
    });
    mkTex('treeBurnt', 76, 108, g => {
      g.fillStyle(0x4E342E, 1);
      g.fillRect(33, 62, 11, 44);
      g.fillStyle(0x6D4C41, 1);
      g.fillCircle(38, 48, 27);
      g.fillCircle(18, 62, 18);
      g.fillCircle(58, 60, 18);
      g.fillStyle(0x5D4037, 1);
      g.fillCircle(30, 40, 14);
      g.fillCircle(48, 50, 11);
    });
    mkTex('house', 64, 68, g => {
      g.fillStyle(0x8D6E63, 1);
      g.fillRect(46, 6, 9, 16);
      g.fillStyle(0xEF6C00, 1);
      g.fillTriangle(3, 32, 32, 6, 61, 32);
      g.fillStyle(0xFFF3E0, 1);
      g.fillRect(8, 32, 48, 32);
      g.fillStyle(0x5D4037, 1);
      g.fillRect(27, 44, 11, 20);
      g.fillStyle(0xFFF176, 1);
      g.fillRect(13, 38, 9, 9);
    });
    mkTex('storm', 116, 84, g => {
      g.fillStyle(0x5D6D7E, 1);
      g.fillCircle(36, 56, 27);
      g.fillCircle(72, 42, 31);
      g.fillCircle(94, 58, 23);
      g.fillStyle(0x46555F, 1);
      g.fillEllipse(62, 68, 92, 26);
    });
    mkTex('obstacleMountain', 110, 110, g => {
      g.fillStyle(0x8D6E63, 1);
      g.fillTriangle(2, 108, 55, 4, 108, 108);
      g.fillStyle(0xFFFFFF, 1);
      g.fillTriangle(41, 28, 55, 4, 69, 28);
      g.fillStyle(0xA19890, 1);
      g.fillTriangle(55, 30, 69, 28, 82, 52);
    });
    mkTex('factory', 82, 218, g => {
      g.fillStyle(0x90A4AE, 1);
      g.fillRect(7, 62, 68, 156);
      g.fillStyle(0xB0BEC5, 1);
      g.fillRect(7, 62, 68, 11);
      g.fillStyle(0x78909C, 1);
      g.fillRect(35, 18, 17, 46);
      g.fillStyle(0x546E7A, 1);
      g.fillRect(33, 14, 21, 9);
      g.fillStyle(0xCFD8DC, 1);
      for (let r = 0; r < 5; r++) {
        g.fillRect(15, 86 + r * 26, 14, 12);
        g.fillRect(51, 86 + r * 26, 14, 12);
      }
    });
    SKINS.forEach(skin => {
      const key = 'playerBalloon_' + skin.id;
      if (this.textures.exists(key)) return;
      const tex = this.textures.createCanvas(key, 84, 152);
      paintBalloon(tex.getContext(), skin);
      tex.refresh();
    });
    if (!this.textures.exists('mtnFar')) {
      const tex = this.textures.createCanvas('mtnFar', 512, 260);
      const ctx = tex.getContext();
      const grd = ctx.createLinearGradient(0, 40, 0, 260);
      grd.addColorStop(0, '#9CC4BC');
      grd.addColorStop(1, '#7FB3A8');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.moveTo(0, 260);
      const tri = x => 140 + 72 * (1 - Math.abs(((x % 128) / 64) - 1));
      for (let x = 0; x <= 512; x += 16) ctx.lineTo(x, 260 - tri(x));
      ctx.lineTo(512, 260);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let p = 64; p <= 512; p += 128) {
        ctx.beginPath();
        ctx.moveTo(p - 12, 260 - tri(p) + 22);
        ctx.lineTo(p, 260 - tri(p));
        ctx.lineTo(p + 12, 260 - tri(p) + 22);
        ctx.closePath();
        ctx.fill();
      }
      tex.refresh();
    }
    if (!this.textures.exists('mtnNear')) {
      const tex = this.textures.createCanvas('mtnNear', 480, 280);
      const ctx = tex.getContext();
      const grd = ctx.createLinearGradient(0, 60, 0, 280);
      grd.addColorStop(0, '#79AFA3');
      grd.addColorStop(1, '#6D9B90');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.moveTo(0, 280);
      const tri = x => 120 + 88 * (1 - Math.abs((((x + 80) % 160) / 80) - 1));
      for (let x = 0; x <= 480; x += 16) ctx.lineTo(x, 280 - tri(x));
      ctx.lineTo(480, 280);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      for (let p = 80; p <= 480; p += 160) {
        ctx.beginPath();
        ctx.moveTo(p - 14, 280 - tri(p) + 26);
        ctx.lineTo(p, 280 - tri(p));
        ctx.lineTo(p + 14, 280 - tri(p) + 26);
        ctx.closePath();
        ctx.fill();
      }
      tex.refresh();
    }
    if (!this.textures.exists('hillFront')) {
      const tex = this.textures.createCanvas('hillFront', 480, 170);
      const ctx = tex.getContext();
      ctx.fillStyle = '#66BB6A';
      ctx.beginPath();
      ctx.arc(0, 190, 105, 0, Math.PI * 2);
      ctx.arc(160, 195, 112, 0, Math.PI * 2);
      ctx.arc(320, 188, 108, 0, Math.PI * 2);
      ctx.arc(480, 192, 105, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#81C784';
      ctx.beginPath();
      ctx.arc(80, 205, 95, 0, Math.PI * 2);
      ctx.arc(240, 200, 98, 0, Math.PI * 2);
      ctx.arc(400, 206, 92, 0, Math.PI * 2);
      ctx.fill();
      const cols = ['#FF8A80', '#FFD54F', '#CE93D8', '#FFA726', '#FFFFFF'];
      for (let i = 0; i < 24; i++) {
        const fx = 12 + i * 19 + (i % 3) * 4;
        const fy = 118 + Math.sin(i * 1.7) * 14 + (i % 4) * 6;
        ctx.strokeStyle = '#43A047';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fx, fy + 9);
        ctx.lineTo(fx, fy + 2);
        ctx.stroke();
        ctx.fillStyle = cols[i % cols.length];
        for (let p = 0; p < 5; p++) {
          const a = (p / 5) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(fx + Math.cos(a) * 3.4, fy + Math.sin(a) * 3.4, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#FFF176';
        ctx.beginPath();
        ctx.arc(fx, fy, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      tex.refresh();
    }
    this.scene.start('ambient');
  }
}

class AmbientScene extends Phaser.Scene {
  constructor() { super('ambient'); }
  create() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.sky = skyGradient(this, 0, 0x3FA9F5, 0xCDEBFB);
    this.sun = buildSun(this, W, H);
    this.cloudsFar = [];
    this.cloudsNear = [];
    for (let i = 0; i < 5; i++) {
      const img = this.add.image(Utils.rand(0, W), Utils.rand(H * 0.06, H * 0.5), 'cloud').setAlpha(Utils.rand(0.55, 0.8)).setScale(Utils.rand(0.5, 0.9)).setDepth(2);
      img.spd = Utils.rand(6, 13);
      this.cloudsFar.push(img);
    }
    for (let i = 0; i < 3; i++) {
      const img = this.add.image(Utils.rand(0, W), Utils.rand(H * 0.1, H * 0.55), 'cloud').setAlpha(Utils.rand(0.75, 0.95)).setScale(Utils.rand(0.8, 1.25)).setDepth(7);
      img.spd = Utils.rand(15, 26);
      this.cloudsNear.push(img);
    }
    this.mtnFar = makeScrollLayer(this, 'mtnFar', H - 118, 3, 0.85);
    this.mtnNear = makeScrollLayer(this, 'mtnNear', H - 92, 4);
    this.hills = makeScrollLayer(this, 'hillFront', H - 30, 5);
    this.scenery = [];
    const treeCount = Math.ceil(W / 210) + 2;
    for (let i = 0; i < treeCount; i++) {
      const spr = this.add.image(i * 210 + Utils.rand(0, 60), H - 34, 'treeGreen').setOrigin(0.5, 1).setDepth(6).setScale(Utils.rand(0.8, 1.15));
      this.scenery.push(spr);
    }
    const houseCount = Math.ceil(W / 460) + 1;
    for (let i = 0; i < houseCount; i++) {
      const spr = this.add.image(i * 460 + 230 + Utils.rand(0, 80), H - 30, 'house').setOrigin(0.5, 1).setDepth(6).setScale(1.1);
      this.scenery.push(spr);
    }
    this.smoke = this.add.particles(0, 0, 'softdot', {
      speedX: { min: -6, max: 10 },
      speedY: { min: -34, max: -18 },
      lifespan: 2200,
      scale: { start: 0.5, end: 1.4 },
      alpha: { start: 0.32, end: 0 },
      tint: 0xB0BEC5,
      frequency: 700,
      emitting: false
    }).setDepth(6);
    this.smokeHouseIdx = 0;
    this.smokeTimer = 2;
    this.birds = [];
    this.birdTimer = 2;
    this.balloons = [];
    this.balloonTimer = 3;
    this.butterflies = [];
    this.leaves = [];
    for (let i = 0; i < 12; i++) {
      const spr = this.add.image(Utils.rand(0, W), Utils.rand(0, H), 'leaf').setDepth(8).setAlpha(0.75);
      spr.spd = Utils.rand(16, 40);
      spr.phase = Utils.rand(0, 6.28);
      spr.sway = Utils.rand(12, 30);
      this.leaves.push(spr);
    }
    this.lastW = this.scale.width;
    this.lastH = this.scale.height;
    this.scale.on('resize', () => this.checkResize());
  }
  checkResize() {
    const W = this.scale.width;
    const H = this.scale.height;
    if (W !== this.lastW || H !== this.lastH) {
      this.lastW = W;
      this.lastH = H;
      this.onResize();
    }
  }
  onResize() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.sky.redraw();
    this.sky.setDepth(0);
    this.sun.setPosition(W * 0.88, H * 0.13);
    this.mtnFar = rebuildLayer(this, this.mtnFar, 'mtnFar', H - 118, 3, 0.85);
    this.mtnNear = rebuildLayer(this, this.mtnNear, 'mtnNear', H - 92, 4);
    this.hills = rebuildLayer(this, this.hills, 'hillFront', H - 30, 5);
  }
  spawnBird() {
    const spr = this.add.image(-50, Utils.rand(this.scale.height * 0.08, this.scale.height * 0.42), 'birdA')
      .setDepth(7)
      .setTint(Utils.pick([0x455A64, 0x5D4037, 0x0277BD, 0x37474F]))
      .setScale(Utils.rand(0.7, 1.15));
    spr.spd = Utils.rand(55, 105);
    spr.phase = Utils.rand(0, 6.28);
    spr.baseY = spr.y;
    spr.flapT = 0;
    this.birds.push(spr);
  }
  spawnBalloon() {
    const spr = this.add.image(this.scale.width + 60, Utils.rand(this.scale.height * 0.1, this.scale.height * 0.55), 'miniBalloon')
      .setDepth(6)
      .setTint(Utils.pick([0xFF8A80, 0xFFD54F, 0xA5D6A7, 0x80DEEA]));
    spr.spd = Utils.rand(22, 48);
    spr.phase = Utils.rand(0, 6.28);
    spr.baseY = spr.y;
    this.balloons.push(spr);
  }
  spawnButterfly() {
    const spr = this.add.image(this.scale.width + 30, Utils.rand(this.scale.height * 0.55, this.scale.height * 0.85), 'butterfly')
      .setDepth(8)
      .setTint(Utils.pick([0xFFFFFF, 0xFFD54F, 0xCE93D8, 0x80DEEA]));
    spr.spd = Utils.rand(28, 58);
    spr.phase = Utils.rand(0, 6.28);
    spr.baseY = spr.y;
    this.butterflies.push(spr);
  }
  update(time, delta) {
    const dt = Math.min(delta, 50) / 1000;
    this.checkResize();
    const W = this.scale.width;
    const H = this.scale.height;
    scrollLayer(this.mtnFar, 4, dt);
    scrollLayer(this.mtnNear, 9, dt);
    scrollLayer(this.hills, 14, dt);
    this.cloudsFar.forEach(c => { c.x -= c.spd * dt; if (c.x < -110) { c.x = W + 110; c.y = Utils.rand(H * 0.06, H * 0.5); } });
    this.cloudsNear.forEach(c => { c.x -= c.spd * dt; if (c.x < -130) { c.x = W + 130; c.y = Utils.rand(H * 0.1, H * 0.55); } });
    this.scenery.forEach(s => {
      s.x -= 14 * dt;
      if (s.x < -60) s.x += W + 120;
    });
    this.smokeTimer -= dt;
    if (this.smokeTimer <= 0) {
      const houses = this.scenery.filter(s => s.texture.key === 'house');
      if (houses.length) {
        this.smokeHouseIdx = (this.smokeHouseIdx + 1) % houses.length;
        const hse = houses[this.smokeHouseIdx];
        this.smoke.emitParticleAt(hse.x + 16, hse.y - hse.displayHeight + 8);
      }
      this.smokeTimer = 1.4;
    }
    this.birdTimer -= dt;
    if (this.birdTimer <= 0) {
      this.spawnBird();
      this.birdTimer = Utils.rand(2.5, 6);
    }
    for (let i = this.birds.length - 1; i >= 0; i--) {
      const b = this.birds[i];
      b.x += b.spd * dt;
      b.y = b.baseY + Math.sin(time / 500 + b.phase) * 12;
      b.flapT += dt;
      if (b.flapT > 0.14) { b.flapT = 0; b.setTexture(b.texture.key === 'birdA' ? 'birdB' : 'birdA'); }
      if (b.x > W + 60) { b.destroy(); this.birds.splice(i, 1); }
    }
    this.balloonTimer -= dt;
    if (this.balloonTimer <= 0) {
      this.spawnBalloon();
      this.balloonTimer = Utils.rand(4, 9);
    }
    for (let i = this.balloons.length - 1; i >= 0; i--) {
      const b = this.balloons[i];
      b.x -= b.spd * dt;
      b.y = b.baseY + Math.sin(time / 600 + b.phase) * 9;
      b.rotation = Math.sin(time / 800 + b.phase) * 0.06;
      if (b.x < -60) { b.destroy(); this.balloons.splice(i, 1); }
    }
    if (this.butterflies.length < 3 && Math.random() < dt * 0.4) this.spawnButterfly();
    for (let i = this.butterflies.length - 1; i >= 0; i--) {
      const bf = this.butterflies[i];
      bf.x -= bf.spd * dt;
      bf.y = bf.baseY + Math.sin(time / 350 + bf.phase) * 22;
      bf.setScale(Math.sin(time / 110 + bf.phase) * 0.55 + 0.75, 1);
      if (bf.x < -40) { bf.destroy(); this.butterflies.splice(i, 1); }
    }
    this.leaves.forEach(l => {
      l.y += l.spd * dt;
      l.x += Math.sin(time / 700 + l.phase) * l.sway * dt;
      l.rotation += dt * 1.8;
      if (l.y > H + 20) { l.y = -20; l.x = Utils.rand(0, W); }
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() { super('game'); }
  create() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.envCache = game.environment;
    this.themeId = isEndless() ? 1 : game.level.id;
    const th0 = LEVEL_THEMES[this.themeId] || LEVEL_THEMES[1];
    this.sky = skyGradient(this, 0, th0.skyTop, th0.skyLow);
    this.smog = this.add.rectangle(W / 2, H / 2, W, H, 0x4A505A, 0).setDepth(1);
    this.sun = buildSun(this, W, H);
    this.moon = buildMoon(this, W, H);
    this.mtnFar = makeScrollLayer(this, 'mtnFar', H - 118, 3, 0.85);
    this.mtnNear = makeScrollLayer(this, 'mtnNear', H - 92, 4);
    this.hills = makeScrollLayer(this, 'hillFront', H - 30, 5);
    this.trees = [];
    const treeGap = 175;
    this.treeGap = treeGap;
    const treeCount = Math.ceil(W / treeGap) + 2;
    for (let i = 0; i < treeCount; i++) {
      const spr = this.add.image(i * treeGap + Utils.rand(0, 50), H - 34, 'treeGreen').setOrigin(0.5, 1).setDepth(6);
      this.trees.push(spr);
    }
    this.houseGap = 430;
    this.houses = [];
    const houseCount = Math.ceil(W / this.houseGap) + 1;
    for (let i = 0; i < houseCount; i++) {
      const spr = this.add.image(i * this.houseGap + Utils.rand(60, 200), H - 32, 'house').setOrigin(0.5, 1).setDepth(6).setScale(1.15);
      this.houses.push(spr);
    }
    this.chimneySmoke = this.add.particles(0, 0, 'softdot', {
      speedY: { min: -30, max: -16 },
      speedX: { min: -5, max: 8 },
      lifespan: 1600,
      scale: { start: 0.45, end: 1.2 },
      alpha: { start: 0.3, end: 0 },
      tint: 0xB0BEC5,
      emitting: false
    }).setDepth(6);
    this.smokeTimer = 0.6;
    this.cloudsFar = [];
    this.cloudsNear = [];
    const dens = game.level.cloudDensity || 1;
    const cf = Math.round(W / 260 * dens);
    const cn = Math.round(W / 340 * dens);
    for (let i = 0; i < cf; i++) {
      const img = this.add.image(Utils.rand(0, W), Utils.rand(20, H * 0.4), 'cloud').setAlpha(Utils.rand(0.5, 0.8)).setScale(Utils.rand(0.45, 0.8)).setDepth(2);
      img.spd = Utils.rand(6, 12);
      this.cloudsFar.push(img);
    }
    for (let i = 0; i < cn; i++) {
      const img = this.add.image(Utils.rand(0, W), Utils.rand(H * 0.1, H * 0.5), 'cloud').setAlpha(Utils.rand(0.75, 0.95)).setScale(Utils.rand(0.75, 1.3)).setDepth(8);
      img.spd = Utils.rand(16, 28);
      this.cloudsNear.push(img);
    }
    this.obstacles = [];
    this.fxGold = this.add.particles(0, 0, 'dot', {
      speed: { min: 70, max: 240 },
      angle: { min: 0, max: 360 },
      lifespan: { min: 500, max: 1100 },
      scale: { start: 0.9, end: 0 },
      gravityY: 170,
      tint: [0xFFD54F, 0xFFA726, 0x66BB6A],
      emitting: false
    }).setDepth(11);
    this.fxStars = this.add.particles(0, 0, 'star', {
      speed: { min: 90, max: 260 },
      angle: { min: 0, max: 360 },
      lifespan: { min: 600, max: 1300 },
      scale: { start: 1, end: 0.1 },
      rotate: { min: -180, max: 180 },
      gravityY: 150,
      tint: [0xFFD54F, 0xFFF176, 0xFFFFFF],
      emitting: false
    }).setDepth(11);
    this.fxGray = this.add.particles(0, 0, 'softdot', {
      speed: { min: 20, max: 70 },
      angle: { min: 60, max: 120 },
      lifespan: { min: 400, max: 900 },
      scale: { start: 0.7, end: 1.5 },
      alpha: { start: 0.55, end: 0 },
      tint: 0x94A3B8,
      emitting: false
    }).setDepth(11);
    this.fxSparks = this.add.particles(0, 0, 'dot', {
      speed: { min: 90, max: 260 },
      angle: { min: 0, max: 360 },
      lifespan: { min: 300, max: 750 },
      scale: { start: 0.7, end: 0 },
      tint: [0xFFFFFF, 0xFFA726, 0xEF5350],
      emitting: false
    }).setDepth(11);
    this.confetti = this.add.particles(0, 0, 'star', {
      speed: { min: 140, max: 420 },
      angle: { min: 180, max: 360 },
      lifespan: { min: 900, max: 1800 },
      scale: { start: 1.1, end: 0.2 },
      rotate: { min: -240, max: 240 },
      gravityY: 320,
      tint: [0xFFD54F, 0xFF8A80, 0x80DEEA, 0xA5D6A7, 0xCE93D8],
      emitting: false
    }).setDepth(12);
    this.rainFx = this.add.particles(0, 0, 'rain', {
      speedY: { min: 380, max: 520 },
      speedX: { min: -30, max: -10 },
      lifespan: 320,
      alpha: { start: 0.7, end: 0 },
      quantity: 2,
      frequency: 40,
      emitting: false
    }).setDepth(9);
    this.rainOwner = null;
    this.envSmoke = this.add.particles(0, 0, 'softdot', {
      speedY: { min: -38, max: -16 },
      speedX: { min: -10, max: 10 },
      lifespan: 2600,
      scale: { start: 0.9, end: 2.2 },
      alpha: { start: 0.3, end: 0 },
      tint: 0x505A64,
      emitting: false
    }).setDepth(7);
    this.trail = this.add.particles(0, 0, 'dot', {
      speedY: { min: 10, max: 40 },
      speedX: { min: -14, max: 14 },
      lifespan: 480,
      scale: { start: 0.55, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: [0xFFD54F, 0xFFF176],
      frequency: 55,
      emitting: false
    }).setDepth(9);
    this.floatPool = [];
    const skinDef = SKINS.find(s => s.id === state.progress.skin) || SKINS[0];
    this.balloon = this.add.image(W * 0.2, H * 0.55, 'playerBalloon_' + skinDef.id).setOrigin(0.5, 0.42).setDepth(10);
    this.trail.startFollow(this.balloon, 0, 30);
    this.birds = [];
    this.birdTimer = 3;
    this.butterflies = [];
    this.starField = null;
    this.applyTheme(th0);
    this.envUpdate();
    this.lastW = this.scale.width;
    this.lastH = this.scale.height;
    this.scale.on('resize', () => this.checkResize());
    if (state.settings.animations) {
      this.fxStars.explode(16, this.balloon.x, this.balloon.y);
      this.fxGold.explode(12, this.balloon.x, this.balloon.y);
    }
  }
  checkResize() {
    const W = this.scale.width;
    const H = this.scale.height;
    if (W !== this.lastW || H !== this.lastH) {
      this.lastW = W;
      this.lastH = H;
      this.onResize();
    }
  }
  onResize() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.sky.redraw();
    this.smog.setSize(W, H).setPosition(W / 2, H / 2);
    this.sun.setPosition(W * 0.88, H * 0.13);
    this.moon.setPosition(W * 0.88, H * 0.13);
    this.mtnFar = rebuildLayer(this, this.mtnFar, 'mtnFar', H - 118, 3, 0.85);
    this.mtnNear = rebuildLayer(this, this.mtnNear, 'mtnNear', H - 92, 4);
    this.hills = rebuildLayer(this, this.hills, 'hillFront', H - 30, 5);
    this.applyTheme(this.theme);
    if (this.balloon) this.balloon.x = Utils.clamp(this.balloon.x, 80, W - 60);
  }
  applyTheme(th) {
    this.theme = th;
    this.sky.setColors(th.skyTop, th.skyLow);
    this.mtnFar.forEach(i => i.setTint(th.mtnFar));
    this.mtnNear.forEach(i => i.setTint(th.mtnNear));
    this.hills.forEach(i => i.setTint(th.hills));
    this.cloudsFar.forEach(i => i.setTint(th.cloud));
    this.cloudsNear.forEach(i => i.setTint(th.cloud));
    const treeTint = th.tree || 0xFFFFFF;
    this.trees.forEach(t => t.setTint(treeTint));
    this.sun.setVisible(!th.night);
    this.moon.setVisible(!!th.night);
    if (this.starField) {
      this.starField.forEach(s => s.destroy());
      this.starField = null;
    }
    if (th.night) {
      this.starField = [];
      for (let i = 0; i < 36; i++) {
        const st = this.add.image(Utils.rand(0, this.scale.width), Utils.rand(10, this.scale.height * 0.55), 'dot')
          .setScale(Utils.rand(0.1, 0.22)).setTint(0xFFFFFF).setDepth(1);
        st.baseA = Utils.rand(0.35, 0.95);
        st.tw = Utils.rand(1.5, 4);
        st.ph = Utils.rand(0, 6.28);
        st.setAlpha(st.baseA);
        this.starField.push(st);
      }
    }
  }
  comboShower() {
    this.confetti.explode(16, this.balloon.x, this.balloon.y - 24);
    if (state.settings.animations) {
      this.cameras.main.zoomTo(1.02, 140, 'Sine.easeOut', true);
      this.time.delayedCall(220, () => this.cameras.main.zoomTo(1, 200, 'Sine.easeInOut', true));
    }
  }
  envUpdate() {
    this.envCache = game.environment;
    const a = this.envCache < 55 ? (1 - this.envCache / 55) * 0.3 : 0;
    this.tweens.add({ targets: this.smog, alpha: a, duration: 400 });
    const burnt = this.envCache < 45;
    this.trees.forEach(t => t.setTexture(burnt ? 'treeBurnt' : 'treeGreen'));
  }
  balloonX() { return this.balloon.x; }
  balloonY() { return this.balloon.y; }
  float(text, x, y, color) {
    let t = this.floatPool.find(f => !f.getData('alive'));
    if (!t) {
      t = this.add.text(x, y, '', {
        fontFamily: FONT_UI(),
        fontSize: '21px',
        fontStyle: '900',
        color: '#ffffff',
        stroke: 'rgba(255,255,255,0.9)',
        strokeThickness: 0
      }).setOrigin(0.5).setDepth(13).setData('alive', false);
      this.floatPool.push(t);
    }
    t.setData('alive', true);
    t.setText(text);
    t.setColor(color);
    t.setAlpha(1);
    t.setScale(state.settings.animations ? 0.6 : 1);
    t.setPosition(x, y);
    t.setVisible(true);
    if (state.settings.animations) {
      this.tweens.add({
        targets: t,
        y: y - 64,
        alpha: 0,
        scale: 1.05,
        duration: 1150,
        delay: 120,
        ease: 'Cubic.easeOut',
        onComplete: () => { t.setData('alive', false); t.setVisible(false); }
      });
    } else {
      this.time.delayedCall(700, () => { t.setData('alive', false); t.setVisible(false); });
    }
  }
  correctBurst() {
    const x = this.balloon.x;
    const y = this.balloon.y;
    this.fxGold.explode(16, x, y);
    this.fxStars.explode(8, x, y);
  }
  wrongPuff() {
    this.fxGray.explode(10, this.balloon.x, this.balloon.y + 18);
  }
  collisionFx() {
    this.fxSparks.explode(18, this.balloon.x, this.balloon.y);
    this.cameras.main.shake(180, 0.007);
  }
  finishBurst(stars) {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2 - 40;
    this.confetti.explode(26 + stars * 10, cx, cy);
    this.cameras.main.flash(160, 255, 255, 255, false);
    if (state.settings.animations) {
      this.cameras.main.zoomTo(1.03, 220, 'Sine.easeOut', true);
      this.time.delayedCall(340, () => this.cameras.main.zoomTo(1, 260, 'Sine.easeInOut', true));
    }
  }
  pickObstacleType() {
    const id = game.level.id;
    const pool = [];
    if (id >= 2) pool.push('storm', 'bird');
    if (id >= 3) pool.push('mountain');
    if (id >= 4) pool.push('tree');
    if (id >= 6) pool.push('factory');
    if (id >= 8) pool.push('balloon');
    return Utils.pick(pool.length ? pool : ['bird']);
  }
  spawnObstacle() {
    const type = this.pickObstacleType();
    const H = this.scale.height;
    let tex = 'storm';
    let o = {
      type,
      x: this.scale.width + 70,
      speed: game.level.obstacleSpeed * Utils.rand(0.9, 1.15),
      phase: Utils.rand(0, Math.PI * 2),
      hit: false,
      r: 34,
      w: 0,
      h: 0
    };
    if (type === 'storm') { o.r = 42; tex = 'storm'; o.y = Utils.rand(H * 0.16, H * 0.42); }
    else if (type === 'bird') { o.r = 24; tex = 'birdA'; o.y = Utils.rand(H * 0.18, H * 0.5); }
    else if (type === 'mountain') { o.r = 58; tex = 'obstacleMountain'; o.y = H - 92; }
    else if (type === 'tree') { o.r = 32; tex = this.envCache < 45 ? 'treeBurnt' : 'treeGreen'; o.y = H - 96; }
    else if (type === 'factory') { o.r = 0; tex = 'factory'; o.y = H - 66; o.w = 74; }
    else if (type === 'balloon') { o.r = 32; tex = 'miniBalloon'; o.y = Utils.rand(H * 0.16, H * 0.45); }
    const spr = this.add.image(o.x, o.y, tex).setDepth(9);
    if (type === 'balloon') spr.setTint(0xAB47BC);
    if (type === 'storm') spr.setScale(0.9);
    if (type === 'mountain') spr.setScale(1.1);
    o.spr = spr;
    o.baseY = o.y;
    if (type === 'storm') {
      o.rain = true;
      if (!this.rainOwner) {
        this.rainFx.setPosition(o.x, o.y + 26);
        this.rainFx.start();
        this.rainOwner = o;
      }
    }
    if (type === 'factory') {
      o.factory = true;
      o.rx = o.x - 37;
      o.rw = 74;
      o.rh = spr.displayHeight;
      o.topY = o.y - o.rh;
    }
    this.obstacles.push(o);
  }
  removeObstacle(i) {
    const o = this.obstacles[i];
    if (this.rainOwner === o) {
      this.rainFx.stop();
      this.rainOwner = null;
    }
    o.spr.destroy();
    this.obstacles.splice(i, 1);
  }
  updateObstacles(dt) {
    const L = game.level;
    if (L.obstacleRate > 0) {
      game.obstacleTimer -= dt;
      if (game.obstacleTimer <= 0) {
        this.spawnObstacle();
        game.obstacleTimer = L.obstacleRate * Utils.rand(0.7, 1.25);
      }
    }
    const bx = this.balloon.x;
    const by = this.balloon.y;
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.x -= o.speed * dt;
      if (o.type === 'bird') {
        o.y = o.baseY + Math.sin(game.elapsed * 3 + o.phase) * 26;
        o.spr.flapT = (o.spr.flapT || 0) + dt;
        if (o.spr.flapT > 0.12) { o.spr.flapT = 0; o.spr.setTexture(o.spr.texture.key === 'birdA' ? 'birdB' : 'birdA'); }
      } else if (o.type === 'balloon') {
        o.y = o.baseY + Math.sin(game.elapsed * 2 + o.phase) * 30;
      } else if (o.type === 'mountain') {
        o.y = this.scale.height - 92;
      } else if (o.type === 'tree') {
        o.y = this.scale.height - 96;
      } else if (o.type === 'storm') {
        o.y = o.baseY + Math.sin(game.elapsed * 1.4 + o.phase) * 10;
        if (this.rainOwner === o) this.rainFx.setPosition(o.x, o.y + 26);
      } else if (o.factory) {
        o.rx = o.x - 37;
        o.topY = o.y - o.rh;
      }
      o.spr.setPosition(o.x, o.y);
      if (o.x < -130) { this.removeObstacle(i); continue; }
      if (!o.hit && game.invuln <= 0) {
        let collided = false;
        if (o.factory) {
          collided = bx + 26 > o.rx && bx - 26 < o.rx + o.rw && by + 30 > o.topY && by - 30 < o.y;
        } else {
          const dx = o.x - bx;
          const dy = o.y - by;
          collided = Math.sqrt(dx * dx + dy * dy) < o.r + 30;
        }
        if (collided) {
          o.hit = true;
          if (this.rainOwner === o) {
            this.rainFx.stop();
            this.rainOwner = null;
          }
          handleCollision();
        }
      }
    }
  }
  updateAmbientBirds(dt) {
    this.birdTimer -= dt;
    if (this.birdTimer <= 0 && game.environment >= 30) {
      this.birdTimer = Utils.rand(4, 9);
      const spr = this.add.image(-50, Utils.rand(this.scale.height * 0.1, this.scale.height * 0.35), 'birdA')
        .setDepth(7)
        .setTint(Utils.pick([0x455A64, 0x5D4037, 0x0277BD, 0x37474F]))
        .setScale(Utils.rand(0.6, 0.9));
      spr.spd = Utils.rand(70, 120);
      spr.phase = Utils.rand(0, 6.28);
      spr.baseY = spr.y;
      spr.flapT = 0;
      this.birds.push(spr);
    }
    for (let i = this.birds.length - 1; i >= 0; i--) {
      const bird = this.birds[i];
      bird.x += bird.spd * dt;
      bird.y = bird.baseY + Math.sin(game.elapsed * 2.2 + bird.phase) * 12;
      bird.flapT += dt;
      if (bird.flapT > 0.14) { bird.flapT = 0; bird.setTexture(bird.texture.key === 'birdA' ? 'birdB' : 'birdA'); }
      if (bird.x > this.scale.width + 50) { bird.destroy(); this.birds.splice(i, 1); }
    }
  }
  updateButterflies(dt) {
    if (game.environment < 50) return;
    if (this.butterflies.length < 3 && Math.random() < dt * 0.7) {
      const spr = this.add.image(this.scale.width + 20, Utils.rand(this.scale.height * 0.5, this.scale.height * 0.78), 'butterfly')
        .setDepth(8)
        .setTint(Utils.pick([0xFFFFFF, 0xFFD54F, 0xCE93D8, 0x80DEEA]));
      spr.spd = Utils.rand(35, 75);
      spr.phase = Utils.rand(0, 6.28);
      spr.baseY = spr.y;
      this.butterflies.push(spr);
    }
    for (let i = this.butterflies.length - 1; i >= 0; i--) {
      const bf = this.butterflies[i];
      bf.x -= bf.spd * dt;
      bf.y = bf.baseY + Math.sin(game.elapsed * 3 + bf.phase) * 24;
      bf.setScale(Math.sin(game.elapsed * 8 + bf.phase) * 0.5 + 0.7, 1);
      if (bf.x < -30) { bf.destroy(); this.butterflies.splice(i, 1); }
    }
  }
  stepLogic(dt) {
    const L = game.level;
    const topLimit = 70;
    const bottomLimit = this.scale.height - 90;
    game.elapsed += dt;
    game.altitude = Utils.clamp(game.altitude - L.drainRate * dt, 0, 100);
    const targetY = bottomLimit - (game.altitude / 100) * (bottomLimit - topLimit);
    const prevY = this.balloonTargetY || targetY;
    this.balloonTargetY = prevY + (targetY - prevY) * Math.min(1, dt * 3.5);
    game.bobPhase += dt * 1.6;
    const tilt = Utils.clamp(-(targetY - prevY) / 200, -0.2, 0.2);
    this.balloon.setRotation(tilt);
    if (game.invuln > 0) {
      game.invuln -= dt;
      this.balloon.setAlpha(Math.floor(performance.now() / 90) % 2 === 0 ? 0.45 : 1);
      if (game.invuln <= 0) this.balloon.setAlpha(1);
    }
    const scroll = L.obstacleSpeed * 0.14;
    scrollLayer(this.mtnFar, scroll * 0.55, dt);
    scrollLayer(this.mtnNear, scroll, dt);
    scrollLayer(this.hills, scroll * 1.05, dt);
    this.trees.forEach(t => {
      t.x -= scroll * dt;
      if (t.x < -50) {
        const maxX = Math.max(...this.trees.map(q => q.x));
        t.x = maxX + this.treeGap * Utils.rand(0.85, 1.15);
        t.setTexture(this.envCache < 45 ? 'treeBurnt' : 'treeGreen');
      }
    });
    this.houses.forEach(h => {
      h.x -= scroll * dt;
      if (h.x < -60) {
        const maxX = Math.max(...this.houses.map(q => q.x));
        h.x = maxX + this.houseGap * Utils.rand(0.9, 1.1);
      }
    });
    this.smokeTimer -= dt;
    if (this.smokeTimer <= 0) {
      const visible = this.houses.filter(h => h.x > -40 && h.x < this.scale.width + 40);
      if (visible.length) {
        const hse = Utils.pick(visible);
        this.chimneySmoke.emitParticleAt(hse.x + 18, hse.y - hse.displayHeight + 10);
      }
      this.smokeTimer = 0.9;
    }
    this.cloudsFar.forEach(c => { c.x -= c.spd * dt; if (c.x < -110) { c.x = this.scale.width + 110; c.y = Utils.rand(20, this.scale.height * 0.4); } });
    this.cloudsNear.forEach(c => { c.x -= c.spd * dt; if (c.x < -130) { c.x = this.scale.width + 130; c.y = Utils.rand(this.scale.height * 0.1, this.scale.height * 0.5); } });
    this.updateObstacles(dt);
    this.updateAmbientBirds(dt);
    this.updateButterflies(dt);
    if (game.environment < 45 && Math.random() < dt * 2.4 && this.envSmoke.alive.length < 30) {
      this.envSmoke.emitParticleAt(Utils.rand(0, this.scale.width), this.scale.height - 16);
    }
    if (game.combo >= 3) this.trail.emitting = state.settings.animations;
    else this.trail.emitting = false;
    this.balloon.setPosition(this.balloon.x, this.balloonTargetY + Math.sin(game.bobPhase) * 4);
    if (game.altitude <= 0) { endGame(); return; }
    if (game.nextDelay > 0) {
      game.nextDelay -= dt;
      if (game.nextDelay <= 0) { game.nextDelay = 0; advanceQuestion(); }
    } else if (!game.answered && game.current) {
      game.timeLeft -= dt;
      updateTimerBar();
      if (game.timeLeft <= 0) handleTimeout();
    }
  }
  update(time, delta) {
    const dt = Math.min(delta, 50) / 1000;
    this.checkResize();
    game.W = this.scale.width;
    game.H = this.scale.height;
    if (this.starField) {
      this.starField.forEach(st => st.setAlpha(st.baseA * (0.65 + 0.35 * Math.sin(game.elapsed * st.tw + st.ph))));
    }
    if (game.running && !game.paused && !game.ended) this.stepLogic(dt);
  }
}

const GameFX = {
  scene() {
    return phaserGame && phaserGame.scene.isActive('game') ? phaserGame.scene.getScene('game') : null;
  },
  correctBurst() { const s = this.scene(); if (s) s.correctBurst(); },
  wrongPuff() { const s = this.scene(); if (s) s.wrongPuff(); },
  collision() { const s = this.scene(); if (s) s.collisionFx(); },
  float(text, x, y, color) { const s = this.scene(); if (s) s.float(text, x, y, color); },
  envUpdate() { const s = this.scene(); if (s) s.envUpdate(); },
  finishBurst(stars) { const s = this.scene(); if (s) s.finishBurst(stars); },
  comboShower() { const s = this.scene(); if (s) s.comboShower(); }
};

function handleCollision() {
  game.environment = Utils.clamp(game.environment - 6, 0, 100);
  game.combo = 0;
  game.score = Math.max(0, game.score - 50);
  game.altitude = Utils.clamp(game.altitude - 8, 0, 100);
  game.invuln = 1.2;
  GameFX.collision();
  GameFX.float('OPS! 💥', game.balloonX(), game.balloonY() - 30, '#EF5350');
  els.hudCombo.classList.remove('pop');
  audio.hit();
  updateHUD();
  GameFX.envUpdate();
}

function bootPhaser() {
  phaserGame = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaserWrap',
    backgroundColor: '#7EC8F8',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.NO_CENTER,
      width: window.innerWidth,
      height: window.innerHeight
    },
    render: { antialias: true, roundPixels: false },
    banner: false,
    scene: [BootScene, AmbientScene, GameScene]
  });
}

function init() {
  Storage.load();
  renderLevels();
  syncSettingsUI();
  initInput();
  initButtons();
  bootPhaser();
  showScreen('menu');
  window.addEventListener('pointerdown', function once() {
    audio.init();
    if (state.settings.music) musicPlayer.play(musicForContext());
    window.removeEventListener('pointerdown', once);
  });
  window.addEventListener('keydown', function onceKey() {
    audio.init();
    if (state.settings.music) musicPlayer.play(musicForContext());
    window.removeEventListener('keydown', onceKey);
  });

  window.__mathBalloon = { state, game, musicPlayer };
}

window.addEventListener('DOMContentLoaded', init);

// ===== Year =====
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();

// ===== Custom cursor =====
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("on");
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Typing terminal =====
const terminalBox = document.querySelector(".terminal");
const lines = [
  "Initializing system...",
  "Loading engineer profile...",
  "Status: ACTIVE",
  "Role: Engineer"
];

function typeLine(text, cb) {
  const p = document.createElement("p");
  terminalBox.appendChild(p);
  let i = 0;
  const tick = () => {
    p.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(tick, 18);
    else cb && setTimeout(cb, 170);
  };
  tick();
}

if (terminalBox) {
  terminalBox.innerHTML = "";
  let idx = 0;
  const next = () => {
    if (idx >= lines.length) return;
    typeLine(lines[idx++], next);
  };
  next();
}

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById("themeToggle");
let theme = localStorage.getItem("theme") || "dark";

applyTheme(theme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    theme = theme === "dark" ? "purple" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  });
}

function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
}


// ===== SOUND (cinematic soft) =====
let soundEnabled = false;
let audioCtx = null;

const soundBtn = document.getElementById("soundToggle");
if (soundBtn) {
  soundBtn.addEventListener("click", async () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled && !audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") await audioCtx.resume();
    }

    soundBtn.textContent = soundEnabled ? "Sound: ON" : "Sound: OFF";
    soundEnabled ? softBoot() : softClose();
  });
}

function playTone(freq, t = 0.06, type = "sine", gainVal = 0.012) {
  if (!soundEnabled || !audioCtx) return;

  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  const now = audioCtx.currentTime;

  o.type = type;
  o.frequency.setValueAtTime(freq, now);

  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gainVal, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + t);

  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(now);
  o.stop(now + t);
}

function softClick(){
  playTone(220, 0.03, "triangle", 0.010);
  playTone(440, 0.025, "sine", 0.007);
}
function softOpen(){
  playTone(392, 0.05, "sine", 0.011);
  playTone(784, 0.06, "triangle", 0.010);
}
function softClose(){
  playTone(196, 0.06, "sine", 0.011);
}
function softBoot(){
  playTone(330, 0.06, "sine", 0.011);
  setTimeout(() => playTone(494, 0.06, "triangle", 0.010), 70);
  setTimeout(() => playTone(659, 0.07, "sine", 0.010), 140);
}

// ===== Modal data (with screenshots) =====
const data = {
  banking: {
    kicker: "SE3 · DESIGN PATTERNS",
    title: "Advanced Banking System",
    desc:
      "Modular banking system demonstrating structural + behavioral patterns. " +
      "My contribution: Decorator implementation, a full unit testing suite for it, and an admin control interface.",
    tags: ["Decorator", "Unit Tests", "Admin Interface", "Extensibility"],
    link: "https://github.com/ghazal-mohammad/advanced_banking_system",
    img: "assets/banking.png"
  },
  complaints: {
    kicker:

// year
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();

// ===== THEME toggle (CYAN <-> ROSE) =====
const themeBtn = document.getElementById("themeToggle");
let theme = localStorage.getItem("theme") || "cyan";
applyTheme(theme);

function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  if (themeBtn) themeBtn.textContent = `Theme: ${t.toUpperCase()}`;
}

if (themeBtn){
  themeBtn.addEventListener("click", () => {
    theme = (theme === "cyan") ? "rose" : "cyan";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    softClick();
  });
}

// cursor
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});

// reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("on");
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== SOUND =====
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
    soundEnabled ? softBoot() : softOff();
  });
}

function playTone(freq, t = 0.06, type = "sine", gainVal = 0.015) {
  if (!soundEnabled || !audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  const now = audioCtx.currentTime;

  o.type = type;
  o.frequency.setValueAtTime(freq, now);

  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gainVal, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + t);

  o.connect(g); g.connect(audioCtx.destination);
  o.start(now); o.stop(now + t);
}

function softClick(){ playTone(240, 0.03, "triangle", 0.010); playTone(480, 0.02, "sine", 0.006); }
function softOpen(){  playTone(392, 0.05, "sine", 0.012); playTone(784, 0.06, "triangle", 0.010); }
function softClose(){ playTone(196, 0.06, "sine", 0.012); }
function softBoot(){
  playTone(330, 0.06, "sine", 0.012);
  setTimeout(() => playTone(494, 0.06, "triangle", 0.010), 70);
  setTimeout(() => playTone(659, 0.07, "sine", 0.010), 140);
}
function softOff(){ playTone(247, 0.07, "sine", 0.010); }

// hover
document.querySelectorAll("a, button, .module").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "28px";
    cursor.style.height = "28px";
    cursor.style.borderColor = "rgba(255,255,255,.35)";
    softClick();
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "16px";
    cursor.style.height = "16px";
    cursor.style.borderColor = "rgba(255,255,255,.22)";
  });
});

// typing terminal
const terminalBox = document.querySelector(".terminal");
const lines = [
  "Initializing system...",
  "Loading engineer profile...",
  "Status: ACTIVE",
  "Role: Engineer"
];

function typeLine(text, cb){
  const p = document.createElement("p");
  terminalBox.appendChild(p);
  let i = 0;
  const tick = () => {
    p.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(tick, 18);
    else cb && setTimeout(cb, 160);
  };
  tick();
}

if (terminalBox){
  terminalBox.innerHTML = "";
  let idx = 0;
  const next = () => {
    if (idx >= lines.length) return;
    typeLine(lines[idx++], next);
  };
  next();
}

// modal data
const data = {
  banking: {
    kicker: "SE3 · DESIGN PATTERNS",
    title: "Advanced Banking System",
    desc: "Modular banking system demonstrating design patterns. My contribution: Decorator + unit tests + admin UI.",
    tags: ["Decorator", "Unit Tests", "Admin UI"],
    link: "https://github.com/ghazal-mohammad/advanced_banking_system",
    images: ["assets/screens/banking-1.png"]
  },
  complaints: {
    kicker: "FLUTTER · MOBILE APP",
    title: "Government Complaints Mobile",
    desc: "Flutter app: OTP login, complaint submission with attachments, and status tracking.",
    tags: ["Flutter", "OTP", "Forms", "API"],
    link: "https://github.com/ghazal-mohammad/Eshtikily_mobile_app-main",
    images: ["assets/screens/flutter-1.png"]
  },
  civil: {
    kicker: "SYSTEMS · REQUIREMENTS",
    title: "Civil Registry Automation",
    desc: "Requirements analysis + workflow re-engineering. Private until milestones are ready.",
    tags: ["Requirements", "Workflows", "Traceability"],
    link: "#",
    images: ["assets/screens/civil-1.png"]
  },
  security: {
    kicker: "SECURITY · ACADEMIC LABS",
    title: "Information Systems Security",
    desc: "Academic labs organized safely (redacted). Focus on defense & mitigation.",
    tags: ["CSRF", "XSS", "SQLi"],
    link: "#",
    images: ["assets/screens/security-1.png"]
  }
};

// modal logic
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBack = document.getElementById("modalBack");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalImages = document.getElementById("modalImages");
const modalLink = document.getElementById("modalLink");

function openModal(key){
  const d = data[key];
  if (!d) return;

  modalKicker.textContent = d.kicker;
  modalTitle.textContent = d.title;
  modalDesc.textContent = d.desc;

  modalTags.innerHTML = "";
  d.tags.forEach(t => {
    const s = document.createElement("span");
    s.textContent = t;
    modalTags.appendChild(s);
  });

  modalImages.innerHTML = "";
  (d.images || []).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = d.title + " screenshot";
    modalImages.appendChild(img);
  });

  if (d.link === "#") modalLink.style.display = "none";
  else { modalLink.style.display = "inline-flex"; modalLink.href = d.link; }

  modal.classList.add("on");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  softOpen();
}

function closeModal(){
  modal.classList.remove("on");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  softClose();
}

document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.modal));
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBack) modalBack.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("on")) closeModal(); });

const enterBtn = document.getElementById("enterBtn");
if (enterBtn) enterBtn.addEventListener("click", () => softOpen());
// ===== FORCE THEME TOGGLE (FINAL PATCH) =====
window.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) {
    console.log("themeToggle button not found");
    return;
  }

  const saved = localStorage.getItem("theme") || "cyan";
  document.documentElement.setAttribute("data-theme", saved);
  themeBtn.textContent = `Theme: ${saved.toUpperCase()}`;

  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "cyan";
    const next = current === "cyan" ? "rose" : "cyan";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeBtn.textContent = `Theme: ${next.toUpperCase()}`;
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15 // سيبدأ الأنيميشن عندما يظهر 15% من العنصر
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // تأكد أن هذا الكلاس موجود في motion.css
                observer.unobserve(entry.target); // التوقف عن المراقبة بعد تفعيل الأنيميشن لتحسين الأداء
            }
        });
    }, observerOptions);

    // استهداف جميع الكروت في قسم المشاريع
    document.querySelectorAll('.module-card').forEach(card => {
        observer.observe(card);
    });
});



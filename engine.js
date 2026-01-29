// ===== Intro terminal lines =====
const terminal = document.querySelector(".terminal");
setTimeout(() => terminal.innerHTML += "<p>Status: ACTIVE</p>", 1200);
setTimeout(() => terminal.innerHTML += "<p>Role: Engineer</p>", 2200);

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

// ===== SOUND (Web Audio API) =====
let soundEnabled = false;
let audioCtx = null;

const soundBtn = document.getElementById("soundToggle");
if (soundBtn) {
  soundBtn.addEventListener("click", async () => {
    soundEnabled = !soundEnabled;

    // Create AudioContext on user gesture (required by browsers)
    if (soundEnabled && !audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") await audioCtx.resume();
    }

    soundBtn.textContent = soundEnabled ? "Sound: ON" : "Sound: OFF";
    beep(soundEnabled ? 880 : 220, 0.06, "triangle"); // confirmation beep
  });
}

function beep(freq = 760, duration = 0.05, type = "sine", gainVal = 0.03) {
  if (!soundEnabled || !audioCtx) return;

  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();

  o.type = type;
  o.frequency.value = freq;

  // soft envelope (no harsh clicks)
  const now = audioCtx.currentTime;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gainVal, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(now);
  o.stop(now + duration);
}

// ===== Modal data =====
const data = {
  banking: {
    kicker: "SE3 · DESIGN PATTERNS",
    title: "Advanced Banking System",
    desc:
      "Modular banking system demonstrating structural + behavioral patterns. " +
      "My contribution: Decorator implementation, a full unit testing suite for it, and an admin control interface.",
    tags: ["Decorator", "Unit Tests", "Admin Interface", "Extensibility"],
    link: "https://github.com/ghazal-mohammad/advanced_banking_system"
  },
  complaints: {
    kicker: "FLUTTER · MOBILE APP",
    title: "Government Complaints Mobile App",
    desc:
      "Flutter citizen-facing app: OTP authentication, complaint submission with attachments, and status tracking with a clean UX flow.",
    tags: ["Flutter", "OTP", "Forms", "UX Flow", "API Integration"],
    link: "https://github.com/ghazal-mohammad/Eshtikily_mobile_app-main"
  },
  civil: {
    kicker: "SYSTEMS · REQUIREMENTS",
    title: "Civil Registry Automation",
    desc:
      "Requirements analysis + workflow re-engineering for civil status transactions in courts. Private until stable milestones are ready.",
    tags: ["Requirements", "Workflows", "Traceability", "Concurrency"],
    link: "#"
  },
  security: {
    kicker: "SECURITY · ACADEMIC LABS",
    title: "Information Systems Security",
    desc:
      "Academic labs organized safely (redacted). Focus on defensive mitigation and understanding common web vulnerabilities.",
    tags: ["CSRF", "XSS", "SQLi", "Defensive Thinking"],
    link: "#"
  }
};

// ===== Modal logic =====
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBack = document.getElementById("modalBack");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
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

  if (d.link === "#") {
    modalLink.style.display = "none";
  } else {
    modalLink.style.display = "inline-flex";
    modalLink.href = d.link;
  }

  modal.classList.add("on");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // sound + cursor effect
  beep(740, 0.05, "sine");
  beep(980, 0.06, "triangle", 0.02);

  cursor.style.width = "26px";
  cursor.style.height = "26px";
  cursor.style.borderColor = "rgba(255,78,205,.75)";
}

function closeModal(){
  modal.classList.remove("on");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  beep(220, 0.07, "sine"); // close beep

  cursor.style.width = "16px";
  cursor.style.height = "16px";
  cursor.style.borderColor = "rgba(45,226,230,.65)";
}

document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.modal));
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBack) modalBack.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// cursor reacts + hover beeps (خفيف)
document.querySelectorAll("a, button, .module").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "28px";
    cursor.style.height = "28px";
    cursor.style.borderColor = "rgba(255,78,205,.75)";
    beep(520, 0.03, "triangle", 0.012);
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "16px";
    cursor.style.height = "16px";
    cursor.style.borderColor = "rgba(45,226,230,.65)";
  });
});

// ESC closes modal
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("on")) closeModal();
});

// Enter System beep on click
const enterLink = document.querySelector('a[href="#core"]');
if (enterLink) {
  enterLink.addEventListener("click", () => {
    beep(660, 0.05, "sine");
    beep(880, 0.06, "triangle", 0.02);
  });
}

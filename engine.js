// terminal lines (intro)
const terminal = document.querySelector(".terminal");
setTimeout(() => terminal.innerHTML += "<p>Status: ACTIVE</p>", 1200);
setTimeout(() => terminal.innerHTML += "<p>Role: Engineer</p>", 2200);

// year
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();

// custom cursor
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});

// reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("on");
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== MODAL DATA =====
const data = {
  banking: {
    kicker: "SE3 · DESIGN PATTERNS",
    title: "Advanced Banking System",
    desc:
      "A modular banking system built to demonstrate structural and behavioral design patterns. " +
      "My contribution focuses on Decorator pattern implementation, a complete testing suite for it, " +
      "and an administrative control interface.",
    tags: ["Decorator", "Unit Tests", "Admin Interface", "Extensible Design"],
    link: "https://github.com/ghazal-mohammad/advanced_banking_system"
  },
  complaints: {
    kicker: "FLUTTER · MOBILE APP",
    title: "Government Complaints Mobile App",
    desc:
      "Flutter application for citizens: OTP authentication, complaint submission with attachments, " +
      "and complaint tracking with a clean, usable flow.",
    tags: ["Flutter", "OTP", "Forms", "UX Flow", "API Integration"],
    link: "https://github.com/ghazal-mohammad/Eshtikily_mobile_app-main"
  },
  civil: {
    kicker: "SYSTEMS · REQUIREMENTS",
    title: "Civil Registry Automation",
    desc:
      "Requirements analysis and workflow re-engineering for civil status transactions in courts. " +
      "Private repository until milestone delivery.",
    tags: ["Requirements", "Workflow", "Traceability", "Concurrency"],
    link: "#"
  },
  security: {
    kicker: "SECURITY · ACADEMIC LABS",
    title: "Information Systems Security",
    desc:
      "Academic labs organized safely (redacted). Focus on understanding vulnerabilities and mitigation.",
    tags: ["CSRF", "XSS", "SQLi", "Defensive Thinking"],
    link: "#"
  }
};

// ===== MODAL LOGIC =====
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
  document.body.style.overflow = "hidden";
  cursor.style.width = "26px";
  cursor.style.height = "26px";
}

function closeModal(){
  modal.classList.remove("on");
  document.body.style.overflow = "";
  cursor.style.width = "16px";
  cursor.style.height = "16px";
}

document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.modal));
});

modalClose.addEventListener("click", closeModal);
modalBack.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// cursor reacts on hover
document.querySelectorAll("a, button, .module").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.borderColor = "rgba(255,78,205,.75)";
    cursor.style.width = "28px";
    cursor.style.height = "28px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.borderColor = "rgba(45,226,230,.65)";
    cursor.style.width = "16px";
    cursor.style.height = "16px";
  });
});

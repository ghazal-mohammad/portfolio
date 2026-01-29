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

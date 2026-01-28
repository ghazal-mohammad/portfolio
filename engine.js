const terminal = document.querySelector(".terminal");

setTimeout(() => {
  terminal.innerHTML += "<p>Status: ACTIVE</p>";
}, 1200);

setTimeout(() => {
  terminal.innerHTML += "<p>Role: Engineer</p>";
}, 2200);

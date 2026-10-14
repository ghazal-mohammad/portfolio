// Header border on scroll
(function () {
  var h = document.querySelector('.site-header');
  if (!h) return;
  var on = function () { h.classList.toggle('scrolled', window.scrollY > 8); };
  on();
  window.addEventListener('scroll', on, { passive: true });
})();

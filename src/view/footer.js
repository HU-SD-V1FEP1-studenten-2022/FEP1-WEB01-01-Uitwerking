const toggleThemeBtn = document.querySelector('.toggleThemeBtn');

// ---- CUT ----
const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

toggleThemeBtn.addEventListener('click', () => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle('light-theme');
  } else {
    document.body.classList.toggle('dark-theme');
  }
});
// ---- ENDCUT ----

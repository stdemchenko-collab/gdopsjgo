function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('siteTheme', theme);
    const toggleBtn = document.getElementById('themeToggle');

    if (!toggleBtn) return;

    if (theme === 'dark') {
        toggleBtn.textContent = '☀️ Светлая тема';
    } else {
        toggleBtn.textContent = '🌙 Тёмная тема';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('siteTheme');
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(savedTheme || defaultTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
});

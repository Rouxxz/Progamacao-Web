// Gerenciamento do Modo Noturno (Dark Mode)
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-toggle-text') : null;

    function updateButtonUI(isDark) {
        if (themeToggleText) {
            themeToggleText.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
        }
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Mudar para modo claro' : 'Mudar para modo noturno');
            themeToggleBtn.setAttribute('title', isDark ? 'Mudar para modo claro' : 'Mudar para modo noturno');
        }
    }

    function setTheme(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
        updateButtonUI(isDark);
    }

    // Verifica estado atual na inicialização
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateButtonUI(currentTheme === 'dark');

    // Evento de clique para alternar
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setTheme(isCurrentlyDark ? 'light' : 'dark');
        });
    }

    // Ouvinte para caso o usuário mude a preferência do sistema e não tenha preferência manual salva
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
});

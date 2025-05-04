// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based header styling
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add subtle animation to cards when they come into view
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});

// Language Switcher
const langEnBtn = document.getElementById('lang-en');
const langFrBtn = document.getElementById('lang-fr');

function switchLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    if (lang === 'en') {
        langEnBtn.classList.add('active');
        langFrBtn.classList.remove('active');
    } else {
        langEnBtn.classList.remove('active');
        langFrBtn.classList.add('active');
    }
}

if (langEnBtn && langFrBtn) {
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langFrBtn.addEventListener('click', () => switchLanguage('fr'));
}

// Contact email form handler
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('emailMessage').value;
        const mailto = `mailto:gelart@email.com?subject=Order%20or%20Contact%20from%20Website&body=${encodeURIComponent(message)}`;
        window.location.href = mailto;
    });
}
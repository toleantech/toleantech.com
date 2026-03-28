import './tolean-navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tolean Technologies Landing Page Initialized');

    // Add intersection observer for reveal animations if needed
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

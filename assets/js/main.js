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

    // Modal Logic
    const modal = document.getElementById('legal-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const openModal = (id) => {
        const template = document.getElementById(`template-${id}`);
        if (template) {
            modalBody.innerHTML = '';
            modalBody.appendChild(template.content.cloneNode(true));
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Handle clicks on elements with data-modal attribute
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-modal]');
        if (target && !target.closest('tolean-navbar')) { // Navbar handles its own events
            e.preventDefault();
            openModal(target.getAttribute('data-modal'));
        }
    });

    // Listen for custom event from navbar
    window.addEventListener('open-modal', (e) => {
        openModal(e.detail);
    });

    modalClose.addEventListener('click', closeModal);

    // Close on click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

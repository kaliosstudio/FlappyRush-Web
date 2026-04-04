// main.js - Core functionality for Flappy Rush Web

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // small delay to allow display flex to apply before transitioning opacity
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
            }, 10);
        } else {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300); // match standard tailwind transition duration
        }
    });

    // Close menu when clicking links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // we access the inner glass-panel to adjust padding or background if needed
            navbar.style.transform = 'translateY(-10px)'; 
        } else {
            navbar.style.transform = 'translateY(0px)';
        }
    });

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element comes into view, remove constraints
                entry.target.classList.remove('opacity-0');
                entry.target.classList.remove('translate-y-8');
                entry.target.classList.remove('-translate-x-8');
                entry.target.classList.remove('translate-x-8');
                
                // Add full visibility
                entry.target.classList.add('opacity-100');
                entry.target.classList.add('translate-y-0');
                entry.target.classList.add('translate-x-0');
                
                // Keep it revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
});

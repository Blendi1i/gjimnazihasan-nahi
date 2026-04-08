// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // Tiny delay to ensure smoothness
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP & ScrollTrigger Setup
    gsap.registerPlugin(ScrollTrigger);

    // Fade reveal animation for elements with .reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Hero Section Animations (On Load)
    const tlHero = gsap.timeline();
    
    // Check if we are on an internal page with hero-modern
    if(document.querySelector('.hero-modern')) {
        tlHero.from(".hero-tag", {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5
        })
        .from(".hero-modern-content h1", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out"
        }, "-=0.4")
        .from(".hero-modern-content p", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero-accent-line", {
            width: 0,
            duration: 1,
            ease: "power3.inOut"
        }, "-=0.4");
    }

    // Animation for index.html hero elements
    tlHero.from(".hero-content", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
    }, document.querySelector('.hero-modern') ? "-=0.8" : "0.5")
    .from(".hero-visual", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6")
    .from(".stats-grid .stat", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // 5. Card Hover Animations (Interactive)
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    // 6. Section Titles Underline Animation
    const titles = document.querySelectorAll('.section-title h2');
    titles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
            },
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out"
        });
    });

    // 7. Footer Staggered Reveal
    gsap.from("footer .container > div", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 95%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
    });

    // 8. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const dropdownToggles = document.querySelectorAll('.nav-item-dropdown > a');

    if(menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Handle Mobile Dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if(window.innerWidth < 992) {
                e.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

});

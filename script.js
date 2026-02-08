// ===========================
// MODERN 3D JAVASCRIPT - GDG NEHU
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // CUSTOM CURSOR
    // ==================
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow effect
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .card-3d, .stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform += ' scale(2)';
            cursorOutline.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(2)', '');
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
        });
    });
    
    // ==================
    // PARTICLES BACKGROUND
    // ==================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(66, 133, 244, ${Math.random() * 0.5});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ==================
    // ADVANCED LOADER
    // ==================
    const loader = document.querySelector('.loader');
    const loaderPercentage = document.querySelector('.loader-percentage');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 500);
        }
        loaderPercentage.textContent = Math.floor(progress) + '%';
    }, 100);
    
    // ==================
    // SCROLL PROGRESS
    // ==================
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // ==================
    // HEADER SCROLL EFFECT
    // ==================
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ==================
    // MOBILE MENU TOGGLE
    // ==================
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // ==================
    // FLOATING MENU
    // ==================
    const floatingMenu = document.querySelector('.floating-menu');
    const floatingToggle = document.querySelector('.floating-menu-toggle');
    
    floatingToggle.addEventListener('click', () => {
        floatingMenu.classList.toggle('active');
    });
    
    // ==================
    // SLIDER FUNCTIONALITY
    // ==================
    const sliderWrapper = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Update slider
    function updateSlider(instant = false) {
        if (instant) {
            sliderWrapper.style.transition = 'none';
        } else {
            sliderWrapper.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
        
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Restart indicator animation
        const activeIndicator = document.querySelector('.indicator.active .indicator-progress');
        if (activeIndicator) {
            activeIndicator.style.animation = 'none';
            setTimeout(() => {
                activeIndicator.style.animation = '';
            }, 10);
        }
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
    
    // Indicator click
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetSlideInterval();
        });
    });
    
    // Auto slide
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    startSlideInterval();
    
    // Pause on hover
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetSlideInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideInterval();
        }
    });
    
    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetSlideInterval();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            resetSlideInterval();
        }
    }
    
    // ==================
    // ANIMATED COUNTERS
    // ==================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => animateCounter(stat));
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ==================
    // SMOOTH SCROLLING
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================
    // ACTIVE NAV LINK
    // ==================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ==================
    // 3D CARD TILT EFFECT
    // ==================
    const cards3d = document.querySelectorAll('.card-3d');
    
    cards3d.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 15;
            const rotateX = (centerY - y) / 15;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                scale3d(1.02, 1.02, 1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // ==================
    // PARALLAX SCROLLING
    // ==================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax for slide backgrounds
        const activeSlideBg = document.querySelector('.slide.active .slide-bg');
        if (activeSlideBg) {
            activeSlideBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // ==================
    // RIPPLE EFFECT
    // ==================
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple to buttons
    document.querySelectorAll('.btn-slide, .btn-login, .slider-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Add ripple CSS animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ==================
    // BACK TO TOP BUTTON
    // ==================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================
    // SCROLL ANIMATIONS
    // ==================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // ==================
    // LOGO ANIMATION
    // ==================
    const logoImg = document.querySelector('.logo-img');
    
    if (logoImg) {
        logoImg.addEventListener('mouseenter', () => {
            logoImg.style.animation = 'logo-spin 1s ease-in-out';
        });
        
        logoImg.addEventListener('animationend', () => {
            logoImg.style.animation = '';
        });
    }
    
    const logoSpinStyle = document.createElement('style');
    logoSpinStyle.textContent = `
        @keyframes logo-spin {
            0% { transform: translateZ(30px) rotate(0deg); }
            100% { transform: translateZ(30px) rotate(360deg); }
        }
    `;
    document.head.appendChild(logoSpinStyle);
    
    // ==================
    // TECH CAROUSEL AUTO PAUSE
    // ==================
    const techCarousel = document.querySelector('.tech-carousel');
    
    if (techCarousel) {
        techCarousel.addEventListener('mouseenter', () => {
            const track = techCarousel.querySelector('.tech-track');
            track.style.animationPlayState = 'paused';
        });
        
        techCarousel.addEventListener('mouseleave', () => {
            const track = techCarousel.querySelector('.tech-track');
            track.style.animationPlayState = 'running';
        });
    }
    
    // ==================
    // SOCIAL ICONS ANIMATION
    // ==================
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        icon.style.animation = `float-in 0.5s ease-out ${index * 0.1}s both`;
    });
    
    const socialAnimStyle = document.createElement('style');
    socialAnimStyle.textContent = `
        @keyframes float-in {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(socialAnimStyle);
    
    // ==================
    // PERFORMANCE OPTIMIZATION
    // ==================
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateOnScroll() {
        lastScrollY = window.scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // ==================
    // EASTER EGG - KONAMI CODE
    // ==================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add rainbow animation to everything
        document.body.style.animation = 'rainbow-bg 5s linear infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow-bg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Show confetti or special message
        alert('🎉 You found the secret! GDG NEHU rocks! 🚀');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
    
    // ==================
    // LAZY LOADING IMAGES
    // ==================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ==================
    // INIT MESSAGE
    // ==================
    console.log('%c🚀 GDG NEHU Website Loaded! ', 'background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%cBuilt with ❤️ by GDG Community', 'color: #4285F4; font-size: 14px;');
    
    // ==================
    // PREVENT CONTEXT MENU (Optional)
    // ==================
    // Uncomment to disable right-click
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
    
});

// ==================
// WINDOW LOAD EVENTS
// ==================
window.addEventListener('load', () => {
    // Remove loader after everything is loaded
    setTimeout(() => {
        document.querySelector('.loader').classList.add('loaded');
    }, 1000);
    
    // Initialize AOS-like animations
    document.querySelectorAll('[data-aos]').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ==================
// RESIZE HANDLER
// ==================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        console.log('Window resized');
    }, 250);
});
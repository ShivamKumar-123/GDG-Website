// ===========================
// PAGES JAVASCRIPT - GDG NEHU
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // EVENTS FILTER
    // ==================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter events
                eventCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        card.style.display = 'block';
                        card.style.animation = 'fade-in-up 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ==================
    // NEWSLETTER FORM
    // ==================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            // Simulate subscription
            const btn = this.querySelector('.newsletter-btn');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #34A853 0%, #0F9D58 100%)';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.background = '';
                    this.reset();
                }, 2000);
                
                // Show success message
                showNotification('Successfully subscribed to newsletter!', 'success');
            }, 1500);
        });
    }
    
    // ==================
    // TEAM CARD TOUCH SUPPORT
    // ==================
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const inner = this.querySelector('.team-card-inner');
                
                if (!isFlipped) {
                    inner.style.transform = 'rotateY(180deg)';
                    isFlipped = true;
                } else {
                    inner.style.transform = 'rotateY(0deg)';
                    isFlipped = false;
                }
            }
        });
    });
    
    // ==================
    // EVENT CARD ANIMATIONS ON SCROLL
    // ==================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const eventObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        eventObserver.observe(card);
    });
    
    // ==================
    // CONTACT FORM VALIDATION
    // ==================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate sending
            const submitBtn = this.querySelector('.contact-btn');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #34A853 0%, #0F9D58 100%)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
                
                showNotification('Message sent successfully!', 'success');
            }, 1500);
        });
    }
    
    // ==================
    // NOTIFICATION SYSTEM
    // ==================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: -400px;
            max-width: 350px;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            transition: right 0.3s ease;
        }
        
        .notification.show {
            right: 30px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
            color: white;
        }
        
        .notification-content i {
            font-size: 24px;
        }
        
        .notification-success i {
            color: #34A853;
        }
        
        .notification-error i {
            color: #EA4335;
        }
        
        .notification-info i {
            color: #4285F4;
        }
        
        @media (max-width: 480px) {
            .notification {
                max-width: calc(100% - 40px);
                right: -100%;
            }
            
            .notification.show {
                right: 20px;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // ==================
    // SMOOTH REVEAL ANIMATIONS
    // ==================
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ==================
    // COPY EMAIL ON CLICK
    // ==================
    const emailElements = document.querySelectorAll('.contact-item span');
    
    emailElements.forEach(el => {
        if (el.textContent.includes('@')) {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy';
            
            el.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Email copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Failed to copy email', 'error');
                });
            });
        }
    });
    
    // ==================
    // EVENT CARD HOVER EFFECTS
    // ==================
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ==================
    // PARALLAX SCROLL FOR PAGE HERO
    // ==================
    const pageHero = document.querySelector('.page-hero');
    
    if (pageHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const orbs = pageHero.querySelectorAll('.gradient-orb');
            
            orbs.forEach((orb, index) => {
                const speed = 0.3 + (index * 0.1);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // ==================
    // ANIMATED COUNTERS FOR STATS
    // ==================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateValue(stat, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ==================
    // PRINT EVENT DETAILS
    // ==================
    const eventBtns = document.querySelectorAll('.event-btn');
    
    eventBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Register') || this.textContent.includes('Join')) {
                e.preventDefault();
                const eventTitle = this.closest('.event-card').querySelector('.event-title').textContent;
                showNotification(`Registration form for "${eventTitle}" will open soon!`, 'info');
            }
        });
    });
    
    // ==================
    // TEAM MEMBER SOCIAL LINKS
    // ==================
    const socialLinks = document.querySelectorAll('.member-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split('-')[1];
            showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)} profile link will be added soon!`, 'info');
        });
    });
    
    // ==================
    // IMAGE LAZY LOADING
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
    // INITIALIZE PAGE
    // ==================
    console.log('%c📄 Page Loaded Successfully!', 'background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    
});
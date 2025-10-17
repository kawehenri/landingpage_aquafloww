// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .about-content, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('/');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (isTime) {
                element.textContent = Math.floor(current) + '/7';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation for FAQ
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Close all FAQ items
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Preload critical images
    const criticalImages = [
        './static/imgs/logo.png',
        './static/imgs/fundo2.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Update reading progress
        updateReadingProgress();
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reading progress functionality
    function updateReadingProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById('reading-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    // Enhanced FAQ functionality with keyboard support
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Click event
        question.addEventListener('click', function() {
            toggleFAQ(item);
        });
        
        // Keyboard event
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });
    
    function toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherQuestion = otherItem.querySelector('.faq-question');
                otherQuestion.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        const question = item.querySelector('.faq-question');
        if (isActive) {
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    }

    // Enhanced mobile menu with keyboard support
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        }
    });

    // Update aria-expanded on mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Animate benefit numbers when they come into view
    const benefitNumbers = document.querySelectorAll('.benefit-number');
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBenefitNumber(entry.target);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    benefitNumbers.forEach(number => {
        benefitObserver.observe(number);
    });

    function animateBenefitNumber(element) {
        const target = element.textContent;
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        const suffix = target.replace(/[\d]/g, '');
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksActive = document.querySelectorAll('.nav-link[data-section]');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksActive.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    // Enhanced particle animation
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        document.getElementById('particles-container').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 35000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 3000);

    // Enhanced scroll animations with intersection observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for scroll animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(section);
    });

    // Enhanced button interactions
    const allButtons = document.querySelectorAll('.btn, .case-item, .benefit-item, .roadmap-item');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Enhanced loading states
    const loadingElements = document.querySelectorAll('.feature-card, .case-item, .benefit-item');
    loadingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });

    // Interactive roadmap items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach(item => {
        item.addEventListener('click', function() {
            roadmapItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Enhanced FAQ with smooth animations
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                otherAnswer.style.maxHeight = null;
            });
            
            // Toggle current answer
            if (isOpen) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    console.log('AquaFloww landing page loaded successfully! 🌊');
});

// Função para scroll suave para a seção de recursos
function scrollToFeatures() {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        const offsetTop = featuresSection.offsetTop - 70; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
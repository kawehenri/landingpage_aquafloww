// Enhanced JavaScript for Historia Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initStatsCounter();
    initTestimonialsCarousel();
    initLightbox();
    initShareButtons();
    initScrollAnimations();
});

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides
    setInterval(nextSlide, 5000);
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Share functionality
function initShareButtons() {
    // Add click handlers for share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('História do Projeto AquaFloww - Jornada Completa');
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Conheça a história completa do projeto AquaFloww! 🚀 #AquaFloww #Inovação #SENAI');
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('História do Projeto AquaFloww');
    const summary = encodeURIComponent('Conheça a jornada completa do desenvolvimento do sistema de irrigação inteligente AquaFloww.');
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Conheça a história completa do projeto AquaFloww! 🚀');
    const shareUrl = `https://wa.me/?text=${text}%20${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Show success message
        showNotification('Link copiado para a área de transferência!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copiado para a área de transferência!', 'success');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : '#2c5aa0'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.stat-item, .testimonial, .share-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

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

// Video hover effects
document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        videoWrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
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
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

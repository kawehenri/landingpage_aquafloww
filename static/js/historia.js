// História Page JavaScript
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
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal page links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (index.html), ensure navigation works
            else if (href && href.includes('index.html')) {
                // Let the browser handle the navigation naturally
                // No preventDefault() needed
                console.log('Navigating to:', href);
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

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // Gallery Animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        galleryObserver.observe(item);
    });

    // Team Members Animation
    const teamMembers = document.querySelectorAll('.team-member');
    const teamObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        teamObserver.observe(member);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Preload critical images
    const criticalImages = [
        './static/imgs/logo.png',
        './static/imgs/fundo2.png',
        './static/imgs/SENAI_logo_2024.png',
        './static/imgs/SESI_logo_2024.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add hover effects to team members
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a simple click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });


    // Specific handler for Voltar button
    const voltarButton = document.querySelector('.btn-voltar');
    if (voltarButton) {
        voltarButton.addEventListener('click', function(e) {
            console.log('Voltar button clicked');
            // Ensure navigation to index.html
            window.location.href = 'index.html';
        });
    }

    // Carousel functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');
    const description = document.getElementById('carouselDescription');
    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }
    
    // Update carousel
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
        
        // Update description
        const activeSlide = slides[currentSlide];
        const slideDesc = activeSlide.querySelector('.slide-description');
        if (slideDesc) {
            const title = slideDesc.querySelector('h4').textContent;
            const text = slideDesc.querySelector('p').textContent;
            description.innerHTML = `<h4>${title}</h4><p>${text}</p>`;
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Team Carousels functionality
    const teamCarousels = {
        hidraulica: { current: 0, total: 1 },
        eletrica: { current: 0, total: 1 },
        backend: { current: 0, total: 1 },
        frontend: { current: 0, total: 1 },
        prototipagem: { current: 0, total: 1 },
        instrutor: { current: 0, total: 1 },
        documentacao: { current: 0, total: 1 }
    };

    // Initialize team carousels
    Object.keys(teamCarousels).forEach(teamName => {
        const track = document.getElementById(`${teamName}-track`);
        const indicators = document.getElementById(`${teamName}-indicators`);
        const prevBtn = document.querySelector(`[data-team="${teamName}"].team-prev-btn`);
        const nextBtn = document.querySelector(`[data-team="${teamName}"].team-next-btn`);
        
        console.log(`Initializing team carousel for: ${teamName}`);
        console.log(`Track found:`, track);
        console.log(`Indicators found:`, indicators);
        
        if (track && indicators) {
            const members = track.querySelectorAll('.team-member');
            teamCarousels[teamName].total = members.length;
            
            console.log(`Team ${teamName} has ${members.length} members`);
            
            // Create indicators
            for (let i = 0; i < members.length; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'team-indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToTeamSlide(teamName, i));
                indicators.appendChild(indicator);
            }
            
            // Add event listeners
            if (prevBtn) {
                prevBtn.addEventListener('click', () => prevTeamSlide(teamName));
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => nextTeamSlide(teamName));
            }
        } else {
            console.warn(`Could not initialize carousel for team: ${teamName}`);
        }
    });

    // Team carousel functions
    function updateTeamCarousel(teamName) {
        const track = document.getElementById(`${teamName}-track`);
        const indicators = document.getElementById(`${teamName}-indicators`);
        
        if (track && indicators) {
            const translateX = -teamCarousels[teamName].current * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            const teamIndicators = indicators.querySelectorAll('.team-indicator');
            teamIndicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === teamCarousels[teamName].current);
            });
        }
    }

    function goToTeamSlide(teamName, slideIndex) {
        teamCarousels[teamName].current = slideIndex;
        updateTeamCarousel(teamName);
    }

    function nextTeamSlide(teamName) {
        teamCarousels[teamName].current = (teamCarousels[teamName].current + 1) % teamCarousels[teamName].total;
        updateTeamCarousel(teamName);
    }

    function prevTeamSlide(teamName) {
        teamCarousels[teamName].current = (teamCarousels[teamName].current - 1 + teamCarousels[teamName].total) % teamCarousels[teamName].total;
        updateTeamCarousel(teamName);
    }

    // Auto-play for team carousels (optional)
    Object.keys(teamCarousels).forEach(teamName => {
        if (teamCarousels[teamName].total > 1) {
            setInterval(() => {
                nextTeamSlide(teamName);
            }, 6000); // 6 seconds for team carousels
        }
    });

    console.log('História page loaded successfully! 📚');
});

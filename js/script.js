// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Fix index.html redirect
    if (window.location.pathname.endsWith('index.html')) {
        const cleanUrl = window.location.origin + '/';
        window.history.replaceState({}, document.title, cleanUrl);
        if (window.location.pathname === '/index.html') {
            window.location.replace(cleanUrl);
        }
    }
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenu && mobileNav) {
        mobileMenu.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container') && !event.target.closest('.mobile-nav')) {
                mobileNav.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Logo fallback handling
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            const logoLink = document.querySelector('.logo');
            if (logoLink && !logoLink.querySelector('.logo-text')) {
                logoLink.innerHTML = '<span class="logo-text"><strong>FactorX</strong> Studios</span>';
            }
        });
    }
    
    const footerLogoImg = document.querySelector('.footer-logo-img');
    if (footerLogoImg) {
        footerLogoImg.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }
    
    // Quote Form Handler (Updated number: 0764267368)
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const message = `New Quote Request:%0A%0AName: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone}%0APackage: ${data.package}%0ABudget: ${data.budget}%0AMessage: ${data.message}`;
            window.open(`https://wa.me/2764267368?text=${message}`, '_blank');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "" && href !== "#/" && href !== "#0") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.package-card, .hosting-card, .contact-method, .domain-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // Fix for window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(animateOnScroll, 250);
    });
});

// Package selection for quote form
function selectPackage(packageName, packagePrice) {
    const packageSelect = document.getElementById('package');
    const budgetSelect = document.getElementById('budget');
    
    if (packageSelect) packageSelect.value = packageName;
    if (budgetSelect && packagePrice) {
        const price = parseInt(packagePrice.replace(/[^0-9]/g, ''));
        if (price < 6000) budgetSelect.value = 'R5,000 - R10,000';
        else if (price < 12000) budgetSelect.value = 'R10,000 - R20,000';
        else budgetSelect.value = 'R20,000+';
    }
    
    const formSection = document.querySelector('.form-container');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
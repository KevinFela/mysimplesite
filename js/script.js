// Mobile Menu Toggle and Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    if (mobileMenu && mobileNav) {
        mobileMenu.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavItems = document.querySelectorAll('.mobile-nav-links a');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
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
            logoLink.innerHTML = '<span class="factorx">Factor</span> Studios';
            logoLink.classList.add('logo-text');
        });
    }
    
    const footerLogoImg = document.querySelector('.footer-logo-img');
    if (footerLogoImg) {
        footerLogoImg.addEventListener('error', function() {
            this.style.display = 'none';
            const footerLogo = document.querySelector('.footer-logo');
            footerLogo.innerHTML = '<span class="factorx">Factor</span> Studios';
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.package-card, .hosting-card, .contact-method, .domain-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const icon = mobileMenu.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form handling for quote page
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create WhatsApp message
            const message = `New Quote Request:%0A%0A` +
                           `Name: ${data.name}%0A` +
                           `Email: ${data.email}%0A` +
                           `Phone: ${data.phone}%0A` +
                           `Package: ${data.package}%0A` +
                           `Budget: ${data.budget}%0A` +
                           `Message: ${data.message}`;
            
            // Redirect to WhatsApp
            window.open(`https://wa.me/27780391848?text=${message}`, '_blank');
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-initialize animations on resize
            animateOnScroll();
        }, 250);
    });
});

// Package selection for quote form
function selectPackage(packageName, packagePrice) {
    const packageSelect = document.getElementById('package');
    const budgetSelect = document.getElementById('budget');
    
    if (packageSelect) {
        packageSelect.value = packageName;
    }
    
    if (budgetSelect && packagePrice) {
        // Set budget based on package price
        const price = parseInt(packagePrice.replace(/[^0-9]/g, ''));
        if (price < 6000) {
            budgetSelect.value = 'R5,000 - R10,000';
        } else if (price < 12000) {
            budgetSelect.value = 'R10,000 - R20,000';
        } else {
            budgetSelect.value = 'R20,000+';
        }
    }
    
    // Scroll to form
    const formSection = document.querySelector('.form-container');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
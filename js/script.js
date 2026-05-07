// Mobile Menu Toggle & Main Functionality
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
    
    // Quote Form Handler
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
    
    // ============================================
    // TECH NEWS SECTION - Static content (no API needed)
    // ============================================
    
    // Static tech news that displays immediately
    const techNews = [
        {
            title: "AI Revolution in Web Development",
            description: "Artificial intelligence is transforming how websites are built and optimized, making development faster and more efficient than ever before. FactorX Studios stays ahead with cutting-edge AI integration.",
            source: "Tech Innovation",
            url: "https://techcrunch.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=AI+in+Web+Dev",
            date: "2025"
        },
        {
            title: "Cybersecurity Best Practices for 2025",
            description: "Protect your business with the latest cybersecurity strategies. From SSL certificates to secure hosting, learn how to safeguard your digital assets.",
            source: "Digital Security",
            url: "https://wired.com",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=Cyber+Security",
            date: "2025"
        },
        {
            title: "Cloud Hosting Benefits for Small Business",
            description: "Scalable cloud solutions help businesses grow without infrastructure headaches. Explore affordable hosting options starting from just R100/month.",
            source: "Business Tech",
            url: "https://forbes.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=Cloud+Hosting",
            date: "2025"
        },
        {
            title: "E-Sports: The Future of Competitive Gaming",
            description: "EA FC 26 qualifiers coming soon! FactorX Studios is building South Africa's premier competitive gaming infrastructure.",
            source: "Gaming Insider",
            url: "https://espn.com/esports",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=E-Sports",
            date: "2025"
        },
        {
            title: "Mobile-First Design: Why It Matters",
            description: "Over 60% of web traffic comes from mobile devices. Ensure your website delivers an exceptional experience on every screen size.",
            source: "Web Design Weekly",
            url: "https://smashingmagazine.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=Mobile+Design",
            date: "2025"
        },
        {
            title: "Website Speed Affects SEO Rankings",
            description: "Google prioritizes fast-loading websites. Optimize your site's performance with FactorX Studios' expert development and hosting solutions.",
            source: "SEO Today",
            url: "https://searchenginejournal.com",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=Performance",
            date: "2025"
        }
    ];
    
    function displayTechNews() {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '';
        
        techNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            
            newsCard.innerHTML = `
                <img class="news-image" src="${news.image}" 
                     alt="${escapeHtml(news.title)}" 
                     onerror="this.src='https://placehold.co/600x400/25D366/ffffff?text=Tech+News'">
                <div class="news-content">
                    <h3 class="news-title">
                        <a href="${news.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(news.title)}</a>
                    </h3>
                    <p class="news-description">${escapeHtml(news.description)}</p>
                    <div class="news-meta">
                        <span class="news-source"><i class="fas fa-newspaper"></i> ${escapeHtml(news.source)}</span>
                        <span class="news-date"><i class="far fa-calendar-alt"></i> ${news.date}</span>
                    </div>
                </div>
            `;
            
            newsContainer.appendChild(newsCard);
        });
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Display tech news immediately
    displayTechNews();
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

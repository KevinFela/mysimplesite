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
    // TECH NEWS - WORKING WITH CORS PROXY
    // ============================================
    
    async function loadTechNews() {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        // Show loading state
        newsContainer.innerHTML = `
            <div class="news-loading">
                <i class="fas fa-spinner fa-pulse"></i>
                Loading latest tech news...
            </div>
        `;
        
        const API_KEY = '07c103ff7f89f5ba952ec4ff4b7de976';
        // Use a CORS proxy to bypass CORS restrictions
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&max=6&apikey=${API_KEY}`;
        
        try {
            // Try with CORS proxy first
            const response = await fetch(proxyUrl + apiUrl, {
                headers: {
                    'Origin': window.location.origin,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.articles && data.articles.length > 0) {
                    displayNews(data.articles);
                    return;
                }
            }
            throw new Error('Proxy fetch failed');
            
        } catch (error) {
            console.log('Proxy failed, trying direct fetch:', error);
            
            // Try direct fetch (might work on some browsers)
            try {
                const directResponse = await fetch(apiUrl);
                if (directResponse.ok) {
                    const data = await directResponse.json();
                    if (data.articles && data.articles.length > 0) {
                        displayNews(data.articles);
                        return;
                    }
                }
                throw new Error('Direct fetch failed');
            } catch (directError) {
                console.log('All fetch methods failed:', directError);
                // If all fails, show a message and use fallback
                showApiErrorMessage();
            }
        }
    }
    
    function displayNews(articles) {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '';
        
        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            
            // Format date
            const publishDate = new Date(article.publishedAt);
            const formattedDate = publishDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            // Handle missing images
            let imageUrl = article.image;
            if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
                const color = Math.floor(Math.random() * 16777215).toString(16);
                imageUrl = `https://via.placeholder.com/600x400/${color}/ffffff?text=${encodeURIComponent(article.source.name || 'Tech News')}`;
            }
            
            newsCard.innerHTML = `
                <img class="news-image" src="${imageUrl}" 
                     alt="${escapeHtml(article.title)}" 
                     onerror="this.src='https://via.placeholder.com/600x400/25D366/ffffff?text=News'">
                <div class="news-content">
                    <h3 class="news-title">
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title)}</a>
                    </h3>
                    <p class="news-description">${escapeHtml(article.description || 'Click to read more about this technology news update.')}</p>
                    <div class="news-meta">
                        <span class="news-source"><i class="fas fa-newspaper"></i> ${escapeHtml(article.source.name || 'Tech News')}</span>
                        <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                    </div>
                </div>
            `;
            
            newsContainer.appendChild(newsCard);
        });
    }
    
    function showApiErrorMessage() {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = `
            <div class="news-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load live news due to CORS restrictions.</p>
                <p style="font-size: 0.85rem; margin-top: 10px;">For live news integration, a backend proxy is required.</p>
                <button onclick="location.reload()" class="btn" style="margin-top: 20px;">
                    <i class="fas fa-sync-alt"></i> Try Again
                </button>
            </div>
        `;
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Load tech news
    loadTechNews();
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

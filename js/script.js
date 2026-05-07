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
    
    // ============================================
    // TECH NEWS FUNCTION - Fixed with better error handling and fallback
    // ============================================
    
    // Fallback news data in case API fails
    const fallbackNews = [
        {
            title: "AI Revolution in Web Development",
            description: "Artificial intelligence is transforming how websites are built and optimized, making development faster and more efficient than ever before.",
            source: "TechCrunch",
            url: "https://techcrunch.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=AI+News",
            publishedAt: new Date().toISOString()
        },
        {
            title: "Cybersecurity Trends 2025",
            description: "New cybersecurity threats emerge as businesses accelerate digital transformation. Learn how to protect your digital assets.",
            source: "Wired",
            url: "https://wired.com",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=Cyber+Security",
            publishedAt: new Date().toISOString()
        },
        {
            title: "Cloud Computing Growth",
            description: "Cloud adoption continues to surge as companies seek scalable solutions for their growing digital needs.",
            source: "Forbes",
            url: "https://forbes.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=Cloud+Computing",
            publishedAt: new Date().toISOString()
        },
        {
            title: "E-Sports Industry Boom",
            description: "Competitive gaming reaches new heights with record viewership and prize pools in 2025.",
            source: "ESPN",
            url: "https://espn.com/esports",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=E-Sports",
            publishedAt: new Date().toISOString()
        },
        {
            title: "Mobile First Design",
            description: "Mobile optimization becomes crucial as more users access websites through smartphones and tablets.",
            source: "Smashing Magazine",
            url: "https://smashingmagazine.com",
            image: "https://placehold.co/600x400/25D366/ffffff?text=Mobile+Design",
            publishedAt: new Date().toISOString()
        },
        {
            title: "Web Performance Optimization",
            description: "Site speed and user experience drive SEO rankings and conversion rates in today's competitive market.",
            source: "Search Engine Journal",
            url: "https://searchenginejournal.com",
            image: "https://placehold.co/600x400/128C7E/ffffff?text=Performance",
            publishedAt: new Date().toISOString()
        }
    ];
    
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
        // Try multiple news API endpoints
        const apiUrls = [
            `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&max=6&apikey=${API_KEY}`,
            `https://gnews.io/api/v4/search?q=technology&lang=en&max=6&apikey=${API_KEY}`
        ];
        
        let newsData = null;
        
        // Try each API endpoint
        for (const url of apiUrls) {
            try {
                console.log('Trying to fetch from:', url);
                const response = await fetch(url);
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.articles && data.articles.length > 0) {
                        newsData = data.articles;
                        console.log('Successfully fetched news from API');
                        break;
                    }
                }
            } catch (error) {
                console.log('API fetch failed:', error);
                continue;
            }
        }
        
        // If API returns data, use it; otherwise use fallback
        if (newsData && newsData.length > 0) {
            displayNews(newsData);
        } else {
            console.log('Using fallback news data');
            displayNews(fallbackNews);
            // Show a subtle notice that using fallback data
            const notice = document.createElement('div');
            notice.style.cssText = 'text-align: center; margin-top: 20px; font-size: 0.8rem; color: var(--text-muted);';
            notice.innerHTML = '<i class="fas fa-info-circle"></i> Showing sample tech news. Live updates will appear when available.';
            newsContainer.parentNode.appendChild(notice);
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
            const formattedDate = !isNaN(publishDate.getTime()) ? 
                publishDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }) : 'Latest News';
            
            // Get image URL with fallback
            let imageUrl = article.image;
            if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined' || imageUrl === '') {
                // Generate a consistent color based on title
                const colors = ['25D366', '128C7E', '075E54', '1DA1F2', '4267B2', 'E4405F'];
                const colorIndex = (article.title || '').length % colors.length;
                imageUrl = `https://placehold.co/600x400/${colors[colorIndex]}/ffffff?text=${encodeURIComponent(article.source?.name || 'Tech News')}`;
            }
            
            newsCard.innerHTML = `
                <img class="news-image" src="${imageUrl}" 
                     alt="${escapeHtml(article.title || 'Tech News')}" 
                     onerror="this.src='https://placehold.co/600x400/25D366/ffffff?text=Tech+News'">
                <div class="news-content">
                    <h3 class="news-title">
                        <a href="${article.url || '#'}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title || 'Technology Update')}</a>
                    </h3>
                    <p class="news-description">${escapeHtml(article.description || article.content || 'Click to read more about this technology news update.')}</p>
                    <div class="news-meta">
                        <span class="news-source"><i class="fas fa-newspaper"></i> ${escapeHtml(article.source?.name || 'Tech News')}</span>
                        <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                    </div>
                </div>
            `;
            
            newsContainer.appendChild(newsCard);
        });
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text.substring(0, 200); // Limit text length
        return div.innerHTML;
    }
    
    // Load tech news when page loads
    loadTechNews();
});

// Package selection for quote form (kept outside DOMContentLoaded for global access)
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

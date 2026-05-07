document.addEventListener('DOMContentLoaded', function() {

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

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(animateOnScroll, 250);
    });
    
    async function loadTechNews() {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        newsContainer.innerHTML = `
            <div class="news-loading">
                <i class="fas fa-spinner fa-pulse"></i>
                Loading latest tech news...
            </div>
        `;
        
        const API_KEY = '07c103ff7f89f5ba952ec4ff4b7de976';
        const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&max=6&apikey=${API_KEY}`;
        
        try {
            console.log('Fetching news from API...');
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);
       
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                throw new Error('No articles found in response');
            }
        } catch (error) {
            console.error('Error fetching tech news:', error);
            showErrorMessage();
        }
    }
    
    function displayNews(articles) {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '';
        
        articles.forEach(article => {
            // Format date
            let formattedDate = 'Latest News';
            if (article.publishedAt) {
                try {
                    const publishDate = new Date(article.publishedAt);
                    if (!isNaN(publishDate.getTime())) {
                        formattedDate = publishDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                    }
                } catch(e) {
                    console.log('Date parsing error:', e);
                }
            }

            let imageUrl = article.image;
            if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined' || imageUrl === '') {
                const colors = ['25D366', '128C7E', '075E54', '1DA1F2', '4267B2', 'E4405F'];
                const colorIndex = (article.source?.name || article.title || '').length % colors.length;
                imageUrl = `https://placehold.co/600x400/${colors[colorIndex]}/ffffff?text=${encodeURIComponent(article.source?.name || 'Tech News')}`;
            }
  
            const title = article.title || 'Technology News Update';
            const description = article.description || article.content || 'Click to read more about this technology news update.';
            const sourceName = article.source?.name || 'Tech News';
            const articleUrl = article.url || '#';
            
            // Create the news card with entire card clickable
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card-wrapper';
            
            newsCard.innerHTML = `
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="news-card-link">
                    <div class="news-card">
                        <img class="news-image" src="${imageUrl}" 
                             alt="${escapeHtml(title)}" 
                             onerror="this.src='https://placehold.co/600x400/25D366/ffffff?text=News'">
                        <div class="news-content">
                            <h3 class="news-title">${escapeHtml(title)}</h3>
                            <p class="news-description">${escapeHtml(description.substring(0, 150))}${description.length > 150 ? '...' : ''}</p>
                            <div class="news-meta">
                                <span class="news-source"><i class="fas fa-newspaper"></i> ${escapeHtml(sourceName)}</span>
                                <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            
            newsContainer.appendChild(newsCard);
        });
    }
    
    function showErrorMessage() {
        const newsContainer = document.getElementById('newsContainer');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = `
            <div class="news-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load live news at the moment.</p>
                <p style="font-size: 0.85rem; margin-top: 10px;">Please check your internet connection or try again later.</p>
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
    
    loadTechNews();
});


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

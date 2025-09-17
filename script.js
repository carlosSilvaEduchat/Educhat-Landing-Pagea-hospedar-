// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 60;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.mvv-card, .equipe-card, .diferencial-card, .testimonial-card, .produto-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Carrossel Nossa Identidade
    const identidadeScroll = document.getElementById('identidadeScroll');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('identidadeIndicators');
    
    if (identidadeScroll && prevBtn && nextBtn && indicatorsContainer) {
        class Carousel {
            constructor() {
                this.track = identidadeScroll;
                this.prevBtn = prevBtn;
                this.nextBtn = nextBtn;
                this.indicatorsContainer = indicatorsContainer;
                this.currentIndex = 0;
                this.totalCards = 7;
                this.cardsPerView = 3;
                this.maxIndex = this.totalCards - this.cardsPerView;
                this.autoPlayInterval = null;
                this.init();
            }
            init() {
                this.createIndicators();
                this.updateButtons();
                this.updateIndicators();
                this.bindEvents();
            }
            createIndicators() {
                for (let i = 0; i <= this.maxIndex; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'identidade-indicator';
                    indicator.addEventListener('click', () => this.goToSlide(i));
                    this.indicatorsContainer.appendChild(indicator);
                }
            }
            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
                this.track.addEventListener('mouseleave', () => this.startAutoPlay());
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    else if (e.key === 'ArrowRight') this.nextSlide();
                });
                window.addEventListener('resize', equalizeIdentityCardBodies);
            }
            goToSlide(index) {
                if (index < 0) index = this.maxIndex; // If before first, go to last
                if (index > this.maxIndex) index = 0; // If after last, go to first
                
                this.currentIndex = index;
                this.updateTrack();
                this.updateButtons();
                this.updateIndicators();
                // Equalizar após mover
                equalizeIdentityCardBodies();
            }
            prevSlide() {
                if (this.currentIndex > 0) {
                    this.goToSlide(this.currentIndex - 1);
                } else {
                    this.goToSlide(this.maxIndex); // Loop to last slide
                }
            }
            nextSlide() {
                if (this.currentIndex < this.maxIndex) {
                    this.goToSlide(this.currentIndex + 1);
                } else {
                    this.goToSlide(0); // Loop back to first slide
                }
            }
            updateTrack() {
                const cardWidth = 100 / this.cardsPerView;
                const translateX = -(this.currentIndex * cardWidth);
                this.track.style.transform = `translateX(${translateX}%)`;
            }
            updateButtons() {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex === this.maxIndex;
            }
            updateIndicators() {
                const indicators = this.indicatorsContainer.querySelectorAll('.identidade-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }
            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }
            pauseAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                }
            }
        }
        const carousel = new Carousel();
        carousel.startAutoPlay();

        // Equalização inicial após a montagem
        requestAnimationFrame(equalizeIdentityCardBodies);
    }

    // --- MENU HAMBÚRGUER ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (menuToggle && navMenu && menuOverlay) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
            menuOverlay.classList.toggle("show");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                menuOverlay.classList.remove("show");
            });
        });

        menuOverlay.addEventListener("click", () => {
            navMenu.classList.remove("show");
            menuOverlay.classList.remove("show");
        });
    }

    // --- MODO ESCURO ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(savedTheme === 'dark' ? 'fa-sun' : 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(newTheme === 'dark' ? 'fa-sun' : 'fa-moon');
            // Recalcular depois de trocar o tema
            equalizeIdentityCardBodies();
        });
    }

    // --- Função: equalizar altura do corpo dos cards de identidade ---
    function equalizeIdentityCardBodies() {
        const bodies = document.querySelectorAll('.identidade-card .identidade-bottom');
        if (!bodies.length) return;
        // Reset heights para medir corretamente
        bodies.forEach(b => b.style.height = 'auto');
        // Medir maior
        let max = 0;
        bodies.forEach(b => { max = Math.max(max, b.clientHeight); });
        // Aplicar
        bodies.forEach(b => b.style.height = max + 'px');
    }
});

/*
// --- MODO ESCURO COMENTADO ---
// Função para alternar o tema
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        document.querySelector('#themeToggle i').classList.remove('fa-sun');
        document.querySelector('#themeToggle i').classList.add('fa-moon');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.querySelector('#themeToggle i').classList.remove('fa-moon');
        document.querySelector('#themeToggle i').classList.add('fa-sun');
    }
}

// Verificar tema salvo
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
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
    });
});
*/

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
            }
            goToSlide(index) {
                if (index < 0 || index > this.maxIndex) return;
                this.currentIndex = index;
                this.updateTrack();
                this.updateButtons();
                this.updateIndicators();
            }
            prevSlide() {
                if (this.currentIndex > 0) {
                    this.goToSlide(this.currentIndex - 1);
                } else {
                    this.goToSlide(this.maxIndex);
                }
            }
            nextSlide() {
                if (this.currentIndex < this.maxIndex) {
                    this.goToSlide(this.currentIndex + 1);
                } else {
                    this.goToSlide(0);
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
    }

    // --- MENU HAMBÚRGUER ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
            });
        });
    }
});

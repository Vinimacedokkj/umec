// ===== FUNCIONALIDADES DO SITE UMEC =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animação do menu hambúrguer
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (nav.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--cor-clara)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMAÇÃO DE ELEMENTOS NO SCROLL =====
    // const observerOptions = {
    //     threshold: 0.1,
    //     rootMargin: '0px 0px -50px 0px'
    // };
    
    // const observer = new IntersectionObserver(function(entries) {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.style.opacity = '1';
    //             entry.target.style.transform = 'translateY(0)';
    //         }
    //     });
    // }, observerOptions);
    
    // Observar elementos para animação
    // const animateElements = document.querySelectorAll('.apoio-card, .impacto-item, .projeto-item, .galeria-item, .parceiro-item');
    
    // animateElements.forEach(el => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(30px)';
    //     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    //     observer.observe(el);
    // });
    
    // ===== FUNCIONALIDADE DE COPIAR PIX =====
    window.copyPix = function() {
        const pixKey = '11917168416';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(pixKey).then(function() {
                showNotification('Chave PIX copiada com sucesso!', 'success');
            }).catch(function() {
                showNotification('Erro ao copiar. Tente novamente.', 'error');
            });
        } else {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = pixKey;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showNotification('Chave PIX copiada com sucesso!', 'success');
            } catch (err) {
                showNotification('Erro ao copiar. Tente novamente.', 'error');
            }
            document.body.removeChild(textArea);
        }
    };
    
    // ===== NOTIFICAÇÕES =====
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ===== CONTADOR ANIMADO PARA IMPACTO =====
    function animateCounters() {
        const counters = document.querySelectorAll('.impacto-item h4');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const number = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/\d/g, '');
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, 30);
            }
        });
    }
    
    // Observar seção de impacto para animar contadores
    const impactoSection = document.querySelector('#nosso-impacto');
    if (impactoSection) {
        const impactoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    impactoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        impactoObserver.observe(impactoSection);
    }
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--cor-principal);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(162, 139, 66, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Funcionalidade do botão
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--cor-secundaria)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--cor-principal)';
        this.style.transform = 'scale(1)';
    });
    
    // ===== FORMULÁRIO DE CONTATO (se existir) =====
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
            this.reset();
        });
    }
    
    // ===== PRELOADER (opcional) =====
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // ===== VALIDAÇÃO DE FORMULÁRIOS =====
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = 'var(--cor-principal)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--cor-principal)';
        });
    });
    
    console.log('Site UMEC carregado com sucesso! 🚀');
});

// MOSTRAR IMAGENS NA GALERIA DE FOTOS
function mostrarMaisImagensMocambique() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#mocambique .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-mocambique');
    botao.style.display = 'none'; // Oculta o botão após clicar
}

function mostrarMaisImagensApoioAfrica() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#apoio-continente-africano .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-apoio-africa');
    botao.style.display = 'none'; // Oculta o botão após clicar
}

function mostrarMaisImagensColatam() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#encontro-colatam .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-colatam');
    botao.style.display = 'none'; // Oculta o botão após clicar
}
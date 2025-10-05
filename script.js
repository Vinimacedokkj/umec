document.addEventListener('DOMContentLoaded',function(){const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(menuToggle&&nav){menuToggle.addEventListener('click',function(){nav.classList.toggle('active');const spans=menuToggle.querySelectorAll('span');spans.forEach((span,index)=>{if(nav.classList.contains('active')){if(index===0)span.style.transform='rotate(45deg) translate(5px, 5px)';if(index===1)span.style.opacity='0';if(index===2)span.style.transform='rotate(-45deg) translate(7px, -6px)'}else{span.style.transform='none';span.style.opacity='1'}})})}
const internalLinks=document.querySelectorAll('a[href^="#"]');internalLinks.forEach(link=>{link.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('href');const targetSection=document.querySelector(targetId);if(targetSection){const headerHeight=document.querySelector('.header').offsetHeight;const targetPosition=targetSection.offsetTop-headerHeight;window.scrollTo({top:targetPosition,behavior:'smooth'});if(nav&&nav.classList.contains('active')){nav.classList.remove('active');const spans=menuToggle.querySelectorAll('span');spans.forEach(span=>{span.style.transform='none';span.style.opacity='1'})}}})});const header=document.querySelector('.header');let lastScrollTop=0;window.addEventListener('scroll',function(){const scrollTop=window.pageYOffset||document.documentElement.scrollTop;if(scrollTop>100){header.style.backgroundColor='rgba(255, 255, 255, 0.95)';header.style.backdropFilter='blur(10px)'}else{header.style.backgroundColor='var(--cor-clara)';header.style.backdropFilter='none'}
lastScrollTop=scrollTop});window.copyPix=function(){const pixKey='11917168416';if(navigator.clipboard){navigator.clipboard.writeText(pixKey).then(function(){showNotification('Chave PIX copiada com sucesso!','success')}).catch(function(){showNotification('Erro ao copiar. Tente novamente.','error')})}else{const textArea=document.createElement('textarea');textArea.value=pixKey;document.body.appendChild(textArea);textArea.select();try{document.execCommand('copy');showNotification('Chave PIX copiada com sucesso!','success')}catch(err){showNotification('Erro ao copiar. Tente novamente.','error')}
document.body.removeChild(textArea)}};function showNotification(message,type){const notification=document.createElement('div');notification.className=`notification notification-${type}`;notification.textContent=message;notification.style.cssText=`
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
        `;document.body.appendChild(notification);setTimeout(()=>{notification.style.transform='translateX(0)'},100);setTimeout(()=>{notification.style.transform='translateX(100%)';setTimeout(()=>{if(notification.parentNode){notification.parentNode.removeChild(notification)}},300)},3000)}
function animateCounters(){const counters=document.querySelectorAll('.impacto-item h4');counters.forEach(counter=>{const target=counter.textContent;const number=parseInt(target.replace(/\D/g,''));const suffix=target.replace(/\d/g,'');if(!isNaN(number)){let current=0;const increment=number/50;const timer=setInterval(()=>{current+=increment;if(current>=number){current=number;clearInterval(timer)}
counter.textContent=Math.floor(current)+suffix},30)}})}
const impactoSection=document.querySelector('#nosso-impacto');if(impactoSection){const impactoObserver=new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){animateCounters();impactoObserver.unobserve(entry.target)}})},{threshold:0.5});impactoObserver.observe(impactoSection)}
const scrollTopBtn=document.createElement('button');scrollTopBtn.innerHTML='<i class="fas fa-arrow-up"></i>';scrollTopBtn.className='scroll-top-btn';scrollTopBtn.style.cssText=`
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
    
    // ===== FORMULÁRIO DE CADASTRO DE EMPRESA INVESTIDORA =====
    const formElement = document.querySelector('form[name="contact"].formulario-container');
    const contactForm = document.querySelector('.formulario-contato');
    const modalPagamento = document.getElementById('modal-pagamento');
    const paginaConfirmacao = document.getElementById('pagina-confirmacao');
    
    if (formElement && contactForm) {
        // Validação em tempo real
        const inputs = formElement.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone-representante');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                    if (value.length < 14) {
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                    }
                }
                e.target.value = value;
            });
        }
        
        // Máscara para CNPJ
        const cnpjInput = document.getElementById('cnpj');
        if (cnpjInput) {
            cnpjInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                if (value.length > 18) value = value.substring(0, 18);
                e.target.value = value;
            });
        }
        
        // Máscara para CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                if (value.length > 9) value = value.substring(0, 9);
                e.target.value = value;
            });
        }
        
        // Validação do formulário (no elemento <form>)
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = formElement.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Preencher dados no modal
                preencherModalPagamento();
                // Mostrar modal de pagamento
                modalPagamento.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
            }
        });
        
        // Função de validação de campo
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            
            // Remover classes anteriores
            field.classList.remove('error', 'success');
            
            // Validação de campos obrigatórios
            if (field.hasAttribute('required') && !value) {
                isValid = false;
            }
            
            // Validações específicas
            if (value && field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                }
            }
            
            if (value && field.id === 'telefone-representante') {
                const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                }
            }
            
            if (value && field.id === 'cnpj') {
                if (!isValidCNPJ(value)) {
                    isValid = false;
                }
            }
            
            if (value && field.id === 'cep') {
                const cepRegex = /^\d{5}-\d{3}$/;
                if (!cepRegex.test(value)) {
                    isValid = false;
                }
            }
            
            // Aplicar classes de validação
            if (isValid) {
                field.classList.add('success');
            } else {
                field.classList.add('error');
            }
            
            return isValid;
        }
        
        // Validação de CNPJ
        function isValidCNPJ(cnpj) {
            cnpj = cnpj.replace(/\D/g, '');
            if (cnpj.length !== 14) return false;
            
            // Verificar se todos os dígitos são iguais
            if (/^(\d)\1{13}$/.test(cnpj)) return false;
            
            // Validar primeiro dígito verificador
            let sum = 0;
            let weight = 2;
            for (let i = 11; i >= 0; i--) {
                sum += parseInt(cnpj.charAt(i)) * weight;
                weight = weight === 9 ? 2 : weight + 1;
            }
            let remainder = sum % 11;
            let digit1 = remainder < 2 ? 0 : 11 - remainder;
            if (digit1 !== parseInt(cnpj.charAt(12))) return false;
            
            // Validar segundo dígito verificador
            sum = 0;
            weight = 2;
            for (let i = 12; i >= 0; i--) {
                sum += parseInt(cnpj.charAt(i)) * weight;
                weight = weight === 9 ? 2 : weight + 1;
            }
            remainder = sum % 11;
            let digit2 = remainder < 2 ? 0 : 11 - remainder;
            if (digit2 !== parseInt(cnpj.charAt(13))) return false;
            
            return true;
        }
        
        // Preencher modal de pagamento
        function preencherModalPagamento() {
            const razaoSocial = document.getElementById('razao-social').value;
            const cnpj = document.getElementById('cnpj').value;
            
            document.getElementById('modal-razao-social').textContent = razaoSocial;
            document.getElementById('modal-cnpj').textContent = cnpj;
        }
    }
    
    // ===== SISTEMA DE PAGAMENTO =====
    
    // Fechar modal
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modalPagamento.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Fechar modal clicando fora
    if (modalPagamento) {
        modalPagamento.addEventListener('click', function(e) {
            if (e.target === modalPagamento) {
                modalPagamento.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Botões de pagamento
    const btnPix = document.getElementById('btn-pix');
    const btnCartao = document.getElementById('btn-cartao');
    const areaPix = document.getElementById('area-pix');
    const areaCartao = document.getElementById('area-cartao');
    
    const paymentMethodInput = document.getElementById('payment-method');
    if (btnPix && btnCartao) {
        btnPix.addEventListener('click', function() {
            btnPix.classList.add('active');
            btnCartao.classList.remove('active');
            areaPix.style.display = 'block';
            areaCartao.style.display = 'none';
            if (paymentMethodInput) paymentMethodInput.value = 'pix';
            
            // Gerar QR Code
            gerarQRCode();
        });
        
        btnCartao.addEventListener('click', function() {
            btnCartao.classList.add('active');
            btnPix.classList.remove('active');
            areaCartao.style.display = 'block';
            areaPix.style.display = 'none';
            if (paymentMethodInput) paymentMethodInput.value = 'cartao';
        });
    }
    
    // Gerar QR Code para PIX
    function gerarQRCode() {
        const qrCodeDiv = document.getElementById('qrcode');
        if (qrCodeDiv && !qrCodeDiv.hasChildNodes()) {
            // Usar imagem personalizada do QR Code
            const qrCodeHTML = `
                <div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 10px; margin: 0 auto;">
                    <img src="assets/img/qrcode-pix-umec2.jpg" alt="QR Code PIX" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">
                </div>
            `;
            
            qrCodeDiv.innerHTML = qrCodeHTML;
            
            // Iniciar timer de 10 minutos
            iniciarTimerPix();
        }
    }
    
    // Timer de 10 minutos para PIX
    function iniciarTimerPix() {
        let tempoRestante = 600; // 10 minutos em segundos
        const timerElement = document.getElementById('timer-pix');
        
        if (timerElement) {
            const timerInterval = setInterval(() => {
                const minutos = Math.floor(tempoRestante / 60);
                const segundos = tempoRestante % 60;
                
                timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                
                if (tempoRestante <= 0) {
                    clearInterval(timerInterval);
                    timerElement.textContent = 'Tempo esgotado';
                    timerElement.style.color = '#e74c3c';
                }
                
                tempoRestante--;
            }, 1000);
        }
    }
    
    // Função para copiar chave PIX
    window.copiarChavePix = function() {
        const pixKey = '42.282.532/0001-09';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(pixKey).then(function() {
                showNotification('Chave PIX copiada com sucesso!', 'success');
            }).catch(function() {
                showNotification('Erro ao copiar. Tente novamente.', 'error');
            });
        } else {
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
    
    // Simular confirmação de pagamento
    function confirmarPagamento() {
        // Fechar modal de pagamento
        modalPagamento.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Preencher dados na página de confirmação
        const razaoSocial = document.getElementById('razao-social').value;
        const cnpj = document.getElementById('cnpj').value;
        
        document.getElementById('conf-razao-social').textContent = razaoSocial;
        document.getElementById('conf-cnpj').textContent = cnpj;
        
        // Mostrar página de confirmação
        paginaConfirmacao.style.display = 'flex';
        
        // Simular envio para Netlify
        setTimeout(() => {
            // Aqui você pode adicionar o envio real para o Netlify
            console.log('Dados enviados para Netlify:', {
                razaoSocial: razaoSocial,
                cnpj: cnpj,
                // ... outros campos
            });
        }, 1000);
    }
    
    // Utilitário para codificar dados como x-www-form-urlencoded
    function encode(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    // Enviar dados para Netlify
    function enviarParaNetlify() {
        if (!formElement) return Promise.resolve();
        const elements = Array.from(formElement.elements);

        // Construir objeto com todos os campos do formulário
        const data = { 'form-name': 'contact' };
        elements.forEach(el => {
            if (!el.name) return;
            if (el.type === 'checkbox') {
                // Capturar estado de checkboxes explicitamente
                data[el.name] = el.checked ? 'true' : 'false';
            } else if (el.type === 'radio') {
                if (el.checked) data[el.name] = el.value;
            } else if (el.tagName === 'SELECT') {
                data[el.name] = el.value;
            } else {
                data[el.name] = el.value;
            }
        });

        return fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode(data)
        });
    }

    // Função para confirmar pagamento PIX
    window.confirmarPagamentoPix = function() {
        if (paymentMethodInput) paymentMethodInput.value = 'pix';
        enviarParaNetlify()
            .then(() => {
                // Fechar modal e mostrar confirmação
                modalPagamento.classList.remove('active');
                document.body.style.overflow = 'auto';
                const razaoSocial = document.getElementById('razao-social').value;
                const cnpj = document.getElementById('cnpj').value;
                document.getElementById('conf-razao-social').textContent = razaoSocial;
                document.getElementById('conf-cnpj').textContent = cnpj;
                paginaConfirmacao.style.display = 'flex';
            })
            .catch(() => {
                showNotification('Não foi possível enviar seus dados. Tente novamente.', 'error');
            });
    }
    
    // Função para voltar ao formulário
    window.voltarFormulario = function() {
        paginaConfirmacao.style.display = 'none';
        if (formElement) formElement.reset();
        
        // Limpar classes de validação
        const inputs = formElement ? formElement.querySelectorAll('input, select, textarea') : [];
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
    };
    
    // Botão de confirmação PIX já está no HTML
    
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
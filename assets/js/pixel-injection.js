/**
 * Meta Pixel - Script de injeção de eventos automáticos
 * Este script injeta automaticamente os eventos de pixel em pontos-chave da aplicação
 * sem necessidade de modificar o código existente
 */

document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o Pixel base está carregado
  if (typeof window.pixelTracker === 'undefined') {
    console.error('Pixel Base não carregado. Certifique-se de carregar pixel-base.js primeiro.');
    loadPixelBaseScript();
    return;
  }

  // Injetar eventos automáticos com base na página atual
  setupAutoEvents();
});

/**
 * Carrega o script base do pixel caso não tenha sido carregado
 */
function loadPixelBaseScript() {
  const pixelBase = document.createElement('script');
  pixelBase.src = '/assets/js/pixel-base.js';
  pixelBase.onload = function() {
    console.log('Pixel Base carregado dinamicamente.');
    window.pixelTracker.init();
    setupAutoEvents();
  };
  document.head.appendChild(pixelBase);
}

/**
 * Configura eventos automáticos baseado na página atual
 */
function setupAutoEvents() {
  // Identificar qual página estamos
  const currentPath = window.location.pathname;
  
  // ----------------------
  // FORMULÁRIOS DE REGISTRO - Eventos de Lead
  // ----------------------
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    // Adiciona evento para formulários que parecem de cadastro
    if (hasRegistrationFields(form) || isRegistrationPage()) {
      form.addEventListener('submit', function(e) {
        // Enviar evento Lead
        if (typeof window.pixelTracker !== 'undefined') {
          window.pixelTracker.trackLead('form_submission');
          console.log('[Auto] Lead event enviado');
        }
      });
    }
  });
  
  // ----------------------
  // BOTÕES DE COMPLETAR PERFIL - Evento de CompleteRegistration
  // ----------------------
  if (currentPath.includes('editar-perfil') || currentPath.includes('perfil')) {
    const saveButtons = document.querySelectorAll('button[type="submit"], button.salvar, button.continuar');
    
    saveButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        if (typeof window.pixelTracker !== 'undefined') {
          window.pixelTracker.trackCompleteRegistration();
          console.log('[Auto] CompleteRegistration event enviado');
        }
      });
    });
    
    // Upload de fotos
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(function(input) {
      input.addEventListener('change', function(e) {
        if (e.target.files && e.target.files.length > 0) {
          if (typeof window.pixelTracker !== 'undefined') {
            window.pixelTracker.trackCompleteRegistration('foto_upload');
            console.log('[Auto] CompleteRegistration (foto) event enviado');
          }
        }
      });
    });
  }
  
  // ----------------------
  // CHAT - Eventos de visualização de conteúdo
  // ----------------------
  if (currentPath.includes('chat')) {
    // ViewContent ao carregar a página
    if (typeof window.pixelTracker !== 'undefined') {
      window.pixelTracker.trackViewContent();
      console.log('[Auto] ViewContent event enviado');
    }
    
    // InitiateCheckout no resgate de presente
    const presenteButton = document.getElementById('botaoPresente') || 
                           document.querySelector('.presente') ||
                           document.querySelector('button:contains("Presente")');
    
    if (presenteButton) {
      presenteButton.addEventListener('click', function() {
        if (typeof window.pixelTracker !== 'undefined') {
          window.pixelTracker.trackInitiateCheckout();
          console.log('[Auto] InitiateCheckout event enviado');
        }
      });
    }
    
    // Subscribe ao abrir popup premium
    const popupPremium = document.getElementById('popupPremiumImagem');
    if (popupPremium) {
      // Observer para detectar quando o popup é exibido
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'style' && 
              popupPremium.style.display === 'flex' ||
              popupPremium.style.display === 'block') {
            if (typeof window.pixelTracker !== 'undefined') {
              window.pixelTracker.trackSubscribe();
              console.log('[Auto] Subscribe event enviado');
              observer.disconnect();
            }
          }
        });
      });
      
      // Iniciar observação do popup
      observer.observe(popupPremium, { attributes: true });
    }
  }
  
  // ----------------------
  // PAGAMENTO APROVADO - Evento de compra
  // ----------------------
  if (currentPath.includes('pagamento-aprovado') || 
      currentPath.includes('confirmacao') ||
      document.title.toLowerCase().includes('pagamento') && document.title.toLowerCase().includes('aprovado')) {
    
    if (typeof window.pixelTracker !== 'undefined') {
      // Gerar transaction_id único
      const txnId = 'TXN_' + Date.now();
      window.pixelTracker.trackPurchase('vip', 14.90, txnId);
      console.log('[Auto] Purchase event enviado');
    }
  }
}

/**
 * Verifica se o formulário parece ser de registro/cadastro
 * @param {HTMLFormElement} form - O formulário a ser verificado
 * @returns {boolean}
 */
function hasRegistrationFields(form) {
  // Procurar por campos comuns em formulários de registro
  const inputNames = ['nome', 'email', 'telefone', 'celular', 'password', 'senha'];
  const inputs = form.querySelectorAll('input');
  
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (inputNames.some(name => 
        (input.name && input.name.toLowerCase().includes(name)) || 
        (input.id && input.id.toLowerCase().includes(name)) ||
        (input.placeholder && input.placeholder.toLowerCase().includes(name)))) {
      return true;
    }
  }
  
  return false;
}

/**
 * Verifica se a página atual parece ser de registro
 * @returns {boolean}
 */
function isRegistrationPage() {
  const currentPath = window.location.pathname.toLowerCase();
  const pageTitle = document.title.toLowerCase();
  
  return currentPath.includes('registro') || 
         currentPath.includes('cadastro') ||
         currentPath.includes('sign-up') ||
         currentPath.includes('signup') ||
         pageTitle.includes('registro') ||
         pageTitle.includes('cadastro');
}

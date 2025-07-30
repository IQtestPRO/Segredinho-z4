/**
 * Meta Pixel - Eventos específicos para páginas do Segredinho VIP
 * Este arquivo implementa eventos específicos para cada página do fluxo
 */

document.addEventListener('DOMContentLoaded', function() {
  // Garante que o pixel base está carregado
  if (typeof window.pixelTracker === 'undefined') {
    console.error('Pixel Base não encontrado. Certifique-se de carregar pixel-base.js primeiro.');
    return;
  }
  
  // ----------------------
  // Evento padrão PageView
  // ----------------------
  window.pixelTracker.trackPageView();
  
  // ---------------------------------
  // Eventos Específicos por Página
  // ---------------------------------
  const currentPath = window.location.pathname;
  
  // Página de Cadastro (registro.html)
  if (currentPath.includes('registro.html')) {
    setupRegistroEvents();
  }
  
  // Página de Editar Perfil (editar-perfil.html)
  if (currentPath.includes('editar-perfil.html')) {
    setupEditarPerfilEvents();
  }
  
  // Página de Inicial com perfis (inicial.html)
  if (currentPath.includes('inicial.html')) {
    setupInicialEvents();
  }
  
  // Página de Chat/Match (chat/index.html)
  if (currentPath.includes('chat/') || currentPath.includes('chat/index.html')) {
    setupChatEvents();
  }
  
  // Página de Pagamento Aprovado (pagamento-aprovado.html)
  if (currentPath.includes('pagamento-aprovado.html')) {
    setupPagamentoAprovadoEvents();
  }
});

// --------------------
// PÁGINA DE CADASTRO
// --------------------
function setupRegistroEvents() {
  // Monitorar envio do formulário de cadastro
  const formCadastro = document.getElementById('formCadastro') || 
                      document.querySelector('form');
  
  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      // Evento de Lead
      window.pixelTracker.trackLead('site_form');
      
      // Não interrompe o envio do formulário
      console.log('[Pixel] Lead event enviado');
    });
  }
}

// --------------------
// PÁGINA DE EDITAR PERFIL
// --------------------
function setupEditarPerfilEvents() {
  // Monitorar conclusão do perfil
  const botaoSalvar = document.querySelector('button[type="submit"]') || 
                     document.querySelector('button:contains("Salvar")') ||
                     document.querySelector('button:contains("Continuar")');
  
  if (botaoSalvar) {
    botaoSalvar.addEventListener('click', function(event) {
      // Evento CompleteRegistration
      window.pixelTracker.trackCompleteRegistration('perfil_completo');
      console.log('[Pixel] CompleteRegistration event enviado');
    });
  }
}

// --------------------
// PÁGINA INICIAL
// --------------------
function setupInicialEvents() {
  // Monitorar likes e match
  const botoesLike = document.querySelectorAll('.botao-like, .like, button:contains("Like")');
  
  if (botoesLike.length > 0) {
    botoesLike.forEach(function(botao) {
      botao.addEventListener('click', function(event) {
        // Dado que estamos na fase de likes, já podemos considerar conteúdo visualizado
        window.pixelTracker.trackViewContent('Perfil Visualizado', 'profile');
        console.log('[Pixel] ViewContent (perfil) event enviado');
      });
    });
  }
}

// --------------------
// PÁGINA DE CHAT/MATCH
// --------------------
function setupChatEvents() {
  // Monitorar visualização da página de chat (áudio recebido)
  window.pixelTracker.trackViewContent('Match Chat', 'audio_message');
  console.log('[Pixel] ViewContent (chat) event enviado');
  
  // Verificar se é segundo match
  const isSecondMatch = localStorage.getItem('isSecondMatch') === 'true';
  
  // Monitorar presente liberado
  window.addEventListener('presente-liberado', function() {
    window.pixelTracker.trackInitiateCheckout();
    console.log('[Pixel] InitiateCheckout event enviado');
  });
  
  // Se for segundo match, disparar evento de assinatura
  if (isSecondMatch) {
    // PopUp de assinatura
    const popupPremium = document.getElementById('popupPremiumImagem');
    
    if (popupPremium) {
      // Ao aparecer o popup de premium
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'style' && 
              popupPremium.style.display === 'flex') {
            window.pixelTracker.trackSubscribe('vip', 14.90);
            console.log('[Pixel] Subscribe event enviado');
            // Desconecta o observer para não disparar múltiplas vezes
            observer.disconnect();
          }
        });
      });
      
      // Observar mudanças no display do popup
      observer.observe(popupPremium, { attributes: true });
    }
    
    // Botão de assinatura premium
    const botaoAssinatura = document.querySelector('button:contains("DESBLOQUEAR PREMIUM")');
    
    if (botaoAssinatura) {
      botaoAssinatura.addEventListener('click', function() {
        window.pixelTracker.trackSubscribe('vip', 14.90);
        console.log('[Pixel] Subscribe event enviado');
      });
    }
  }
  
  // Adicionar um listener para eventos customizados de presente resgatado
  document.addEventListener('presente-resgatado', function(e) {
    window.pixelTracker.trackInitiateCheckout();
    console.log('[Pixel] InitiateCheckout event enviado via evento customizado');
  });
  
  // Monitorar click no botão de presente
  const botaoPresente = document.getElementById('botaoPresente');
  if (botaoPresente) {
    botaoPresente.addEventListener('click', function() {
      window.pixelTracker.trackInitiateCheckout();
      console.log('[Pixel] InitiateCheckout event enviado via click');
    });
  }
  
  // Função para o resgate de presente (hook para função existente)
  const originalResgatarPresente = window.resgatarPresente;
  if (typeof originalResgatarPresente === 'function') {
    window.resgatarPresente = function() {
      originalResgatarPresente.apply(this, arguments);
      window.pixelTracker.trackInitiateCheckout();
      console.log('[Pixel] InitiateCheckout event enviado via hook');
    };
  }
}

// --------------------
// PÁGINA DE PAGAMENTO APROVADO
// --------------------
function setupPagamentoAprovadoEvents() {
  // Gerar um transaction ID único se não existir
  let transactionId = localStorage.getItem('last_transaction_id');
  if (!transactionId) {
    transactionId = 'TXN_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    localStorage.setItem('last_transaction_id', transactionId);
  }
  
  // Evento de Purchase
  window.pixelTracker.trackPurchase('vip', 14.90, transactionId);
  console.log('[Pixel] Purchase event enviado com transactionId: ' + transactionId);
}

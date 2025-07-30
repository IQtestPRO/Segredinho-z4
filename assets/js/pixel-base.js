/**
 * Meta Pixel Base Code - Segredinho VIP
 * Pixel ID: 1453046616041191
 * API Access Token: EAAJ308fI85oBPOeeXfC7DoGxkGZBlA6tXnJh73hjqhQq5Ijaxad6fAjxZA4Vsauy2sKvTATOJnS5wkDHfQoD9diSkt32kZAKaYW1A2lBCZBLl33ybTrzEJifqid32ozXjTVU8YZB6B5ZBKJ489u2iRYhXPOYSiIHZCZBBDWMovlVzXtNfOgRQGaq6UG8xYPuaL7yewZDZD
 */

// Variáveis de configuração do Pixel
const PIXEL_ID = '1453046616041191';
const API_ACCESS_TOKEN = 'EAAJ308fI85oBPOeeXfC7DoGxkGZBlA6tXnJh73hjqhQq5Ijaxad6fAjxZA4Vsauy2sKvTATOJnS5wkDHfQoD9diSkt32kZAKaYW1A2lBCZBLl33ybTrzEJifqid32ozXjTVU8YZB6B5ZBKJ489u2iRYhXPOYSiIHZCZBBDWMovlVzXtNfOgRQGaq6UG8xYPuaL7yewZDZD';
const PIXEL_VERSION = '2.0';
const APP_NAME = 'Segredinho VIP';

/**
 * Inicializa o Meta Pixel na página
 * Esta função deve ser chamada no head de cada página
 */
function initMetaPixel() {
  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;
    n.loaded=!0;
    n.version=PIXEL_VERSION;
    n.queue=[];
    t=b.createElement(e);
    t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', PIXEL_ID);
}

/**
 * Gera um identificador único para o usuário
 * Preserva o mesmo ID se já existir
 * @returns {string} External ID para uso com a API de Conversões
 */
function getOrCreateExternalId() {
  let externalId = localStorage.getItem('segredinho_external_id');
  
  if (!externalId) {
    // Gera um UUID v4 para identificação consistente
    externalId = 'uid_' + ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
    localStorage.setItem('segredinho_external_id', externalId);
  }
  
  return externalId;
}

/**
 * Verifica o consentimento do usuário para rastreamento
 * Implementa uma lógica básica de consentimento baseada em localStorage
 * @returns {boolean} Indica se o usuário consentiu com o rastreamento
 */
function hasTrackingConsent() {
  return localStorage.getItem('pixel_consent') === 'granted';
}

/**
 * Registra o consentimento do usuário para rastreamento
 */
function setTrackingConsent() {
  localStorage.setItem('pixel_consent', 'granted');
  
  // Informa ao Facebook sobre o consentimento
  if (typeof fbq === 'function') {
    fbq('consent', 'grant');
  }
}

/**
 * Envia evento para o Facebook Pixel
 * @param {string} eventName - Nome do evento standard ou custom
 * @param {object} params - Parâmetros adicionais do evento
 * @param {boolean} useAPI - Indica se deve usar também a API de Conversões (redundância)
 */
function trackEvent(eventName, params = {}, useAPI = true) {
  // Garante que temos o consentimento para rastreamento
  if (!hasTrackingConsent()) {
    console.log('Tracking consent not provided. Event not sent:', eventName);
    return;
  }
  
  // Evento através do Pixel
  if (typeof fbq === 'function') {
    fbq('track', eventName, params);
    console.log(`[Pixel] Event tracked: ${eventName}`, params);
  }
  
  // Evento através da API de Conversões (redundância para contornar bloqueadores)
  if (useAPI) {
    sendEventViaAPI(eventName, params);
  }
}

/**
 * Envia evento através da API de Conversões do Facebook
 * @param {string} eventName - Nome do evento 
 * @param {object} params - Parâmetros do evento
 */
function sendEventViaAPI(eventName, params = {}) {
  // Obtém dados necessários para a API
  const externalId = getOrCreateExternalId();
  const eventData = prepareEventData(eventName, params, externalId);
  
  // Envia para a API do Facebook
  fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${API_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [eventData],
      test_event_code: 'TEST12345' // Remover em produção
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(`[API] Event sent via API: ${eventName}`, data);
  })
  .catch(error => {
    console.error('Error sending event via API:', error);
  });
}

/**
 * Prepara os dados do evento no formato esperado pela API
 * @param {string} eventName - Nome do evento
 * @param {object} params - Parâmetros do evento
 * @param {string} externalId - ID externo do usuário
 * @returns {object} Dados formatados para a API
 */
function prepareEventData(eventName, params, externalId) {
  // Timestamp do evento em Unix timestamp
  const eventTime = Math.floor(Date.now() / 1000);
  
  // Dados básicos do evento
  const eventData = {
    event_name: eventName,
    event_time: eventTime,
    action_source: 'website',
    event_source_url: window.location.href,
    user_data: {
      client_user_agent: navigator.userAgent,
      client_ip_address: '{{client_ip_address}}', // Será preenchido pelo servidor
      external_id: externalId ? externalId.trim() : undefined
    },
    custom_data: params
  };
  
  // Adiciona fbp e fbc para melhor rastreamento
  const fbp = getFbp();
  const fbc = getFbc();
  
  if (fbp) eventData.user_data.fbp = fbp;
  if (fbc) eventData.user_data.fbc = fbc;
  
  return eventData;
}

/**
 * Obtém o cookie _fbp (Facebook Browser ID)
 * @returns {string|null} Valor do cookie _fbp
 */
function getFbp() {
  const match = document.cookie.match('(^|;)\\s*_fbp=([^;]*)');
  return match ? match.pop() : null;
}

/**
 * Obtém o cookie _fbc (Facebook Click ID)
 * @returns {string|null} Valor do cookie _fbc
 */
function getFbc() {
  const match = document.cookie.match('(^|;)\\s*_fbc=([^;]*)');
  return match ? match.pop() : null;
}

/**
 * PageView event
 * Deve ser chamado em todas as páginas
 */
function trackPageView() {
  trackEvent('PageView', {
    page_path: window.location.pathname,
    page_title: document.title
  });
}

/**
 * Lead event
 * Deve ser chamado após o cadastro
 * @param {string} leadSource - Fonte do lead (opcional)
 */
function trackLead(leadSource = 'website') {
  trackEvent('Lead', {
    lead_source: leadSource,
    content_name: 'Cadastro Segredinho VIP'
  }, true);
}

/**
 * CompleteRegistration event
 * Deve ser chamado após a criação de bio/foto
 * @param {string} registrationType - Tipo de registro (ex: 'bio_foto', 'perfil_completo')
 */
function trackCompleteRegistration(registrationType = 'bio_foto') {
  trackEvent('CompleteRegistration', {
    content_name: 'Perfil Completo',
    registration_type: registrationType,
    status: 'completed'
  }, true);
}

/**
 * ViewContent event
 * Deve ser chamado na página de match onde o usuário recebe o áudio
 * @param {string} contentName - Nome do conteúdo visualizado
 * @param {string} contentType - Tipo do conteúdo visualizado
 */
function trackViewContent(contentName = 'Match Chat', contentType = 'audio_message') {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_type: contentType,
    content_category: 'match'
  }, true);
}

/**
 * InitiateCheckout event
 * Deve ser chamado após o presente de R$50 ser liberado
 */
function trackInitiateCheckout() {
  trackEvent('InitiateCheckout', {
    content_name: 'Presente PIX',
    value: 50.00,
    currency: 'BRL',
    num_items: 1
  }, true);
}

/**
 * Subscribe event
 * Deve ser chamado na página onde o usuário precisa assinar
 * @param {string} subscriptionType - Tipo de assinatura (ex: 'premium', 'vip')
 * @param {number} price - Preço da assinatura
 */
function trackSubscribe(subscriptionType = 'vip', price = 14.90) {
  trackEvent('Subscribe', {
    content_name: 'Assinatura ' + subscriptionType.toUpperCase(),
    subscription_type: subscriptionType,
    value: price,
    currency: 'BRL'
  }, true);
}

/**
 * Purchase event
 * Deve ser chamado após a confirmação da assinatura
 * @param {string} subscriptionType - Tipo de assinatura (ex: 'premium', 'vip')
 * @param {number} price - Valor pago
 * @param {string} transactionId - ID da transação
 */
function trackPurchase(subscriptionType = 'vip', price = 14.90, transactionId = '') {
  trackEvent('Purchase', {
    content_name: 'Assinatura ' + subscriptionType.toUpperCase(),
    content_type: 'subscription',
    transaction_id: transactionId,
    value: price,
    currency: 'BRL'
  }, true);
}

// Exporta funções
window.pixelTracker = {
  init: initMetaPixel,
  setConsent: setTrackingConsent,
  trackPageView: trackPageView,
  trackLead: trackLead,
  trackCompleteRegistration: trackCompleteRegistration,
  trackViewContent: trackViewContent,
  trackInitiateCheckout: trackInitiateCheckout,
  trackSubscribe: trackSubscribe,
  trackPurchase: trackPurchase
};

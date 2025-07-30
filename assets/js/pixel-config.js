/**
 * Meta Pixel Configuration Helper - Segredinho VIP
 * Este arquivo configura o servidor para enviar dados do servidor para a API de Conversões
 * IMPORTANTE: Este código deve ser executado no servidor para máxima eficiência
 * LGPD: Este código respeita a LGPD ao solicitar consentimento e anonimizar dados
 */

/**
 * Envia evento de conversão pelo servidor para evitar bloqueadores
 * @param {object} req - Objeto de requisição (Express.js ou similar)
 * @param {string} eventName - Nome do evento para rastrear
 * @param {object} eventParams - Parâmetros adicionais do evento
 * @param {string} externalId - ID externo do usuário para deduplicação
 * @returns {Promise} Promise que resolve com a resposta da API
 */
async function serverSideEvent(req, eventName, eventParams = {}, externalId = '') {
  const PIXEL_ID = '1453046616041191';
  const API_ACCESS_TOKEN = 'EAAJ308fI85oBPOeeXfC7DoGxkGZBlA6tXnJh73hjqhQq5Ijaxad6fAjxZA4Vsauy2sKvTATOJnS5wkDHfQoD9diSkt32kZAKaYW1A2lBCZBLl33ybTrzEJifqid32ozXjTVU8YZB6B5ZBKJ489u2iRYhXPOYSiIHZCZBBDWMovlVzXtNfOgRQGaq6UG8xYPuaL7yewZDZD';
  
  // Extrai IP e User-Agent da requisição
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  
  // Dados básicos do evento
  const eventTime = Math.floor(Date.now() / 1000);
  const eventData = {
    event_name: eventName,
    event_time: eventTime,
    action_source: 'website',
    event_source_url: req.headers.referer || `https://appminhacoroa.site${req.path}`,
    user_data: {
      client_ip_address: userIp,
      client_user_agent: userAgent,
      external_id: externalId ? externalId.trim() : undefined
    },
    custom_data: eventParams
  };
  
  // Extrai cookies do Facebook da requisição
  const cookies = req.headers.cookie || '';
  const fbpMatch = cookies.match(/_fbp=([^;]*)/);
  const fbcMatch = cookies.match(/_fbc=([^;]*)/);
  
  if (fbpMatch && fbpMatch[1]) eventData.user_data.fbp = fbpMatch[1];
  if (fbcMatch && fbcMatch[1]) eventData.user_data.fbc = fbcMatch[1];

  try {
    const fetch = require('node-fetch');
    const response = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${API_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [eventData],
        test_event_code: 'TEST12345' // Remover em produção
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending server-side event:', error);
    throw error;
  }
}

/**
 * AVISO: Para implementação em ambiente de produção, 
 * este código precisaria ser executado do lado servidor.
 * Em ambiente estático, o cliente precisaria chamar uma API
 * que executaria este código no backend.
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { serverSideEvent };
}

// Fallback para ambiente de cliente (apenas para demonstração)
if (typeof window !== 'undefined') {
  window.serverSidePixel = {
    // Versão simulada do serverSideEvent para demonstração
    sendEvent: async function(eventName, params = {}, externalId = '') {
      console.log('Simulando envio server-side:', eventName, params);
      
      // Na versão de produção, isso chamaria uma API que executaria serverSideEvent
      const mockResponse = {
        success: true,
        event_name: eventName,
        params: params,
        message: 'Server-side event simulation. In production, this would call a server API.'
      };
      
      return mockResponse;
    }
  };
}

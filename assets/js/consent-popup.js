/**
 * Popup de Consentimento de Cookies para o Meta Pixel
 * Este script cria um popup de consentimento para o usuário
 * em conformidade com LGPD e regulações de privacidade
 */

function createConsentPopup() {
  // Verifica se já temos consentimento
  if (localStorage.getItem('pixel_consent') === 'granted') {
    return;
  }
  
  // Cria o elemento do popup
  const popupContainer = document.createElement('div');
  popupContainer.id = 'cookie-consent-popup';
  popupContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2a2a2a;
    color: white;
    border-radius: 10px;
    padding: 15px 20px;
    max-width: 400px;
    width: 90%;
    z-index: 99999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  `;
  
  // Conteúdo do popup
  popupContainer.innerHTML = `
    <div style="margin-bottom: 15px;">
      <h3 style="margin: 0 0 8px 0; color: white; font-size: 16px;">🍪 Consentimento de Cookies</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.4;">
        Utilizamos cookies para melhorar sua experiência e medir o desempenho do site.
        Ao clicar em "Aceitar", você concorda com o uso de cookies para análises e personalização.
      </p>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 10px;">
      <button id="reject-cookies" style="
        flex: 1;
        background-color: transparent;
        border: 1px solid #888;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      ">Recusar</button>
      <button id="accept-cookies" style="
        flex: 2;
        background-color: #ae00ff;
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
      ">Aceitar</button>
    </div>
  `;
  
  // Adiciona o popup ao body
  document.body.appendChild(popupContainer);
  
  // Eventos dos botões
  document.getElementById('accept-cookies').addEventListener('click', function() {
    localStorage.setItem('pixel_consent', 'granted');
    
    // Informa ao Facebook sobre o consentimento
    if (typeof window.pixelTracker !== 'undefined') {
      window.pixelTracker.setConsent();
      
      // Dispara o PageView após o consentimento
      window.pixelTracker.trackPageView();
    }
    
    // Remove o popup
    popupContainer.remove();
  });
  
  document.getElementById('reject-cookies').addEventListener('click', function() {
    localStorage.setItem('pixel_consent', 'denied');
    popupContainer.remove();
  });
}

// Inicializa o popup quando a página estiver carregada
document.addEventListener('DOMContentLoaded', createConsentPopup);

// Exporta a função para uso global
window.createConsentPopup = createConsentPopup;

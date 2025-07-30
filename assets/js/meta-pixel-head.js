/**
 * Meta Pixel - Código Base para inclusão no HEAD de todas as páginas
 * Pixel ID: 1453046616041191
 */
!(function(f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '1453046616041191');

// Verifica se o usuário já concedeu consentimento
if (localStorage.getItem('pixel_consent') === 'granted') {
  fbq('consent', 'grant');
  fbq('track', 'PageView');
} else {
  fbq('consent', 'revoke');
}

// Mensagem para o console
console.log('Meta Pixel ID 1453046616041191 initializado.');

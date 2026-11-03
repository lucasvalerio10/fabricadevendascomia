/* ============================================================
   CONFIGURAÇÃO DA PÁGINA — PREENCHA ANTES DE PUBLICAR
   ============================================================ */
const CONFIG = {
  checkoutUrl: 'https://pay.kiwify.com.br/Xlx5pAN', // Cole aqui seu link REAL de checkout. Ex.: 'https://pay.kiwify.com.br/abc123'
  emailContato: '', // Ex.: 'suporte@seudominio.com' — atualiza o link do rodapé
  metaPixelId: ''   // Opcional: ID numérico do Meta Pixel, se aplicável
};

(function () {
  'use strict';

  // Os links de compra ficam no HTML como âncoras de fallback.
  // Quando CONFIG.checkoutUrl é preenchido, passam a abrir o checkout real.
  const checkoutLinks = document.querySelectorAll('[data-checkout]');
  const toast = document.getElementById('checkout-toast');

  function validatedHttps(raw) {
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' ? url : null;
    } catch (_) { return null; }
  }

  const checkoutBase = validatedHttps(CONFIG.checkoutUrl);
  const attributionKeys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'fbclid', 'gclid'
  ];

  if (checkoutBase) {
    const src = new URLSearchParams(window.location.search);
    const target = new URL(checkoutBase.href);
    attributionKeys.forEach((key) => {
      if (src.has(key) && !target.searchParams.has(key)) {
        target.searchParams.set(key, src.get(key));
      }
    });
    checkoutLinks.forEach((link) => {
      link.href = target.href;
      link.setAttribute('rel', 'noopener noreferrer');
    });
  } else {
    checkoutLinks.forEach((link) => link.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (!toast) return;
      toast.hidden = false;
      window.setTimeout(() => { toast.hidden = true; }, 5000);
    }));
    console.warn('Fábrica de Vendas com IA: configure CONFIG.checkoutUrl em script.js.');
  }

  // Contato do rodapé: substitui o endereço de exemplo apenas com e-mail válido.
  const hasContact = CONFIG.emailContato && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.emailContato);
  if (hasContact) {
    document.querySelectorAll('[data-contact]').forEach((a) => {
      a.href = 'mailto:' + CONFIG.emailContato;
    });
  }

  if (!hasContact) document.querySelectorAll('[data-contact]').forEach((a) => a.hidden = true);
  document.querySelectorAll('[data-support-email]').forEach((el) => {
    el.textContent = hasContact ? CONFIG.emailContato : 'Canal de suporte informado no checkout';
  });

  // Meta Pixel: não instala nenhum rastreador se nenhum ID for configurado.
  if (CONFIG.metaPixelId && /^\d{5,25}$/.test(CONFIG.metaPixelId)) {
    /* Meta Pixel base oficial, opcional. Respeite suas obrigações de privacidade. */
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);
    t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.metaPixelId);
    window.fbq('track', 'PageView');
  }
})();


// Carrossel de provas: navegação com botões e swipe nativo.
(function () {
  'use strict';
  const track = document.getElementById('proofs-track');
  const counter = document.getElementById('proofs-counter');
  const cards = track ? [...track.querySelectorAll('.proof-card')] : [];
  if (track && cards.length) {
    function currentIndex() {
      const x = track.scrollLeft;
      let best = 0;
      let distance = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - cards[0].offsetLeft - x);
        if (d < distance) { distance = d; best = i; }
      });
      return best;
    }
    function updateCounter() {
      if (counter) counter.textContent = String(currentIndex() + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    }
    document.querySelectorAll('.proof-nav').forEach(button => button.addEventListener('click', () => {
      const shift = button.dataset.direction === 'next' ? 1 : -1;
      const next = (currentIndex() + shift + cards.length) % cards.length;
      track.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
    }));
    track.addEventListener('scroll', updateCounter, { passive: true });
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const next = Math.min(cards.length-1, Math.max(0, currentIndex() + (event.key === 'ArrowRight' ? 1 : -1)));
        track.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
      }
    });
    updateCounter();
  }
  const dialog = document.getElementById('proof-dialog');
  const player = document.getElementById('proof-player');
  const error = document.getElementById('proof-player-error');
  const close = document.getElementById('proof-close');
  document.querySelectorAll('.proof-video').forEach(button => button.addEventListener('click', () => {
    if (!dialog || !player) return;
    error.hidden = true;
    player.hidden = false;
    player.src = button.dataset.video;
    dialog.showModal();
    player.play().catch(() => { /* browser autoplay restrictions: controls remain available */ });
  }));
  function stopVideo() {
    if (!player) return;
    player.pause();
    player.removeAttribute('src');
    player.load();
  }
  if (player) player.addEventListener('error', () => {
    if (error && dialog && dialog.open) { player.hidden = true; error.hidden = false; }
  });
  if (close) close.addEventListener('click', () => dialog.close());
  if (dialog) {
    dialog.addEventListener('close', stopVideo);
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
})();

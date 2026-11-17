const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const cardContainer = document.getElementById('card-container');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicDot = document.getElementById('music-dot');
const songStatus = document.getElementById('song-status');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Konfeti Nuansa Gold Foil & Ivory (Elegan)
function launchLuxuryConfetti() {
  const duration = 4.2 * 1000;
  const end = Date.now() + duration;
  const luxuryColors = ['#d4af37', '#f3e5ab', '#c5a059', '#ffffff', '#e6cfa8'];

  confetti({
    particleCount: 75,
    angle: 60,
    spread: 65,
    colors: luxuryColors,
    origin: { x: 0, y: 0.72 }
  });
  confetti({
    particleCount: 75,
    angle: 120,
    spread: 65,
    colors: luxuryColors,
    origin: { x: 1, y: 0.72 }
  });

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      colors: luxuryColors,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      colors: luxuryColors,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Buka amplop, putar musik & tampilkan surat selama 3.8 detik sebelum masuk ke tab
envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;

  envelope.classList.add('open');
  launchLuxuryConfetti();

  bgMusic.play().catch(() => {
    musicToggle.textContent = 'Putar Musik';
    musicDot.classList.add('paused');
    songStatus.textContent = 'Musik Dijeda';
  });

  setTimeout(() => {
    envelopeWrapper.classList.add('hidden');
    cardContainer.classList.remove('hidden');
  }, 3800);
});

// Kontrol Play / Pause Musik
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = 'Jeda Musik';
    musicDot.classList.remove('paused');
    songStatus.textContent = 'Alunan Musik Mengiringi';
  } else {
    bgMusic.pause();
    musicToggle.textContent = 'Putar Musik';
    musicDot.classList.add('paused');
    songStatus.textContent = 'Musik Dijeda';
  }
});

// Navigasi 3 Tab
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    btn.classList.add('active');
    const targetId = btn.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// Lightbox Foto
function openLightbox(element) {
  const imgSrc = element.querySelector('img').src;
  const captionText = element.querySelector('.caption').textContent;

  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-caption').textContent = captionText;
  document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}
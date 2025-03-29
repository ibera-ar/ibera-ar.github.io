
// Variables existentes
let isPlaying = false;
let activeAudio = null;
const soundButton = document.getElementById('sound-button');
const audios = Array.from({ length: 16 }, (_, i) => document.getElementById(`audio-${i}`));
const hint = document.getElementById('rotation-hint');


// Inicialización principal
document.querySelector('a-scene').addEventListener('loaded', () => {
  document.querySelectorAll('[mindar-image-target]').forEach(initTargetListeners);
});

// Inicialización de listeners
function initTargetListeners(targetEl) {
  console.log('Target Iniciado');
                                                       // TARGET ENCONTRADO
  targetEl.addEventListener('targetFound', () => {
    console.log('Target found:', targetEl.id);
    const idx = targetEl.getAttribute('data-index');
    // Mostrar elementos
    soundButton.style.display = 'flex';
    hint.style.display = 'block';
    hint.classList.add('hint-visible');

    // Limpiar cualquier timer previo
    clearTimeout(hint.timeout);
    if (activeAudio && isPlaying) {
      activeAudio.pause();
      isPlaying = false;
    }
    activeAudio = audios[idx];
    // reproducir la animación
    playAnimation(targetEl);
  });
                                                  // TARGET PERDIDO
  targetEl.addEventListener('targetLost', () => {
    // Ocultar elementos
    hint.style.display = 'none';
    soundButton.style.display = 'none';
    soundButton.classList.remove('active'); // Resetear estado


    // Detener audio
    if (activeAudio) activeAudio.pause();
    // Detener animación
    stopAnimation(targetEl);

  });
}

function toggleSound() {
const button = document.getElementById('sound-button');
if (activeAudio) {
  if (isPlaying) {
    activeAudio.pause();
    button.classList.remove('active');
  } else {
    activeAudio.play();
    button.classList.add('active');
  }
  isPlaying = !isPlaying;
}
}
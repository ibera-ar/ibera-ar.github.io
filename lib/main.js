
let isPlaying = false;
let activeAudio = null;
const soundButton = document.getElementById('sound-button');
const audios = Array.from({ length: 16 }, (_, i) => document.getElementById(`audio-${i}`));
const hint = document.getElementById('rotation-hint');

document.querySelector('a-scene').addEventListener('loaded', () => {
  document.querySelectorAll('[mindar-image-target]').forEach(initTargetListeners);
});

let activeTarget = null;

function initTargetListeners(targetEl) {
  targetEl.addEventListener('targetFound', () => {
    if (activeTarget === targetEl.id) return;
    activeTarget = targetEl.id;

    const idx = targetEl.getAttribute('data-index');
    soundButton.style.display = 'flex';
    hint.style.display = 'block';
    hint.classList.add('hint-visible');

    if (activeAudio && isPlaying) {
      activeAudio.pause();
      isPlaying = false;
    }
    activeAudio = audios[idx];
    playAnimation(targetEl);
  });

  targetEl.addEventListener('targetLost', () => {
    activeTarget = null;
    hint.style.display = 'none';
    soundButton.style.display = 'none';
    soundButton.classList.remove('active');

    if (activeAudio) activeAudio.pause();
    stopAnimation(targetEl);
  });
}

function toggleSound() {
  if (activeAudio) {
    if (isPlaying) {
      activeAudio.pause();
      soundButton.classList.remove('active');
    } else {
      activeAudio.play();
      soundButton.classList.add('active');
    }
    isPlaying = !isPlaying;
  }
}




// resuelve el problema del output encoding
AFRAME.registerComponent('force-webgl2', {
  init: function () {
    if (this.el.sceneEl.renderer && this.el.sceneEl.renderer.capabilities.isWebGL2) {
      console.log('WebGL2 Activated, baby!');
      this.el.sceneEl.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
  }
});



// AFRAME.registerComponent('force-webgl2', {
//   init: function () {
//     if (this.el.sceneEl.renderer && this.el.sceneEl.renderer.capabilities.isWebGL2) {
//       console.log('WebGL2 Activated, baby!');

//       this.el.sceneEl.renderer.outputEncoding = THREE.sRGBEncoding;
//     }
//   }
// });
  AFRAME.registerComponent('custom-rotation', {
      schema: {
        sensitivity: { type: 'number', default: 0.2 }, // Sensibilidad del movimiento
        smoothness: { type: 'number', default: 0.2 }  // Controla la suavidad (0.01 = muy suave, 1 = instantáneo)
      },
      init: function () {
        this.rotationY = 0; // Rotación actual en el eje Y
        this.targetRotationY = 0; // Rotación objetivo (hacia donde queremos girar)
        this.touchStartX = 0;
        this.isDragging = false;

        // Evento de inicio de toque
        this.el.sceneEl.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            this.touchStartX = e.touches[0].pageX;
            this.isDragging = true;
          }
        });

        // Evento de movimiento de toque
        this.el.sceneEl.addEventListener('touchmove', (e) => {
          if (this.isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].pageX - this.touchStartX;
            this.targetRotationY += deltaX * this.data.sensitivity; // Actualizar rotación objetivo
            this.touchStartX = e.touches[0].pageX;
          }
        });

        // Evento de inicio de arrastre con mouse
        this.el.sceneEl.addEventListener('mousedown', (e) => {
          if (e.button === 0) { // Botón izquierdo
            this.touchStartX = e.pageX;
            this.isDragging = true;
          }
        });

        // Evento de movimiento con mouse
        this.el.sceneEl.addEventListener('mousemove', (e) => {
          if (this.isDragging) {
            const deltaX = e.pageX - this.touchStartX;
            this.targetRotationY += deltaX * this.data.sensitivity; // Actualizar rotación objetivo
            this.touchStartX = e.pageX;
          }
        });

        // Detener el arrastre (tanto para touch como mouse)
        this.el.sceneEl.addEventListener('mouseup', () => {
          this.isDragging = false;
        });
        this.el.sceneEl.addEventListener('touchend', () => {
          this.isDragging = false;
        });
      },
      tick: function () {
        // Interpolación suave entre la rotación actual y la rotación objetivo
        if (this.rotationY !== this.targetRotationY) {
          this.rotationY += (this.targetRotationY - this.rotationY) * this.data.smoothness;
          this.el.object3D.rotation.y = THREE.MathUtils.degToRad(this.rotationY);
        }
      }
    });
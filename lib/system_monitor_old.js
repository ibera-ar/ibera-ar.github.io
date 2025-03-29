
    // // Debug MODE
    AFRAME.registerComponent('system-monitor', {
      schema: {
        checkInterval: { type: 'number', default: 1000 }
      },
      init: function () {
        this.frameCount = 0;
        this.startTime = performance.now();
        this.modelCheckInterval = null;
        this.loadedModelCount = 0; // Contador de modelos cargados

          // 1. Verificar si el panel existe
          let debugPanel = document.querySelector('#debug-panel');

              // 2. Si NO existe, crearlo
              if (!debugPanel) {
                debugPanel = document.createElement('div');
                debugPanel.id = 'debug-panel';
                debugPanel.className = 'debug-panel';
                debugPanel.innerHTML = `
                  <div>Modelos: <span id="loaded-count">0</span>/16</div>
                  <div>FPS: <span id="fps">0</span></div>
                  <div>Memoria: <span id="memory">N/A</span> MB</div>
                `;
                document.body.appendChild(debugPanel); // Agregar al DOM
              }

        // Escuchar eventos de carga de modelos
        const modelEls = document.querySelectorAll('[gltf-model]');
        modelEls.forEach(modelEl => {
          modelEl.addEventListener('model-loaded', () => {
            this.loadedModelCount++; // Incrementar contador cuando un modelo se carga
            this.updateLoadedModelsDisplay(); // Actualizar el indicador
          });
        });
      },
      tick: function () {
        // Medición de FPS
        this.frameCount++;
        const elapsed = performance.now() - this.startTime;
        if (elapsed >= 1000) {
          const fps = (this.frameCount / (elapsed / 1000)).toFixed(1);
          document.getElementById('fps').textContent = fps;
          // Reiniciar conteo
          this.frameCount = 0;
          this.startTime = performance.now();
        }
      },
      update: function () {
        // Iniciar intervalo para memoria
        if (this.modelCheckInterval) clearInterval(this.modelCheckInterval);
        this.modelCheckInterval = setInterval(() => {
          // Medir memoria
          if (performance.memory) {
            const memory = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
            document.getElementById('memory').textContent = memory;
          }
        }, this.data.checkInterval);
      },
      updateLoadedModelsDisplay: function () {
        // Actualizar el indicador de modelos cargados
        document.getElementById('loaded-count').textContent = this.loadedModelCount;
      }
    });
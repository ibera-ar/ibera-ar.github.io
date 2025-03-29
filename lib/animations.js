    // PLAY // Animation
    function playAnimation(targetEl) {
      console.log('playAnimation function enabled');
      console.log('Estructura del target:', targetEl);
      console.log('Elementos con gltf-model:', targetEl.querySelectorAll('[gltf-model]'));
      const modelEl = targetEl.querySelector('[gltf-model]');
      console.log('Estructura del modelo:', modelEl.object3D);
      console.log('Esqueleto encontrado:', modelEl.object3D.traverse(obj => {
        if (obj.isBone) console.log('Hueso:', obj.name);
      }));
      if (!modelEl) {
        console.error('⚠️ Modelo no encontrado en el target:', targetEl.id);
        return;
      }
      const setupAnimation = () => {
        const modelData = modelEl.components['gltf-model'];
        // Obtener animaciones directamente del modelo
        const animations = modelData.model.animations;
        // Lógica para seleccionar la animación
        const targetIndex = parseInt(targetEl.getAttribute('data-index'), 10);

        if (animations.length === 0) {
          console.warn(`⚠️ El modelo ${targetEl.id} no tiene animaciones.`);
          return; // Salir sin intentar configurar animaciones
        }


        // Mostrar nombres de animaciones
        console.log('Animaciones detectadas:', animations.map(a => a.name));
        // Configurar animación
        // const animationName = animations[0].name;
        let animationName;

        //Lógica para seleccionar la animación
        if ([0, 4, 13].includes(targetIndex)) {
          console.log('aguara guazu,ciervo o venado');

          // Buscamos la animación "Idle_2"
          const idleClip = animations.find(anim => anim.name === 'Idle_2_HeadLow');
          // const idleClip = animations.find(anim => anim.name === 'Idle');

          if (idleClip) {
            console.log('Animacion encontrada, seteando');
            animationName = 'Idle_2_HeadLow';
          } else {
            console.warn(`[Modelo ${targetIndex}] Animación Idle_2_HeadLow no encontrada. Usando: Idle_Headlow`);
            animationName = 'Idle_Headlow';
          }
        } else {
          console.log('diferente de targets');

          // Comportamiento normal para otros modelos
          animationName = animations[0].name;
        }

        console.log('Animaciones a asignar:', animationName);
        modelEl.setAttribute('animation-mixer', {
          clip: animationName,
          loop: true,
          timeScale: 1, //acelerar o ralentizar la animación.
        });
        console.log('asignado:', animationName);

        setTimeout(() => {
          const mixerComponent = modelEl.components['animation-mixer'];
          if (mixerComponent?.mixer) {
            // Buscar el clip por nombre
            const clip = animations.find(anim => anim.name === animationName);
            if (clip) {
              const action = mixerComponent.mixer.clipAction(clip);
              action.loop = THREE.LoopRepeat;
              action.play();
              console.log('▶️ Reproduciendo:', animationName);
            }
          }
        }, 200);

      };


      // Verificar carga del modelo
      if (modelEl.hasLoaded) {
        console.log('modelo CARGADO');

        setupAnimation();
      } else {
        console.log('modelo no cargado');
        modelEl.addEventListener('model-loaded', setupAnimation, { once: true });
      }
    }

    // STOP // Animation
    // Aquí se remueve el componente para detenerla. A lo bruto
    function stopAnimation(targetEl) {
      const modelEl = targetEl.querySelector('[gltf-model]');
      if (modelEl) {
        console.log('Stop Animation in:', targetEl.id);

        modelEl.removeAttribute('animation-mixer');
      }
    }

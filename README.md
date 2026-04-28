# Trabajo práctico N°3:

- JavaScript  
- DOM  
- Validaciones  
- LocalStorage  

## Grupo 15  
## Integrantes

- Andy Moore (andymoore01)  
- Augusto Fedigatti (Agusfedredhunter)  
- Joaquin Pelizza (joacopelizza)  
- Jesus Lima (yss2805)  
- Iñaki Urdampilleta (Iniakiur)  
- Ramiro Morel (ramiromorel93-debug)  

Características de la entrega

En este trabajo desarrollamos una aplicación web que permite comparar dos números y guardar un historial de las comparaciones realizadas.

Se implementaron las siguientes funciones:

- Comparación de números:  
  El usuario puede ingresar dos números y el sistema indica cuál es mayor, menor o si son iguales.

- Validación de datos:  
  Se verificó que los campos no estén vacíos y que los valores ingresados sean números válidos.

- Historial con LocalStorage:  
  Cada comparación se guarda automáticamente y puede visualizarse en la página de historial.

- Borrado de historial:  
  Se agregó un botón para eliminar todas las comparaciones guardadas.

- Uso del DOM:  
  Se utilizaron eventos y manipulación del DOM para mostrar resultados y actualizar el historial.

Tecnologías utilizadas
- HTML5  
- CSS3  
- JavaScript  
- LocalStorage  

Funcionamiento general
1. El usuario ingresa dos números.  
2. El sistema los compara.  
3. Se muestra el resultado.  
4. La comparación se guarda en el historial.  
5. El historial puede visualizarse o borrarse cuando se desee.

Funcion de Comparar. 

        // Cuando el usuario hace click en "Comparar"
        botonEjecutarComparacion.addEventListener('click', () => {
            ocultarMensajeDeError();

            // Guardamos los valores en variables con nombres claros
            const textoPrimerNumero = primerNumeroInput.value.trim();
            const textoSegundoNumero = segundoNumeroInput.value.trim();

            // VALIDACIÓN 1: Que no estén vacíos
            if (textoPrimerNumero === '' || textoSegundoNumero === '') {
                mostrarMensajeDeError('Che, no podés dejar los campos vacíos. Completá los dos.');
                return;
            }

            const numeroUno = parseFloat(textoPrimerNumero);
            const numeroDos = parseFloat(textoSegundoNumero);

            // VALIDACIÓN 2: Que sean números válidos
            if (isNaN(numeroUno) || isNaN(numeroDos)) {
                mostrarMensajeDeError('Lo que pusiste no parece un número válido. Revisalo.');
                return;
            }

            // VALIDACIÓN 3: Límite de tamaño para que no se rompa nada
            const LIMITE_MAXIMO = 1000000000; // Mil millones
            if (Math.abs(numeroUno) > LIMITE_MAXIMO || Math.abs(numeroDos) > LIMITE_MAXIMO) {
                mostrarMensajeDeError('Ese número es demasiado grande, bajale un cambio.');
                return;
            }

            let mensajeResultado = '';

            // Comparamos los valores de forma lógica
            if (numeroUno > numeroDos) {
                mensajeResultado = `${numeroUno} es mayor que ${numeroDos}`;
            } else if (numeroUno < numeroDos) {
                mensajeResultado = `${numeroUno} es menor que ${numeroDos}`;
            } else {
                mensajeResultado = `Los dos números son iguales (${numeroUno})`;
            }

            // Mostramos el resultado final
            textoDelResultado.textContent = mensajeResultado;
            contenedorResultado.style.display = 'block';

            // Guardamos la operación en el historial
            guardarOperacionEnHistorial('Comparación', mensajeResultado);

Los valores ingresados se almacenan en las variables creadas, "primerNumero" para el primer valor y "segundoNumero" para el segundo valor. Al activar la funcion de comparar, los valores son puestos dentro de un bucle de If con tres condiciones y resultados diferentes, (Que el primer valor sea mayor que el segundo; que el segundo sea mayor que el primero; que ambos sean iguales). 
Tambien existen bucles de if con condiciones y respuestas para situaciones extrañas, si no las dos variables no registran valores, salta un aviso para que se agregue un valor; tambien salta un aviso si los valores agregados en las variables no son de naturaleza numerica; y tambien hay limite del valor permitido para la comparacion. 

Cuando los valores pasan los bucles de If, envian el resultado a la variable "mensajeResultado" y el resultado se guarda en el historial. 







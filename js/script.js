// Esperamos a que cargue todo el HTML para que no tire error al buscar los elementos
document.addEventListener('DOMContentLoaded', () => {
    

    // --- LÓGICA PARA LA PÁGINA DE CÁLCULO ---
    const botonEjecutarComparacion = document.getElementById('botonEjecutarComparacion');
    
    // Si estamos en la página de cálculo, este botón va a existir
    if (botonEjecutarComparacion) {
        const primerNumeroInput = document.getElementById('primerNumeroIngresado');
        const segundoNumeroInput = document.getElementById('segundoNumeroIngresado');
        const contenedorResultado = document.getElementById('contenedorResultadoFinal');
        const textoDelResultado = document.getElementById('textoResultadoComparacion');
        const botonBorrarCampos = document.getElementById('botonBorrarCampos');
        const contenedorError = document.getElementById('contenedorMensajeError');

        // Función para mostrar errores de forma prolija en la pantalla
        const mostrarMensajeDeError = (mensaje) => {
            contenedorError.textContent = mensaje;
            contenedorError.style.display = 'block';
            contenedorResultado.style.display = 'none'; // Ocultamos el resultado si hay error
        };

        // Función para ocultar el error cuando todo está bien
        const ocultarMensajeDeError = () => {
            contenedorError.style.display = 'none';
        };

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
        });

        // Este botón limpia todo para volver a empezar de cero
        botonBorrarCampos.addEventListener('click', () => {
            primerNumeroInput.value = '';
            segundoNumeroInput.value = '';
            contenedorResultado.style.display = 'none';
            ocultarMensajeDeError();
        });
    }

    // --- LÓGICA PARA LA PÁGINA DE HISTORIAL ---
    const listaDeComparaciones = document.getElementById('listaDeComparacionesGuardadas');
    if (listaDeComparaciones) {
        // Mostramos lo que hay guardado apenas entramos
        refrescarVistaDelHistorial();

        const botonVaciarTodo = document.getElementById('botonVaciarHistorialCompleto');
        botonVaciarTodo.addEventListener('click', () => {
            if (confirm('¿Estás seguro? Se va a borrar todo tu historial de cálculos.')) {
                localStorage.removeItem('historial_ganimedes');
                refrescarVistaDelHistorial();
            }
        });
    }
});

// FUNCIÓN PARA GUARDAR EN EL STORAGE (Persistencia)
function guardarOperacionEnHistorial(tipoDeOperacion, detalleDelResultado) {
    let listadoHistorial = JSON.parse(localStorage.getItem('historial_ganimedes')) || [];
    
    const nuevaEntradaDeHistorial = {
        operacion: tipoDeOperacion,
        info: detalleDelResultado,
        fecha: new Date().toLocaleString()
    };
    
    listadoHistorial.unshift(nuevaEntradaDeHistorial);
    localStorage.setItem('historial_ganimedes', JSON.stringify(listadoHistorial));
}

// FUNCIÓN PARA DIBUJAR EL HISTORIAL EN EL HTML
function refrescarVistaDelHistorial() {
    const contenedorLista = document.getElementById('listaDeComparacionesGuardadas');
    const alertaHistorialVacio = document.getElementById('mensajeHistorialVacio');
    if (!contenedorLista) return;

    let datosGuardados = JSON.parse(localStorage.getItem('historial_ganimedes')) || [];
    
    // Limpiamos lo que haya para no duplicar datos
    contenedorLista.querySelectorAll('.history-item').forEach(el => el.remove());

    if (datosGuardados.length === 0) {
        if (alertaHistorialVacio) alertaHistorialVacio.style.display = 'block';
        contenedorLista.appendChild(alertaHistorialVacio);
    } else {
        if (alertaHistorialVacio) alertaHistorialVacio.style.display = 'none';
        
        datosGuardados.forEach(item => {
            const itemDeLista = document.createElement('li');
            itemDeLista.className = 'history-item';
            itemDeLista.innerHTML = `
                <div class="history-content">
                    <strong style="color: #270cd7">${item.operacion}:</strong> ${item.info}
                </div>
                <div class="history-date">${item.fecha}</div>
            `;
            contenedorLista.appendChild(itemDeLista);
        });
    }
}

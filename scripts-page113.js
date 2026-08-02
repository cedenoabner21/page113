
/* ==========================================
   INTERACCION DE LOS BOTONES "DETALLES"
========================================== */

const botonesDetalles = document.querySelectorAll('.boton-detalles');

botonesDetalles.forEach(function(boton) {
    
    boton.addEventListener('click', function() {
        
        if (boton.textContent === "Próximamente") {
            alert("¡Este proyecto aún está en el horno! Mantente atento a Page113.");
        } else {
            alert("Más información técnica sobre este proyecto estará disponible muy pronto. ¡Estamos construyendo nuestro modal!");
        }
        
    });
});

/* ==========================================
            botones de servicios
========================================== */

const tarjetasServicios = document.querySelectorAll('.tarjeta-servicio');

// 2. ORDEN CÍCLICA DE ESCUCHA:
tarjetasServicios.forEach(function(tarjeta) {
    
    tarjeta.addEventListener('click', function(evento) {
        
        // ORDEN DE SEGURIDAD: Si el usuario dio clic justo en la "i" del tooltip de información, 
        // no mostramos la alerta general para no interrumpir la lectura de la info.
        if (evento.target.classList.contains('tooltip-info')) return;

        // Leemos el nombre del servicio almacenado en el atributo data-servicio
        const nombreServicio = this.getAttribute('data-servicio');
        
        // Disparamos la respuesta interactiva
        alert("¡Gracias por tu interés en " + nombreServicio + "! Estamos afinando los últimos detalles para la contratación directa. Contáctanos por WhatsApp para una cotización inmediata.");
        
    });
});


/* ==========================================
              boton paypal xddd
========================================== */

const botonDonacion = document.querySelector('.boton-paypal');

botonDonacion.addEventListener('click', function() {
    alert("¡Gracias por querer invitarnos un café! Próximamente habilitaremos el enlace de donaciones.");
});

/* ==========================================
        MOTOR DE NAVEGACIÓN TIPO "SPA"
========================================== */

const todosLosEnlacesNavegacion = document.querySelectorAll('a[href^="#"]');
const todasLasPantallas = document.querySelectorAll('section');

todosLosEnlacesNavegacion.forEach(function(enlace) {

    enlace.addEventListener('click', function(evento) {
        
        evento.preventDefault(); 
        
        const idDestino = this.getAttribute('href');
        const pantallaNueva = document.querySelector(idDestino);
        
        let pantallaActual = null;
        todasLasPantallas.forEach(function(pantalla) {
            if (pantalla.style.display !== 'none') {
                pantallaActual = pantalla;
            }
        });
        
        if (pantallaActual === pantallaNueva) 
            return; 

        // adaptado desde MS
        pantallaActual.classList.add('caja-oculta');

            setTimeout(function() {

                pantallaActual.style.display = 'none';
                pantallaNueva.classList.add('caja-oculta');
                pantallaNueva.style.display = ''; 
                pantallaNueva.offsetHeight; 
                pantallaNueva.classList.remove('caja-oculta');
        }, 400); 
    });
});

/* ==========================================
   CONTROL INTERACTIVO DEL MENÚ HAMBURGUESA
========================================== */

// 1. RECOLECCIÓN DE DATOS: Capturamos el botón y la barra de navegación
const botonHamburguesa = document.getElementById('boton-menu');
const navegacionMenu = document.querySelector('.navegacion-principal');

// 2. ORDEN DE INTERRUPTOR (TOGGLE):
if (botonHamburguesa && navegacionMenu) {
    
    // Escuchamos el clic en el botón de la hamburguesa
    botonHamburguesa.addEventListener('click', function() {
        // Alterna la clase 'menu-activo': Si no la tiene se la pone (abre), si la tiene se la quita (cierra)
        navegacionMenu.classList.toggle('menu-activo');
    });

    // 3. ORDEN DE CIERRE AUTOMÁTICO:
    // Capturamos todos los enlaces internos del menú desplegable
    const enlacesDelMenu = navegacionMenu.querySelectorAll('a');
    
    enlacesDelMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            // Cuando el usuario toca una opción (ej: "Servicios"), cerramos el menú para que no tape la pantalla
            navegacionMenu.classList.remove('menu-activo');
        });
    });
}


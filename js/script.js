/* =========================================================
   UTILIDADES
========================================================= */

function abrirModal(titulo, mensaje) {
    const modalGlobal = document.getElementById('modal-global');
    const modalContenido = document.getElementById('modal-contenido');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalMensaje = document.getElementById('modal-mensaje');

    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;

    // Quitamos hidden y forzamos reflow para que la transición funcione
    modalGlobal.classList.remove('hidden');
    modalGlobal.classList.add('flex');
    void modalGlobal.offsetHeight; // fuerza reflow

    modalGlobal.classList.remove('opacity-0');
    modalContenido.classList.remove('scale-95');

    // Bloqueamos el scroll del body
    document.body.classList.add('modal-abierto');
}

function cerrarModal() {
    const modalGlobal = document.getElementById('modal-global');
    const modalContenido = document.getElementById('modal-contenido');

    modalGlobal.classList.add('opacity-0');
    modalContenido.classList.add('scale-95');

    setTimeout(function () {
        modalGlobal.classList.add('hidden');
        modalGlobal.classList.remove('flex');
        document.body.classList.remove('modal-abierto');
    }, 300);
}

/* =========================================================
   ENVÍO DE IDEA RÁPIDA A WHATSAPP
========================================================= */

function enviarIdeaWhatsApp() {
    const inputIdea = document.getElementById('idea-cliente');
    const texto = inputIdea.value.trim();
    const telefono = '593979099282';

    if (texto === '') {
        abrirModal('Atención', 'Por favor, escribe una breve idea de lo que necesitas antes de enviarla.');
        return;
    }

    const mensaje = 'Hola equipo de Page113, tengo esta idea para mi página web: ' + texto;
    const urlWhatsApp = 'https://wa.me/' + telefono + '?text=' + encodeURIComponent(mensaje);

    // Fallback si el navegador bloquea popups
    const ventana = window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    if (!ventana) {
        window.location.href = urlWhatsApp;
    }
}

/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Referencias globales ---------- */
    const modalGlobal = document.getElementById('modal-global');
    const botonCerrarModal = document.getElementById('cerrar-modal');
    const botonCerrarModalBtn = document.querySelector('.cerrar-modal-btn');

    /* ---------- Cerrar modal ---------- */
    if (botonCerrarModal) botonCerrarModal.addEventListener('click', cerrarModal);
    if (botonCerrarModalBtn) botonCerrarModalBtn.addEventListener('click', cerrarModal);

    // Cerrar al hacer clic fuera del contenido
    if (modalGlobal) {
        modalGlobal.addEventListener('click', function (evento) {
            if (evento.target === modalGlobal) cerrarModal();
        });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modalGlobal.classList.contains('hidden')) {
            cerrarModal();
        }
    });

    /* ---------- Botón "Enviar idea" ---------- */
    const botonEnviarIdea = document.getElementById('boton-enviar-idea');
    if (botonEnviarIdea) {
        botonEnviarIdea.addEventListener('click', enviarIdeaWhatsApp);
    }

    // Permitir enviar con Enter
    const inputIdea = document.getElementById('idea-cliente');
    if (inputIdea) {
        inputIdea.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                enviarIdeaWhatsApp();
            }
        });
    }

    /* ---------- Botones "Detalles" del portafolio ---------- */
    const botonesDetalles = document.querySelectorAll('.boton-detalles');
    botonesDetalles.forEach(function (boton) {
        boton.addEventListener('click', function () {
            if (boton.textContent.trim() === 'Próximamente') {
                abrirModal('Atención', 'Este proyecto sigue en desarrollo. Te avisaremos cuando esté listo para mostrarse públicamente.');
            } else {
                abrirModal('Más información', 'Estamos preparando los detalles técnicos y la presentación completa de este proyecto para mostrártelo en una próxima versión.');
            }
        });
    });

    /* ---------- Botón PayPal ---------- */
    const botonDonacion = document.querySelector('.boton-paypal');
    if (botonDonacion) {
        botonDonacion.addEventListener('click', function () {
            abrirModal('Apóyanos', 'Gracias por querer invitarnos un café. Pronto habilitaremos el enlace oficial para apoyar nuestro trabajo.');
        });
    }

    /* ---------- Navegación entre vistas ---------- */
    const vistas = {
        '#inicio': document.getElementById('vista-inicio'),
        '#servicios': document.getElementById('vista-inicio'),       // servicios está dentro de la vista inicio
        '#como-trabajamos': document.getElementById('vista-inicio'),  // idem
        '#portafolio': document.getElementById('vista-portafolio'),
        '#nosotros': document.getElementById('vista-nosotros'),
        '#contacto': document.getElementById('vista-contacto')
    };

    let vistaActual = document.getElementById('vista-inicio');

    function mostrarVista(idDestino) {
        const vistaNueva = vistas[idDestino];
        if (!vistaNueva) {
            // Si no hay vista asociada, hacemos scroll normal al ancla
            const ancla = document.querySelector(idDestino);
            if (ancla) ancla.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Si es la misma vista, solo hacemos scroll al ancla interna
        if (vistaNueva === vistaActual) {
            const anclaInterna = document.querySelector(idDestino);
            if (anclaInterna) {
                anclaInterna.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        // Transición entre vistas
        vistaActual.classList.add('vista-oculta');

        setTimeout(function () {
            vistaActual.classList.add('hidden');
            vistaActual.classList.remove('vista-oculta');

            vistaNueva.classList.remove('hidden');
            void vistaNueva.offsetHeight; // reflow
            vistaNueva.classList.add('vista-oculta');

            // Scroll al inicio de la nueva vista
            window.scrollTo({ top: 0, behavior: 'auto' });

            // Forzar reflow y quitar la clase de ocultamiento
            requestAnimationFrame(function () {
                vistaNueva.classList.remove('vista-oculta');
            });

            vistaActual = vistaNueva;
        }, 300);
    }

    // Todos los enlaces internos que cambian de vista
    const enlacesVista = document.querySelectorAll('a[href^="#"]');
    enlacesVista.forEach(function (enlace) {
        enlace.addEventListener('click', function (evento) {
            const idDestino = this.getAttribute('href');
            if (idDestino === '#' || idDestino === '') return;

            const vistaDestino = vistas[idDestino];
            if (!vistaDestino) return; // dejamos que el navegador haga scroll normal

            evento.preventDefault();
            mostrarVista(idDestino);

            // Cerrar menú móvil si está abierto
            const nav = document.getElementById('navegacion-principal');
            if (nav) nav.classList.remove('menu-activo');

            // Actualizar aria-expanded del botón hamburguesa
            const botonMenu = document.getElementById('boton-menu');
            if (botonMenu) botonMenu.setAttribute('aria-expanded', 'false');

            // Cambiar ícono si existe
            const icono = document.getElementById('icono-menu');
            if (icono) icono.innerHTML = '&#9776;';
        });
    });

    /* ---------- Menú hamburguesa ---------- */
    const botonHamburguesa = document.getElementById('boton-menu');
    const navegacionMenu = document.getElementById('navegacion-principal');

    if (botonHamburguesa && navegacionMenu) {
        botonHamburguesa.addEventListener('click', function (evento) {
            evento.stopPropagation();
            const abierto = navegacionMenu.classList.toggle('menu-activo');
            botonHamburguesa.setAttribute('aria-expanded', abierto ? 'true' : 'false');

            const icono = document.getElementById('icono-menu');
            if (icono) icono.innerHTML = abierto ? '&times;' : '&#9776;';
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function (evento) {
            if (!navegacionMenu.classList.contains('menu-activo')) return;
            if (navegacionMenu.contains(evento.target)) return;
            if (botonHamburguesa.contains(evento.target)) return;

            navegacionMenu.classList.remove('menu-activo');
            botonHamburguesa.setAttribute('aria-expanded', 'false');

            const icono = document.getElementById('icono-menu');
            if (icono) icono.innerHTML = '&#9776;';
        });
    }

    /* ---------- Manejo de hash inicial ---------- */
    if (window.location.hash && vistas[window.location.hash]) {
        mostrarVista(window.location.hash);
    }
});
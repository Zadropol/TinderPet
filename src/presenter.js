import { crearperfil, leerPerfiles } from "./crearperfilmascota/perfilmascota.js"; // Se elimina cargarPerfilesGuardados, usarRepositorioTest
import { EnviarSolicitudAdopcion } from "./adopcion";
import { renderDetalles, obtenerMascotaPorId } from "./mostrardetallesmascota/mostraDetalles.js";
import { perfilAHTML } from "./crearperfilmascota/perfilesenHTML.js";

// ----------------------------- CREACIÓN PERFIL -----------------------------
// Se elimina la dependencia de Cypress y usarRepositorioTest

function renderPublicados() { // Ya no es async
  const salida = document.querySelector("#resultado-div");
  if (!salida) return;
  const perfiles = leerPerfiles(); // Ya no es await
  salida.innerHTML = perfiles.length
    ? perfiles.map(perfilAHTML).join("")
    : "No hay perfiles publicados.";
}

function initCreacion() {
  const form = document.querySelector("#perfil-form");
  if (!form) return;
  renderPublicados();

  form.addEventListener("submit", e => { // Ya no es async
    e.preventDefault();
    crearperfil( // Ya no es await
      form.querySelector("#nombre-mascota")?.value,
      form.querySelector("#edad-mascota")?.value,
      form.querySelector("#raza-mascota")?.value,
      form.querySelector("#imagen-mascota")?.value,
      form.querySelector("#especie-mascota")?.value,
      form.querySelector("#sexo-mascota")?.value,
      form.querySelector("#vacunas-mascota")?.value
    );
    form.reset();
    renderPublicados(); // Ya no es await
  });
}

// ----------------------------- BÚSQUEDA -----------------------------
// ... (buscar y renderResultados se mantienen)

function initBusqueda() {
  const form = document.querySelector("#buscar-form");
  if (!form) return;
  form.addEventListener("submit", e => { // Ya no es async
    e.preventDefault();
    const perfiles = leerPerfiles(); // Ya no es await
    const resultados = buscar(perfiles, {
      edad: form.querySelector("#buscar-edad")?.value,
      raza: form.querySelector("#buscar-raza")?.value,
      especie: form.querySelector("#buscar-especie")?.value
    });
    renderResultados(resultados);
  });

  // Delegación para detalles (se mantiene)
  const cont = document.querySelector("#resultados-busqueda");
  if (cont) {
    cont.addEventListener("click", e => {
      const btn = e.target.closest(".ver-detalles");
      if (btn) {
        const id = btn.getAttribute("data-id");
        if (id) {
          location.hash = `#/mascota/${id}`;
          activarVista('perfiles');
          mostrarDetalles(id);
        }
      }
    });
  }
}

// ----------------------------- DETALLES -----------------------------
function mostrarDetalles(id) { // Ya no es async
  const perfiles = leerPerfiles(); // Ya no es await
  const mascota = obtenerMascotaPorId(id, perfiles);
  const html = renderDetalles(mascota);
  const destino = document.querySelector("#detalle-mascota");
  if (destino) destino.innerHTML = html;
}

function handleHash() {
  const m = location.hash.match(/^#\/mascota\/(.+)$/);
  if (m) {
    activarVista('perfiles');
    mostrarDetalles(m[1]);
  }
}

// ... (El resto de funciones se mantienen)

// ----------------------------- MANEJADOR DE SOLICITUD (REUTILIZABLE) -----------------------------
function manejarSolicitud(e) {
  const btnSolicitud = e.target.closest(".btn-solicitud");
  if (btnSolicitud) {
    const msg = btnSolicitud.parentElement.querySelector(".mensaje-solicitud");
    if (msg) {
      msg.textContent = EnviarSolicitudAdopcion();
      msg.style.display = "block";
      
      setTimeout(() => {
        msg.textContent = "";
        msg.style.display = "none";
      }, 5000);
    }
  }
}

function manejarDetalles(e) {
  const btnDetalles = e.target.closest(".ver-detalles");
  if (btnDetalles) {
    const id = btnDetalles.getAttribute("data-id");
    if (id) mostrarDetalles(id);
  }
}

// ----------------------------- VISTA -----------------------------
function activarVista(nombreVista) {
  const secciones = document.querySelectorAll('[data-view-section]');
  secciones.forEach((sec) => {
    if (sec.dataset.viewSection === nombreVista) {
      sec.classList.add('vista-activa');
    } else {
      sec.classList.remove('vista-activa');
    }
  });
  
  // Actualizar botones activos
  const botones = document.querySelectorAll('[data-view]');
  botones.forEach((btn) => {
    if (btn.dataset.view === nombreVista) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ----------------------------- INIT -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCreacion();
  initBusqueda();
  handleHash();

  // Event listeners para perfiles publicados
  const publicados = document.querySelector("#resultado-div");
  if (publicados) {
    publicados.addEventListener("click", e => {
      manejarDetalles(e);
      manejarSolicitud(e);
    });
  }

  // Event listeners para resultados de búsqueda
  const resultados = document.querySelector("#resultados-busqueda");
  if (resultados) {
    resultados.addEventListener("click", e => {
      manejarDetalles(e);
      manejarSolicitud(e);
    });
  }

  // Event listener para el contenedor de detalles
  const detalles = document.querySelector("#detalle-mascota");
  if (detalles) {
    detalles.addEventListener("click", e => {
      manejarSolicitud(e);
    });
  }

  // Activar vista por defecto
  activarVista('crear');

  // Manejar clicks en navbar para cambiar vista
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;
    const vista = btn.getAttribute('data-view');
    if (vista) {
      activarVista(vista);
    }
  });

  window.addEventListener("hashchange", handleHash);
});
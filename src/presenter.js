import { crearperfil, cargarPerfilesGuardados } from "./crearperfilmascota/perfilmascota";
import { EnviarSolicitudAdopcion } from "./adopcion";
import { renderDetalles, obtenerMascotaPorId } from "./mostrardetallesmascota/mostraDetalles.js";
import { perfilAHTML } from "./crearperfilmascota/perfilesenHTML.js";
import {
  STORAGE_KEY,
  leerRepositorio,
  escribirRepositorio,
  asegurarIds,
  renderPublicados,
  initCreacion,
} from "./presenter/creacionPresenter.js";
import {
  buscar,
  renderResultados,
  initBusqueda as initBusquedaDesdePresenter,
} from "./presenter/busquedaPresenter.js";

// ----------------------------- DETALLES -----------------------------
function mostrarDetalles(id) {
  const repo = leerRepositorio();
  const mascota = obtenerMascotaPorId(id, repo);
  const html = renderDetalles(mascota);
  const destino = document.querySelector("#detalle-mascota");
  if (destino) destino.innerHTML = html;
}

function handleHash() {
  const m = location.hash.match(/^#\/mascota\/(.+)$/);
  if (m) {
    // Asegura que la vista de perfiles esté activa cuando se navega a un detalle
    activarVista('perfiles');
    mostrarDetalles(m[1]);
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
}

// ----------------------------- INIT -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCreacion();
  initBusquedaDesdePresenter(mostrarDetalles);
  handleHash();

  const publicados = document.querySelector("#resultado-div");
  if (publicados) {
    publicados.addEventListener("click", e => {
      const btnDetalles = e.target.closest(".ver-detalles");
      if (btnDetalles) {
        const id = btnDetalles.getAttribute("data-id");
        mostrarDetalles(id);
      }
      const btnSolicitud = e.target.closest(".btn-solicitud");
      if (btnSolicitud) {
        const msg = btnSolicitud.nextElementSibling;
        if (msg) msg.textContent = EnviarSolicitudAdopcion();
      }
    });
  }

  const resultados = document.querySelector("#resultados-busqueda");
  if (resultados) {
    resultados.addEventListener("click", e => {
      const btnDetalles = e.target.closest(".ver-detalles");
      if (btnDetalles) {
        const id = btnDetalles.getAttribute("data-id");
        mostrarDetalles(id);
      }
      const btnSolicitud = e.target.closest(".btn-solicitud");
      if (btnSolicitud) {
        const msg = btnSolicitud.nextElementSibling;
        if (msg) msg.textContent = EnviarSolicitudAdopcion();
      }
    });
  }

  // Activar vista por defecto
  activarVista('perfiles');

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

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
import { mostrarDetalles, handleHash as handleHashDesdePresenter } from "./presenter/detallePresenter.js";

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

// ----------------------------- EVENTOS LISTAS -----------------------------
function wireEventosPublicados() {
  const publicados = document.querySelector("#resultado-div");
  if (!publicados) return;
  publicados.addEventListener("click", (e) => {
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

function wireEventosResultadosBusqueda() {
  const resultados = document.querySelector("#resultados-busqueda");
  if (!resultados) return;
  resultados.addEventListener("click", (e) => {
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

// ----------------------------- INIT -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCreacion();
  initBusquedaDesdePresenter(mostrarDetalles);
  handleHashDesdePresenter(activarVista);

  wireEventosPublicados();
  wireEventosResultadosBusqueda();

  // Activar vista por defecto (aunque aún no ocultamos secciones por CSS)
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

  window.addEventListener("hashchange", () => handleHashDesdePresenter(activarVista));
});

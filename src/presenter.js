import { crearperfil, cargarPerfilesGuardados, leerPerfiles } from "./crearperfilmascota/perfilmascota";
import { EnviarSolicitudAdopcion } from "./adopcion";
import { renderDetalles, obtenerMascotaPorId } from "./mostrardetallesmascota/mostraDetalles.js";
import { perfilAHTML } from "./crearperfilmascota/perfilesenHTML.js";

// ----------------------------- CREACIÓN PERFIL -----------------------------
async function renderPublicados() {
  const salida = document.querySelector("#resultado-div");
  if (!salida) return;
  const perfiles = await leerPerfiles();
  salida.innerHTML = perfiles.length
    ? perfiles.map(perfilAHTML).join("")
    : "No hay perfiles publicados.";
}

function initCreacion() {
  const form = document.querySelector("#perfil-form");
  if (!form) return;
  renderPublicados();

  form.addEventListener("submit", async e => {
    e.preventDefault();
    await crearperfil(
      form.querySelector("#nombre-mascota")?.value,
      form.querySelector("#edad-mascota")?.value,
      form.querySelector("#raza-mascota")?.value,
      form.querySelector("#imagen-mascota")?.value,
      form.querySelector("#especie-mascota")?.value,
      form.querySelector("#sexo-mascota")?.value,
      form.querySelector("#vacunas-mascota")?.value
    );
    form.reset();
    await renderPublicados();
  });
}

// ----------------------------- BÚSQUEDA -----------------------------
function buscar(perfiles, { edad, raza, especie }) {
  const edadVal = edad?.trim();
  const razaVal = raza?.trim().toLowerCase();
  const especieVal = especie?.trim().toLowerCase();
  return perfiles.filter(p => {
    const edadOk = edadVal ? String(p.edad) === String(edadVal) : false;
    const razaOk = razaVal ? (p.raza || "").trim().toLowerCase() === razaVal : false;
    const especieOk = especieVal ? (p.especie || "").trim().toLowerCase() === especieVal : false;
    return edadOk || razaOk || especieOk;
  });
}

function renderResultados(resultados) {
  const cont = document.querySelector("#resultados-busqueda");
  if (!cont) return;
  cont.innerHTML = resultados.length
    ? resultados.map(p => `
      <div class="tarjeta-mascota" data-id="${p.id}">
        <h3>${p.nombre}</h3>
        <p>Edad: ${p.edad} años</p>
        <p>Raza: ${p.raza || ""}</p>
        <p>Especie: ${p.especie || ""}</p>
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
        <button type="button" class="ver-detalles" data-id="${p.id}">Ver detalles</button>
      </div>
    `).join("")
    : "No se encontraron mascotas con esos datos.";
}

function initBusqueda() {
  const form = document.querySelector("#buscar-form");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const perfiles = await leerPerfiles();
    const resultados = buscar(perfiles, {
      edad: form.querySelector("#buscar-edad")?.value,
      raza: form.querySelector("#buscar-raza")?.value,
      especie: form.querySelector("#buscar-especie")?.value
    });
    renderResultados(resultados);
  });

  // Delegación para detalles
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
async function mostrarDetalles(id) {
  const perfiles = await leerPerfiles();
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
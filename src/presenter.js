import { crearperfil, cargarPerfilesGuardados } from "./crearperfilmascota/perfilmascota";
import { EnviarSolicitudAdopcion } from "./adopcion";
import { renderDetalles, obtenerMascotaPorId } from "./mostrardetallesmascota/mostraDetalles.js";
import { perfilAHTML } from "./crearperfilmascota/perfilesenHTML.js";

// ----------------------------- REPOSITORIO -----------------------------
const STORAGE_KEY = "perfilesMascotas";

function leerRepositorio() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    const list = raw ? JSON.parse(raw) : [];
    return asegurarIds(list);
  } catch {
    return [];
  }
}

function escribirRepositorio(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {}
}

function asegurarIds(lista) {
  let cambiado = false;
  lista.forEach(p => {
    if (!p.id) {
      p.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      cambiado = true;
    }
  });
  if (cambiado) escribirRepositorio(lista);
  return lista;
}

// ----------------------------- CREACIÓN PERFIL -----------------------------
function renderPublicados() {
  const salida = document.querySelector("#resultado-div");
  if (!salida) return;
  const repo = leerRepositorio();
  salida.innerHTML = repo.length
    ? repo.map(perfilAHTML).join("")
    : "No hay perfiles publicados.";
}

function initCreacion() {
  const form = document.querySelector("#perfil-form");
  if (!form) return;
  renderPublicados();

  form.addEventListener("submit", e => {
    e.preventDefault();
    // crearperfil ya debería guardar en localStorage; si no, ajustar allí.
    crearperfil(
      form.querySelector("#nombre-mascota")?.value,
      form.querySelector("#edad-mascota")?.value,
      form.querySelector("#raza-mascota")?.value,
      form.querySelector("#imagen-mascota")?.value,
      form.querySelector("#especie-mascota")?.value,
      form.querySelector("#sexo-mascota")?.value,
      form.querySelector("#vacunas-mascota")?.value
    );
    form.reset();
    renderPublicados();
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
  form.addEventListener("submit", e => {
    e.preventDefault();
    const repo = leerRepositorio();
    const resultados = buscar(repo, {
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
          mostrarDetalles(id);
        }
      }
    });
  }
}

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
  if (m) mostrarDetalles(m[1]);
}

// ----------------------------- INIT -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCreacion();
  initBusqueda();
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

  window.addEventListener("hashchange", handleHash);
});

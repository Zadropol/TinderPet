import { renderDetalles, obtenerMascotaPorId } from "./mostraDetalles";

function cargarRepositorio() {
  const key = "perfilesMascotas";
  const perfilesJSON = localStorage.getItem(key);
  let data = [];
  try {
    data = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  } catch {
    data = [];
  }
  // Asegurar IDs y persistir si faltan
  let changed = false;
  data.forEach((p) => {
    if (!p.id) {
      p.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      changed = true;
    }
  });
  if (changed) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }
  return data;
}

function mostrarDetallesPorId(id) {
  const repo = cargarRepositorio();
  const mascota = obtenerMascotaPorId(id, repo);
  const html = renderDetalles(mascota);
  const container = document.querySelector("#detalle-mascota");
  if (container) container.innerHTML = html;
}

// Render de resultados con botón Ver detalles
function renderResultados(resultados) {
  const cont = document.querySelector("#resultados-busqueda");
  if (!cont) return;
  cont.innerHTML = resultados.length
    ? resultados
        .map(
          (p) => `
        <div class="resultado-item" data-id="${p.id ?? ""}">
          <span>Nombre: ${p.nombre ?? ""}</span> - <span>Edad: ${p.edad ?? ""} años</span> - <span>Raza: ${p.raza ?? ""}</span>
          <button type="button" class="ver-detalles" data-id="${p.id ?? ""}">Ver detalles</button>
        </div>`
        )
        .join("")
    : "No se encontraron mascotas con esos datos.";
}

// Interceptar submit de búsqueda y asegurar botones Ver detalles
const formBuscar = document.querySelector("#buscar-form");
if (formBuscar) {
  formBuscar.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation && e.stopImmediatePropagation();
      const edadBuscada = document.querySelector("#buscar-edad")?.value;
      const razaBuscada = document.querySelector("#buscar-raza")?.value?.trim().toLowerCase();
      const repo = cargarRepositorio();
      const resultados = repo.filter((p) => {
        const edadCoincide = edadBuscada ? String(p.edad) === String(edadBuscada) : false;
        const razaCoincide = razaBuscada ? p.raza && p.raza.trim().toLowerCase() === razaBuscada : false;
        return edadCoincide || razaCoincide;
      });
      renderResultados(resultados);
    },
    true
  );
}

// Delegación de eventos en resultados de búsqueda
const resultados = document.querySelector("#resultados-busqueda");
if (resultados) {
  resultados.addEventListener("click", (e) => {
    const btn = e.target.closest(".ver-detalles");
    if (btn) {
      const id = btn.getAttribute("data-id");
      if (id) {
        // actualizar hash para permitir deep-link
        location.hash = `#/mascota/${id}`;
        mostrarDetallesPorId(id);
      }
    }
  });
}

// Soporte de deep-link por hash
function handleHashChange() {
  const match = location.hash.match(/^#\/mascota\/(.+)$/);
  if (match && match[1]) {
    mostrarDetallesPorId(match[1]);
  }
}
window.addEventListener("hashchange", handleHashChange);
// Carga inicial
handleHashChange();

// Observador para asegurar que existan botones "Ver detalles" aunque otro presenter renderice
(function ensureEnhancement() {
  const cont = document.querySelector("#resultados-busqueda");
  if (!cont) return;
  let enhancing = false;
  const obs = new MutationObserver(() => {
    if (enhancing) return;
    const hasButtons = cont.querySelector(".ver-detalles");
    if (!hasButtons) {
      const edadBuscada = document.querySelector("#buscar-edad")?.value;
      const razaBuscada = document.querySelector("#buscar-raza")?.value?.trim().toLowerCase();
      const repo = cargarRepositorio();
      const nuevos = repo.filter((p) => {
        const edadCoincide = edadBuscada ? String(p.edad) === String(edadBuscada) : false;
        const razaCoincide = razaBuscada ? p.raza && p.raza.trim().toLowerCase() === razaBuscada : false;
        return edadCoincide || razaCoincide;
      });
      enhancing = true;
      renderResultados(nuevos);
      enhancing = false;
    }
  });
  obs.observe(cont, { childList: true, subtree: true });
})();

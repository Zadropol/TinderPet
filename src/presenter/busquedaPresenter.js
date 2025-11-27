import { leerPerfiles } from "../crearperfilmascota/perfilmascota";


function buscar(perfiles, { edad, raza, especie }) {
  const edadVal = edad?.trim();
  const razaVal = raza?.trim().toLowerCase();
  const especieVal = especie?.trim().toLowerCase();
  return perfiles.filter((p) => {
    const edadOk = edadVal ? String(p.edad) === String(edadVal) : false;
    const razaOk = razaVal ? (p.raza || "").trim().toLowerCase().includes(razaVal): false;
    const especieOk = especieVal
      ? (p.especie || "").trim().toLowerCase() === especieVal
      : false;
    return edadOk || razaOk || especieOk;
  });
}

function renderResultados(resultados) {
  const cont = document.querySelector("#resultados-busqueda");
  if (!cont) return;
  cont.innerHTML = resultados.length
    ? resultados
        .map(
          (p) => `
      <div class="tarjeta-mascota" data-id="${p.id}">
        <h3>${p.nombre}</h3>
        <p>Edad: ${p.edad} años</p>
        <p>Raza: ${p.raza || ""}</p>
        <p>Especie: ${p.especie || ""}</p>
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
        <button type="button" class="ver-detalles" data-id="${p.id}">Ver detalles</button>
      </div>
    `
        )
        .join("")
    : "No se encontraron mascotas con esos datos.";
}

function initBusqueda(mostrarDetalles) {
  const form = document.querySelector("#buscar-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const repo = leerPerfiles();
    const resultados = buscar(repo, {
      edad: form.querySelector("#buscar-edad")?.value,
      raza: form.querySelector("#buscar-raza")?.value,
      especie: form.querySelector("#buscar-especie")?.value,
    });
    renderResultados(resultados);
  });

  const cont = document.querySelector("#resultados-busqueda");
  if (cont) {
    cont.addEventListener("click", (e) => {
      const btn = e.target.closest(".ver-detalles");
      if (btn) {
        const id = btn.getAttribute("data-id");
        if (id) {
          location.hash = `#/mascota/${id}`;
          if (mostrarDetalles) {
            mostrarDetalles(id);
          }
        }
      }
    });
  }
}

export { buscar, renderResultados, initBusqueda };

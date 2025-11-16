document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("buscar-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const edadBuscada = (document.getElementById("buscar-edad")?.value || "").trim();
    const razaBuscada = (document.getElementById("buscar-raza")?.value || "").trim().toLowerCase();
    const especieBuscada = (document.getElementById("buscar-especie")?.value || "").trim().toLowerCase();

    const perfilesJSON = localStorage.getItem("perfilesMascotas");
    const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];

    const resultados = perfiles.filter((p) => {
      const edadOk = edadBuscada ? String(p.edad) === String(edadBuscada) : false;
      const razaOk = razaBuscada ? (p.raza || "").trim().toLowerCase() === razaBuscada : false;
      const especieOk = especieBuscada ? (p.especie || "").trim().toLowerCase() === especieBuscada : false;
      return edadOk || razaOk || especieOk;
    });

    const cont = document.getElementById("resultados-busqueda");
    if (!cont) return;

    cont.innerHTML = resultados.length
      ? resultados
          .map(
            (p) => `
          <div class="tarjeta-mascota">
            <h3>${p.nombre}</h3>
            <p>Edad: ${p.edad} años</p>
            <p>Raza: ${p.raza || ""}</p>
            <p>Especie: ${p.especie || ""}</p>
            <p>Sexo: ${p.sexo || ""}</p>
            <p>Vacunas: ${p.vacunas || ""}</p>
            ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
          </div>`
          )
          .join("")
      : "No se encontraron mascotas con esos datos.";
  });
});
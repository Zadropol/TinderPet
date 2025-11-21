// Genera HTML de un perfil individual
export function perfilAHTML(p) {
  if (!p) return "";
  return `
  <div class="tarjeta-mascota" data-id="${p.id || ""}">
    <h3>${p.nombre || ""}</h3>
    <p>Edad: ${p.edad ?? ""} años</p>
    <p>Raza: ${p.raza || ""}</p>
    <p>Especie: ${p.especie || ""}</p>
    <p>Sexo: ${p.sexo || ""}</p>
    <p>Vacunas: ${p.vacunas || ""}</p>
    ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
    <button type="button" class="ver-detalles-publicado" data-id="${p.id || ""}">Ver detalles</button>
  </div>`;
}

// Genera HTML de múltiples perfiles
export function generarHTMLPerfiles(perfiles = []) {
  return perfiles.map(perfilAHTML).join("");
}

// Alias para compatibilidad previa (un perfil)
export function generarPerfilenHTML(perfil) {
  return perfilAHTML(perfil);
}
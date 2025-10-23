// Funciones para mostrar detalles de una mascota

function obtenerMascotaPorId(id, repo) {
  if (!id || !Array.isArray(repo)) return null;
  const found = repo.find(p => String(p.id) === String(id));
  return found || null;
}

function formatearVacunas(vacunas) {
  if (!vacunas || (Array.isArray(vacunas) && vacunas.length === 0)) return "No registradas";
  if (Array.isArray(vacunas)) return vacunas.join(", ");
  if (typeof vacunas === "string" && vacunas.trim().length > 0) return vacunas.trim();
  return "No registradas";
}

function formatearHistorial(historial) {
  if (!historial || (Array.isArray(historial) && historial.length === 0)) return "Sin historial disponible";
  if (Array.isArray(historial)) return historial.join(", ");
  return String(historial);
}

function renderDetalles(mascota) {
  if (!mascota) {
    return `<div id="detalle-mascota"><p data-testid="detalle-error">Mascota no encontrada</p></div>`;
  }
  const vacunasFmt = formatearVacunas(mascota.vacunas);
  const historialFmt = formatearHistorial(mascota.historial);
  return `
  <div>
    <h2 data-testid="detalle-nombre">${mascota.nombre ?? ""}</h2>
    <p data-testid="detalle-edad">Edad: ${mascota.edad ?? ""}</p>
    <p data-testid="detalle-raza">Raza: ${mascota.raza ?? ""}</p>
    <p data-testid="detalle-especie">Especie: ${mascota.especie ?? ""}</p>
    <p data-testid="detalle-sexo">Sexo: ${mascota.sexo ?? ""}</p>
    <p data-testid="detalle-vacunas">Vacunas: ${vacunasFmt}</p>
    <p data-testid="detalle-historial">Historial: ${historialFmt}</p>
    ${mascota.imagen ? `<img data-testid="detalle-imagen" src="${mascota.imagen}" alt="${mascota.nombre ?? "mascota"}"/>` : ""}
  </div>`;
}

export { obtenerMascotaPorId, formatearVacunas, formatearHistorial, renderDetalles };

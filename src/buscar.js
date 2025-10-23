/**
 * Busca mascotas por edad en el localStorage.
 * @param {number|string} edadBuscada
 * @returns {Array<Object>}
 */
function buscarPorEdad(edadBuscada) {
  const perfilesJSON = localStorage.getItem("perfilesMascotas");
  const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  return perfiles.filter(p => String(p.edad) === String(edadBuscada));
}

function buscarPorRaza(razaBuscada) {
  const perfilesJSON = localStorage.getItem("perfilesMascotas");
  const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  return perfiles.filter(p => p.raza.toLowerCase() === razaBuscada.toLowerCase());
}

export { buscarPorEdad, buscarPorRaza };
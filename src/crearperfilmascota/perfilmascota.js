import { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles, usarRepositorioTest } from "./datosperfil.js";
import { perfilAHTML } from "./perfilesenHTML.js";

async function crearperfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
  const perfil = crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas);
  await guardarPerfiles(perfil);

  return perfil;
}

async function leerPerfiles() {
  return await obtenerPerfiles();
}

async function cargarPerfilesGuardados() {
  const perfiles = await obtenerPerfiles();
  return perfiles.map(perfilAHTML).join("");
}

export { crearperfil, cargarPerfilesGuardados, leerPerfiles, usarRepositorioTest };

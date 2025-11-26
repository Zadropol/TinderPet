import { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles,} from "./datosperfil.js";
import { perfilAHTML } from "./perfilesenHTML.js";

function crearperfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
  const perfil = crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas);
  guardarPerfiles(perfil);

  return perfil;
}

function leerPerfiles() {
  return obtenerPerfiles();
}

function cargarPerfilesGuardados() {
  const perfiles = obtenerPerfiles();
  return perfiles.map(perfilAHTML).join("");
}

export { crearperfil, cargarPerfilesGuardados, leerPerfiles};

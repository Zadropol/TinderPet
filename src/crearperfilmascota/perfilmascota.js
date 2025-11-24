import { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles } from './datosperfil.js';
import { generarHTMLPerfiles, generarPerfilenHTML, perfilAHTML } from "./perfilesenHTML.js";

const STORAGE_KEY = "perfilesMascotas";

function leerPerfiles() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}

function escribirPerfiles(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function crearperfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
  const perfiles = leerPerfiles();
  const perfil = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nombre: (nombre || "").trim(),
    edad: edad ? Number(edad) : "",
    raza: (raza || "").trim(),
    imagen: (imagen || "").trim(),
    especie: (especie || "").trim(),
    sexo: (sexo || "").trim(),
    vacunas: (vacunas || "").trim()
  };
  perfiles.push(perfil);
  escribirPerfiles(perfiles);
  // HTML mínimo para mantener tests antiguos
  const htmlLegacy =
    `Nombre: ${perfil.nombre} Edad: ${perfil.edad} años Raza: ${perfil.raza}` +
    (perfil.imagen ? ` <img src="${perfil.imagen}" alt="${perfil.nombre}"/>` : "");
  return htmlLegacy;
}

function cargarPerfilesGuardados() {
  const perfiles = leerPerfiles();
  return perfiles.map(perfilAHTML).join("");
}

export { crearperfil, cargarPerfilesGuardados, leerPerfiles };
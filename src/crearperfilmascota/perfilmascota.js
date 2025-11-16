import { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles } from './datosperfil.js';
import { generarHTMLPerfiles } from './perfilesenHTML.js';

function crearperfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
    const nuevoPerfil = crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas);

    let perfilesExistentes = obtenerPerfiles();

    perfilesExistentes.push(nuevoPerfil);

    guardarPerfiles(perfilesExistentes);

    return generarHTMLPerfiles(perfilesExistentes);
}


function cargarPerfilesGuardados() {
    const perfilesExistentes = obtenerPerfiles();
    return generarHTMLPerfiles(perfilesExistentes);
}

export { crearperfil, cargarPerfilesGuardados };
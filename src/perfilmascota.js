/**
 * @param {string} nombre
 * @param {number} edad
 * @param {string} raza
 * @param {string} imagen
 * @returns {string}
 */
function crearperfil(nombre, edad, raza, imagen) {
    const nuevoPerfil = {
        nombre: nombre,
        edad: edad,
        raza: raza,
        imagen: imagen
    };

    const perfilesExistentesJSON = localStorage.getItem('perfilesMascotas');
    let perfilesExistentes = perfilesExistentesJSON ? JSON.parse(perfilesExistentesJSON) : [];

    perfilesExistentes.push(nuevoPerfil);

    localStorage.setItem('perfilesMascotas', JSON.stringify(perfilesExistentes));

    return generarHTMLPerfiles(perfilesExistentes);
}

/**
 *
 * @param {Array<Object>} perfiles
 * @returns {string}
 */
function generarHTMLPerfiles(perfiles) {
    return perfiles.map(perfil => {
        return `<div>
                    Nombre: ${perfil.nombre}
                    Edad: ${perfil.edad} años
                    Raza: ${perfil.raza}
                    Imagen: <img src="${perfil.imagen}" alt="${perfil.nombre}"/>
                </div>`;
    }).join('');
}

/**
 * @returns {string}
 */
function cargarPerfilesGuardados() {
    const perfilesExistentesJSON = localStorage.getItem('perfilesMascotas');
    const perfilesExistentes = perfilesExistentesJSON ? JSON.parse(perfilesExistentesJSON) : [];
    
    return generarHTMLPerfiles(perfilesExistentes);
}

export { crearperfil, cargarPerfilesGuardados };
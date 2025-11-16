
function crearperfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
    const nuevoPerfil = crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas);

    let perfilesExistentes = obtenerPerfiles();

    perfilesExistentes.push(nuevoPerfil);

    guardarPerfiles(perfilesExistentes);

    return generarHTMLPerfiles(perfilesExistentes);
}

function crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
    return {
        id: generarId(),
        nombre,
        edad,
        raza,
        imagen,
        especie,
        sexo,
        vacunas
    };
}

function generarId(){
    return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}

function obtenerPerfiles(){
    const perfilesJSON = localStorage.getItem('perfilesMascotas');
    return perfilesJSON ? JSON.parse(perfilesJSON) : [];
}

function guardarPerfiles(perfiles){
    localStorage.setItem('perfilesMascotas', JSON.stringify(perfiles));
}


function generarHTMLPerfiles(perfiles) {
    return perfiles.map(generarPerfilenHTML).join('');
}


function generarPerfilenHTML(perfil){
    return `<div>
                Nombre: ${perfil.nombre}
                Edad: ${perfil.edad} años
                Raza: ${perfil.raza}
                Imagen: <img src="${perfil.imagen}" alt="${perfil.nombre}"/>
                <button class="btn-solicitud">Enviar Solicitud</button>
                <p class="mensaje-solicitud"></p>
            </div>`;
}

function cargarPerfilesGuardados() {
    const perfilesExistentes = obtenerPerfiles();
    return generarHTMLPerfiles(perfilesExistentes);
}

export { crearperfil, cargarPerfilesGuardados };
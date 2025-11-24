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

export { crearObjetoPerfil, generarId, obtenerPerfiles, guardarPerfiles };


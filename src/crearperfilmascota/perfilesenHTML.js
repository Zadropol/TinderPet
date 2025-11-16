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

export { generarHTMLPerfiles, generarPerfilenHTML };
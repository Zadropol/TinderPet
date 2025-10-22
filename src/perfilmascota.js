function crearperfil(nombre, edad, raza, imagen) {
  return `Nombre: ${nombre} Edad: ${edad} años Raza: ${raza} Imagen: <img src="${imagen}" alt="${nombre}" />`;
}

export default crearperfil;
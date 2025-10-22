import { crearperfil, cargarPerfilesGuardados } from "./perfilmascota";

const name = document.querySelector("#nombre-mascota");
const age = document.querySelector("#edad-mascota");
const raza = document.querySelector("#raza-mascota");
const imagen = document.querySelector("#imagen-mascota");
const especie = document.querySelector("#especie-mascota");
const form = document.querySelector("#perfil-form");
const divResultado = document.querySelector("#resultado-div");

divResultado.innerHTML = cargarPerfilesGuardados();
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const NombreMascota = name.value;
  const EdadMascota = age.value;
  const RazaMascota = raza.value;
  const ImagenMascota = imagen.value;
  const EspecieMascota = especie.value;

  divResultado.innerHTML = crearperfil(NombreMascota,EdadMascota,RazaMascota,ImagenMascota,EspecieMascota);
  form.reset();
});

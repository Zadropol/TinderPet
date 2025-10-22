import crearperfil from "./perfilmascota";

const name = document.querySelector("#nombre-mascota");
const age = document.querySelector("#edad-mascota");
const form = document.querySelector("#perfil-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const NombreMascota = name.value;
  const EdadMascota = age.value;

  div.innerHTML = "<p>" + crearperfil(NombreMascota,EdadMascota) + "</p>";
});

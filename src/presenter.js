import crearperfil from "./perfilmascota";

const name = document.querySelector("#nombre-mascota");
const age = document.querySelector("#edad-mascota");
const raza = document.querySelector("#raza-mascota");
const form = document.querySelector("#perfil-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const NombreMascota = name.value;
  const EdadMascota = age.value;
  const RazaMascota = raza.value;

  div.innerHTML = "<p>" + crearperfil(NombreMascota,EdadMascota,RazaMascota) + "</p>";
});

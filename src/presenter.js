import { EnviarSolicitudAdopcion } from "./adopcion";
import { crearperfil, cargarPerfilesGuardados } from "./perfilmascota";

const name = document.querySelector("#nombre-mascota");
const age = document.querySelector("#edad-mascota");
const raza = document.querySelector("#raza-mascota");
const imagen = document.querySelector("#imagen-mascota");
const especie = document.querySelector("#especie-mascota");
const sexo = document.querySelector("#sexo-mascota");
const vacunas = document.querySelector("#vacunas-mascota");
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
  const SexoMascota = sexo.value;
  const VacunasMascota = vacunas.value;

  divResultado.innerHTML = crearperfil(NombreMascota,EdadMascota,RazaMascota,ImagenMascota,EspecieMascota,SexoMascota,VacunasMascota);
  form.reset();

  agregarEventosBotones();
});

function agregarEventosBotones() {
  const botones = document.querySelectorAll(".btn-solicitud");
  botones.forEach((boton) => {
    boton.onclick = () => {
      const mensajeParrafo = boton.nextElementSibling;
      mensajeParrafo.textContent = EnviarSolicitudAdopcion();
      mensajeParrafo.classList.add("mostrar");

      setTimeout(() => {
        mensajeParrafo.classList.remove("mostrar");
      }, 3000);   
    };
  });
}
agregarEventosBotones();



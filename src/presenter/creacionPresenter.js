// import { crearperfil } from "../crearperfilmascota/perfilmascota.js";
// import { perfilAHTML } from "../crearperfilmascota/perfilesenHTML.js";

// const STORAGE_KEY = "perfilesMascotas";

// function leerRepositorio() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   try {
//     const list = raw ? JSON.parse(raw) : [];
//     return asegurarIds(list);
//   } catch {
//     return [];
//   }
// }

// function escribirRepositorio(lista) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
//   } catch {}
// }

// function asegurarIds(lista) {
//   let cambiado = false;
//   lista.forEach((p) => {
//     if (!p.id) {
//       p.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
//       cambiado = true;
//     }
//   });
//   if (cambiado) escribirRepositorio(lista);
//   return lista;
// }

// function renderPublicados() {
//   const salida = document.querySelector("#resultado-div");
//   if (!salida) return;
//   const repo = leerRepositorio();
//   salida.innerHTML = repo.length
//     ? repo.map(perfilAHTML).join("")
//     : "No hay perfiles publicados.";
// }

// function initCreacion() {
//   const form = document.querySelector("#perfil-form");
//   if (!form) return;
//   renderPublicados();

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     crearperfil(
//       form.querySelector("#nombre-mascota")?.value,
//       form.querySelector("#edad-mascota")?.value,
//       form.querySelector("#raza-mascota")?.value,
//       form.querySelector("#imagen-mascota")?.value,
//       form.querySelector("#especie-mascota")?.value,
//       form.querySelector("#sexo-mascota")?.value,
//       form.querySelector("#vacunas-mascota")?.value
//     );
//     form.reset();
//     renderPublicados();
//   });
// }

// export {
//   STORAGE_KEY,
//   leerRepositorio,
//   escribirRepositorio,
//   asegurarIds,
//   renderPublicados,
//   initCreacion,
// };

import { leerRepositorio } from "./creacionPresenter.js";
import { renderDetalles, obtenerMascotaPorId } from "../mostrardetallesmascota/mostraDetalles.js";

function mostrarDetalles(id) {
  const repo = leerRepositorio();
  const mascota = obtenerMascotaPorId(id, repo);
  const html = renderDetalles(mascota);
  const destino = document.querySelector("#detalle-mascota");
  if (destino) destino.innerHTML = html;
}

function handleHash(activarVista) {
  const m = location.hash.match(/^#\/mascota\/(.+)$/);
  if (m) {
    if (activarVista) {
      activarVista("perfiles");
    }
    mostrarDetalles(m[1]);
  }
}

export { mostrarDetalles, handleHash };
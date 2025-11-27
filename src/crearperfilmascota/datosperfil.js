// const API_URL = "http://localhost:3000/perfiles"; // ¡Eliminado!

const STORAGE_KEY = "perfilesMascotas"; // Clave de localStorage

function _leerRepositorio() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    const list = raw ? JSON.parse(raw) : [];
    return _asegurarIds(list);
  } catch (error) {
    console.error("Error al leer de localStorage:", error);
    return [];
  }
}

function _escribirRepositorio(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch (error) {
    console.error("Error al escribir en localStorage:", error);
  }
}

function _asegurarIds(lista) {
  let cambiado = false;
  lista.forEach((p) => {
    // Generar un ID único simple si no existe
    if (!p.id) {
      p.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      cambiado = true;
    }
  });
  if (cambiado) _escribirRepositorio(lista);
  return lista;
}

function crearObjetoPerfil(nombre, edad, raza, imagen, especie, sexo, vacunas) {
  return {
    nombre,
    edad,
    raza,
    imagen,
    especie,
    sexo,
    vacunas,
    // El id se asignará al guardar
  };
}

// Ahora es síncrona
function obtenerPerfiles() {
  return _leerRepositorio();
}

// Ahora es síncrona
function guardarPerfiles(perfil) {
  const perfiles = _leerRepositorio();
  
  // Asignar ID si no tiene (aunque _asegurarIds ya lo hace, lo hacemos aquí por si acaso)
  if (!perfil.id) {
    perfil.id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
  
  perfiles.push(perfil);
  _escribirRepositorio(perfiles);
  return perfil;
}

// Se elimina usarRepositorioTest
export { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles };
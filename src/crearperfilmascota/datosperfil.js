const API_URL = "http://localhost:1234/perfiles";

const _testRepo = [];
let _isTest = false;

function usarRepositorioTest(valor = true) {
  _isTest = valor;
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
  };
}

async function obtenerPerfiles() {
    if (_isTest) 
    {
        return _testRepo;
    } 
    else 
    {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener perfiles desde la DB");
        const data = await res.json();
        return data;
    } 
}

async function guardarPerfiles(perfil) {
    if (_isTest)
    {
        _testRepo.push(perfil);
        perfil.id = _testRepo.length; 
        return perfil;
    }


  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perfil),
  });
  if (!res.ok) throw new Error("Error al guardar perfil en la DB");
  const data = await res.json();
  perfil.id = data.perfil.id;
  return perfil;
}

export { crearObjetoPerfil, obtenerPerfiles, guardarPerfiles, usarRepositorioTest };

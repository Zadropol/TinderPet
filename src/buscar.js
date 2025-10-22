document.getElementById("buscar-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const edadBuscada = document.getElementById("buscar-edad").value;
  const perfilesJSON = localStorage.getItem("perfilesMascotas");
  const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  const resultados = perfiles.filter(p => String(p.edad) === String(edadBuscada));
  document.getElementById("resultados-busqueda").innerHTML =
    resultados.length
      ? resultados.map(p => `<div>${p.nombre}</div>`).join("")
      : "No se encontraron mascotas con esa edad.";
});
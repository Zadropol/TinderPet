document.getElementById("buscar-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const edadBuscada = document.getElementById("buscar-edad").value;
  const razaBuscada = document.getElementById("buscar-raza").value.trim().toLowerCase();
  const perfilesJSON = localStorage.getItem("perfilesMascotas");
  const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  const resultados = perfiles.filter(p => {
    const edadCoincide = edadBuscada ? String(p.edad) === String(edadBuscada) : false;
    const razaCoincide = razaBuscada ? p.raza && p.raza.trim().toLowerCase() === razaBuscada : false;
    return edadCoincide || razaCoincide;
  });
  document.getElementById("resultados-busqueda").innerHTML =
    resultados.length
      ? resultados.map(p => `
        <div class="resultado-item" data-id="${p.id ?? ''}">
          <span>Nombre: ${p.nombre}</span> - <span>Edad: ${p.edad} años</span> - <span>Raza: ${p.raza}</span>
          <button type="button" class="ver-detalles" data-id="${p.id ?? ''}">Ver detalles</button>
        </div>`).join("")
      : "No se encontraron mascotas con esos datos.";
});
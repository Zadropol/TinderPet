document.getElementById("buscar-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const edadBuscada = document.getElementById("buscar-edad").value;
  const razaBuscada = document.getElementById("buscar-raza").value.trim().toLowerCase();
  const especieBuscada = document.getElementById("buscar-especie").value.trim().toLowerCase();
  const perfilesJSON = localStorage.getItem("perfilesMascotas");
  const perfiles = perfilesJSON ? JSON.parse(perfilesJSON) : [];
  const resultados = perfiles.filter(p => {
    const edadCoincide = edadBuscada ? String(p.edad) === String(edadBuscada) : false;
    const razaCoincide = razaBuscada ? p.raza && p.raza.trim().toLowerCase() === razaBuscada : false;
    const especieCoincide = especieBuscada ? p.especie && p.especie.trim().toLowerCase() === especieBuscada : false;
    return edadCoincide || razaCoincide || especieCoincide;
  });
  document.getElementById("resultados-busqueda").innerHTML =
    resultados.length
      ? resultados.map(p => `
          <div class="tarjeta-mascota">
            <h3>${p.nombre}</h3>
            <p>Edad: ${p.edad} años</p>
            <p>Raza: ${p.raza}</p>
            <p>Especie: ${p.especie || ""}</p>
            <img src="${p.imagen}" alt="${p.nombre}"/>
          </div>
        `).join("")
      : "No se encontraron mascotas con esos datos.";
});
const form = document.querySelector("#perfil-form");
const divResultado = document.querySelector("#resultado-div");
if (divResultado) divResultado.innerHTML = "";

(function initCrearPerfil() {
  const KEY = "perfilesMascotas";
  function cargarRepo() {
    const raw = localStorage.getItem(KEY);
    try { return raw ? JSON.parse(raw) : []; } catch { return []; }
  }
  function guardarRepo(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
  }
  function genId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  }

  if (!form || form.dataset.tinderpetHandler === "1") return;
  form.dataset.tinderpetHandler = "1";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.querySelector("#nombre-mascota")?.value?.trim() || "";
    const edadVal = document.querySelector("#edad-mascota")?.value;
    const edad = edadVal === undefined || edadVal === null || edadVal === "" ? "" : Number(edadVal);
    const raza = document.querySelector("#raza-mascota")?.value?.trim() || "";
    const imagen = document.querySelector("#imagen-mascota")?.value?.trim() || "";
    const especie = document.querySelector("#especie-mascota")?.value?.trim() || "";
    const sexo = document.querySelector("#sexo-mascota")?.value?.trim() || "";
    const vacunas = document.querySelector("#vacunas-mascota")?.value?.trim() || "";

    const repo = cargarRepo();
    repo.push({ id: genId(), nombre, edad, raza, imagen, especie, sexo, vacunas });
    guardarRepo(repo);

    if (divResultado) divResultado.textContent = "Perfil creado correctamente.";
    form.reset();
  });
})();

global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};

import { buscarPorEdad,buscarPorRaza } from "./buscar";

describe("Buscar mascotas", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("perfilesMascotas", JSON.stringify([
      { nombre: "Firulais", edad: 3, raza: "Pitbull" },
      { nombre: "Michi", edad: 2, raza: "Siames" },
      { nombre: "Rex", edad: 3, raza: "Bulldog" }
    ]));
  });

  it("devuelve solo las mascotas con la edad buscada", () => {
    const resultados = buscarPorEdad(3);
    const nombres = resultados.map(p => p.nombre);
    expect(nombres).toEqual(["Firulais", "Rex"]);
  });

  it("devuelve solo las mascotas con la raza buscada", () => {
    const resultados = buscarPorRaza("Pitbull");
    expect(resultados).toEqual([
      { nombre: "Firulais", edad: 3, raza: "Pitbull" }
    ]);
  });
});
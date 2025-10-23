global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};

import { buscarPorEdad } from "./buscar";

describe("Buscar mascotas por edad", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("perfilesMascotas", JSON.stringify([
      { nombre: "Firulais", edad: 3 },
      { nombre: "Michi", edad: 2 },
      { nombre: "Rex", edad: 3 }
    ]));
  });

  it("devuelve solo las mascotas con la edad buscada", () => {
    const resultados = buscarPorEdad(3);
    const nombres = resultados.map(p => p.nombre);
    expect(nombres).toEqual(["Firulais", "Rex"]);
  });

});
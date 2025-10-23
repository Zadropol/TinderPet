// Mock de localStorage (para Jest sin navegador)
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};

import { crearperfil } from "./perfilmascota";

describe("Crear Perfil", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Debería poder ingresar y mostrar una imagen de la mascota", () => {
    const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl);

    expect(resultado).toContain("Nombre: Firulais");
    expect(resultado).toContain("Edad: 3 años");
    expect(resultado).toContain("Raza: Pitbull");
    expect(resultado).toContain(`<img src="${imageUrl}" alt="Firulais"/>`);
  });
});
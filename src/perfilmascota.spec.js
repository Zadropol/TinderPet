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

<<<<<<< HEAD
  it("Debería poder ingresar y mostrar una imagen de la mascota", () => {
    const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl);

=======
//     it("Deberia poder ingresar y mostrar la edad de la mascota", () => {
//     expect(crearperfil("Firulais", 3)).toEqual("Nombre: Firulais Edad: 3 años");
//   });

//     it("Deberia poder ingresar y mostrar la raza de la mascota", () => {
//     expect(crearperfil("Firulais", 3, "Pitbull")).toEqual("Nombre: Firulais Edad: 3 años Raza: Pitbull");
//   });
  //   it("Deberia poder ingresar y mostrar una imagen de la mascota", () => {
  //       const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
  //       expect(crearperfil("Firulais", 3, "Pitbull", imageUrl)).toEqual("Nombre: Firulais Edad: 3 años Raza: Pitbull Imagen: <img src=\"https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/\" alt=\"Firulais\" />");
  // });

     

    // it("Deberia poder ingresar y mostrar una imagen de la mascota", () => {
    // const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    // const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl);
    // expect(resultado).toContain("Nombre: Firulais");
    // expect(resultado).toContain("Edad: 3 años");
    // expect(resultado).toContain("Raza: Pitbull");
    // expect(resultado).toContain(`<img src="${imageUrl}" alt="Firulais"/>`);

    // it("Deberia poder ingresar la especie de la mascota", () => {
    // const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    // const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl, "Perro");
    // expect(resultado).toContain("Nombre: Firulais");
    // expect(resultado).toContain("Edad: 3 años");
    // expect(resultado).toContain("Raza: Pitbull");
    // expect(resultado).toContain(`<img src="${imageUrl}" alt="Firulais"/>`);

    // it("Deberia poder ingresar el sexo de la mascota", () => {
    // const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    // const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl, "Perro", "Macho");
    // expect(resultado).toContain("Nombre: Firulais");
    // expect(resultado).toContain("Edad: 3 años");
    // expect(resultado).toContain("Raza: Pitbull");
    // expect(resultado).toContain(`<img src="${imageUrl}" alt="Firulais"/>`);

    it("Deberia poder ingresar las vacunas de la mascota", () => {
    const imageUrl = "https://www.adnradio.cl/2024/08/22/que-significa-firulais-el-popular-nombre-que-tienen-muchos-perros-en-el-mundo/";
    const resultado = crearperfil("Firulais", 3, "Pitbull", imageUrl, "Perro", "Macho", "Antirrábica, Parvovirus");
>>>>>>> rama_luci
    expect(resultado).toContain("Nombre: Firulais");
    expect(resultado).toContain("Edad: 3 años");
    expect(resultado).toContain("Raza: Pitbull");
    expect(resultado).toContain(`<img src="${imageUrl}" alt="Firulais"/>`);
  });
});
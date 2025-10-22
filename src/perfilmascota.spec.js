import crearperfil from "./perfilmascota";

describe("Crear Perfil", () => {
  /*it("deberia poder ingresar y mostrar el nombre de la mascota", () => {
    expect(crearperfil("Firulais")).toEqual("Firulais");
  });*/

//     it("Deberia poder ingresar y mostrar la edad de la mascota", () => {
//     expect(crearperfil("Firulais", 3)).toEqual("Nombre: Firulais Edad: 3 años");
//   });

    it("Deberia poder ingresar y mostrar la raza de la mascota", () => {
    expect(crearperfil("Firulais", 3, "Pitbull")).toEqual("Nombre: Firulais Edad: 3 años Raza: Pitbull");
  });
});

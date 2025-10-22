import crearperfil from "./perfilmascota";

describe("Crear Perfil", () => {
  it("deberia poder ingresar el nombre de la mascota", () => {
    expect(crearperfil("Firulais")).toEqual("Firulais");
  });
});

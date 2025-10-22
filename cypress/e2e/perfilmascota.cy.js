describe("Crear Perfil", () => {
  it("Deberia poder ingresar el nombre de la mascota", () => {
    cy.visit("/");
    cy.get("#nombre-mascota").type("Firulais");
  });
});
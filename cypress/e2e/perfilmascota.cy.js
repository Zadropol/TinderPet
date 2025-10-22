describe("Crear Perfil", () => {
  it("Deberia poder ingresar y mostrar el nombre de la mascota", () => {
    cy.visit("/");
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#crear-button").click();
    cy.get("#resultado-div").should("contain", "Firulais");
  });
});
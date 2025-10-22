describe("Crear Perfil", () => {
  /*it("Deberia poder ingresar y mostrar el nombre de la mascota", () => {
    cy.visit("/");
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#crear-button").click();
    cy.get("#resultado-div").should("contain", "Firulais");
  });*/

//   it("Deberia poder ingresar y mostrar la edad de la mascota", () => {
//     cy.visit("/");
//     cy.get("#nombre-mascota").type("Firulais");
//     cy.get("#edad-mascota").type("3");
//     cy.get("#crear-button").click();
//     cy.get("#resultado-div").should("contain", "Nombre: Firulais Edad: 3 años");
//   });

    it("Deberia poder ingresar y mostrar la raza de la mascota", () => {
    cy.visit("/");
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#edad-mascota").type("3");
    cy.get("#raza-mascota").type("Pitbull");
    cy.get("#crear-button").click();
    cy.get("#resultado-div").should("contain", "Nombre: Firulais Edad: 3 años Raza: Pitbull");
  });
});
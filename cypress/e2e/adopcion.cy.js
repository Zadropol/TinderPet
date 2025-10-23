describe("Flujo completo de adopción con múltiples perfiles", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234"); // Ajusta según tu servidor
  });

  it("Cada perfil tiene su propio botón y mensaje independiente", () => {
    // Crear primer perfil
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#edad-mascota").type("3");
    cy.get("#raza-mascota").type("Labrador");
    cy.get("#imagen-mascota").type("img.jpg");
    cy.get("#perfil-form").submit();

    // Crear segundo perfil
    cy.get("#nombre-mascota").type("Luna");
    cy.get("#edad-mascota").type("2");
    cy.get("#raza-mascota").type("Golden");
    cy.get("#imagen-mascota").type("luna.jpg");
    cy.get("#perfil-form").submit();

    // Click en primer perfil
    cy.get(".perfil").eq(0).within(() => {
      cy.get(".btn-solicitud").click();
      cy.get(".mensaje-solicitud").should("contain.text", "Solicitud enviada correctamente");
    });

    // Verificar que el segundo perfil no tenga mensaje aún
    cy.get(".perfil").eq(1).within(() => {
      cy.get(".mensaje-solicitud").should("have.text", "");
    });

    // Click en segundo perfil
    cy.get(".perfil").eq(1).within(() => {
      cy.get(".btn-solicitud").click();
      cy.get(".mensaje-solicitud").should("contain.text", "Solicitud enviada correctamente");
    });
  });
});


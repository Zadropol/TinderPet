// ATDD: Ver detalles de mascota
describe("Ver detalles de mascota - ATDD", () => {
  beforeEach(() => {
    // Asegurar un estado limpio por prueba
    cy.clearLocalStorage();
  });

  it("debe permitir ver la vista de detalles con vacunas e historial", () => {
    cy.visit("/");

    // Crear un perfil básico desde el formulario existente
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#edad-mascota").type("3");
    cy.get("#raza-mascota").type("Pitbull");
    cy.get("#imagen-mascota").type("https://example.com/firu.jpg");
    cy.get("#especie-mascota").type("Perro");
    cy.get("#sexo-mascota").type("Macho");
    cy.get("#vacunas-mascota").type("Antirrábica, Parvovirus");
    cy.get("#crear-button").click();

    // Buscar por raza para listar resultados y obtener el botón Ver detalles
    cy.get("#buscar-raza").type("Pitbull");
    cy.get("#buscar-form button[type=submit]").click();

    // Esperar a que se renderice el resultado con el botón
    cy.get("#resultados-busqueda .ver-detalles", { timeout: 8000 })
      .first()
      .should("be.visible")
      .click();

    // Verificar que el contenedor de detalles muestre los datos
    cy.get("#detalle-mascota").should("exist");
    cy.get("[data-testid=detalle-nombre]").should("contain.text", "Firulais");
    cy.get("[data-testid=detalle-edad]").should("contain.text", "3");
    cy.get("[data-testid=detalle-raza]").should("contain.text", "Pitbull");
    cy.get("[data-testid=detalle-especie]").should("contain.text", "Perro");
    cy.get("[data-testid=detalle-sexo]").should("contain.text", "Macho");
    cy.get("[data-testid=detalle-vacunas]").should("contain.text", "Antirrábica");

    // Historial puede no existir, debe mostrar mensaje de vacío entendible
    cy.get("[data-testid=detalle-historial]").should("contain.text", "Sin historial disponible");
  });
});
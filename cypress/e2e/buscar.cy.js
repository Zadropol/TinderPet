describe("Buscar mascotas por edad", () => {
//   it("debería buscar mascotas por edad", () => {
//     cy.visit("/"); 
//     cy.get("#nombre-mascota").type("Firulais");
//      cy.get("#edad-mascota").type("3");
//      cy.get("#raza-mascota").type("Pitbull");
//      cy.get("#especie-mascota").type("Perro");
//      cy.get("#sexo-mascota").type("Macho");
//      cy.get("#vacunas-mascota").type("Antirrábica, Parvovirus");
//      const imageUrl = "https://www.adnradio.cl/resizer/v2/GKT44IBMHRBXDGPLYLXI3BZGIQ.jpg?auth=31465077e25cf1b49fc838972bf461e863912597a0a39af28d0bc58ee97f0ab0&width=768&height=576&quality=70&smart=true";
//      cy.get("#imagen-mascota").type(imageUrl);
//      cy.get("#crear-button").click();
//     cy.get("#buscar-edad").type("3");
//     cy.get("#buscar-form button[type=submit]").click();

//     cy.get("#resultados-busqueda").should("exist");
//   });
it("debería buscar mascotas por raza", () => {
    cy.visit("/"); 
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#edad-mascota").type("3");
    cy.get("#raza-mascota").type("Pitbull");
    cy.get("#especie-mascota").type("Perro");
    cy.get("#sexo-mascota").type("Macho");
    cy.get("#vacunas-mascota").type("Antirrábica, Parvovirus");
    const imageUrl = "https://www.adnradio.cl/resizer/v2/GKT44IBMHRBXDGPLYLXI3BZGIQ.jpg?auth=31465077e25cf1b49fc838972bf461e863912597a0a39af28d0bc58ee97f0ab0&width=768&height=576&quality=70&smart=true";
    cy.get("#imagen-mascota").type(imageUrl);
    cy.get("#crear-button").click();

    cy.get("#buscar-raza").type("Pitbull");
    cy.get("#buscar-form button[type=submit]").click();
    cy.get("#resultados-busqueda").should("contain", "Nombre: Firulais");
    cy.get("#resultados-busqueda").should("contain", "Edad: 3 años");
    cy.get("#resultados-busqueda").should("contain", "Raza: Pitbull");
  
  });

});
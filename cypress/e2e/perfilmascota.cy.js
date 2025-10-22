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

//     it("Deberia poder ingresar y mostrar la raza de la mascota", () => {
//     cy.visit("/");
//     cy.get("#nombre-mascota").type("Firulais");
//     cy.get("#edad-mascota").type("3");
//     cy.get("#raza-mascota").type("Pitbull");
//     cy.get("#crear-button").click();
//     cy.get("#resultado-div").should("contain", "Nombre: Firulais Edad: 3 años Raza: Pitbull");
//   });

  //   it("Deberia poder ingresar y mostrar una imagen de la mascota", () => {
  //   cy.visit("/");
  //   cy.get("#nombre-mascota").type("Firulais");
  //   cy.get("#edad-mascota").type("3");
  //   cy.get("#raza-mascota").type("Pitbull");
  //   const imageUrl = "https://www.adnradio.cl/resizer/v2/GKT44IBMHRBXDGPLYLXI3BZGIQ.jpg?auth=31465077e25cf1b49fc838972bf461e863912597a0a39af28d0bc58ee97f0ab0&width=768&height=576&quality=70&smart=true";
  //   cy.get("#imagen-mascota").type(imageUrl);
  //   cy.get("#crear-button").click();
  //   cy.get("#resultado-div").should("contain", "Nombre: Firulais Edad: 3 años Raza: Pitbull");
  //   cy.get("#resultado-div").find("img")
  //     .should("have.attr", "src", imageUrl)
  // });

  // it("Deberia poder ingresar la especie de la mascota", () => {
  //    cy.visit("/");
  //    cy.get("#nombre-mascota").type("Firulais");
  //    cy.get("#edad-mascota").type("3");
  //    cy.get("#raza-mascota").type("Pitbull");
  //    cy.get("#especie-mascota").type("Perro");
  //    const imageUrl = "https://www.adnradio.cl/resizer/v2/GKT44IBMHRBXDGPLYLXI3BZGIQ.jpg?auth=31465077e25cf1b49fc838972bf461e863912597a0a39af28d0bc58ee97f0ab0&width=768&height=576&quality=70&smart=true";
  //    cy.get("#imagen-mascota").type(imageUrl);
  //    cy.get("#crear-button").click();
  //    cy.get("#resultado-div").should("contain", "Nombre: Firulais");
  //    cy.get("#resultado-div").should("contain", "Edad: 3 años");
  //     cy.get("#resultado-div").should("contain", "Raza: Pitbull");
  //    cy.get("#resultado-div").find("img")
  //      .should("have.attr", "src", imageUrl);
     
  //  });
  
    it("Deberia poder ingresar el sexo de la mascota", () => {
     cy.visit("/");
     cy.get("#nombre-mascota").type("Firulais");
     cy.get("#edad-mascota").type("3");
     cy.get("#raza-mascota").type("Pitbull");
     cy.get("#especie-mascota").type("Perro");
     cy.get("#sexo-mascota").type("Macho");
     const imageUrl = "https://www.adnradio.cl/resizer/v2/GKT44IBMHRBXDGPLYLXI3BZGIQ.jpg?auth=31465077e25cf1b49fc838972bf461e863912597a0a39af28d0bc58ee97f0ab0&width=768&height=576&quality=70&smart=true";
     cy.get("#imagen-mascota").type(imageUrl);
     cy.get("#crear-button").click();
     cy.get("#resultado-div").should("contain", "Nombre: Firulais");
     cy.get("#resultado-div").should("contain", "Edad: 3 años");
      cy.get("#resultado-div").should("contain", "Raza: Pitbull");
     cy.get("#resultado-div").find("img")
       .should("have.attr", "src", imageUrl);
     
   });
   
});
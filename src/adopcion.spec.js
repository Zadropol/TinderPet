<<<<<<< HEAD

import { EnviarSolicitudAdopcion } from "../src/adopcion.js";

describe("Solicitud de adopción por perfil", () => {
    it("Deberia estar definida la funcion",() => {
        expect(typeof EnviarSolicitudAdopcion).toBe("function");
    });

    it("Deberia retornar 'Solicitud Enviada Correctamente' al llamar la funcion", () => {
        const resultado = EnviarSolicitudAdopcion();
        expect(resultado).toBe("Solicitud Enviada Correctamente");
    });

});
=======
import { EnviarSolicitudAdoptar } from "./adopcion.js";

describe( "EnviarSolicitudAdoptar", () => {

  test("La funciona EnviarSolicitudAdoptar esta definida", () => {
    expect(typeof EnviarSolicitudAdoptar ).toBe("function");
  });

} );
    
>>>>>>> rama_luci


import { EnviarSolicitudAdopcion } from "../src/adopcion.js";

describe("Solicitud de adopción por perfil", () => {
    it("Deberia estar definida la funcion",() => {
        expect(typeof EnviarSolicitudAdopcion).toBe("function");
    });

});

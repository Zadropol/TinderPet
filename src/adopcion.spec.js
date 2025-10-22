import {EnviarSolicitudAdopcion} from './adopcion';

describe('EnviarSolicitudAdopcion', () => {
    it('deberia estar definida como una funcion', () => {
        expect(typeof EnviarSolicitudAdopcion).toBe('function');
    });

    it("Deberia retornar 'Solicitud enviada correctamente'", () => {
        const resultado = EnviarSolicitudAdopcion();
        expect(resultado).toBe('Solicitud enviada correctamente');
    });
});
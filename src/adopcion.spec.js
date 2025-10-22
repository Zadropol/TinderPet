import {EnviarSolicitudAdopcion} from './adopcion';

describe('EnviarSolicitudAdopcion', () => {
    it('deberia estar definida como una funcion', () => {
        expect(typeof EnviarSolicitudAdopcion).toBe('function');
    });

    // it("Deberia retornar 'Solicitud enviada correctamente'", () => {
    //     const resultado = EnviarSolicitudAdopcion();
    //     expect(resultado).toBe('Solicitud enviada correctamente');
    // });

    // beforeEach(() => {
    //     localStorage.clear();
    // });

    // it("Deberia guardar una solicitud en LocalStorage", () => {
    //     EnviarSolicitudAdopcion(1, 100);
    //     const solicitudes = JSON.parse(localStorage.getItem('solicitudesAdopcion'));
    //     expect(solicitudes).toHaveLenght(1);
    //     expect(solicitudes[0]).toEqual({
    //         idMascota: 1, 
    //         idUsuario: 100, 
    //         estado: 'enviada',
    //     });
    // });
});
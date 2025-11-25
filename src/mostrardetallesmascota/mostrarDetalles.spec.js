global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};

import { obtenerMascotaPorId, formatearVacunas, formatearHistorial, renderDetalles } from "./mostraDetalles";

describe("Detalles de mascota - TDD", () => {
  it("obtenerMascotaPorId devuelve la mascota cuando existe", () => {
    const repo = [
      { id: "a1", nombre: "Firulais" },
      { id: "b2", nombre: "Michi" },
    ];
    const m = obtenerMascotaPorId("b2", repo);
    expect(m).toEqual({ id: "b2", nombre: "Michi" });
  });

  it("obtenerMascotaPorId devuelve null cuando no existe", () => {
    const repo = [{ id: "a1" }];
    const m = obtenerMascotaPorId("zzz", repo);
    expect(m).toBeNull();
  });

  it("formatearVacunas maneja string y array", () => {
    expect(formatearVacunas("Antirrábica, Parvovirus")).toBe("Antirrábica, Parvovirus");
    expect(formatearVacunas(["Antirrábica", "Parvovirus"])).toBe("Antirrábica, Parvovirus");
  });

  it("formatearVacunas retorna 'No registradas' para valores vacíos", () => {
    expect(formatearVacunas(null)).toBe("No registradas");
    expect(formatearVacunas([])).toBe("No registradas");
    expect(formatearVacunas("")).toBe("No registradas");
  });

  it("formatearHistorial maneja array y valores vacíos", () => {
    expect(formatearHistorial(["Consulta 2024", "Desparasitación"])).toBe("Consulta 2024, Desparasitación");
    expect(formatearHistorial(null)).toBe("Sin historial disponible");
    expect(formatearHistorial([])).toBe("Sin historial disponible");
  });

  it("renderDetalles retorna HTML con data-testid y valores formateados", () => {
    const mascota = {
      id: "x1",
      nombre: "Firulais",
      edad: 3,
      raza: "Pitbull",
      especie: "Perro",
      sexo: "Macho",
      vacunas: ["Antirrábica", "Parvovirus"],
      historial: []
    };
    const html = renderDetalles(mascota);
    expect(html).toContain('data-testid="detalle-nombre"');
    expect(html).toContain('Firulais');
    expect(html).toContain('data-testid="detalle-edad"');
    expect(html).toContain('3');
    expect(html).toContain('data-testid="detalle-vacunas"');
    expect(html).toContain('Antirrábica, Parvovirus');
    expect(html).toContain('data-testid="detalle-historial"');
    expect(html).toContain('Sin historial disponible');
  });
});

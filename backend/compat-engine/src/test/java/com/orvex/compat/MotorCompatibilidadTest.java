package com.orvex.compat;

import static org.junit.jupiter.api.Assertions.*;

import com.orvex.compat.reglas.ReglasPorDefecto;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

class MotorCompatibilidadTest {

    private final MotorCompatibilidad motor = new MotorCompatibilidad(ReglasPorDefecto.crear());

    private static Componente c(String id, Categoria cat, Map<String, Object> specs) {
        return new Componente(id, cat, id, specs);
    }

    private static final Componente CPU_AM4 = c("Ryzen 5 5600", Categoria.PROCESADOR, Map.of("socket", "AM4", "tdp_w", 65));
    private static final Componente MB_AM4 = c("B550M", Categoria.PLACA_MADRE,
            Map.of("socket", "AM4", "tipo_ram", "DDR4", "factor_forma", "mATX"));
    private static final Componente RAM_D4 = c("DDR4 16GB", Categoria.RAM, Map.of("tipo_ram", "DDR4"));
    private static final Componente GPU = c("RTX 4060", Categoria.TARJETA_GRAFICA, Map.of("largo_mm", 240, "tdp_w", 115));
    private static final Componente CASE_MID = c("ATX mid", Categoria.GABINETE,
            Map.of("factores_forma", List.of("ATX", "mATX"), "max_largo_gpu_mm", 330, "max_altura_cooler_mm", 160));
    private static final Componente PSU_650 = c("650W", Categoria.FUENTE, Map.of("potencia_w", 650));

    @Test
    void armadoCompatibleNoTieneIncompatibilidades() {
        var r = motor.verificar(List.of(CPU_AM4, MB_AM4, RAM_D4, GPU, CASE_MID, PSU_650));
        assertEquals(Severidad.COMPATIBLE, r.global());
        assertEquals(280, r.consumoEstimadoW());
    }

    @Test
    void socketDistintoEsIncompatible() {
        var mbAm5 = c("B650M", Categoria.PLACA_MADRE, Map.of("socket", "AM5", "tipo_ram", "DDR5", "factor_forma", "mATX"));
        var r = motor.verificar(List.of(CPU_AM4, mbAm5));
        assertEquals(Severidad.INCOMPATIBLE, r.global());
    }

    @Test
    void ramDeTipoDistintoEsIncompatible() {
        var ramD5 = c("DDR5", Categoria.RAM, Map.of("tipo_ram", "DDR5"));
        var r = motor.verificar(List.of(MB_AM4, ramD5));
        assertEquals(Severidad.INCOMPATIBLE, r.global());
    }

    @Test
    void gpuMasLargaQueElGabineteEsIncompatible() {
        var gpuLarga = c("GPU larga", Categoria.TARJETA_GRAFICA, Map.of("largo_mm", 340, "tdp_w", 200));
        var r = motor.verificar(List.of(gpuLarga, CASE_MID));
        assertEquals(Severidad.INCOMPATIBLE, r.global());
    }

    @Test
    void fuenteInsuficienteEsIncompatible() {
        var psu250 = c("250W", Categoria.FUENTE, Map.of("potencia_w", 250));
        var r = motor.verificar(List.of(CPU_AM4, GPU, psu250));
        assertEquals(Severidad.INCOMPATIBLE, r.global());
    }

    @Test
    void fuenteJustaDaAdvertencia() {
        var psu350 = c("350W", Categoria.FUENTE, Map.of("potencia_w", 350)); // estimado 280, recomendado 364
        var r = motor.verificar(List.of(CPU_AM4, GPU, psu350));
        assertEquals(Severidad.ADVERTENCIA, r.global());
    }

    @Test
    void especificacionFaltanteAdviertePeroNoDaPorCompatible() {
        var mbSinSocket = c("Placa sin datos", Categoria.PLACA_MADRE, Map.of("tipo_ram", "DDR4"));
        var r = motor.verificar(List.of(CPU_AM4, mbSinSocket));
        assertEquals(Severidad.ADVERTENCIA, r.global());
    }

    @Test
    void sinParesVerificablesNoDiceCompatible() {
        var r = motor.verificar(List.of(RAM_D4, PSU_650));
        assertEquals(Severidad.ADVERTENCIA, r.global());
    }

    @Test
    void conMenosDeDosComponentesLanzaError() {
        assertThrows(IllegalArgumentException.class, () -> motor.verificar(List.of(CPU_AM4)));
    }
}

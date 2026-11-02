package com.orvex.compat;

import com.orvex.compat.reglas.ReglaConsumo;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/** Aplica un conjunto de reglas a un armado de PC (HU-07). */
public final class MotorCompatibilidad {

    private final List<Regla> reglas;

    public MotorCompatibilidad(List<Regla> reglas) {
        this.reglas = List.copyOf(reglas);
    }

    public ReporteCompatibilidad verificar(List<Componente> armado) {
        if (armado == null || armado.size() < 2) {
            throw new IllegalArgumentException("Se necesitan al menos dos componentes para verificar.");
        }
        List<ResultadoRegla> resultados = new ArrayList<>();
        for (Regla regla : reglas) {
            Optional<ResultadoRegla> r = regla.evaluar(armado);
            r.ifPresent(resultados::add);
        }
        if (resultados.isEmpty()) {
            // Evita decir "compatible" cuando en realidad no se verificó nada.
            resultados.add(new ResultadoRegla("Cobertura", Severidad.ADVERTENCIA,
                    "Todavía no hay pares de componentes que se puedan verificar entre sí."));
        }
        Severidad global = resultados.stream()
                .map(ResultadoRegla::severidad)
                .max(Comparator.naturalOrder())
                .orElse(Severidad.COMPATIBLE);
        return new ReporteCompatibilidad(global, List.copyOf(resultados), ReglaConsumo.estimarW(armado));
    }
}

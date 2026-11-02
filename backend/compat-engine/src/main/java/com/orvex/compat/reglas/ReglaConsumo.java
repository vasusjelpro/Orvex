package com.orvex.compat.reglas;

import com.orvex.compat.Categoria;
import com.orvex.compat.Componente;
import com.orvex.compat.Regla;
import com.orvex.compat.ResultadoRegla;
import com.orvex.compat.Severidad;
import java.util.List;
import java.util.Optional;

/**
 * Consumo estimado = TDP(CPU) + TDP(GPU) + BASE_W (placa, RAM, almacenamiento, ventiladores).
 * La fuente debe cubrir el consumo con un margen de seguridad (RF-08).
 * BASE_W y MARGEN son supuestos iniciales a validar, no mediciones.
 */
public final class ReglaConsumo implements Regla {

    public static final int BASE_W = 100;
    public static final double MARGEN = 1.3;
    private static final String NOMBRE = "Consumo y fuente de poder";

    /** Devuelve 0 si no hay procesador ni gráfica con TDP conocido. */
    public static int estimarW(List<Componente> armado) {
        int total = 0;
        boolean hayConsumidor = false;
        for (Categoria c : new Categoria[]{Categoria.PROCESADOR, Categoria.TARJETA_GRAFICA}) {
            Optional<Componente> comp = Regla.buscar(armado, c);
            if (comp.isPresent() && comp.get().specs().get("tdp_w") instanceof Number n) {
                total += n.intValue();
                hayConsumidor = true;
            }
        }
        return hayConsumidor ? total + BASE_W : 0;
    }

    @Override
    public Optional<ResultadoRegla> evaluar(List<Componente> armado) {
        Optional<Componente> fuente = Regla.buscar(armado, Categoria.FUENTE);
        Optional<Componente> cpu = Regla.buscar(armado, Categoria.PROCESADOR);
        Optional<Componente> gpu = Regla.buscar(armado, Categoria.TARJETA_GRAFICA);
        if (fuente.isEmpty() || (cpu.isEmpty() && gpu.isEmpty())) {
            return Optional.empty();
        }
        boolean faltaTdp = (cpu.isPresent() && !(cpu.get().specs().get("tdp_w") instanceof Number))
                || (gpu.isPresent() && !(gpu.get().specs().get("tdp_w") instanceof Number));
        if (faltaTdp || !(fuente.get().specs().get("potencia_w") instanceof Number potencia)) {
            return Optional.of(new ResultadoRegla(NOMBRE, Severidad.ADVERTENCIA,
                    "No se pudo verificar: faltan el consumo (TDP) o la potencia de la fuente."));
        }
        int estimado = estimarW(armado);
        int recomendado = (int) Math.ceil(estimado * MARGEN);
        int w = potencia.intValue();
        if (w >= recomendado) {
            return Optional.of(new ResultadoRegla(NOMBRE, Severidad.COMPATIBLE,
                    "Consumo estimado " + estimado + " W; la fuente de " + w + " W cubre con margen de seguridad."));
        }
        if (w >= estimado) {
            return Optional.of(new ResultadoRegla(NOMBRE, Severidad.ADVERTENCIA,
                    "Consumo estimado " + estimado + " W; la fuente de " + w
                            + " W alcanza pero con poco margen (se recomiendan " + recomendado + " W)."));
        }
        return Optional.of(new ResultadoRegla(NOMBRE, Severidad.INCOMPATIBLE,
                "Consumo estimado " + estimado + " W; la fuente de " + w + " W no alcanza."));
    }
}

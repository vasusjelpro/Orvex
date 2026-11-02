package com.orvex.compat.reglas;

import com.orvex.compat.Categoria;
import com.orvex.compat.Componente;
import com.orvex.compat.Regla;
import com.orvex.compat.ResultadoRegla;
import com.orvex.compat.Severidad;
import java.util.List;
import java.util.Optional;

/**
 * Regla entre dos categorías, definida por datos (categorías y claves de especificación).
 * Si falta una especificación, advierte en lugar de dar la regla por compatible.
 * Plantillas de mensaje: %1$s nombre A, %2$s valor A, %3$s nombre B, %4$s valor B.
 */
public abstract class ReglaBinaria implements Regla {

    private final String nombre;
    private final Categoria catA;
    private final String claveA;
    private final Categoria catB;
    private final String claveB;
    private final String mensajeOk;
    private final String mensajeError;

    protected ReglaBinaria(String nombre, Categoria catA, String claveA, Categoria catB, String claveB,
                           String mensajeOk, String mensajeError) {
        this.nombre = nombre;
        this.catA = catA;
        this.claveA = claveA;
        this.catB = catB;
        this.claveB = claveB;
        this.mensajeOk = mensajeOk;
        this.mensajeError = mensajeError;
    }

    protected abstract boolean cumple(Object valorA, Object valorB);

    @Override
    public final Optional<ResultadoRegla> evaluar(List<Componente> armado) {
        Optional<Componente> a = Regla.buscar(armado, catA);
        Optional<Componente> b = Regla.buscar(armado, catB);
        if (a.isEmpty() || b.isEmpty()) {
            return Optional.empty();
        }
        Object va = a.get().specs().get(claveA);
        Object vb = b.get().specs().get(claveB);
        if (va == null || vb == null) {
            return Optional.of(new ResultadoRegla(nombre, Severidad.ADVERTENCIA,
                    "No se pudo verificar: faltan especificaciones de " + a.get().nombre()
                            + " o de " + b.get().nombre() + "."));
        }
        boolean ok = cumple(va, vb);
        String mensaje = String.format(ok ? mensajeOk : mensajeError,
                a.get().nombre(), va, b.get().nombre(), vb);
        return Optional.of(new ResultadoRegla(nombre, ok ? Severidad.COMPATIBLE : Severidad.INCOMPATIBLE, mensaje));
    }
}

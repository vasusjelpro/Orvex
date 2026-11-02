package com.orvex.compat.reglas;

import com.orvex.compat.Categoria;

/** Los dos valores deben ser iguales (p. ej. socket del procesador y de la placa). */
public final class ReglaIgualdad extends ReglaBinaria {

    public ReglaIgualdad(String nombre, Categoria catA, String claveA, Categoria catB, String claveB,
                         String mensajeOk, String mensajeError) {
        super(nombre, catA, claveA, catB, claveB, mensajeOk, mensajeError);
    }

    @Override
    protected boolean cumple(Object a, Object b) {
        return a.toString().equalsIgnoreCase(b.toString());
    }
}

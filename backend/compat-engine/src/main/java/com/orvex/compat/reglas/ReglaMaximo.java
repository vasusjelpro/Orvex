package com.orvex.compat.reglas;

import com.orvex.compat.Categoria;

/** El valor numérico de A no debe superar el límite de B (p. ej. largo de la GPU y espacio del gabinete). */
public final class ReglaMaximo extends ReglaBinaria {

    public ReglaMaximo(String nombre, Categoria catValor, String claveValor, Categoria catLimite, String claveLimite,
                       String mensajeOk, String mensajeError) {
        super(nombre, catValor, claveValor, catLimite, claveLimite, mensajeOk, mensajeError);
    }

    @Override
    protected boolean cumple(Object valor, Object limite) {
        if (!(valor instanceof Number v) || !(limite instanceof Number l)) {
            throw new IllegalStateException("Se esperaban valores numéricos: " + valor + ", " + limite);
        }
        return v.doubleValue() <= l.doubleValue();
    }
}

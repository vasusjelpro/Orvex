package com.orvex.compat.reglas;

import com.orvex.compat.Categoria;
import java.util.Collection;

/** La lista del componente A debe contener el valor del componente B (p. ej. formatos que admite el gabinete). */
public final class ReglaContiene extends ReglaBinaria {

    public ReglaContiene(String nombre, Categoria catLista, String claveLista, Categoria catValor, String claveValor,
                         String mensajeOk, String mensajeError) {
        super(nombre, catLista, claveLista, catValor, claveValor, mensajeOk, mensajeError);
    }

    @Override
    protected boolean cumple(Object lista, Object valor) {
        if (!(lista instanceof Collection<?> coleccion)) {
            throw new IllegalStateException("La especificación debe ser una lista: " + lista);
        }
        return coleccion.stream().anyMatch(x -> x.toString().equalsIgnoreCase(valor.toString()));
    }
}

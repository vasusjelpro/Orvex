package com.orvex.compat;

import java.util.List;
import java.util.Optional;

/** Una regla de compatibilidad. Devuelve vacío si no aplica (faltan categorías en el armado). */
public interface Regla {

    Optional<ResultadoRegla> evaluar(List<Componente> armado);

    static Optional<Componente> buscar(List<Componente> armado, Categoria categoria) {
        return armado.stream().filter(c -> c.categoria() == categoria).findFirst();
    }
}

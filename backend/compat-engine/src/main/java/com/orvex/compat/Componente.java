package com.orvex.compat;

import java.util.Map;

/** Un componente con sus especificaciones técnicas. No depende de base de datos ni de HTTP. */
public record Componente(String id, Categoria categoria, String nombre, Map<String, Object> specs) {
    public Componente {
        specs = specs == null ? Map.of() : Map.copyOf(specs);
    }
}

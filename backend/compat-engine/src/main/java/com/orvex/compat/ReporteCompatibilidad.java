package com.orvex.compat;

import java.util.List;

/** Resultado global de verificar una configuración. */
public record ReporteCompatibilidad(Severidad global, List<ResultadoRegla> resultados, int consumoEstimadoW) {
}

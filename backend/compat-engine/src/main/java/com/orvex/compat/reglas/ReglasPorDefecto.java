package com.orvex.compat.reglas;

import static com.orvex.compat.Categoria.*;

import com.orvex.compat.Regla;
import java.util.List;

/**
 * Reglas iniciales de la beta. Las reglas son datos (categorías + claves de especificación),
 * por eso a futuro pueden cargarse desde la tabla regla_compatibilidad sin cambiar el motor (RNF-06).
 */
public final class ReglasPorDefecto {

    private ReglasPorDefecto() {
    }

    public static List<Regla> crear() {
        return List.of(
                new ReglaIgualdad("Socket del procesador", PROCESADOR, "socket", PLACA_MADRE, "socket",
                        "%1$s y %3$s comparten el socket %2$s.",
                        "El socket del procesador (%2$s) no coincide con el de la placa madre (%4$s)."),
                new ReglaIgualdad("Tipo de memoria RAM", RAM, "tipo_ram", PLACA_MADRE, "tipo_ram",
                        "La RAM y la placa madre usan %2$s.",
                        "La RAM es %2$s pero la placa madre admite %4$s."),
                new ReglaContiene("Formato de placa y gabinete", GABINETE, "factores_forma", PLACA_MADRE, "factor_forma",
                        "El gabinete admite placas %4$s.",
                        "El gabinete admite %2$s y la placa madre es %4$s."),
                new ReglaMaximo("Largo de la tarjeta gráfica", TARJETA_GRAFICA, "largo_mm", GABINETE, "max_largo_gpu_mm",
                        "La tarjeta gráfica (%2$s mm) cabe en el gabinete (máx. %4$s mm).",
                        "La tarjeta gráfica mide %2$s mm y el gabinete admite hasta %4$s mm."),
                new ReglaMaximo("Altura del cooler", REFRIGERACION, "altura_mm", GABINETE, "max_altura_cooler_mm",
                        "El cooler (%2$s mm) cabe en el gabinete (máx. %4$s mm).",
                        "El cooler mide %2$s mm y el gabinete admite hasta %4$s mm."),
                new ReglaContiene("Cooler y socket", REFRIGERACION, "sockets", PROCESADOR, "socket",
                        "El cooler es compatible con el socket %4$s.",
                        "El cooler admite %2$s y el procesador usa %4$s."),
                new ReglaConsumo()
        );
    }
}

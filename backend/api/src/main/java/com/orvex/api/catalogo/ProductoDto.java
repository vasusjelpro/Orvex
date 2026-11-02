package com.orvex.api.catalogo;

import com.orvex.compat.Categoria;
import java.math.BigDecimal;
import java.util.Map;

public record ProductoDto(Long id, String sku, String nombre, String marca, BigDecimal precio,
                          boolean enStock, Categoria categoria, Map<String, Object> specs) {

    public static ProductoDto de(Producto p) {
        return new ProductoDto(p.getId(), p.getSku(), p.getNombre(), p.getMarca(), p.getPrecio(),
                p.isEnStock(), p.getCategoria(), p.getSpecs());
    }
}

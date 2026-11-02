package com.orvex.api.catalogo;

import com.orvex.compat.Categoria;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** HU-04: explorar componentes. Solo se muestran los publicados. */
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ProductoDto> listar(@RequestParam(name = "categoria", required = false) Categoria categoria) {
        List<Producto> productos = categoria == null
                ? repo.findByEstadoOrderByCategoriaAscPrecioAsc(EstadoProducto.PUBLICADO)
                : repo.findByEstadoAndCategoriaOrderByPrecioAsc(EstadoProducto.PUBLICADO, categoria);
        return productos.stream().map(ProductoDto::de).toList();
    }
}

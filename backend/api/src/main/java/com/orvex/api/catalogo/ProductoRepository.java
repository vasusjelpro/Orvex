package com.orvex.api.catalogo;

import com.orvex.compat.Categoria;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByEstadoOrderByCategoriaAscPrecioAsc(EstadoProducto estado);

    List<Producto> findByEstadoAndCategoriaOrderByPrecioAsc(EstadoProducto estado, Categoria categoria);
}

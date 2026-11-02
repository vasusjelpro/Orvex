package com.orvex.api.armador;

import com.orvex.api.catalogo.Producto;
import com.orvex.api.catalogo.ProductoDto;
import com.orvex.api.catalogo.ProductoRepository;
import com.orvex.compat.Componente;
import com.orvex.compat.MotorCompatibilidad;
import com.orvex.compat.ReporteCompatibilidad;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** HU-06 / HU-07: verificar compatibilidad de un armado antes de comprar. */
@RestController
@RequestMapping("/api/armador")
public class VerificacionController {

    public record Solicitud(@NotNull @Size(min = 2, max = 16) List<Long> productoIds) {
    }

    public record Respuesta(ReporteCompatibilidad reporte, BigDecimal precioTotal, List<ProductoDto> componentes) {
    }

    private final ProductoRepository repo;
    private final MotorCompatibilidad motor;

    public VerificacionController(ProductoRepository repo, MotorCompatibilidad motor) {
        this.repo = repo;
        this.motor = motor;
    }

    @PostMapping("/verificar")
    public Respuesta verificar(@Valid @RequestBody Solicitud solicitud) {
        var idsUnicos = new HashSet<>(solicitud.productoIds());
        List<Producto> productos = repo.findAllById(idsUnicos);
        if (productos.size() != idsUnicos.size()) {
            throw new IllegalArgumentException("Algún producto del armado no existe.");
        }
        List<Componente> armado = productos.stream()
                .map(p -> new Componente(String.valueOf(p.getId()), p.getCategoria(), p.getNombre(), p.getSpecs()))
                .toList();
        BigDecimal total = productos.stream().map(Producto::getPrecio).reduce(BigDecimal.ZERO, BigDecimal::add);
        return new Respuesta(motor.verificar(armado), total, productos.stream().map(ProductoDto::de).toList());
    }
}

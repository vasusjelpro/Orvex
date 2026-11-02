package com.orvex.api.catalogo;

import com.orvex.compat.Categoria;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.Map;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Categoria categoria;

    @Column(nullable = false, unique = true, length = 30)
    private String sku;

    @Column(nullable = false, length = 120)
    private String nombre;

    @Column(length = 40)
    private String marca;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(name = "en_stock", nullable = false)
    private boolean enStock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoProducto estado;

    /** Especificaciones técnicas (socket, tdp_w, largo_mm...) guardadas como JSON por producto. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> specs;

    protected Producto() {
    }

    public Long getId() { return id; }
    public Categoria getCategoria() { return categoria; }
    public String getSku() { return sku; }
    public String getNombre() { return nombre; }
    public String getMarca() { return marca; }
    public BigDecimal getPrecio() { return precio; }
    public boolean isEnStock() { return enStock; }
    public EstadoProducto getEstado() { return estado; }
    public Map<String, Object> getSpecs() { return specs; }
}

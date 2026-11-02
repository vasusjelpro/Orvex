-- Beta: solo el catálogo. Parte de producto + especificaciones del diagrama físico (MySQL 8, InnoDB, utf8mb4).
-- Las especificaciones técnicas se guardan como JSON por producto para poder comparar valores numéricos.
CREATE TABLE producto (
    id_producto INT UNSIGNED NOT NULL AUTO_INCREMENT,
    categoria   VARCHAR(30)  NOT NULL,
    sku         VARCHAR(30)  NOT NULL,
    nombre      VARCHAR(120) NOT NULL,
    marca       VARCHAR(40)  NULL,
    precio      DECIMAL(10,2) NOT NULL,
    en_stock    BOOLEAN      NOT NULL DEFAULT TRUE,
    estado      VARCHAR(20)  NOT NULL DEFAULT 'BORRADOR',
    specs       JSON         NULL,
    PRIMARY KEY (id_producto),
    UNIQUE KEY uk_producto_sku (sku),
    KEY idx_producto_categoria_estado (categoria, estado),
    CONSTRAINT chk_producto_precio CHECK (precio >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

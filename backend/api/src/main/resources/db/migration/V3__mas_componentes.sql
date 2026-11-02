-- Más catálogo de ejemplo (precios en Bs ilustrativos; verificar specs con la ficha del fabricante).
INSERT INTO producto (categoria, sku, nombre, marca, precio, en_stock, estado, specs) VALUES
('PROCESADOR','CPU-R7-5700X','Ryzen 7 5700X','AMD',1500.00,TRUE,'PUBLICADO','{"socket":"AM4","tdp_w":65}'),
('PROCESADOR','CPU-R7-7700','Ryzen 7 7700','AMD',2100.00,TRUE,'PUBLICADO','{"socket":"AM5","tdp_w":65}'),
('PROCESADOR','CPU-I7-13700K','Core i7-13700K','Intel',2900.00,TRUE,'PUBLICADO','{"socket":"LGA1700","tdp_w":125}'),
('PLACA_MADRE','MB-B550-ATX','Placa B550 ATX','MSI',1050.00,TRUE,'PUBLICADO','{"socket":"AM4","tipo_ram":"DDR4","factor_forma":"ATX"}'),
('PLACA_MADRE','MB-B760M-D5','Placa B760M DDR5','Gigabyte',1150.00,TRUE,'PUBLICADO','{"socket":"LGA1700","tipo_ram":"DDR5","factor_forma":"mATX"}'),
('RAM','RAM-D4-32','Memoria RAM DDR4 32 GB 3600 MHz','Corsair',760.00,TRUE,'PUBLICADO','{"tipo_ram":"DDR4","capacidad_gb":32,"frecuencia_mhz":3600}'),
('RAM','RAM-D5-32','Memoria RAM DDR5 32 GB 6000 MHz','G.Skill',980.00,TRUE,'PUBLICADO','{"tipo_ram":"DDR5","capacidad_gb":32,"frecuencia_mhz":6000}'),
('TARJETA_GRAFICA','GPU-RTX4070','GeForce RTX 4070 12 GB','NVIDIA',5200.00,TRUE,'PUBLICADO','{"largo_mm":244,"tdp_w":200}'),
('TARJETA_GRAFICA','GPU-RX7800XT','Radeon RX 7800 XT 16 GB','AMD',4300.00,TRUE,'PUBLICADO','{"largo_mm":267,"tdp_w":263}'),
('ALMACENAMIENTO','SSD-NVME-2T','SSD NVMe 2 TB','Samsung',900.00,TRUE,'PUBLICADO','{"interfaz":"M.2","capacidad_gb":2000}'),
('ALMACENAMIENTO','HDD-2T','Disco duro 2 TB 7200 rpm','Seagate',380.00,TRUE,'PUBLICADO','{"interfaz":"SATA","capacidad_gb":2000}'),
('GABINETE','GAB-ATX-VIDRIO','Gabinete ATX vidrio templado','NZXT',520.00,TRUE,'PUBLICADO','{"factores_forma":["ATX","mATX","ITX"],"max_largo_gpu_mm":360,"max_altura_cooler_mm":170}'),
('FUENTE','FTE-750W','Fuente de poder 750 W 80+ Gold','Corsair',550.00,TRUE,'PUBLICADO','{"potencia_w":750}');

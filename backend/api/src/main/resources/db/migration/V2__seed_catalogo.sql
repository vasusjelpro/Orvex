-- DATOS DE EJEMPLO para la beta. Precios en Bs ilustrativos; las especificaciones son aproximadas
-- y deben contrastarse con la ficha del fabricante antes de usarse con clientes reales.
INSERT INTO producto (categoria, sku, nombre, marca, precio, en_stock, estado, specs) VALUES
('PROCESADOR','CPU-R5-5600','Ryzen 5 5600','AMD',1100.00,TRUE,'PUBLICADO','{"socket":"AM4","tdp_w":65}'),
('PROCESADOR','CPU-R5-7600','Ryzen 5 7600','AMD',1450.00,TRUE,'PUBLICADO','{"socket":"AM5","tdp_w":65}'),
('PROCESADOR','CPU-I5-12400F','Core i5-12400F','Intel',1050.00,TRUE,'PUBLICADO','{"socket":"LGA1700","tdp_w":65}'),

('PLACA_MADRE','MB-B550M','Placa B550M','Gigabyte',780.00,TRUE,'PUBLICADO','{"socket":"AM4","tipo_ram":"DDR4","factor_forma":"mATX"}'),
('PLACA_MADRE','MB-B650M','Placa B650M','MSI',980.00,TRUE,'PUBLICADO','{"socket":"AM5","tipo_ram":"DDR5","factor_forma":"mATX"}'),
('PLACA_MADRE','MB-B660M','Placa B660M','ASRock',850.00,TRUE,'PUBLICADO','{"socket":"LGA1700","tipo_ram":"DDR4","factor_forma":"mATX"}'),

('RAM','RAM-D4-16','Memoria RAM DDR4 16 GB 3200 MHz','Kingston',380.00,TRUE,'PUBLICADO','{"tipo_ram":"DDR4","capacidad_gb":16,"frecuencia_mhz":3200}'),
('RAM','RAM-D5-16','Memoria RAM DDR5 16 GB 5200 MHz','Kingston',520.00,TRUE,'PUBLICADO','{"tipo_ram":"DDR5","capacidad_gb":16,"frecuencia_mhz":5200}'),

('TARJETA_GRAFICA','GPU-RTX4060','GeForce RTX 4060 8 GB','NVIDIA',3300.00,TRUE,'PUBLICADO','{"largo_mm":240,"tdp_w":115}'),
('TARJETA_GRAFICA','GPU-RX7600','Radeon RX 7600 8 GB','AMD',2700.00,TRUE,'PUBLICADO','{"largo_mm":204,"tdp_w":165}'),

('ALMACENAMIENTO','SSD-NVME-1T','SSD NVMe 1 TB','WD',520.00,TRUE,'PUBLICADO','{"interfaz":"M.2","capacidad_gb":1000}'),

('GABINETE','GAB-ATX-MID','Gabinete ATX torre media','Cooler Master',450.00,TRUE,'PUBLICADO','{"factores_forma":["ATX","mATX","ITX"],"max_largo_gpu_mm":330,"max_altura_cooler_mm":160}'),
('GABINETE','GAB-MATX-MINI','Gabinete mATX compacto','Aerocool',380.00,TRUE,'PUBLICADO','{"factores_forma":["mATX","ITX"],"max_largo_gpu_mm":250,"max_altura_cooler_mm":150}'),

('REFRIGERACION','REF-TORRE-155','Cooler de torre 155 mm','DeepCool',250.00,TRUE,'PUBLICADO','{"altura_mm":155,"sockets":["AM4","AM5","LGA1700"]}'),
('REFRIGERACION','REF-PERFIL-47','Cooler de perfil bajo 47 mm','Noctua',320.00,TRUE,'PUBLICADO','{"altura_mm":47,"sockets":["AM4","AM5","LGA1700"]}'),

('FUENTE','FTE-450W','Fuente de poder 450 W','Thermaltake',330.00,TRUE,'PUBLICADO','{"potencia_w":450}'),
('FUENTE','FTE-650W','Fuente de poder 650 W','Corsair',430.00,TRUE,'PUBLICADO','{"potencia_w":650}');

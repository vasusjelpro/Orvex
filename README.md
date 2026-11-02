# Orvex (beta)

Arma tu PC y comprueba que funcione **antes de comprar**: compatibilidad entre componentes y consumo de la fuente.

> Estado: beta temprana. Los datos del catálogo son de ejemplo y los precios son ilustrativos.

Proyecto del grupo **Los Llajta Bytes** — Universidad Privada Franz Tamayo, Ingeniería de Sistemas.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 (React) + TypeScript + Bootstrap 5 |
| Backend | Spring Boot 3.3 (Java 21) |
| Base de datos | MySQL 8 con Flyway (migraciones) |
| Infraestructura | Docker Compose, GitHub Actions |

## Cómo levantarlo

Requisitos: Docker y Docker Compose.

```bash
cp .env.example .env      # opcional: cambia las contraseñas
docker compose up --build
```

- Web: http://localhost:3000
- API: http://localhost:8080/api/productos
- Salud de la API: http://localhost:8080/actuator/health

### Sin Docker (desarrollo)

```bash
# 1) MySQL 8 con una base "orvex" y usuario orvex / orvex_dev
# 2) Backend (Java 21 + Maven)
cd backend && mvn -B verify && mvn -pl api spring-boot:run
# 3) Frontend (Node 20)
cd frontend && npm install && npm run dev
```

## Estructura

```
backend/
  compat-engine/   Motor de compatibilidad: Java puro, sin Spring ni BD, con tests
  api/             API REST (catálogo y verificación del armado) + migraciones Flyway
frontend/          Next.js: inicio y armador de PC
docker-compose.yml MySQL + API + Web
.github/workflows/ CI: compila y prueba backend y frontend
```

## Cómo funciona el motor de compatibilidad

Cada regla compara una especificación de un componente con la de otro y devuelve
**Compatible**, **Advertencia** o **Incompatible**. Si falta un dato, advierte en lugar de dar la regla por buena.

Reglas de la beta: socket CPU–placa, tipo de RAM, formato placa–gabinete, largo de GPU, altura del cooler,
socket del cooler y consumo vs. fuente (consumo = TDP de CPU + GPU + 100 W base, con 30 % de margen; son supuestos a validar).

Las reglas son datos (categorías + claves de especificación) y no código por regla, de modo que
más adelante pueden cargarse desde la tabla `regla_compatibilidad` sin tocar el motor.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos?categoria=PROCESADOR` | Lista productos publicados (HU-04) |
| POST | `/api/armador/verificar` | Cuerpo: `{"productoIds":[1,4,7]}`. Devuelve el reporte de compatibilidad y el total (HU-06, HU-07) |

## Alcance de la beta

Incluido: catálogo, armador de PC, verificación de compatibilidad y consumo, base técnica (Docker y CI).

| Siguiente | Historia |
|---|---|
| Puntaje de optimización y cuello de botella | HU-08 |
| Alternativas sugeridas | HU-09 |
| Gestión de productos y especificaciones | HU-05 |
| Cuentas y guardado de armados | HU-01, HU-02 |

Fuera de la beta: pagos por QR, punto de venta, reservas de stock, notificaciones, reportes, monitoreo y Jenkins.

## Contribuir

Ramas cortas desde `main`, pull requests con la CI en verde y commits convencionales (`feat:`, `fix:`, `docs:`).

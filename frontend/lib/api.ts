export type Categoria =
  | "PROCESADOR"
  | "PLACA_MADRE"
  | "RAM"
  | "TARJETA_GRAFICA"
  | "ALMACENAMIENTO"
  | "FUENTE"
  | "GABINETE"
  | "REFRIGERACION";

export type Severidad = "COMPATIBLE" | "ADVERTENCIA" | "INCOMPATIBLE";

export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  marca: string | null;
  precio: number;
  enStock: boolean;
  categoria: Categoria;
  specs: Record<string, unknown> | null;
}

export interface ResultadoRegla {
  regla: string;
  severidad: Severidad;
  mensaje: string;
}

export interface Reporte {
  global: Severidad;
  resultados: ResultadoRegla[];
  consumoEstimadoW: number;
}

export interface RespuestaVerificacion {
  reporte: Reporte;
  precioTotal: number;
  componentes: Producto[];
}

export const CATEGORIAS: { id: Categoria; etiqueta: string }[] = [
  { id: "PROCESADOR", etiqueta: "Procesador" },
  { id: "PLACA_MADRE", etiqueta: "Placa madre" },
  { id: "RAM", etiqueta: "Memoria RAM" },
  { id: "TARJETA_GRAFICA", etiqueta: "Tarjeta gráfica" },
  { id: "ALMACENAMIENTO", etiqueta: "Almacenamiento" },
  { id: "REFRIGERACION", etiqueta: "Refrigeración" },
  { id: "GABINETE", etiqueta: "Gabinete" },
  { id: "FUENTE", etiqueta: "Fuente de poder" },
];

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function leer<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detalle = `Error ${res.status}`;
    try {
      const cuerpo = await res.json();
      if (cuerpo?.error) detalle = cuerpo.error;
    } catch {
      /* respuesta sin JSON */
    }
    throw new Error(detalle);
  }
  return res.json() as Promise<T>;
}

export async function listarProductos(): Promise<Producto[]> {
  return leer<Producto[]>(await fetch(`${BASE}/api/productos`));
}

export async function verificarArmado(productoIds: number[]): Promise<RespuestaVerificacion> {
  return leer<RespuestaVerificacion>(
    await fetch(`${BASE}/api/armador/verificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productoIds }),
    }),
  );
}

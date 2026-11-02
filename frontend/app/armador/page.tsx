"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATEGORIAS,
  listarProductos,
  verificarArmado,
  type Categoria,
  type Producto,
  type RespuestaVerificacion,
  type Severidad,
} from "@/lib/api";
import { useCart } from "@/lib/cart";

const ESTILO: Record<Severidad, { alerta: string; badge: string; texto: string }> = {
  COMPATIBLE: { alerta: "alert-success", badge: "text-bg-success", texto: "Compatible" },
  ADVERTENCIA: { alerta: "alert-warning", badge: "text-bg-warning", texto: "Advertencia" },
  INCOMPATIBLE: { alerta: "alert-danger", badge: "text-bg-danger", texto: "Incompatible" },
};

const bs = (n: number) => `Bs ${n.toLocaleString("es-BO", { minimumFractionDigits: 2 })}`;

export default function Armador() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [seleccion, setSeleccion] = useState<Partial<Record<Categoria, number>>>({});
  const [respuesta, setRespuesta] = useState<RespuestaVerificacion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [verificando, setVerificando] = useState(false);
  const [agregado, setAgregado] = useState(false);
  const { agregarVarios } = useCart();

  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch((e: Error) => setError(`No se pudo cargar el catálogo. ${e.message}`))
      .finally(() => setCargando(false));
  }, []);

  const ids = useMemo(() => Object.values(seleccion).filter((v): v is number => typeof v === "number"), [seleccion]);
  const total = useMemo(
    () => productos.filter((p) => ids.includes(p.id)).reduce((suma, p) => suma + p.precio, 0),
    [productos, ids],
  );

  function elegir(categoria: Categoria, valor: string) {
    setAgregado(false);
    setRespuesta(null); // el resultado anterior ya no corresponde al armado
    setSeleccion((s) => ({ ...s, [categoria]: valor === "" ? undefined : Number(valor) }));
  }

  async function verificar() {
    setVerificando(true);
    setError(null);
    try {
      setRespuesta(await verificarArmado(ids));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setVerificando(false);
    }
  }

  if (cargando) return <p className="text-secondary">Cargando catálogo…</p>;

  return (
    <div className="container py-4"><div className="row g-4">
      <div className="col-lg-7">
        <h1 className="titulo mb-3">PC personalizada</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {CATEGORIAS.map(({ id, etiqueta }) => (
          <div className="mb-3" key={id}>
            <label className="form-label fw-semibold" htmlFor={id}>
              {etiqueta}
            </label>
            <select
              id={id}
              className="form-select"
              value={seleccion[id] ?? ""}
              onChange={(e) => elegir(id, e.target.value)}
            >
              <option value="">Sin elegir</option>
              {productos
                .filter((p) => p.categoria === id)
                .map((p) => (
                  <option key={p.id} value={p.id} disabled={!p.enStock}>
                    {p.nombre} — {bs(p.precio)}
                    {!p.enStock ? " (sin stock)" : ""}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      <div className="col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5">Tu armado</h2>
            <p className="mb-1">
              {ids.length} componente{ids.length === 1 ? "" : "s"}
            </p>
            <p className="fs-4 fw-bold">{bs(total)}</p>
            <button
              className="btn btn-orvex w-100"
              disabled={ids.length < 2 || verificando}
              onClick={verificar}
            >
              {verificando ? "Verificando…" : "Verificar compatibilidad"}
            </button>
            {respuesta && respuesta.reporte.global !== "INCOMPATIBLE" && (
              <button
                className="btn btn-outline-secondary w-100 mt-2"
                disabled={agregado}
                onClick={() => {
                  agregarVarios(respuesta.componentes);
                  setAgregado(true);
                }}
              >
                {agregado ? "Armado agregado al carrito" : "Agregar armado al carrito"}
              </button>
            )}
            {ids.length < 2 && <p className="form-text">Elige al menos dos componentes para verificar.</p>}
          </div>
        </div>

        {respuesta && (
          <div className="mt-3">
            <div className={`alert ${ESTILO[respuesta.reporte.global].alerta}`}>
              <strong>{ESTILO[respuesta.reporte.global].texto}.</strong>{" "}
              {respuesta.reporte.consumoEstimadoW > 0 && (
                <>Consumo estimado: {respuesta.reporte.consumoEstimadoW} W.</>
              )}
            </div>
            <ul className="list-group">
              {respuesta.reporte.resultados.map((r) => (
                <li className="list-group-item" key={r.regla}>
                  <span className={`badge ${ESTILO[r.severidad].badge} me-2`}>{ESTILO[r.severidad].texto}</span>
                  <strong>{r.regla}</strong>
                  <div className="small text-secondary">{r.mensaje}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

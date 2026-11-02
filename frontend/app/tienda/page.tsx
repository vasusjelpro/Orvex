"use client";

import { useEffect, useState } from "react";
import { CATEGORIAS, listarProductos, type Categoria, type Producto } from "@/lib/api";
import { useCart } from "@/lib/cart";

const bs = (n: number) => `Bs ${n.toLocaleString("es-BO", { minimumFractionDigits: 2 })}`;
const resumen = (p: Producto) =>
  Object.entries(p.specs ?? {})
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join(" · ");

export default function Tienda() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState<Categoria | "TODAS">("TODAS");
  const [error, setError] = useState<string | null>(null);
  const [agregado, setAgregado] = useState<number | null>(null);
  const { agregarVarios } = useCart();

  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch((e: Error) => setError(`No se pudo cargar el catálogo. ${e.message}`));
  }, []);

  const visibles = productos.filter((p) => filtro === "TODAS" || p.categoria === filtro);

  function agregar(p: Producto) {
    agregarVarios([p]);
    setAgregado(p.id);
    setTimeout(() => setAgregado(null), 1200);
  }

  return (
    <div className="container py-4">
      <h1 className="titulo mb-3">Compra individual</h1>
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className={`filtro ${filtro === "TODAS" ? "activo" : ""}`} onClick={() => setFiltro("TODAS")}>
          Todas
        </button>
        {CATEGORIAS.map((c) => (
          <button key={c.id} className={`filtro ${filtro === c.id ? "activo" : ""}`} onClick={() => setFiltro(c.id)}>
            {c.etiqueta}
          </button>
        ))}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {visibles.map((p) => (
          <div className="col-sm-6 col-lg-4" key={p.id}>
            <div className="card producto h-100">
              <div className="card-body d-flex flex-column">
                <small className="text-secondary">{p.marca}</small>
                <h2 className="h6">{p.nombre}</h2>
                <p className="specs flex-grow-1">{resumen(p)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{bs(p.precio)}</strong>
                  <button className="btn btn-orvex btn-sm" disabled={!p.enStock} onClick={() => agregar(p)}>
                    {!p.enStock ? "Sin stock" : agregado === p.id ? "Agregado" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIAS, listarProductos, type Categoria, type Producto } from "@/lib/api";
import { useCart } from "@/lib/cart";

const bs = (n: number) => `Bs ${n.toLocaleString("es-BO", { minimumFractionDigits: 2 })}`;
const chips = (p: Producto) =>
  Object.entries(p.specs ?? {}).map(([k, v]) => `${k.replace(/_/g, " ")}: ${Array.isArray(v) ? v.join("/") : String(v)}`);
const etiqueta = (c: Categoria) => CATEGORIAS.find((x) => x.id === c)?.etiqueta ?? c;

export default function Tienda() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cat, setCat] = useState<Categoria | "">("");
  const [q, setQ] = useState("");
  const [maxPrecio, setMax] = useState<number | null>(null);
  const [soloStock, setSolo] = useState(false);
  const [orden, setOrden] = useState("precio-asc");
  const [error, setError] = useState<string | null>(null);
  const [agregado, setAgregado] = useState<number | null>(null);
  const { agregarVarios } = useCart();

  useEffect(() => {
    const u = new URLSearchParams(window.location.search);
    setCat((u.get("cat") as Categoria | null) ?? "");
    setQ(u.get("q") ?? "");
    listarProductos()
      .then(setProductos)
      .catch((e: Error) => setError(`No se pudo cargar el catálogo. ${e.message}`));
  }, []);

  const tope = useMemo(() => Math.ceil(Math.max(0, ...productos.map((p) => p.precio))), [productos]);
  const visibles = useMemo(() => {
    const r = productos.filter(
      (p) =>
        (!cat || p.categoria === cat) &&
        (!soloStock || p.enStock) &&
        (maxPrecio === null || p.precio <= maxPrecio) &&
        (!q || `${p.nombre} ${p.marca ?? ""}`.toLowerCase().includes(q.toLowerCase())),
    );
    return r.sort((a, b) =>
      orden === "precio-desc" ? b.precio - a.precio : orden === "nombre" ? a.nombre.localeCompare(b.nombre) : a.precio - b.precio,
    );
  }, [productos, cat, q, maxPrecio, soloStock, orden]);

  function agregar(p: Producto) {
    agregarVarios([p]);
    setAgregado(p.id);
    setTimeout(() => setAgregado(null), 1200);
  }

  return (
    <div className="container tienda">
      <aside className="filtros">
        <h3>Buscar</h3>
        <input className="form-control form-control-sm" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre o marca" />
        <h3>Categoría</h3>
        <label><input type="radio" name="cat" checked={cat === ""} onChange={() => setCat("")} /> Todas</label>
        {CATEGORIAS.map((c) => (
          <label key={c.id}><input type="radio" name="cat" checked={cat === c.id} onChange={() => setCat(c.id)} /> {c.etiqueta}</label>
        ))}
        <h3>Precio máximo</h3>
        <input type="range" className="form-range" min={0} max={tope} step={50} value={maxPrecio ?? tope} onChange={(e) => setMax(Number(e.target.value))} />
        <small>Hasta {bs(maxPrecio ?? tope)}</small>
        <h3>Disponibilidad</h3>
        <label><input type="checkbox" checked={soloStock} onChange={(e) => setSolo(e.target.checked)} /> Solo en stock</label>
      </aside>

      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h3 m-0">{cat ? etiqueta(cat) : "Todo el catálogo"} <small className="text-secondary fs-6">{visibles.length} productos</small></h1>
          <select className="form-select form-select-sm w-auto" value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar">
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="grid">
          {visibles.map((p) => (
            <article className="pcard" key={p.id}>
              <span className="cat">{etiqueta(p.categoria)}</span>
              <small className="text-secondary">{p.marca}</small>
              <h2>{p.nombre}</h2>
              <div className="chips">{chips(p).map((c) => <span className="chip" key={c}>{c}</span>)}</div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="precio">{bs(p.precio)}</span>
                <button className="btn btn-orvex btn-sm" disabled={!p.enStock} onClick={() => agregar(p)}>
                  {!p.enStock ? "Sin stock" : agregado === p.id ? "Agregado" : "Agregar"}
                </button>
              </div>
            </article>
          ))}
        </div>
        {!error && visibles.length === 0 && <p className="text-secondary">Ningún producto coincide con los filtros.</p>}
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const bs = (n: number) => `Bs ${n.toLocaleString("es-BO", { minimumFractionDigits: 2 })}`;

export default function Carrito() {
  const { lineas, quitar, limpiar } = useCart();
  const [copiado, setCopiado] = useState(false);
  const total = lineas.reduce((s, l) => s + l.producto.precio * l.cantidad, 0);

  async function copiarResumen() {
    const texto = lineas.map((l) => `${l.cantidad} x ${l.producto.nombre} - ${bs(l.producto.precio)}`).join("\n");
    await navigator.clipboard.writeText(`Pedido Orvex\n${texto}\nTotal: ${bs(total)}`);
    setCopiado(true);
  }

  if (lineas.length === 0) {
    return (
      <div className="container py-5">
        <h1 className="titulo">Tu carrito está vacío</h1>
        <p>
          <Link href="/armador">Arma una PC</Link> o <Link href="/tienda">elige piezas sueltas</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 760 }}>
      <h1 className="titulo mb-3">Carrito</h1>
      <ul className="list-group mb-3">
        {lineas.map((l) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={l.producto.id}>
            <span>
              {l.cantidad} × {l.producto.nombre}
              <br />
              <small className="text-secondary">{bs(l.producto.precio)} c/u</small>
            </span>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => quitar(l.producto.id)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <p className="fs-4 fw-bold">Total: {bs(total)}</p>
      <div className="d-flex gap-2">
        <button className="btn btn-orvex" onClick={copiarResumen}>
          {copiado ? "Resumen copiado" : "Copiar resumen del pedido"}
        </button>
        <button className="btn btn-outline-secondary" onClick={limpiar}>
          Vaciar carrito
        </button>
      </div>
      <p className="form-text mt-2">En la beta todavía no hay pago en línea: copia el resumen y envíalo a la tienda.</p>
    </div>
  );
}
